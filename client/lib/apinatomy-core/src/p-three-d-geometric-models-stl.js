define([
	'jquery',
	'three-js',
	'./util/STLLoader.js'
], function ($, THREE) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin({
		name: 'three-d-geometric-models-stl',
		requires: ['three-d-geometric-models']
	});


	/* the loader */
	plugin.add('Circuitboard.threeJsLoaders.stl', THREE.STLLoader);


});
