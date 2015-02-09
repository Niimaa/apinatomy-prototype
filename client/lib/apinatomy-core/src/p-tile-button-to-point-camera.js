define(['jquery', './util/misc.js', './util/bacon-and-eggs.js', 'three-js'], function ($, U, Bacon, THREE) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-button-to-point-camera',
		requires: ['tile-buttons', 'three-d']
	});


	plugin.insert('Circuitboard.prototype.construct', function () {

		this.newProperty('cameraTargetTile', { initial: null });

		var newTarget = this.p('cameraTargetTile').changes();
		var newTileTarget = newTarget.filter(t => t !== null);


		/* un-target tile when targeted tile is hidden */
		this.p('cameraTargetTile').addSource(newTileTarget.flatMapLatest((tile) => {
			return tile.p('hidden').value(true).takeUntil(this.p('cameraTargetTile').value(null));
		}).map(null));

		/* when a tile is targeted, consistently point the camera there */
		newTarget.flatMapLatest((tile) => {
			if (!tile) { return Bacon.never() }
			return Bacon.mergeAll([
				Bacon.once(),
				tile.p('size').changes(),
				tile.p('position').changes()
			]).map(tile);
		}).onValue((tile) => {
			this.camera3D.userData.target = this.object3D.localToWorld(tile.object3D.position.clone());
			this.camera3D.userData.semanticTarget = tile;
		});
		newTarget.value(null).onValue(() => {
			delete this.camera3D.userData.semanticTarget;
		});


		/* when a new tile is targeted, change the color of its camera button */
		newTarget.startWith(null).startWith(null).slidingWindow(2).map(([a, b]) => [b, a]).onValue(([newTarget, oldTarget]) => {
			if (newTarget) {
				newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({
					backgroundImage: `url(${require('url!./util/icons/camera-black.png')})`
				});
			}
			if (oldTarget) {
				oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({
					backgroundImage: `url(${require('url!./util/icons/camera-white.png')})`
				});
			}
		});

	}).insert('Tile.prototype.construct', function () {

		this.addButton({ name: 'pointCamera', icon: require('url!./util/icons/camera-white.png') }).onValue(() => {

			if (this.circuitboard.cameraTargetTile === this) {
				this.circuitboard.cameraTargetTile = null;
			} else {
				this.circuitboard.cameraTargetTile = this;
			}

		});

	});


});
