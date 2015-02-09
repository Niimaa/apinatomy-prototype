define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'bluebird',
	'./util/bacon-and-eggs.js',
	'./Artefact.js'
], function ($, THREE, U, P, Bacon, ArtefactP) {
	'use strict';


	/* convenience predicate functions */
	function isGeometry(v) { return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry }
	function isObject3D(v) { return v instanceof THREE.Object3D }
	function endsWith(str, suffix) { return str.indexOf(suffix, str.length - suffix.length) !== -1 }

	/* convenience function to visit all geometries in an Object3D */
	function traverseGeometries(obj, fn) {
		obj.traverse((subObj) => {
			if (U.isUndefined(subObj.geometry)) { return }
			fn(subObj.geometry);
		});
	}

	/* convenience function to calculate overall bounding box of an object3D */
	function calculateBoundingBox(obj) {
		obj.userData.boundingBox = new THREE.Box3();
		traverseGeometries(obj, (geometry) => {
			if (geometry instanceof THREE.BufferGeometry) {
				geometry.computeBoundingBox();
				obj.userData.boundingBox.expandByPoint(geometry.boundingBox.min);
				obj.userData.boundingBox.expandByPoint(geometry.boundingBox.max);
			}
			(geometry.morphTargets || []).concat([geometry]).forEach(({vertices}) => {
				(vertices || []).forEach((point) => {
					obj.userData.boundingBox.expandByPoint(point);
				});
			});
		});
	}

	/* convenience function to center all the geometry of an object on its (0, 0, 0) point */
	function startThreeDAnimation(obj) {
		var clock = new THREE.Clock();
		var morphObjs = [];
		obj.traverse((subObj) => {
			if (subObj instanceof THREE.MorphAnimMesh) {
				morphObjs.push(subObj);
			}
		});
		Bacon.animationFrames().onValue(() => {
			var dTime = clock.getDelta();
			morphObjs.forEach((morphObj) => {
				morphObj.updateAnimation(1000 * dTime);
			});
		});
	}


	/* a promise to the new ThreeDModel class */
	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_ThreeDModel)) { return window._amy_ThreeDModel }


		var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel({visible}) {

			/* check if this is a model part or the root */
			this._isPart = this.parent.type === 'ThreeDModel';

			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden');
			this.p('visible').addSource(this.property('hidden').not());
			this.p('hidden').addSource(this.property('visible').not());

			/* manifest this visibility on the canvas */
			this.p('visible').value(true).flatMap(this.p('visible')).onValue((visible) => {
				this.object3D.then((obj) => { obj.visible = visible });
			});

			/* when the 3D model is destroyed, it is also hidden */
			this.p('hidden').addSource(this.on('destroy').take(1).map(true));

			/* when the parent is hidden, hide this model too */
			this.p('hidden').addSource(this.parent.p('hidden').value(true));

			/* grab a link to the closest ancestor tile */
			// TODO: 3D models are now tied to a parent tile; this is not elegant
			this._tile = this.closestAncestorByType('Tile');


			/* create all descendant ThreeDModel's (without necessarily loading their object3D) */
			var INHERITED_OPTIONS = ['color', 'animation'];
			Object.keys(this.options.parts || {}).forEach((id) => {

				/* the options of the new ThreeDModel */
				var part = this.options.parts[id];

				/* define the options we want to pass to the corresponding child artefact */
				var newChildOptions = U.extend({ id, parent: this }, part);
				INHERITED_OPTIONS.forEach((prop) => {
					if (U.isUndefined(newChildOptions[prop])) {
						newChildOptions[prop] = this.options[prop];
					}
				});

				/* construct the child ThreeDModel */
				return new window._amy_ThreeDModel(newChildOptions);

			});



		}, {

			get object3D() {
				if (!this._object3D) { this._object3D = this._load() }
				return this._object3D;
			},


			_centerGeometries(obj) {
				if (!this.geometryCorrection) { this.geometryCorrection = this.options.geometryCorrection }
				if (!this.geometryCorrection) { this.geometryCorrection = obj.userData.boundingBox.center().negate() }
				traverseGeometries(obj, (geometry) => {
					var matrix = new THREE.Matrix4().setPosition(this.geometryCorrection);
					(geometry.morphTargets || []).forEach(({vertices}) => {
						vertices.forEach((point) => {
							point.applyMatrix4(matrix);
						});
					});
					geometry.applyMatrix(matrix);
				});
			},


			_load() {
				var result;
				if (U.isDefined(this.options.file))  { result = this._loadFile()  }
				if (U.isDefined(this.options.parts)) { result = this._loadParts() }

				if (!this._isPart) {
					result = result
						/* process the geometries and center them on (0, 0, 0) */
						.tap(calculateBoundingBox)
						.tap((obj) => { this._centerGeometries(obj) })
						/* resize / rotate the object based on the shape of the tile */
						.tap((obj) => {
							this.p('visible').value(true).flatMap(() =>
								this._tile.p('size').takeWhile(this.p('visible'))).onValue((size) => {

								/* abbreviate 3D-object width and height */
								var objWidth = obj.userData.boundingBox.size().x;
								var objHeight = obj.userData.boundingBox.size().y;

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

								/* adjust 'altitude' */
								var elevation = U.defOr(this.options.elevation, Math.min(size.width, size.height) / 4);
								obj.position.z = 0.5 * ratio * obj.userData.boundingBox.size().z + elevation;

								/* any custom 'rotation'? */
								if (this.options.rotation) {
									U.extend(obj.rotation, this.options.rotation);
								}

							});
						})
						/* back-link the artefact to the object3D */
						.tap((obj) => { obj.userData.artefact = this })
						/* add this object to the scene */
						.tap((obj) => {
							this._tile.object3D.add(obj);
						})
						/* start the animation of this object, if applicable */
						.tap(startThreeDAnimation);
				}

				return result;
			},

			_loadFile() {
				var {file, color, animation} = this.options;

				/* select the longest extension that fits the filename */
				// e.g., "points.json" has priority over "json"
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
				return U.promisify(new Loader(), 'load')(file).then((obj) => {

					/* for now, we only accept Geometry's and Object3D's from a loader */
					U.assert(isGeometry(obj) || isObject3D(obj),
							`The 3D model loader for the '${ext}' extension returned an unsupported value.`);

					/* if a Geometry is returned, create an Object3D around it */
					if (isGeometry(obj)) {
						var geometry = obj;
						var material = new THREE.MeshLambertMaterial({ color: color || 'white' });
						material.side = THREE.DoubleSide;
						if (animation) {
							obj = new THREE.MorphAnimMesh(geometry, material);
							obj.duration = animation.duration;
							material.morphTargets = true;
							geometry.computeMorphNormals(obj);
						} else {
							obj = new THREE.Mesh(geometry, material);
						}
					}

					/* return the object */
					return obj;
				});
			},

			_loadParts() {
				return P.all(this.children).map((child) => (child._object3D = child._load()))
						.reduce((parent, child) => { parent.add(child); return parent }, new THREE.Object3D());
			}

		}, {

			visible: false

		});


		/* static location to collect three.js loaders for different file formats */
		// TODO: transfer this task from Circuitboard to here, everywhere in the code
		window._amy_ThreeDModel.loaders = {};


		return window._amy_ThreeDModel;


	}).tap((c) => { $.circuitboard.ThreeDModel = c });


});
