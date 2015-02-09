define([
	'jquery',
	'./p-tile-grow-when-open.scss'
], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-grow-when-open',
		requires: ['tile-open', 'tile-weight']
	}).modify('Tile.prototype');

	/* default weights for open / closed tiles */
	plugin.add('weightWhenOpen', function () { return this.circuitboard.options.weightWhenOpen || 2 });
	plugin.add('weightWhenClosed', () => 1);

	/* react to a tile opening or closing by changing its weight accordingly */
	plugin.insert('construct', function () {

		this.on('open').onValue((open) => {
			if (open) {
				this.weight = this.weightWhenOpen();
			} else if (this.weight !== 0) {
				this.weight = this.weightWhenClosed();
			}
		});

	});
});
