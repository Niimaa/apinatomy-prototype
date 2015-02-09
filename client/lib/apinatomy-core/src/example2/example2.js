/* styling */
require('./example2.scss');

/* libraries */
var $ = require('expose?jQuery!jquery');
var P = require('bluebird');

/* load the circuitboard and plugins */
var circuitboard = require('../circuitboard.js');
require('../p-core.js');
require('../p-tile-skin.js');
require('../p-tile-spacing.js');
require('../p-tile-click-to-open.js');
require('../p-tile-weight.js');
require('../p-tile-active.js');
require('../p-tile-open.js');
require('../p-tile-grow-when-open.js');
require('../p-tile-open-active.js');
require('../p-tile-skin-grow-when-open.js');
require('../p-position-tracking.js');
require('../p-transition-position-tracking.js');
//require('../p-tile-hidden.js');
//require('../p-tile-maximized.js');
//require('../p-tile-middleclick-to-maximize.js');
//require('../p-d3.js');
//require('../p-ppi.js');
//require('../p-three-d.js');
//require('../p-three-d-geometric-models.js');
//require('../p-three-d-geometric-models-stl.js');
//require('../p-three-d-geometric-models-obj.js');
//require('../p-three-d-geometric-models-json.js');
//require('../p-d3-three-d.js');
//require('../p-three-d-manual-controls.js');
//require('../p-three-d-auto-controls.js');
//require('../p-snapshot.js');
//require('../p-three-d-camera-snapshot.js');
//require('../p-tile-open-snapshot.js');
//require('../p-tile-buttons.js');
//require('../p-tile-button-to-hide.js');
//require('../p-tile-visible-snapshot.js');
//require('../p-tile-maximized-snapshot.js');
//require('../p-three-d-model-snapshot.js');
//require('../p-tile-button-to-maximize.js');
//require('../p-tile-button-to-swap-three-d-model.js');
//require('../p-tile-button-to-point-camera.js');


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin([
	'tile-skin',
	'tile-click-to-open',
	'tile-grow-when-open',
	'tile-spacing',
	'tile-active'
]);


/* a model prototype */
var modelPrototype = {
	get id() { return this.name },
	getChildIds() { return this.children || [] },
	getModels(ids) { return getModelsByIds(ids) }
};
function bgColor(color) { // for some css customizations
	return { normal: { css: { '&': { backgroundColor: color, borderColor: 'black' } } } };
}
var models = {
	root: { name: 'root', children: ['A', 'B', 'C', 'D', 'E'] },
	A:  { name: 'A', children: ['A1', 'A2', 'A3'], tile: bgColor('lightblue') },  // example of custom tile styling
	B:  { name: 'B', children: ['B1', 'B2', 'B3'], tile: bgColor('lightgreen') }, //
	C:  { name: 'C', children: ['C1', 'C2', 'C3'] },
	D:  { name: 'D', children: ['D1', 'D2', 'D3'] },
	E:  { name: 'E', children: ['E1', 'E2', 'E3'] },
	A1: { name: 'A1', tile: bgColor('orange') },
	A2: { name: 'A2' },
	A3: { name: 'A3' },
	B1: { name: 'B1' },
	B2: { name: 'B2' },
	B3: { name: 'B3' },
	C1: { name: 'C1' },
	C2: { name: 'C2' },
	C3: { name: 'C3' },
	D1: { name: 'D1' },
	D2: { name: 'D2' },
	D3: { name: 'D3' },
	E1: { name: 'E1' },
	E2: { name: 'E2' },
	E3: { name: 'E3' }
};
function getModelsByIds(ids) {
	var result = [];
	ids.forEach(function (id) {
		var model = Object.create(modelPrototype);
		Object.keys(models[id]).forEach(function (key) {
			model[key] = models[id][key];
		});
		result.push(P.resolve(model)); // must be wrapped in a promise (for now)
	});
	return result;
}


/* use the $.fn.circuitboard method to instantiate the circuit-board */
$(document).ready(function () {

	$('#circuitboard').circuitboard({
		model: getModelsByIds(['root'])[0],
		tileSpacing: 4,
		tilemapMargin: 4
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

	});

});

