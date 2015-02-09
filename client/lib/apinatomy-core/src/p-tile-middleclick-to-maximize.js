define(['jquery', './util/codes.js', './util/bacon-and-eggs.js'], function ($, {button}) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-middleclick-to-maximize',
		requires: ['tile-maximized']
	}).modify('Tile.prototype');


	/* When a tile is middle-clicked, it is maximized/un-maximized. */
	plugin.insert('construct', function () {

		this.on('click').which(button.MIDDLE)
				.skipPropagation('tile-middle-click')  // only register this event for the inner-most tile
				.onValue(() => { this.maximized = !this.maximized });

	});


});
