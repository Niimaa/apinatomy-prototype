define(['jquery', './util/misc.js', 'three-js', './util/bacon-and-eggs.js'], function ($, U, THREE, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-manual-controls',
		requires: ['three-d']
	});


	/* constants */
	//var EPS = 0.000001;
	//var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };
	var MOUSE_BUTTON = { LEFT: 1, MIDDLE: 2, RIGHT: 3 };


	plugin.append('Circuitboard.prototype.construct', function () {

		/* the 'threeDManualControlsEnabled' property */
		this.newProperty('threeDManualControlsEnabled', { initial: true });

		/* the 'three-d-manual-controls-used' event */
		this.newEvent('three-d-manual-controls-used');

		this.on('threeDMode').value(true).onValue(() => {


			var somethingChanged = false;


			/* screen position and size */// TODO: refactor - cut out the middleman
			this._screen = {};
			this.on('threeDCanvasSize').onValue((size) => {
				this._screen.width = size.width;
				this._screen.height = size.height;
				this._screen.left = parseFloat(this.threeDCanvasElement.css('left'));
				this._screen.top  = parseFloat(this.threeDCanvasElement.css('top'));
			});
			this.getMouseOnScreen = (pageX, pageY) => {
				return new THREE.Vector2(
						(pageX - this._screen.left) / this._screen.width,
						(pageY - this._screen.top) / this._screen.height
				);
			};


			/* creating various event streams */
			this.threeDCanvasElement.asEventStream('contextmenu').onValue('.preventDefault');
			var dragging = this.threeDCanvasElement.mouseDrag({ threshold: this.options.dragThreshold }).filter(() => this.threeDManualControlsEnabled);
			var keydown = $(window).asEventStream('keydown').filter(() => this.threeDManualControlsEnabled);
			var keyup = $(window).asEventStream('keyup');
			var scrolling = this.threeDCanvasElement.mouseWheel().filter(() => this.threeDManualControlsEnabled);
			var button = (b) => ({mouseDownEvent}) => (mouseDownEvent.which === b);
			var key = (from, to) => (event) => (event.which >= from && event.which <= (to || from));


			/* rotating with the left mouse button */
			this._rotateStart = new THREE.Vector3();
			this._rotateEnd = new THREE.Vector3();
			dragging.filter(button(MOUSE_BUTTON.LEFT)).onValue(({mouseDownEvent, mouseMoveEvent}) => { // TODO: touch

				somethingChanged = true;

				if (!mouseDownEvent._pastFirst) {
					mouseDownEvent._pastFirst = true;
					this._rotateStart.copy(this.getMouseProjectionOnBall(mouseDownEvent.pageX, mouseDownEvent.pageY));
				}
				this._rotateEnd.copy(this.getMouseProjectionOnBall(mouseMoveEvent.pageX, mouseMoveEvent.pageY));

			});

			/* rotating with the keyboard */
			this.newProperty('currentArrowKey', {
				initial: false
			}).addSource(keydown.filter(key(37, 40)).flatMapLatest((keydownEvent) => Bacon.mergeAll([
				Bacon.once(keydownEvent.which),
				keyup.filter(key(keydownEvent.which)).map(false).take(1)
			])));
			this.on('currentArrowKey').onValue(() => { somethingChanged = true });


			/* zooming with the middle mouse button */
			this._zoomStart = new THREE.Vector2();
			this._zoomEnd = new THREE.Vector2();
			dragging.filter(button(MOUSE_BUTTON.MIDDLE)).onValue(({mouseDownEvent, mouseMoveEvent}) => {

				somethingChanged = true;

				if (!mouseDownEvent._pastFirst) {
					mouseDownEvent._pastFirst = true;
					this._zoomStart.copy(this.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
				}
				this._zoomEnd.copy(this.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));

			});
			/* zooming with the scroll-wheel */
			scrolling.onValue((event) => {

				somethingChanged = true;

				event.preventDefault();
				event.stopPropagation();

				event = event.originalEvent;

				var diff = 0;

				if (event.wheelDelta) { // WebKit / Opera / Explorer 9
					diff = event.wheelDelta / 40;
				} else if (event.detail) { // Firefox
					diff = -event.detail / 3;
				}

				this._zoomStart.y += diff * 0.01;

			});




			/* panning with the right mouse button */
			this._panStart = new THREE.Vector2();
			this._panEnd = new THREE.Vector2();
			dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue(({mouseDownEvent, mouseMoveEvent}) => {

				somethingChanged = true;

				if (!mouseDownEvent._pastFirst) {
					mouseDownEvent._pastFirst = true;
					this._panStart.copy(this.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
				}
				this._panEnd.copy(this.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));

			});


			/* updating all the stuff */
			this._eye = new THREE.Vector3();
			this._panSpeed = 1.0;
			this._rotateSpeed = 1.0;
			this.zoomSpeed = 1.0;
			this.on('3d-render').takeWhile(this.on('threeDMode')).onValue(() => {

				if (somethingChanged || this.currentArrowKey) {
					somethingChanged = false;


					/* trigger event for manual controls used */
					this.event('three-d-manual-controls-used').push();


					/* setup */
					this._eye.subVectors(this.camera3D.position, this.camera3D.userData.target);


					/* panning */
					(() => {

							var mouseChange = new THREE.Vector2();
							var objectUp = new THREE.Vector3();
							var pan = new THREE.Vector3();
							mouseChange.copy(this._panEnd).sub(this._panStart); // TODO: just store this directly?
							if (mouseChange.lengthSq()) {
								mouseChange.multiplyScalar(this._eye.length() * this._panSpeed);
								pan.copy(this._eye);
								pan.cross(this.camera3D.up);
								pan.setLength(mouseChange.x);
								pan.add(objectUp.copy(this.camera3D.up).setLength(mouseChange.y));
								this.camera3D.position.add(pan);
								if (!this.camera3D.userData.semanticTarget) {
									this.camera3D.userData.target.add(pan);
								}
								this._panStart.copy(this._panEnd);
							}

					})();
					/* rotating by mouse */
					(() => {
						var axis = new THREE.Vector3();
						var quaternion = new THREE.Quaternion();
						var angle = Math.acos(
								this._rotateStart.dot(this._rotateEnd) /
								this._rotateStart.length() /
								this._rotateEnd.length()
						);
						if (angle) {
							axis.crossVectors(this._rotateStart, this._rotateEnd).normalize();

							angle *= this._rotateSpeed;

							quaternion.setFromAxisAngle(axis, -angle);

							this._eye.applyQuaternion(quaternion);
							this.camera3D.up.applyQuaternion(quaternion);

							this._rotateEnd.applyQuaternion(quaternion);
							this._rotateStart.copy(this._rotateEnd);
						}
					})();
					/* rotating by keyboard */
					(() => {
						if (this.currentArrowKey) {
							var quaternion = new THREE.Quaternion();
							var axis = new THREE.Vector3(
									+(this.currentArrowKey === 38 || this.currentArrowKey === 40), // x
									+(this.currentArrowKey === 37 || this.currentArrowKey === 39)  // y
							);
							var angle = 0.015 * Math.PI * this._rotateSpeed;
							if (this.currentArrowKey === 39 || this.currentArrowKey === 40) { angle *= -1 }

							quaternion.setFromAxisAngle(axis, -angle);
							this._eye.applyQuaternion(quaternion);
							this.camera3D.up.applyQuaternion(quaternion);
						}
					})();
					/* zooming */
					(() => {
						//if (this._state === STATE.TOUCH_ZOOM_PAN) {
						//	this._touchZoomDistanceStart = this._touchZoomDistanceEnd;
						//	this._eye.multiplyScalar(this._touchZoomDistanceStart / this._touchZoomDistanceEnd);
						//} else {
						//}

						var factor = 1.0 + ( this._zoomEnd.y - this._zoomStart.y ) * this.zoomSpeed; // set factor
						if (factor !== 1.0 && factor > 0.0) {
							this._eye.multiplyScalar(factor);
							this._zoomStart.copy(this._zoomEnd);
						}

					})();



					/* breakdown */
					this.camera3D.position.addVectors(this.camera3D.userData.target, this._eye);

				}

				this.camera3D.lookAt(this.camera3D.userData.target);





			});


			///* panning with the right mouse button */
			//dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue(({mouseDownEvent, mouseMoveEvent}) => {
			//
			//	if (!mouseDownEvent._cameraPosition0) {
			//		mouseDownEvent._cameraPosition0 = new THREE.Vector3().copy(this.camera3D.position);
			//	}
			//
			//	this.camera3D.position.x = mouseDownEvent._cameraPosition0.x + mouseDownEvent.pageX - mouseMoveEvent.pageX;
			//	this.camera3D.position.y = mouseDownEvent._cameraPosition0.y + mouseDownEvent.pageY - mouseMoveEvent.pageY;
			//
			//});



		});
	});





	plugin.add('Circuitboard.prototype.getMouseProjectionOnBall', function getMouseProjectionOnBall(pageX, pageY) {
		var vector = new THREE.Vector3();
		var objectUp = new THREE.Vector3();
		var mouseOnBall = new THREE.Vector3();

		mouseOnBall.set(
				(pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5),
				(this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5),
				0.0
		);

		var length = mouseOnBall.length();

		if (length > 1.0) {
			mouseOnBall.normalize();
		} else {
			mouseOnBall.z = Math.sqrt(1.0 - length * length);
		}

		this._eye.copy(this.camera3D.position).sub(this.camera3D.userData.target);

		vector.copy(this.camera3D.up).setLength(mouseOnBall.y);
		vector.add(objectUp.copy(this.camera3D.up).cross(this._eye).setLength(mouseOnBall.x));
		vector.add(this._eye.setLength(mouseOnBall.z));

		return vector;
	});






































	//plugin.append('Circuitboard.prototype.construct', function () {
	//	this.on('threeDMode', true).onValue(() => {
	//
	//
	//
	//		/* implementing the controls */
	//		var controls = new THREE.TrackballControls(this.camera3D, this.threeDCanvasElement[0]);
	//		U.extend(controls, {
	//			rotateSpeed: 1.0,
	//			zoomSpeed: 1.2,
	//			panSpeed: 0.8
	//		});
	//		this.on('3d-render').takeWhile(this.on('threeDMode')).assign(controls, 'update');
	//		this.on('size').takeWhile(this.on('threeDMode')).assign(controls, 'handleResize');
	//		this.on('threeDControlsEnabled').takeWhile(this.on('threeDMode')).onValue((enabled) => { controls.enabled = enabled });
	//
	//	});
	//});


});
