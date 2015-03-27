define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-button-to-hide', {
		requires: ['tile-buttons', 'tile-shrink-when-hidden', 'tile-grow-when-maximized']
	}).modify('Tile.prototype');


	plugin.append('construct', function () {

		this.addButton({ name: 'hide', icon: require('url!./util/icons/resize-min-white.png') }).onValue(() => {
			this.maximized = false;
			this.p('fullyNotMaximized').value(true).onValue(() => {
				this.hidden = !this.hidden;
			});
		});

	});


});
