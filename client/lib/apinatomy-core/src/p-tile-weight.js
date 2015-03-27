define(['jquery'], function ($) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-weight', {
		requires: ['core']
	}).modify('Tile.prototype');


	/*  gives tiles a `weight` which reflects the screen area they take up  */
	/*  in relation to other tiles in the same tilemap                      */
	plugin.append('construct', function () {

		// TODO: this is now done in 'tile-grow-when-' deltas

		///* the 'weight' observable */
		//this.newProperty('weight', { initial: 1 });

		///* enact 'weight' on the DOM */
		//this.p('weight').onValue((w) => { this.element.amyNestedFlexGrow(w) });

	});

});
