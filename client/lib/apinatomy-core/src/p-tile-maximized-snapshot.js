define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-maximized-snapshot',
		resolves: ['tile-maximized', 'snapshot']
	});


	plugin.insert('Snapshot.prototype.take', function () {

		// TODO: this should refer to tiles by artefact id, not by model id (somehow)

		/* remember tiles that are maximized */
		if (this.options.tilesMaximized) {
			this.object.tilesMaximized = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (tile.maximized) {
					this.object.tilesMaximized[tile.model.id] = true;
				}
			});
		}

		/* remember tiles that are not maximized */
		if (this.options.tilesNotMaximized) {
			this.object.tilesNotMaximized = {};
			this.circuitboard.traverseArtefactsByType('Tile', (tile) => {
				if (!tile.maximized) {
					this.object.tilesNotMaximized[tile.model.id] = true;
				}
			});
		}

	}).insert('Snapshot.prototype.restore', function () {

		/* restore tiles that are maximized */
		if (this.options.tilesMaximized) {
			Object.keys(this.object.tilesMaximized).filter((id) => this.object.tilesMaximized[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.maximized = true;
				});
			});
		}

		/* restore tiles that are not maximized */
		if (this.options.tilesNotMaximized) {
			Object.keys(this.object.tilesNotMaximized).filter((id) => this.object.tilesNotMaximized[id]).forEach((id) => {
				this.circuitboard.tile(id).then((tile) => {
					tile.maximized = false;
				});
			});
		}

	});


});
