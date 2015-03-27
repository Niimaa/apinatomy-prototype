define([
	'jquery',
	'three-js',
	'./util/misc.js',
	'./util/kefir-and-eggs.js',
	'./util/CSS3DRenderer.js',
	'./p-three-d.scss'
], function ($, THREE, U, Kefir) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('three-d', {
		requires: ['position-tracking', 'tile-shrink-when-hidden']
	});


	/* test for browser 3D support */
	function browserSupport() { // TODO: use THREE.js function for this that already exists
		var canvas;
		try {
			canvas = $('<canvas>');
			return !!(canvas[0].getContext('webgl') || canvas[0].getContext('experimental-webgl'));
		} catch (__) {
			return false;
		} finally {
			canvas = undefined;
		}
	}


	/* the constructor is run once to initialize potential 3D-ness */
	plugin.append('Circuitboard.prototype.construct', function () {


		/* test for browser support */
		if (!browserSupport()) {
			console.warn("This browser doesn't seem to have WebGL support."); // TODO: add "ApiNATOMY will not be 3D"
			return;
		}


		/* the 'threeDCanvasElement' property */
		this.newProperty('threeDCanvasElement');
		this.p('threeDCanvasElement').diff().onValue(([oldCanvas, newCanvas]) => { // TODO: use '.diff'
			if (oldCanvas) { oldCanvas.removeClass('three-d-canvas') }
			if (newCanvas) { newCanvas.addClass('three-d-canvas') }
		});


		/* was a canvas given through the options? */
		this.threeDCanvasElement = this.options.threeDCanvasElement;




		/* the 'threeDMode' property */
		this.newProperty('threeDMode', {
			initial: U.isDefined(this.options.threeDCanvasElement)
		}); // TODO: error if no canvas element is set


		/* the 'threeDCanvasSize' observable */
		this.newProperty('threeDCanvasSize').plug(Kefir.merge([
			Kefir.once(),
			( this.options.canvasResizeEvent || $(window).asKefirStream('resize') )
		]).map(() => {
			if (this.threeDCanvasElement) {
				return new U.Size(
					this.threeDCanvasElement.height(),
					this.threeDCanvasElement.width()
				);
			}
		}));


		/* the render event that will be emitted at frame-rate */
		this.newEvent('3d-render');


		/* the code to run every time 3D-ness is turned on */
		this.p('threeDMode').value(true).skipWhileBy(this.p('threeDCanvasSize').not()).onValue(() => {


			// TODO: fix bug: when 3D mode is turned off, then on, tiles no longer respond to clicks (SEE COMMENT BELOW: 'takeWhileBy' doesn't reactivate!!!)


			/* a short notation for the event of 3D-mode being turned off */
			var onThreeDModeOff = this.on('threeDMode').value(false).take(1);


			/* scene */
			this._p_threeD_scene = new THREE.Scene();
			onThreeDModeOff.onValue(() => { delete this._p_threeD_scene });


			/* camera */
			this.camera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
			this.camera3D.userData.target = new THREE.Vector3().copy(this.camera3D.position).setZ(0);
			this.camera3D.lookAt(this.camera3D.userData.target);
			onThreeDModeOff.onValue(() => { delete this.camera3D });
			this.p('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue((canvasSize) => {
				this.camera3D.aspect = canvasSize.width / canvasSize.height;
				if (this.camera3D.position.z === 0) { this.camera3D.position.z = 1 }
				this.camera3D.position.normalize()
						.multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad(this.camera3D.fov) / 2) / 2);
				this.camera3D.updateProjectionMatrix();
			});


			/* lighting */
			this._p_threeD_scene.add(new THREE.AmbientLight(0x101030))
				.add(new THREE.DirectionalLight(0xffeedd).translateX(1).translateY(-1).translateZ(1))
				.add(new THREE.DirectionalLight(0xffeedd).translateX(-1).translateY(1).translateZ(-1));


			/* renderers */
			(()=> {
				/* WebGL renderer */
				var webglRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
				webglRenderer.sortObjects = false;
				webglRenderer.shadowMapEnabled = true;
				webglRenderer.shadowMapSoft = true;
				this.p('threeDCanvasSize').takeWhileBy(this.p('threeDMode'))
					.onValue((canvasSize) => { webglRenderer.setSize(canvasSize.width, canvasSize.height) });
				this.on('3d-render').takeWhileBy(this.p('threeDMode'))
						.onValue(() => { webglRenderer.render(this._p_threeD_scene, this.camera3D) });

				/* CSS renderer */
				var cssRenderer = new THREE.CSS3DRenderer();
				this._cssRenderer = cssRenderer; // for access later
				$(cssRenderer.domElement).append(webglRenderer.domElement);
				this.threeDCanvasElement.append(cssRenderer.domElement);
				onThreeDModeOff.onValue(() => { this.threeDCanvasElement.empty() });
				this.p('threeDCanvasSize').takeWhileBy(this.p('threeDMode'))
					.onValue((canvasSize) => { cssRenderer.setSize(canvasSize.width, canvasSize.height) });
				this.on('3d-render').takeWhileBy(this.p('threeDMode'))
						.onValue(() => { cssRenderer.render(this._p_threeD_scene, this.camera3D) });
			})();


			/* render on every animation frame */
			this.event('3d-render').plug(Kefir.animationFrames().takeWhileBy(this.p('threeDMode')));


			/* the circuitboard floating in 3D space */
			(({parent0, position0, margin0}) => {

				/* the circuitboard itself */
				var threeDCircuitboard = new THREE.CSS3DObject(this.element.css({ left: 0, top: 0, bottom: 0, right: 0 })[0]);
				this._p_threeD_scene.add(threeDCircuitboard);
				this.on('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue((canvasSize) => {
					$(threeDCircuitboard.element).css({
						width: canvasSize.width - margin0.left - margin0.right,
						height: canvasSize.height - margin0.top - margin0.bottom
					});
				});
				onThreeDModeOff.onValue(() => {
					this.element.detach().appendTo(parent0).css(position0).css({
						'width': 'auto',
						'height': 'auto',
						'position': 'absolute',
						'transform': '',
						'-webkit-transform': ''
					});
				});

				/* WebGL stand-in for the circuitboard - obscures objects and receives cast shadows */
				this._p_threeD_scene.add((() => {
					var planeFragmentShader = `
						uniform vec3 diffuse;
						uniform float opacity;
						${THREE.ShaderChunk['color_pars_fragment']}
						${THREE.ShaderChunk['map_pars_fragment']}
						${THREE.ShaderChunk['lightmap_pars_fragment']}
						${THREE.ShaderChunk['envmap_pars_fragment']}
						${THREE.ShaderChunk['fog_pars_fragment']}
						${THREE.ShaderChunk['shadowmap_pars_fragment']}
						${THREE.ShaderChunk['specularmap_pars_fragment']}
						void main() {
							gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
							${THREE.ShaderChunk['map_fragment']}
							${THREE.ShaderChunk['alphatest_fragment']}
							${THREE.ShaderChunk['specularmap_fragment']}
							${THREE.ShaderChunk['lightmap_fragment']}
							${THREE.ShaderChunk['color_fragment']}
							${THREE.ShaderChunk['envmap_fragment']}
							${THREE.ShaderChunk['shadowmap_fragment']}
							${THREE.ShaderChunk['linear_to_gamma_fragment']}
							${THREE.ShaderChunk['fog_fragment']}
							gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 - shadowColor.x);
						}
					`;
					var threeDCircuitboardMesh = new THREE.Mesh(
						new THREE.PlaneBufferGeometry(1, 1),
						new THREE.ShaderMaterial({
							uniforms: THREE.ShaderLib['basic'].uniforms,
							vertexShader: THREE.ShaderLib['basic'].vertexShader,
							fragmentShader: planeFragmentShader
						})
					);
					threeDCircuitboardMesh.receiveShadow = true;
					threeDCircuitboardMesh.castShadow = false;
					this.on('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue((canvasSize) => {
						threeDCircuitboardMesh.scale.x = canvasSize.width - margin0.left - margin0.right;
						threeDCircuitboardMesh.scale.y = canvasSize.height - margin0.top - margin0.bottom;
					});
					return threeDCircuitboardMesh;
				})());

				/* directional light to cast shadows */
				this._p_threeD_scene.add((() => {
					var light = new THREE.DirectionalLight(0xffffff);
					light.position.set(0, 0, 1000);
					light.castShadow = true;
					light.onlyShadow = true;
					light.shadowMapWidth  = 10000;
					light.shadowMapHeight = 10000;
					light.shadowCameraFar    =  1001;
					// The shadow camera should always be larger than the circuitboard.
					// Unfortunately, lights cannot be updated at runtime, so 10000x10000 it is.
					light.shadowCameraLeft   = -5000;
					light.shadowCameraRight  =  5000;
					light.shadowCameraTop    = -5000;
					light.shadowCameraBottom =  5000;
					return light;
				})());

				/* the circuit board backface */
				var backfaceGeometry = new THREE.Geometry();
				backfaceGeometry.vertices.push(
					new THREE.Vector3(-0.5, -0.5, 0),
					new THREE.Vector3( 0.5, -0.5, 0),
					new THREE.Vector3( 0.5,  0.5, 0),
					new THREE.Vector3(-0.5,  0.5, 0),
					new THREE.Vector3(-0.5, -0.5, 0)
				);
				var backface = new THREE.Line(
					backfaceGeometry,
					new THREE.LineBasicMaterial({ color: 'black' })
				);
				backface.position.z -= 0.1;
				this._p_threeD_scene.add(backface);
				this.on('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue((canvasSize) => {
					backface.scale.x = canvasSize.width  - margin0.left - margin0.right  - 1;
					backface.scale.y = canvasSize.height - margin0.top  - margin0.bottom - 1;
				});

				/*  the object containing all 3D things co-located with the circuitboard */
				this.object3D = new THREE.Object3D();
				this._p_threeD_scene.add(this.object3D);
				Kefir.merge([
					this.on('threeDCanvasSize'),
					this.on('size')
				]).takeWhileBy(this.p('threeDMode')).onValue(() => {
					this.object3D.position.x = 0.5 * (margin0.left - margin0.right) - this.size.width  / 2 + 1;
					this.object3D.position.y = 0.5 * (margin0.bottom - margin0.top) - this.size.height / 2 + 1;
				});


			})({ // remember some pre-3D DOM state
				parent0: this.element.parent(),
				position0: {
					left: this.element.css('left'),
					top: this.element.css('top'),
					right: this.element.css('right'),
					bottom: this.element.css('bottom')
				},
				margin0: {
					left: this.offset.left - this.threeDCanvasElement.offset().left,
					top: this.offset.top - this.threeDCanvasElement.offset().top,
					right: this.threeDCanvasSize.width - this.size.width - (this.offset.left - this.threeDCanvasElement.offset().left),
					bottom: this.threeDCanvasSize.height - this.size.height - (this.offset.top - this.threeDCanvasElement.offset().top)
				}
			});


		});
	});


	///* `translatePositionFromCanvasToCircuitboard` has no side-effects and can be used   */
	///*  from the outside to translate left/top coordinates on the screen to left/top     */
	///*  coordinates of the private coordinate-system of the circuitboard, however it is  */
	///*  oriented in 3D space.                                                            */
	//plugin.add('Circuitboard.prototype.translatePositionFromCanvasToCircuitboard', function (positionOnCanvas) {
	//
	//	this.camera3D.updateMatrixWorld();
	//	this.camera3D.updateProjectionMatrix();
	//
	//	var mouse3D = new THREE.Vector3();
	//	mouse3D.x = positionOnCanvas.left / this.threeDCanvasSize.width * 2 - 1;
	//	mouse3D.y = -positionOnCanvas.top / this.threeDCanvasSize.height * 2 + 1;
	//	mouse3D.z = 0.5;
	//	PROJECTOR.unprojectVector(mouse3D, this.camera3D);
	//	var ray = new THREE.Ray(this.camera3D.position, mouse3D.sub(this.camera3D.position).normalize());
	//	var intersects = ray.intersectPlane(PLANE);
	//
	//	/* if the tested intersection is out of range, return undefined */
	//	if (!intersects) { return }
	//
	//	return {
	//		left: intersects.x + this.threeDCanvasSize.width / 2 - this._p_threeD_initialMargin.left,
	//		top: -intersects.y + this.threeDCanvasSize.height / 2 - this._p_threeD_initialMargin.top
	//	};
	//
	//});
	// TODO: have a look here: http://stackoverflow.com/questions/13055214/mouse-canvas-x-y-to-three-js-world-x-y-z/13091694#13091694


	/* artefact-specific object3D objects */
	plugin.append('Tile.prototype.construct', function () {
		this.circuitboard.on('threeDMode').value(true).onValue(() => {

			/* create the 3D object for this tile */
			this.object3D = new THREE.Object3D();
			this.circuitboard.object3D.add(this.object3D);

			/* position it always in the center of the tile */
			Kefir.combine([ this.p('position'), this.p('size') ]).onValue(([position, size]) => {
				this.object3D.position.x = position.left + size.width / 2;
				this.object3D.position.y = this.circuitboard.size.height - position.top - size.height / 2;
			});

			/* hide it when the tile is hidden */
			this.p('fullyVisible').onValue((v) => { this.object3D.visible = v });
			var parentTile = this.closestAncestorByType('Tile');
			if (parentTile) {
				parentTile.p('open').onValue((v) => {
					this.object3D.visible = v && this.fullyVisible;
				});
			}

			// DEBUGGING CODE
			//(()=>{
			//	var geometry = new THREE.SphereGeometry( 5, 32, 32 );
			//	var material = new THREE.MeshPhongMaterial( {color: 0xff0000} );
			//	var sphere = new THREE.Mesh( geometry, material );
			//	this.object3D.add( sphere );
			//})();

		});
	});


	/* necessary setup and breakdown for querying an element's 'offset' in the context of a 3D environment */
	plugin.append('Circuitboard.prototype.construct', function () {

		/* set up another camera that always stays at a circuitboard-looks-not-3D position */
		this._originalCamera3D = new THREE.PerspectiveCamera(60, this.threeDCanvasSize.width / this.threeDCanvasSize.height, 1, 10000);
		this._originalCamera3D.lookAt(new THREE.Vector3(0, 0, 0));
		this.on('threeDMode').value(false).take(1).onValue(() => { delete this._originalCamera3D });
		this.on('threeDCanvasSize').takeWhileBy(this.p('threeDMode')).onValue((canvasSize) => {
			this._originalCamera3D.aspect = canvasSize.width / canvasSize.height;
			if (this._originalCamera3D.position.z === 0) { this._originalCamera3D.position.z = 1 }
			this._originalCamera3D.position.normalize()
					.multiplyScalar(canvasSize.height / Math.tan(THREE.Math.degToRad(this._originalCamera3D.fov) / 2) / 2);
			this._originalCamera3D.updateProjectionMatrix();
		});

	}).replace('Circuitboard.prototype._posTrackingWindow', function (window) {

		/* the 'offset' property is only reliable when the circuitboard is not rotated / positioned / scaled */
		this._cssRenderer.render(this._p_threeD_scene, this._originalCamera3D);
		window();
		this._cssRenderer.render(this._p_threeD_scene, this.camera3D);

	});


});
