define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./Artefact.js'
], function ($, THREE, U, P, Kefir, ArtefactP) {
	'use strict';


	/* convenience predicate functions */
	function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
	function isObject3D(v) { return v instanceof THREE.Object3D }
	function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1 }


	///* convenience function to visit all geometries in an Object3D */ // TODO: remove or use?
	//function traverseGeometries(obj, fn) {
	//	obj.traverse((subObj) => {
	//		if (U.isUndefined(subObj.geometry)) { return }
	//		fn(subObj.geometry);
	//	});
	//}
	//function traverseMeshes(obj, fn) {
	//	obj.traverse((subObj) => {
	//		if (U.isDefined(subObj.geometry)) { fn(subObj) }
	//	});
	//}


	/* a promise to the new ThreeDModel class */
	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_ThreeDModel)) { return window._amy_ThreeDModel }


		/* create the class */
		var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel({rootThreeDModel, visible, file, parts}) {


			/* what is the 'root' 3D model? */
			if (U.isUndefined(rootThreeDModel)) { rootThreeDModel = this }
			this.rootThreeDModel = rootThreeDModel;


			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden').plug(this.p('visible').not());
			this.p('visible').plug(this.p('hidden').not());


			/* create any ThreeDModels parts (without (yet) loading their object3D) */
			Object.keys(parts|| {}).map((id) => {

				/* define the options we want to pass to the corresponding child artefact */
				var newChildOptions = U.extend({}, parts[id], {
					id:              id,
					parent:          this,
					visible:         visible,
					rootThreeDModel: this.rootThreeDModel
				});
				['color', 'animation', 'clock'].forEach((prop) => {
					if (U.isUndefined(newChildOptions[prop])) {
						newChildOptions[prop] = this.options[prop];
					}
				});

				/* construct the child ThreeDModel */// jshint -W031
				new window._amy_ThreeDModel(newChildOptions);

			});


			/* manifest the visibility of this model on the object3D */
			this.object3D.then((object3D) => {
				this.p('visible').merge(this.on('destroy').mapTo(false))
					.onValue((visible) => { object3D.visible = visible });
			});


		}, {

			get geometry3D() {
				if (!this._geometry3D) {
					this._geometry3D = new P((resolve, reject) => {
						if (U.isDefined(this.options.file)) {
							this.rootThreeDModel.p('visible').value(true).take(1).onValue(() => {

								/* resolve this promise by loading the proper file, when the root model first becomes visible */
								this._loadGeometryFromFile().then(resolve, reject);

							});
						} else {
							/* this ThreeDModel has no geometry */
							resolve(null);
						}
					});
				}
				return this._geometry3D;
			},


			get originalBoundingBox() {
				if (!this._originalBoundingBox) {
					this._originalBoundingBox = new P((resolve, reject) => {
						if (U.isDefined(this.options.file)) {
							this.geometry3D.then((geometry) => {
								var boxFromFile = new THREE.Box3();
								if (geometry instanceof THREE.BufferGeometry) {
									geometry.computeBoundingBox();
									boxFromFile.expandByPoint(geometry.boundingBox.min);
									boxFromFile.expandByPoint(geometry.boundingBox.max);
								}
								(geometry.morphTargets || []).concat([geometry]).forEach(({vertices}) => {
									(vertices || []).forEach((point) => {
										boxFromFile.expandByPoint(point);
									});
								});
								return boxFromFile;
							}).then(resolve, reject);
						} else if (U.isDefined(this.options.parts)) {
							P.all(this.children).map(part => part.originalBoundingBox).reduce((result, bbox) => {
								return result.expandByPoint(bbox.min).expandByPoint(bbox.max);
							}, new THREE.Box3()).then(resolve, reject);
						}
					});
				}
				return this._originalBoundingBox;
			},


			get object3D() {
				if (!this._object3D) {
					this._object3D = this.geometry3D.then((geometry3D) => {

						if (geometry3D) { // we have loaded a file

							return this.rootThreeDModel.originalBoundingBox.then((originalBoundingBox) => {

								/* center the geometry based on the root model's bounding box */
								var correction = originalBoundingBox.center().negate();
								var correctionMatrix = new THREE.Matrix4().setPosition(correction);
								(geometry3D.morphTargets || []).forEach(({vertices}) => {
									vertices.forEach((point) => {
										point.applyMatrix4(correctionMatrix);
									});
								});
								geometry3D.applyMatrix(correctionMatrix);

								/* create material */
								var {animation, color} = this.options;
								var material = new THREE.MeshLambertMaterial({ color: color || 'white' });
								material.side = THREE.DoubleSide;

								/* create the object3D, either animated or not */
								var object;
								if (animation) {
									/* create a mesh that can be animated */
									object = new THREE.MorphAnimMesh(geometry3D, material);
									object.duration = animation.duration;
									material.morphTargets = true;
									geometry3D.computeMorphNormals();

									/* subscribe to the clock */
									var {clock} = this.options;
									var lastTime = 0;
									clock.takeUntilBy(this.event('destroy')).onValue((time) => {
										object.updateAnimation(1000 * (time - lastTime));
										lastTime = time;
									});
								} else {
									/* simple, static mesh */
									object = new THREE.Mesh(geometry3D, material);
								}

								object.castShadow = true;
								object.receiveShadow = false;

								return object;

							});

						} else { // this is a group with parts

							/* create base object3D for model parts */
							var object = new THREE.Object3D();

							/* whenever each part is loaded, add them as a child of the base object */
							this.children.map((part) => part.object3D).forEach((partObjectP) => {
								partObjectP.then((partObject) => { object.add(partObject) });
							});

							/* resolve this promise with the base object */
							return P.all(this.children.map((part) => part.object3D)).each((subObject) => {
								object.add(subObject);
							}).return(object);

						}

					});
				}
				return this._object3D;
			},


			adaptToSurfaceArea(size) {

				U.assert(this.rootThreeDModel === this,
					`The 'adaptToSurfaceArea' method should only be called on a root ThreeDModel.`);

				P.all([this.object3D, this.originalBoundingBox]).spread((obj, boundingBox) => {
					/* abbreviate 3D-object width and height */
					var objWidth = boundingBox.size().x;
					var objHeight = boundingBox.size().y;

					/* rotate 90° on the z-axis if this gives a better fit */
					if ((size.width < size.height) !== (objWidth < objHeight)) {
						obj.rotation.z = 0.5 * Math.PI;
						[objWidth, objHeight] = [objHeight, objWidth];
					} else {
						obj.rotation.z = 0;
					}

					/* determine the scale ratio */
					var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);

					/* adjust size */
					obj.scale.set(ratio, ratio, ratio);

					/* any custom 'elevation' */
					var elevation = U.defOr(this.options.elevation, Math.min(size.width, size.height) / 4);
					obj.position.z = 0.5 * ratio * boundingBox.size().z + elevation;
				});

			},


			_loadGeometryFromFile() {

				/* select the longest extension that fits the filename */
				// e.g., "points.json" has priority over "json"
				var {file} = this.options;
				var ext = '';
				Object.keys($.circuitboard.Circuitboard.threeJsLoaders).forEach((extension) => {
					if (extension.length > ext.length) {
						if (endsWith(file, `.${extension}`)) {
							ext = extension;
						}
					}
				});

				/* was an extension found? */
				U.assert(ext.length > 0, `The file '${file}' is not recognized as a 3D model.`);

				/* fetch the loader for that file extension */
				var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];

				/* sanity check */
				U.assert(U.isDefined(Loader), `Something went wrong retrieving the 3D model loader.`);

				/* return a promise to the 3D object */
				return U.promisify(new Loader(), 'load')(file).then((geometry) => {

					/* for now, we only accept Geometry's and Object3D's from a loader */
					U.assert(isGeometry(geometry) || isObject3D(geometry),
						`The 3D model loader for the '${ext}' extension returned an unsupported value.`);

					/* if an Object3D is returned, take only its geometry */
					if (!isGeometry(geometry)) { geometry = geometry.geometry || geometry.children[0].geometry }

					/* return the object */
					return geometry;

				});
			},


			// UNCOMMENT THIS FOR HELP DEBUGGING OBJECT PLACEMENT
			//_showVisibleBoundingBox() {
			//	if (this.rootThreeDModel === this) {
			//		var geometry = new THREE.BoxGeometry(1, 1, 1);
			//		var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
			//		var box = new THREE.Mesh(geometry, material);
			//		this.object3D.then((object3D) => { object3D.add(box) });
			//		this.originalBoundingBox.then((bb) => {
			//			if (bb.empty()) { return }
			//			box.position.x = 0.5 * (bb.max.x + bb.min.x);
			//			box.position.y = 0.5 * (bb.max.y + bb.min.y);
			//			box.position.z = 0.5 * (bb.max.z + bb.min.z);
			//			box.scale.x = (bb.max.x - bb.min.x);
			//			box.scale.y = (bb.max.y - bb.min.y);
			//			box.scale.z = (bb.max.z - bb.min.z);
			//		});
			//	}
			//},


		}, {

			visible: false

		});


		/* static location to collect three.js loaders for different file formats */
		// TODO: transfer this task from Circuitboard to here, everywhere in the code
		window._amy_ThreeDModel.loaders = {};


		return window._amy_ThreeDModel;


	}).tap((c) => { $.circuitboard.ThreeDModel = c });


});
