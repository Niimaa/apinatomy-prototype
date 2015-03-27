/* a model prototype */
var modelPrototype = {
	get id() { return this.name },
	getChildIds: function()  { return this.children || [] },
	getModels: function(ids) { return getModelsByIds(ids) }
};
function styling(color) { // for some css customizations
	return { normal: { css: { '&': {
		backgroundColor: color,
		borderColor: 'red',
		borderWidth: '5px'
	} } } };
}
var MODELS = {
	root: { name: 'root', children: ['A', 'B', 'C', 'D', 'E'] },
	A:    { name: 'A', children: ['A1', 'A2', 'A3'], tile: styling('lightblue')  }, // example of custom tile styling
	B:    { name: 'B', children: ['B1', 'B2', 'B3'], tile: styling('lightgreen') }, //
	C:    { name: 'C', children: ['C1', 'C2', 'C3'] },
	D:    { name: 'D', children: ['D1', 'D2', 'D3'] },
	E:    { name: 'E', children: ['E1', 'E2', 'E3'] },
	A1:   { name: 'A1', tile: styling('orange') },
	A2:   { name: 'A2' },
	A3:   { name: 'A3' },
	B1:   { name: 'B1' },
	B2:   { name: 'B2' },
	B3:   { name: 'B3' },
	C1:   { name: 'C1' },
	C2:   { name: 'C2' },
	C3:   { name: 'C3' },
	D1:   { name: 'D1' },
	D2:   { name: 'D2' },
	D3:   { name: 'D3' },
	E1:   { name: 'E1' },
	E2:   { name: 'E2' },
	E3:   { name: 'E3' }
};
function getModelsByIds(ids) {
	var result = [];
	ids.forEach(function (id) {
		var model = Object.create(modelPrototype);
		Object.keys(MODELS[id]).forEach(function (key) {
			model[key] = MODELS[id][key];
		});
		result.push(P.resolve(model)); // must be wrapped in a promise (for now)
	});
	return result;
}


/* select plugins to activate them (note that these must already be *loaded* at this point) */
$.circuitboard.plugin.select(
	'tile-skin',
	'tile-click-to-open',
	'tile-grow-when-open',
	'tile-middleclick-to-maximize',
	'tile-spacing',
	'tile-active',
	'three-d-manual-controls',
	'three-d-geometric-models-obj',
	'tile-button-to-hide',
	'tile-button-to-maximize',
	'tile-button-to-swap-three-d-model',
	'tile-button-to-point-camera'
);


/* use the $.fn.circuitboard method to instantiate the circuit-board */
$(document).ready(function () {

	$('#circuitboard').circuitboard({
		model:               getModelsByIds(['root'])[0],
		tileSpacing:         2,
		tilemapMargin:       1,
		weightWhenOpen:      8,
		dragThreshold:       5,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {
			'B': {
				'stomach': { file: './3d-models/FMA7148_Stomach.obj' }
			}
		}
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

	});

});
