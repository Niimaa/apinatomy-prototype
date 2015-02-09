define([
	'jquery',
	'./util/misc.js',
	'./util/bacon-and-eggs.js',
	'./Artefact.js',
	'./D3Edge.scss'
], function ($, U, Bacon, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Edge)) { return window._amy_D3Edge }


		window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge({source, target}) {

			/* store references to the two vertices */
			this._source = source;
			this._target = target;

			/* when one of the vertices is destroyed, so is this edge */
			Bacon.mergeAll([
				source.on('destroy'),
				target.on('destroy')
			]).take(1).assign(this, 'destroy');

		}, {

			get source() { return this._source },

			get target() { return this._target },

			get element() {
				if (!this._element) {
					// adding and discarding an 'svg' element prevents a bug where the line would not appear
					this._element = $(`<svg><line class="edge ${this.options.cssClass}"></line></svg>`).children();
				}
				return this._element;
			},

			get graphZIndex() { return this.options.graphZIndex }

		}, {
			graphZIndex: 100,
			cssClass: ''
		});


		return window._amy_D3Edge;


	}).tap((c) => { $.circuitboard.D3Edge = c });


});
