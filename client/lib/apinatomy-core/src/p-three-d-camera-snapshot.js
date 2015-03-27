define(['jquery', 'bluebird', './util/misc.js', './util/kefir-and-eggs.js', 'tweenjs'], function ($, P, U, Kefir, TWEEN) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('three-d-camera-snapshot', {
		resolves: ['three-d', 'snapshot'],
		requires: ['three-d-auto-controls']
	});


	plugin.append('Snapshot.prototype.take', function () {

		if (!this.options.camera3D) { return }

		this.object.camera3D = {
			position: {
				x: this.circuitboard.camera3D.position.x,
				y: this.circuitboard.camera3D.position.y,
				z: this.circuitboard.camera3D.position.z
			},
			rotation: {
				x: this.circuitboard.camera3D.rotation.x,
				y: this.circuitboard.camera3D.rotation.y,
				z: this.circuitboard.camera3D.rotation.z
			},
			up: {
				x: this.circuitboard.camera3D.up.x,
				y: this.circuitboard.camera3D.up.y,
				z: this.circuitboard.camera3D.up.z
			}
		};

		var semanticTarget = this.circuitboard.camera3D.userData.semanticTarget;
		if (semanticTarget) {
			U.assert(semanticTarget.type === 'Tile',
					`At this point in development, the only semantic camera target should be a Tile. But it's a ${semanticTarget.type}!`);

			this.object.camera3D.semanticTarget = semanticTarget.model.id;
		} else {
			this.object.camera3D.target = {
				x: this.circuitboard.camera3D.userData.target.x,
				y: this.circuitboard.camera3D.userData.target.y,
				z: this.circuitboard.camera3D.userData.target.z
			};
		}

	}).append('Snapshot.prototype.restore', function () {

		if (!this.options.camera3D) { return }

		/* turn off any currently existing semantic targets */
		this.circuitboard.cameraTargetTile = null;

		/* determine the new target, which can either have a semantic source (a tile)  */
		/* or a syntactic source (an explicit set of coordinates) */
		var targetP;
		if (this.object.camera3D.semanticTarget) {
			targetP = this.circuitboard.tile(this.object.camera3D.semanticTarget).then((tile) => {
				return this.circuitboard.object3D.localToWorld(tile.object3D.position.clone());
			});
		} else {
			targetP = P.resolve(this.object.camera3D.target);
		}

		/* smoothly transition the camera to its new target */
		targetP.then((target) => {

			// TODO: in order to work smoothly with both syntactic and semantic targets,
			//     : we should perform manipulations and corrections on a dummy camera in the three.js world;
			//     : this will work better than 'just changing the target' as we do below

			var easing = { duration: 800, easing: TWEEN.Easing.Sinusoidal.InOut };

			var from = this.circuitboard.camera3D;
			var to = this.object.camera3D;

			var tweenPosition = Kefir.tween(from.position,        to.position, easing);
			var tweenRotation = Kefir.tween(from.rotation,        to.rotation, easing);
			var tweenUp       = Kefir.tween(from.up,              to.up,       easing);
			var tweenTarget   = Kefir.tween(from.userData.target, target,      easing);

			Kefir.merge([
				tweenPosition.start(),
				tweenRotation.start(),
				tweenUp.start(),
				tweenTarget.start()
			]);

		});
	});


});
