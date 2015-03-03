define([
	'jquery',
	'bluebird',
	'./misc.js',
	'./kefir-signal-handler.js',
	'./defer.js',
	'./main-delta-model.js'
], function ($, P, U, SignalHandler, defer, dm) {
	'use strict';


	if (!window._amyPlugin) {
		window._amyPlugin = function (pluginOrSelection) {
			if ($.isPlainObject(pluginOrSelection)) {

				/* the function is used to register a new plugin */
				return new dm.Delta(pluginOrSelection.name, pluginOrSelection);

			} else {

				U.assert(!_selectedDeferred.done,
						`ApiNATOMY plugins can only be selected once, after which they are fixed.`);
				_selectedDeferred.done = true;

				/* the function is used to select plugins to be applied */
				dm.select.apply(dm, pluginOrSelection);
				_selectedDeferred.resolve(this);

				return window._amyPlugin.selected;

			}
		};
		var _selectedDeferred = defer();
		window._amyPlugin.selected = _selectedDeferred.promise;
		window._amyPlugin.graph = () => dm.graph();
		window._amyPlugin.dm = dm;
	}


	return window._amyPlugin;


});
