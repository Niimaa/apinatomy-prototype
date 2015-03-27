define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-open-snapshot', {
		resolves: ['tile-open', 'snapshot']
	});


	plugin.append('Snapshot.prototype.take', function () {

		// TODO: this should refer to tiles by artefact id, not by model id (somehow)

		/* remember tiles that are open */
		if (this.options.tilesOpen) {
			this.object.tilesOpen = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (tile.open) {
					this.object.tilesOpen[tile.model.id] = true;
				}
			});
		}

		/* remember tiles that are closed */
		if (this.options.tilesClosed) {
			this.object.tilesClosed = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (!tile.open) {
					this.object.tilesClosed[tile.model.id] = true;
				}
			});
		}

	}).append('Snapshot.prototype.restore', function () {

		/* restore tiles that are open */
		if (this.options.tilesOpen) {
			Object.keys(this.object.tilesOpen).filter((id) => this.object.tilesOpen[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.open = true;
				});
			});
		}

		/* restore tiles that are closed */
		if (this.options.tilesClosed) {
			Object.keys(this.object.tilesClosed).filter((id) => this.object.tilesClosed[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.open = false;
				});
			});
		}

	});


});
