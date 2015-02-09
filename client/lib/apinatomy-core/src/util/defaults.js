define(['jquery', './misc.js'], function ($, U) {
	'use strict';

	function deepTransform(val, fn) {
		if ($.isPlainObject(val) || $.isArray(val)) {
			$.each(val, (key, subVal) => {
				var returned = fn(subVal);
				if (U.isUndefined(returned)) {
					deepTransform(subVal, fn);
				} else {
					val[key] = returned;
				}
			});
		}
	}

	var REF_PATTERN = /`([\[\.].+?)`/g;

	return function defaults(spec, context) {

		deepTransform(spec, (val) => {
			if (typeof val === 'string') {
				var refs = (val.match(REF_PATTERN) || []).map((ref) => {
					var strippedRef = ref.substring(1,ref.length-1);
					return new Function('refs', `return refs${strippedRef}`);
				});
				var expr = val.replace(REF_PATTERN, "(refs$1)");
				var templateFn = (formalParams) => {
					var newFormalParams = formalParams.concat([`return ${expr}`]);
					return U.applyConstructor(Function, newFormalParams);
				};
				templateFn.refs = refs;
				return templateFn;
			}
		});


		//// recursive auxiliary function; returns true if a change to obj was made
		function withDefaultsAux(defSpec, obj, refs, params) {
			var change = false;
			Object.keys(defSpec).forEach((key) => {

				if (key in obj) {
					if ($.isPlainObject(defSpec[key]) && $.isPlainObject(obj[key])) {
						change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
					}
				} else if ($.isPlainObject(defSpec[key])) {
					obj[key] = {};
					change = withDefaultsAux(defSpec[key], obj[key], refs, params) || change;
				} else if ($.isFunction(defSpec[key])) {
					if (defSpec[key].refs.every((ref) => {
						return !U.isUndefined(ref(refs));
					})) { // if none of the references are undefined, assign this 'default'
						var allparams = $.extend({ refs: refs }, context, params);
						var formalParams = Object.keys(allparams);
						var actualParams = formalParams.map((fpar) => allparams[fpar]);
						var finalFn = defSpec[key](formalParams);
						obj[key] = finalFn.apply(null, actualParams);
					}
				}

			});
			return change;
		}


		return function withDefaults(obj, params) {
			var result = (U.isUndefined(obj) ? {} : $.extend(true, {}, obj));

			var change = true;
			while (change) {
				change = withDefaultsAux(spec, result, result, params || {});
			}

			return result;
		};
	};

});
