define(['jquery', './util/misc.js'], function ($, U) {
	'use strict';

	var plugin = $.circuitboard.plugin.do('tile-active', {
		requires: ['core']
	}).modify('Tile.prototype');

	/*  For all tiles that share the same model, only one can be 'active'.  */
	/*  If one of them is visible, one of them is active.                   */
	plugin.append('construct', function () {

		/* only interesting if the tile has a model */
		if (!this.model) { return }

		/* the 'active' property */
		this.newProperty('active', { initial: false });

		/* convenience function for activating the first tile in the model queue and deactivating the second */
		var _activateProperTile = () => {
			var tiles = this.model._p_amyActiveTileQueue;
			if (tiles[1]) { tiles[1].active = false }
			if (tiles[0]) { tiles[0].active = true }
		};

		/* put this tile in the queue of potentially active tiles */
		U.array(this.model, '_p_amyActiveTileQueue').push(this);
		_activateProperTile();
		this.on('destroy').take(1).onValue(() => {
			var index = this.model._p_amyActiveTileQueue.indexOf(this);
			this.model._p_amyActiveTileQueue.splice(index, 1);
			_activateProperTile();
		});

		/* make setting the 'active' property affect the tile queue on the model */
		this.p('active').value(true).onValue(() => {
			var index = this.model._p_amyActiveTileQueue.indexOf(this);
			if (index !== 0) {
				this.model._p_amyActiveTileQueue.splice(index, 1);
				this.model._p_amyActiveTileQueue.unshift(this);
				_activateProperTile();
			}
		});

		/* automatically (un)set the CSS class 'active' */
		this.on('active').onValue((a) => { this.element.toggleClass('active', a) });

	});
});
