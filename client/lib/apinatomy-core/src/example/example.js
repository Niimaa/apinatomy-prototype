/* styling */
require('./example.scss');

/* libraries */
var $ = require('expose?jQuery!jquery');

/* load the circuitboard, model loader and plugins */
var circuitboard = require('../circuitboard.js');
var getFmaModels = require('../fma-model.js');
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
require('../p-tile-hidden.js');
require('../p-tile-maximized.js');
require('../p-tile-middleclick-to-maximize.js');
require('../p-d3.js');
require('../p-ppi.js');
require('../p-three-d.js');
require('../p-three-d-geometric-models.js');
require('../p-three-d-geometric-models-stl.js');
require('../p-three-d-geometric-models-obj.js');
require('../p-three-d-geometric-models-json.js');
require('../p-d3-three-d.js');
require('../p-three-d-manual-controls.js');
require('../p-three-d-auto-controls.js');
require('../p-snapshot.js');
require('../p-three-d-camera-snapshot.js');
require('../p-tile-open-snapshot.js');
require('../p-tile-buttons.js');
require('../p-tile-button-to-hide.js');
require('../p-tile-visible-snapshot.js');
require('../p-tile-maximized-snapshot.js');
require('../p-three-d-model-snapshot.js');
require('../p-tile-button-to-maximize.js');
require('../p-tile-button-to-swap-three-d-model.js');
require('../p-tile-button-to-point-camera.js');


/* select plugins to activate them  (note that these must already be *loaded* at this point) */
circuitboard.plugin([
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
	'tile-button-to-point-camera',
	//'ppi',
]);


/* use the $.fn.circuitboard method to instantiate the circuit-board */
$(document).ready(() => {

	$('#circuitboard').circuitboard({
		model: getFmaModels(['24tile:60000000'])[0],
		tileSpacing: 1,
		tilemapMargin: 0,
		weightWhenOpen: 8,
		threeDCanvasElement: $('#three-d-canvas'),
		threeDModels: {

			'fma:7148': {
				'stomach': { file: require('./3d-models/FMA7148_Stomach.obj') }
			},

			//'fma:7187': {
			//	'walking-legs': {
			//		parts: {
			//			'left_femur_1':    { file: require('./3d-models/walking-legs/left_femur_1.json') },
			//			'left_fibula_1':   { file: require('./3d-models/walking-legs/left_fibula_1.json') },
			//			'left_foot_1':     { file: require('./3d-models/walking-legs/left_foot_1.json') },
			//			'left_hip_1':      { file: require('./3d-models/walking-legs/left_hip_1.json') },
			//			'left_patella_1':  { file: require('./3d-models/walking-legs/left_patella_1.json') },
			//			'left_tibia_1':    { file: require('./3d-models/walking-legs/left_tibia_1.json') },
			//			'muscles_1':       { file: require('./3d-models/walking-legs/muscles_1.json'), color: 0x7F1F1A },
			//			'right_femur_1':   { file: require('./3d-models/walking-legs/right_femur_1.json') },
			//			'right_fibula_1':  { file: require('./3d-models/walking-legs/right_fibula_1.json') },
			//			'right_foot_1':    { file: require('./3d-models/walking-legs/right_foot_1.json') },
			//			'right_hip_1':     { file: require('./3d-models/walking-legs/right_hip_1.json') },
			//			'right_patella_1': { file: require('./3d-models/walking-legs/right_patella_1.json') },
			//			'right_tibia_1':   { file: require('./3d-models/walking-legs/right_tibia_1.json') }
			//		},
			//		color: 0xE6E6B3,
			//		animation: { duration: 1500 },
			//		elevation: 0
			//	}
			//},

		}
	}).circuitboard('instance').then(function (circuitboard) {

		console.info('circuitboard loaded');

		/* set up global functions to test with from the JavaScript console */
		window.newSnapshot = (options) => {
			return new circuitboard.Snapshot(options);
		};

	});

});

