/* select plugins to activate them  (note that these must already be *loaded* at this point) */
$.circuitboard.plugin([
	'tile-skin',
	'tile-click-to-open',
	'tile-grow-when-open',
	'tile-middleclick-to-maximize',
	'tile-spacing',
	'tile-active',
	'three-d',
	'three-d-manual-controls',
	'three-d-auto-controls',
	'three-d-geometric-models',
	'three-d-geometric-models-obj',
	'three-d-geometric-models-json',
	'snapshot',
	'tile-buttons',
	'tile-button-to-hide',
	'tile-button-to-maximize',
	'tile-button-to-swap-three-d-model',
	'tile-button-to-point-camera'
]);


/* use the $.fn.circuitboard method to instantiate the circuit-board */
$(document).ready(function () {

	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1,
		tilemapMargin: 0,
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {

			'fma:7148': {
				'stomach': { file: './3d-models/FMA7148_Stomach.obj' }
			}

		}
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

	});

});

