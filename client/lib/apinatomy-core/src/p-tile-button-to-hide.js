define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-button-to-hide',
		requires: ['tile-buttons', 'tile-hidden']
	}).modify('Tile.prototype');


	plugin.insert('construct', function () {

		this.addButton({ name: 'hide', icon: require('url!./util/icons/resize-min-white.png') })
			.onValue(() => {
				this.hidden = !this.hidden;
			});

	});


});
