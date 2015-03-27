define([
	'jquery',
	'three-js',
	'bluebird',
	'./util/kefir-and-eggs.js',
	'./util/misc.js',
	'./ThreeDModel.js'
], function ($, THREE, P, Kefir, U, ThreeDModelP) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('three-d-geometric-models', {
		requires: ['three-d', 'three-d-spinner']
	});


	/* an object where three.js loaders for different file formats can be plugged in */
	plugin.add('Circuitboard.threeJsLoaders', {});


	/* to load any 3D models associated with a tile */
	plugin.add('Tile.prototype.loadThreeDModels', function () {
		var threeDModels = this.circuitboard.options.threeDModels;
		if (!threeDModels) { return }
		return P.all([this.model, ThreeDModelP]).spread((tileModel, ThreeDModel) => {
			if (threeDModels[tileModel.id]) {
				this.threeDModels = {};
				Object.keys(threeDModels[tileModel.id]).forEach((modelID) => {

					/* create a simple clock for animated models */
					// TODO: at some point, we change this to a more global clock
					var clock = new THREE.Clock();
					var clockStream = Kefir.animationFrames().map(() => clock.getElapsedTime());

					/* create the model artefact */
					var model = this.threeDModels[modelID] =
						new ThreeDModel(U.extend({}, threeDModels[tileModel.id][modelID], {
							id:      modelID,
							parent:  this,
							clock:   clockStream,
							visible: false
						}));

					/* when the object is created, add it to the scene and dynamically resize */
					model.object3D.then((object) => {
						this.object3D.add(object);
						this.p('size').onValue((size) => {
							this.threeDModels[modelID].adaptToSurfaceArea(size);
						});
					});

					/* loading indicator until the model is loaded */
					model.p('visible').value(true).take(1).onValue(() => {
						this.loadingIndicator({ until: model.object3D });
					});

				});
				return this.threeDModels;
			}
		});
	});


	/* load any 3D models associated with a tile */
	plugin.append('Tile.prototype.construct', function () {
		this.loadThreeDModels();
	});


});
