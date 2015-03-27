define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-button-to-swap-three-d-model', {
		requires: ['tile-buttons', 'three-d-geometric-models']
	});


	plugin.update('Tile.prototype.loadThreeDModels', (old) => function () {
		old.call(this).then(() => {

			/* an array containing null, and each 3D model artefact */
			var models = [null].concat(this.children.filter((child) => child.type === 'ThreeDModel'));

			if (models.length > 1) {
				this.addButton({ name: 'swap3dModel', icon: require('url!./util/icons/3d-white.png') }).onValue(() => {

					// the button switches between the available 3D models on the top level of the tile

					var i;
					for (i = 1; i < models.length; ++i) {
						if (models[i].visible) {
							models[i].visible = false;
							break;
						}
					}
					i = (i+1) % models.length;
					if (models[i]) {

						/* make the corresponding model visible, as well as all its children */
						models[i].traverseArtefactsByType('ThreeDModel', (model) => { model.visible = true });

						/* temporary information in the console for Bernard */// TODO: remove when the corresponding demo is over
						var indentation = "-- ";
						var modelHierarchy = "Available parts of this 3D model:\n";
						models[i].traverseArtefactsByType('ThreeDModel', (model) => {
							modelHierarchy += indentation + model.id + '\n';
						}, {
							beforeGoingIn() { indentation += "-- " },
							beforeGoingOut() { indentation = indentation.slice(3) }
						});
						console.log(modelHierarchy);

					}

				});
			}

		});
	});


});
