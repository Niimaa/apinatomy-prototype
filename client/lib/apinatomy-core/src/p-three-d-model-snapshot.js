define(['jquery', './util/misc.js'], function ($, U) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'three-d-model-snapshot',
		resolves: ['three-d-geometric-models', 'snapshot']
	});


	plugin.insert('Snapshot.prototype.take', function () {

		// TODO: this should refer to tiles by artefact id, not by model id (somehow)

		/* remember 3D models that are visible */
		if (this.options.threeDModelsVisible) {
			this.object.threeDModelsVisible = {};
			this.circuitboard.traverseArtefactsByType('ThreeDModel', (model) => {
				if (model.visible) { this.object.threeDModelsVisible[model.id] = true }
			});
		}

		/* remember 3D models that are hidden */
		if (this.options.threeDModelsHidden) {
			this.object.threeDModelsHidden = {};
			this.circuitboard.traverseArtefactsByType('ThreeDModel', (model) => {
				if (model.hidden) { this.object.threeDModelsHidden[model.id] = true }
			});
		}

	}).insert('Snapshot.prototype.restore', function () {

		/* restore 3D models that are visible */
		if (this.options.threeDModelsVisible) {
			Object.keys(this.object.threeDModelsVisible).forEach((id) => {
				this.circuitboard.artefactById(id).then((model) => {
					model.visible = this.object.threeDModelsVisible[id];
				});
			});
		}

		/* restore 3D models that are hidden */
		if (this.options.threeDModelsHidden) {
			Object.keys(this.object.threeDModelsHidden).forEach((id) => {
				this.circuitboard.artefactById(id).then((model) => {
					model.hidden = this.object.threeDModelsHidden[id];
				});
			});
		}


	});


});
