define([
	'jquery',
	'./util/misc.js',
	'./Artefact.js',
	'./D3Vertex.scss'
], function ($, U, ArtefactP) {
	'use strict';


	return ArtefactP.then((Artefact) => {


		/* however (often) this is loaded, create the class only once */
		if (U.isDefined(window._amy_D3Vertex)) { return window._amy_D3Vertex }


		window._amy_D3Vertex = Artefact.newSubclass('D3Vertex', function D3Vertex({visible}) {

			/* the coordinate properties */
			this.newProperty('x', { initial: 10 });
			this.newProperty('y', { initial: 10 });

			/* the 'visible' and 'hidden' properties */
			this.newProperty('visible', { initial: visible });
			this.newProperty('hidden').plug(this.p('visible').not());
			this.p('visible').plug(this.p('hidden').not());

			/* enact vertex hiding on the DOM */
			this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue((h) => {
				this.element.toggleClass('hidden',   h)
				            .toggleClass('visible', !h);
			});

		}, {

			get element() {
				if (!this._element) {
					this._element = $(`
						<svg x="${this.x}" y="${this.y}" class="vertex ${this.options.cssClass}">
							<circle class="core" r="${this.options.radius}"></circle>
						</svg>
					`);
				}
				return this._element;
			},

			get graphZIndex() { return this.options.graphZIndex }

		}, {
			graphZIndex: 200,
			cssClass: '',
			radius: 5,
			visible: true
		});


		return window._amy_D3Vertex;


	}).tap((c) => { $.circuitboard.D3Vertex = c });


});
