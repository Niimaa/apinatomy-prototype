define(['jquery', './p-tile-maximized.scss'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-maximized', {
	}).modify('Tile.prototype');


	/* allows a tile to be 'maximized' (by hiding all other tiles) */
	plugin.append('construct', function () {

		/* the 'maximized' observable */
		this.newProperty('maximized', { initial: false });

	});


});
