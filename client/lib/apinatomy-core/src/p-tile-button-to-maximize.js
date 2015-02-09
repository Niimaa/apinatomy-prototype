define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-button-to-maximize',
		requires: ['tile-buttons', 'tile-maximized']
	}).modify('Tile.prototype');


	plugin.insert('construct', function () {

		this.addButton({ name: 'maximize', icon: require('url!./util/icons/resize-max-white.png') })
			.onValue(() => {
				this.maximized = !this.maximized;
			});

	});


});
