define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-spacing', {
		requires: ['core']
	}).modify('Tilemap.prototype');


	/* reset the tile-spacing in the DOM */
	plugin.update('refreshTiles', (old) => function () {
		return old.call(this).then(() => {
			this.element.css('margin', this.circuitboard.options.tilemapMargin);
			this.element.children().css('margin-bottom', this.circuitboard.options.tileSpacing);
			this.element.children().children().css('margin-right', this.circuitboard.options.tileSpacing);
		});
	});


});
