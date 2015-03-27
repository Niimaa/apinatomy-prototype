define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-visible-snapshot', {
		resolves: ['tile-hidden', 'snapshot']
	});


	plugin.append('Snapshot.prototype.take', function () {

		// TODO: this should refer to tiles by artefact id, not by model id (somehow)

		/* remember tiles that are visible */
		if (this.options.tilesVisible) {
			this.object.tilesVisible = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (tile.visible) {
					this.object.tilesVisible[tile.model.id] = true;
				}
			});
		}

		/* remember tiles that are hidden */
		if (this.options.tilesHidden) {
			this.object.tilesHidden = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (!tile.visible) {
					this.object.tilesHidden[tile.model.id] = true;
				}
			});
		}

	}).append('Snapshot.prototype.restore', function () {

		/* restore tiles that are visible */
		if (this.options.tilesVisible) {
			Object.keys(this.object.tilesVisible).filter((id) => this.object.tilesVisible[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.visible = true;
				});
			});
		}

		/* restore tiles that are hidden */
		if (this.options.tilesHidden) {
			Object.keys(this.object.tilesHidden).filter((id) => this.object.tilesHidden[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.visible = false;
				});
			});
		}

	});


});
