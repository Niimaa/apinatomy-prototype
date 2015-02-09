define(['jquery'], function ($) {
	'use strict';

	//
	// takes an object mapping 'selector' → 'property' → 'value' and
	// applies it as a set of CSS rules to the descendants of the current element
	//
	$.fn.extend({
		amyPutCssRules: function (rules) {
			$.each(rules, (selector, css) => {
				var context;
				if (selector.trim() === '&') {
					context = this;
				} else if (selector.trim().charAt(0) === '&') {
					context = this.find(selector.trim().substr(1).trim());
				} else {
					context = this.find(selector);
				}
				context.css(css);
			});
		}
	});
});
