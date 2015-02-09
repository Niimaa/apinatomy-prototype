define([
	'jquery',
	'./Artefact.js',
	'./util/misc.js'
], function ($, ArtefactP, U) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_Snapshot)) { return window._amy_Snapshot }


		window._amy_Snapshot = Artefact.newSubclass('Snapshot', function Snapshot(/*options*/) {

			this.object = {};

		}, /** @lends Snapshot.prototype */ {

			set(key, value) {
				U.assert(U.isUndefined(this.object[key]),
						`The key '${key}' already has a value in this snapshot.`);
				this.object[key] = value;
			},

			get(key) { return this.object[key] },

			serialize() { return JSON.stringify(this.object) },

			deserialize(str) { this.object = JSON.parse(str) },

			/** to be extended by deltas */
			take() {},

			/** to be extended by deltas */
			restore() {}

		});


		return window._amy_Snapshot;


	}).tap((c) => { $.circuitboard.Snapshot = c });


});
