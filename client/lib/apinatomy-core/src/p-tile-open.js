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
		this.p('open').value(true).take(1).onValue(() => { this.populateInnerTilemap() }); // TODO: delay by opening-animation time

		/* manage the CSS class 'open' */
		this.p('open').onValue((o) => { this.element.toggleClass('open', o) });

		/* if this tile closes, all its children close */
		this.p('open').value(false).onValue(() => {
			this.closestDescendantsByType('Tile').forEach((tile) => { tile.open = false });
		});

	});
});
