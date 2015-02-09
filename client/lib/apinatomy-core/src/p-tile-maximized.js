define(['jquery', './p-tile-maximized.scss'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-maximized',
		requires: ['tile-hidden', 'tile-open']
	}).modify('Tile.prototype');


	/* allows a tile to be `maximized` (by hiding all other tiles) */
	plugin.insert('construct', function () {

		/* the 'maximized' observable */
		this.newProperty('maximized', { initial: false });

		/* enact 'maximized' on the DOM */
		this.on('maximized').onValue((maximized) => {
			var tilemap = this.closestAncestorByType('Tilemap');
			if (maximized) {
				this.element.addClass('maximized');
				tilemap.element.addClass('maximized');
				tilemap.children.forEach((sibling) => {
					sibling.hidden = (sibling !== this);
				});
			} else {
				this.element.removeClass('maximized');
				tilemap.element.removeClass('maximized');
				tilemap.children.forEach((sibling) => {
					sibling.hidden = false;
				});
			}
		});

		/* if/when the parent tile closes, de-maximize this tile */
		var parentTile = this.closestAncestorByType('Tile');
		if (parentTile) { parentTile.on('open').value(false).onValue(() => { this.maximized = false }) }

	});

});
