define(['bluebird', 'delta-js' ], function (P, DM) {
	'use strict';


	/* already cached? */
	if (window.__apinatomy_core_delta_model) { return window.__apinatomy_core_delta_model }


	/* tell delta.js about bluebird */
	DM.registerPromiseResolver(P.resolve);


	/* set the cache */
	window.__apinatomy_core_delta_model = new DM();


	/* return the delta model that manages all plugins (= deltas) */
	return window.__apinatomy_core_delta_model;


});
