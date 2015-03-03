define(['jquery', './p-tile-hidden.scss'], function ($) {
	'use strict';

	var plugin = $.circuitboard.plugin({
		name: 'tile-hidden',
		requires: ['tile-open']
	}).modify('Tile.prototype');

	/* allows a tile to be `hidden` */
	plugin.insert('construct', function () {

		/* the 'visible' and 'hidden' properties */
		this.newProperty('visible', { initial: true });
		this.newProperty('hidden').plug(this.p('visible').not());
		this.p('visible').plug(this.p('hidden').not());

		/* enact tile hiding on the DOM */
		this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue((hidden) => {
			this.element.toggleClass('hidden', hidden);
		});

	});
});
