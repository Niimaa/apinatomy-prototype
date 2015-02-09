define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-open',
		requires: ['core']
	}).modify('Tile.prototype');


	/* allow a tile to be `open` (or closed) */
	plugin.insert('construct', function () {

		/* the 'open' observable */
		this.newProperty('open', { initial: false });

		/* when the tile opens, populate the inner tilemap */
		this.on('open').value(true).take(1).assign(this, 'populateInnerTilemap');

		/* manage the CSS class 'open' */
		this.on('open').assign(this.element, 'toggleClass', 'open');

		/* if this tile closes, all its children close */
		this.on('open').value(false).onValue(() => {
			this.closestDescendantsByType('tile')
						.forEach((tile) => { tile.open = false });
		});

	});
});
