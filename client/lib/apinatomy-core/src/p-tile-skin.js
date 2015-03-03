define([
	'jquery',
	'chroma-js',
	'./util/misc.js',
	'./util/kefir-and-eggs.js',
	'./util/defaults.js',
	'./util/put-css-rules.js',
	'./p-tile-skin.scss'
], function ($, color, U, Kefir, defaults) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'tile-skin',
		requires: ['tile-open', 'position-tracking']
	}).modify('Tile.prototype');


	/* tile styling defaults generator */
	var applyStyleDefaults = defaults({
		'&':            {
			backgroundColor: " 'white'                                                                ",
			borderColor:     " color(`['&'].backgroundColor`).brighten(20).css()                      ",
			color:           " color(`['&'].backgroundColor`).luminance() > 0.5 && 'black' || 'white' "
		},
		'& > header':   {
			borderColor: " `['&'].borderColor` "
		},
		'& > icon-btn': {
			backgroundColor: " `['&'].backgroundColor` "
		}
	}, { color });


	/* make tiles look nice, with a header, content section, and CSS styling derived from the model */
	plugin.insert('construct', function () {

		/*  create the header and content elements, and reroute the  */
		/* 'dom' property to the new content element                 */
		var origElement = this.dom;
		origElement.addClass('skinned-tile');
		this._p_tileSkin_headerElement = $(`<header/>`).appendTo(origElement);
		this.dom = $(`<section/>`).appendTo(origElement);

		/* put the name of the model in the header element */
		this.model.get('name').then((name)=> { this._p_tileSkin_headerElement.text(name) });

		/* take any css rules from the model and apply them to the tile */
		this.model.get('tile').get('normal').get('css').then((css)=> { this.element.amyPutCssRules(applyStyleDefaults(css)) })
				.catch(()=>{}); // it's OK if '.tile.normal.css' is not on the model

		/* when the tile is closed, make the font size dynamic */
		this.on('size').filterBy(this.p('open').not()).onValue((size) => {
			this._p_tileSkin_headerElement // formula gotten experimentally
					.css('fontSize', Math.min(0.2 * Math.pow(size.height, 1.01), 0.13 * Math.pow(size.width, 1.01)));
					// We're growing / shrinking the font size in proportion to the (1.01)st power of the tile size.
					// Making the font grow/shrink just a tiny bit faster than the tile prevents an awkward 'flickering'
					// between different line-breaks that would otherwise happen sometimes.
		});

		/* the 'headerSize' observable */
		this.newProperty('headerSize', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.on('size').changes(),
			this.on('open').changes()
		]).map(() => new U.Size(this._p_tileSkin_headerElement.height(), this.size.width)));


		/* the 'headerPosition' observable */
		this.newProperty('headerPosition', {
			settable: false
		}).plug(this.on('position'));

	});
});
