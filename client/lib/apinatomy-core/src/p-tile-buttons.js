define([
	'jquery',
	'./util/misc.js',
	'./util/bacon-and-eggs.js',
	'./util/codes.js',
	'./p-tile-buttons.scss'
], function ($, U, Bacon, {button}) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'tile-buttons',
		requires: ['core']
	});


	plugin.add('Tile.prototype.addButton', function ({name, icon}) {

		/* if it's not there yet, create a <div> that holds all the buttons */
		if (!this._buttonHolder) {
			U.makePositioned(this.element);
			this._buttonHolder = $(`
			    <div class="tile-button-holder"></div>
			`).appendTo(this.element);
		}

		/* create the button itself */
		var buttonElement = $(`
			<div class="tile-button ${name}"
			     style="background-image: url(${icon})">
			</div>
		`).appendTo(this._buttonHolder);

		/* create the button-click-event */
		this.newEvent(`tile-button:${name}`, {
			source: buttonElement
				.mouseClick({ threshold: this.circuitboard.options.dragTheshold })
				.which(button.LEFT)
				.skipPropagation('tile-left-click') // only register this event for the inner-most element
		});

		/* return the event-stream for convenient chaining-notation */
		return this.event(`tile-button:${name}`);

	});


});
