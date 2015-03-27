define(['jquery', 'bluebird', './p-tile-skin-grow-when-open.scss'], function ($, P) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('tile-skin-grow-when-open', {
		resolves: ['tile-skin', 'tile-grow-when-open']
	}).modify('Tile.prototype');


	///*  react to a tile opening or closing by      */
	///*  timely showing/hiding the content section  */
	///*  to ensure smooth transition animation      */
	//plugin.append('construct', function () {
	//	var sectionElement = this.element.children('section');
	//	this.p('open').value(true).onValue(() => {
	//		sectionElement.css('opacity', 0);
	//	});
	//	this.p('fullyOpen').onValue((open) => {
	//		if (open) {
	//			sectionElement.css('visibility', 'visible');
	//			sectionElement.css('opacity', 1);
	//		} else {
	//			sectionElement.css('visibility', 'hidden');
	//			sectionElement.css('opacity', 0);
	//		}
	//	});
	//});


	plugin.append('construct', function () {
		var flexGrowFrom = 1;
		var rowFlexGrowFrom = this.element.parent().children().length;
		this.element.velocity(
			{ flexGrow: [flexGrowFrom, flexGrowFrom] },
			{ duration: 1 }
		);
		this.element.parent().velocity(
			{ flexGrow: [rowFlexGrowFrom, rowFlexGrowFrom] },
			{ duration: 1 }
		);
	});


	plugin.replace('growWhenOpen', function (open) {
		var openCloseTransition = () => {
			var flexGrowFrom = parseFloat(this.element.data('amyFlexGrowTarget') || 1);
			var flexGrowTo = open ? this.weightWhenOpen() : this.weightWhenClosed();
			this.element.data('amyFlexGrowTarget', flexGrowTo);
			var rowFlexGrowTo = 0;
			this.element.parent().children().each(function () {
				rowFlexGrowTo += parseFloat($(this).data('amyFlexGrowTarget') || 1);
			});
			var rowFlexGrowFrom = rowFlexGrowTo - flexGrowTo + flexGrowFrom;
			return P.all([
				new P((resolve) => {
					this.element.velocity(
						{ flexGrow: [flexGrowTo, flexGrowFrom] },
						{ complete: resolve, duration: 300 }
					);
				}), new P((resolve) => {
					this.element.parent().velocity(
						{ flexGrow: [rowFlexGrowTo, rowFlexGrowFrom] },
						{ complete: resolve, duration: 300 }
					);
				})
			]);
		};
		// TODO: get the above with delta 'replace' operation that provides previous implementation

		var sectionElement = this.element.children('section');
		if (open) {
			sectionElement.css({ visibility: 'hidden', opacity: 0 });
			return openCloseTransition().then(() => {
				return new P((resolve) => {
					sectionElement.css('visibility', 'visible');
					sectionElement.velocity(
						{ opacity:  [1, 0]  },
						{ complete: resolve, duration: 200 }
					);
				});
			});
		} else {
			sectionElement.css('visibility', 'visible');
			return openCloseTransition().then(() => {
				sectionElement.css('visibility', 'hidden');
			});
		}
	});


});
