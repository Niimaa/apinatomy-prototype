define([
	'jquery',
	'bluebird',
	'./util/newWidgetType.js',
	'./util/main-deltajs.js'
], function ($, P, newWidgetType, deltaJs) {
	'use strict';


	/* create $.circuitboard object if it doesn't exist */
	$.circuitboard = { plugin: deltaJs };


	/* create the classes directly circuitboard related */
	var CircuitboardP = newWidgetType('Circuitboard', {
		cssClass: "circuitboard",
		filter: () => P.resolve(true) // don't hide any entities
	});
	var TilemapP = newWidgetType('Tilemap', {
		cssClass: "tilemap"
	});
	var TileP = newWidgetType('Tile', {
		cssClass: "tile"
	});


	/* put those classes on the $.circuitboard object */
	CircuitboardP.then((c) => { $.circuitboard.Circuitboard = c });
	TilemapP.then((c) => { $.circuitboard.Tilemap = c });
	TileP.then((c) => { $.circuitboard.Tile = c });


	/*  return the static `$.circuitboard` object,         */
	/*  through which plugins can be applied and selected  */
	return $.circuitboard;


});
