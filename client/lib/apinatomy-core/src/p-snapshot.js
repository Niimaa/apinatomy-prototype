define(['jquery', './util/misc.js', './Snapshot.js'], function ($, U, SnapshotP) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('snapshot', {
		requires: ['core']
	});


	plugin.append('Circuitboard.prototype.construct', function () {

		var Snapshot = SnapshotP.value();

		var circuitboard = this;
		this.Snapshot = U.newSubclass(Snapshot, (superFn) => function (options) {

			superFn.call(this, U.extend({}, options, {
				parent: circuitboard
			}));

		});

	});


});
