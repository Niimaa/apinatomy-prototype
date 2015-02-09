define(['jquery', '../util/misc.js'], function ($, U) {
	'use strict';

	// based on http://jsfiddle.net/justin_c_rounds/Gd2S2/light/

	$.extend(U, {
		intersects(l1, l2) {

			// if the lines intersect, the result contains the x and y
			// of the intersection (treating the lines as infinite) and
			// booleans for whether line segment 1 or line segment 2
			// contain the point
			var result = {
				x:    null,
				y:    null,
				onL1: false,
				onL2: false
			};

			var denominator = ((l2.y2 - l2.y1) * (l1.x2 - l1.x1)) -
			                  ((l2.x2 - l2.x1) * (l1.y2 - l1.y1));

			if (denominator === 0) { return result; }

			var a = l1.y1 - l2.y1;
			var b = l1.x1 - l2.x1;
			var numerator1 = ((l2.x2 - l2.x1) * a) - ((l2.y2 - l2.y1) * b);
			var numerator2 = ((l1.x2 - l1.x1) * a) - ((l1.y2 - l1.y1) * b);
			a = numerator1 / denominator;
			b = numerator2 / denominator;

			// if we cast these lines infinitely in both directions, they intersect here:
			result.x = l1.x1 + (a * (l1.x2 - l1.x1));
			result.y = l1.y1 + (a * (l1.y2 - l1.y1));

			// it is worth noting that this should be the same as:
			// x = line2StartX + (b * (line2EndX - line2StartX));
			// y = line2StartX + (b * (line2EndY - line2StartY));

			// if line1 is a segment and line2 is infinite, they intersect if:
			if (a > 0 && a < 1) {
				result.onL1 = true;
			}

			// if line2 is a segment and line1 is infinite, they intersect if:
			if (b > 0 && b < 1) {
				result.onL2 = true;
			}

			// if line1 and line2 are segments, they intersect if both of the above are true
			return result;

		}
	}, {chain: false});

});
