define(['jquery', './util/misc.js', 'three-js', './util/kefir-and-eggs.js'], function ($, U, THREE, Kefir) {
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
			this.threeDCanvasElement.asKefirStream('contextmenu').onValue((event) => { event.preventDefault() });
			var dragging = this.threeDCanvasElement.mouseDrag({ threshold: this.options.dragThreshold }).filter(() => this.threeDManualControlsEnabled);
			var keydown = $(window).asKefirStream('keydown').filter(() => this.threeDManualControlsEnabled);
			var keyup = $(window).asKefirStream('keyup');
			var scrolling = this.threeDCanvasElement.mouseWheel().filter(() => this.threeDManualControlsEnabled);
			var button = (b) => ({mouseDownEvent}) => (mouseDownEvent.which === b);
			var key = (from, to) => (event) => (event.which >= from && event.which <= (to || from));


			/* rotating with the left mouse button */
			this._rotateStart = new THREE.Vector3();
			this._rotateEnd = new THREE.Vector3();
			var canvasOffset = this.threeDCanvasElement.offset();
			dragging.filter(button(MOUSE_BUTTON.LEFT)).onValue(({mouseDownEvent, mouseMoveEvent}) => { // TODO: touch

				somethingChanged = true;

				if (!mouseDownEvent._pastFirst) {
					mouseDownEvent._pastFirst = true;
					this._rotateStart.copy(this.getMouseProjectionOnBall(mouseDownEvent.pageX - canvasOffset.left, mouseDownEvent.pageY - canvasOffset.top));
				}
				this._rotateEnd.copy(this.getMouseProjectionOnBall(mouseMoveEvent.pageX - canvasOffset.left, mouseMoveEvent.pageY - canvasOffset.top));

			});

			/* rotating with the keyboard */
			this.newProperty('currentArrowKey', {
				initial: false
			}).plug(keydown.filter(key(37, 40)).flatMapLatest((keydownEvent) => Kefir.merge([
				Kefir.once(keydownEvent),
				keyup.filter(key(keydownEvent.which)).mapTo(false).take(1)
			])));
			this.on('currentArrowKey').changes().onValue(() => { somethingChanged = true });


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
			this.on('3d-render').takeWhileBy(this.p('threeDMode')).onValue(() => { // TODO: this doesn't reactivate when threeDMode is turned off and then on again!

				if (somethingChanged || this.currentArrowKey) {
					somethingChanged = false;

					/* trigger event for manual controls used */
					this.event('three-d-manual-controls-used').emit();

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
							var {which, ctrlKey} = this.currentArrowKey;
							var axis = new THREE.Vector3();
							     if ((which === 38 || which === 40) && !ctrlKey) { axis.set(1, 0, 0) } // x: up,down
							else if ((which === 37 || which === 39) && !ctrlKey) { axis.set(0, 1, 0) } // y: left,right
							else if ((which === 37 || which === 39) &&  ctrlKey) { axis.set(0, 0, 1) } // z: ctrl+left,right
							else { return }
							var angle = 0.015 * Math.PI * this._rotateSpeed;
							if (which === 39 || which === 40) { angle *= -1 }

							var quaternion = new THREE.Quaternion();
							quaternion.setFromAxisAngle(axis, -angle);
							this._eye.applyQuaternion(quaternion);
							this.camera3D.up.applyQuaternion(quaternion);
						}
					})();

					/* zooming by keyboard */
					// leave this before the 'zooming by mouse' section
					(() => {
						if (this.currentArrowKey) {
							var {which, ctrlKey} = this.currentArrowKey;
							if (which === 38 && ctrlKey) { // ctrl+up
								this._zoomStart.y += 0.02;
							} else if (which === 40 && ctrlKey) { // ctrl+down
								this._zoomStart.y -= 0.02;
							}
						}
					})();

					/* zooming by mouse */
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

					/* z-axis restriction */
					if (this.options.forbidSubZeroZ) {
						var eyeLength = this._eye.length();
						if (this.camera3D.userData.target.z < 0) {
							this.camera3D.userData.target.z = 0;
						}
						if (this._eye.z < 0) {
							this._eye.z = 0;
						}
						this._eye.setLength(eyeLength);
					}

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


});
