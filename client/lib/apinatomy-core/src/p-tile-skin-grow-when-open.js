define(['jquery', './util/bacon-and-eggs.js', './p-tile-skin-grow-when-open.scss'], function ($, Bacon) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-skin-grow-when-open',
		resolves: ['tile-skin', 'tile-grow-when-open']
	}).modify('Tile.prototype');


	/*  react to a tile opening or closing by      */
	/*  timely showing/hiding the content section  */
	/*  to ensure smooth transition animation      */
	plugin.insert('construct', function () {
		var sectionElement = this.element.children('section');
		this.on('open').onValue((open) => {
			if (open) {
				setTimeout(() => {
					sectionElement.css('opacity', 0);
					this.element.asEventStream('transitionend webkitTransitionEnd').merge(Bacon.later(300)).take(1).onValue(() => {
						sectionElement.css('visibility', 'visible');
						sectionElement.css('opacity', 1);
					});
				});
			} else {
				sectionElement.css('visibility', 'hidden');
				sectionElement.css('opacity', 0);
			}
		});
	});


});
