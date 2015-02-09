define(['jquery', './util/misc.js', 'bluebird', './util/bacon-and-eggs.js', 'three-js', 'tweenjs'], function ($, U, P, Bacon, THREE, TWEEN) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-auto-controls',
		requires: ['three-d']
	});


	plugin.append('Circuitboard.prototype.construct', function () {
		this.p('threeDMode').value(true).take(1).onValue(() => {

			this.on('3d-render').onValue(() => { TWEEN.update() });

		});
	});
	//.add('Circuitboard.prototype.animateCameraTo', function (coordinatesOrTileId) {
	//
	//	return (typeof coordinatesOrTileId === 'string' ? this.tile(coordinatesOrTileId).then((tile) => {
	//		var pos = tile.position;
	//		var size = tile.size;
	//		return {
	//			x: pos.left + size.width / 2 - this.size.width / 2,
	//			y: -pos.top - size.height / 2 + this.size.height / 2
	//		};
	//	}) : P.resolve(coordinatesOrTileId)).then((coords) => {
	//
	//		var initialZ = this.camera3D.position.z;
	//
	//		var tweenXY = Bacon.tween(this.camera3D.position, coords, { duration: 800, easing: TWEEN.Easing.Sinusoidal.Out });
	//		var tweenZ = Bacon.tween(this.camera3D.position, { z: 1.5 * initialZ }, { duration: 600, easing: TWEEN.Easing.Sinusoidal.Out })
	//				.chain(Bacon.tween(this.camera3D.position, { z: initialZ }, { duration: 200, easing: TWEEN.Easing.Sinusoidal.In }));
	//
	//		var animation = Bacon.mergeAll([
	//			tweenZ.start(),
	//			tweenXY.start()
	//		]);
	//
	//		animation.onValue(({x, y}) => {
	//			this.camera3D.userData.target.x = x;
	//			this.camera3D.userData.target.y = y;
	//			this.camera3D.lookAt(this.camera3D.userData.target);
	//		});
	//
	//		return animation;
	//
	//	});
	//
	//});


});
