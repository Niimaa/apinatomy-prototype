/* styling */
require('./plugin-explorer.scss');

/* libraries */
var $ = require('expose?jQuery!jquery');
var JsGraph = require('js-graph');

/* load the circuitboard, model loader and plugins */
var circuitboard = require('../circuitboard.js');
var createDiagram = require('./delta-diagram.js');
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


/* the application itself */
$(document).ready(() => {

	createDiagram(
		$('body > svg'),
		$.circuitboard.plugin.graph()
	);

});
