define(['jquery', './util/codes.js', './util/kefir-and-eggs.js'], function ($, {button}) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-click-to-open',
		requires: ['tile-open']
	}).modify('Tile.prototype');


	/* When a tile is clicked, it is opened/closed. */
	plugin.insert('construct', function () {

		this.on('click').which(button.LEFT)
				.skipPropagation('tile-left-click')  // only register this event for the inner-most tile
				.onValue(() => { this.open = !this.open });

	});


});
