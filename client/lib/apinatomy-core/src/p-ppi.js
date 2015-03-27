define([
	'jquery',
	'./D3Group.js',
	'./D3Vertex.js',
	'./D3Edge.js',
	'./util/kefir-and-eggs.js',
	'./p-ppi.scss'
], function ($, D3GroupP, D3VertexP, D3EdgeP, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('ppi', {
		requires: ['d3']
	});


	// TODO: implement this properly; this is just for testing purposes
	plugin.append('Tile.prototype.construct', function () {

		var D3Group = D3GroupP.value();
		var D3Vertex = D3VertexP.value();
		var D3Edge = D3EdgeP.value();

		var graphGroup = new D3Group({
			parent: this,
			gravityFactor: 1,
			chargeFactor: 0.1,
			linkDistanceFactor: 0.3
		});


		Kefir.merge([
			Kefir.once(),
			this.on('size').changes(),
			this.on('position').changes()
		]).onValue(() => {
			var AREA_MARGIN = 5;
			graphGroup.setRegion({
				top: this.position.top + AREA_MARGIN,
				left: this.position.left + AREA_MARGIN,
				height: this.size.height - 2 * AREA_MARGIN,
				width: this.size.width - 2 * AREA_MARGIN
			});
		});

		var constructExampleProteins = () => {
			graphGroup.addEdge(new D3Edge({
				parent: graphGroup,
				source: graphGroup.addVertex(new D3Vertex({
					parent: graphGroup,
					cssClass: 'example'
				})),
				target: graphGroup.addVertex(new D3Vertex({
					parent: graphGroup,
					cssClass: 'example'
				})),
				cssClass: 'example'
			}));
		};

		this.on('open').not().and(this.on('visible')).onValue((showProteins) => {
			if (showProteins) {
				constructExampleProteins();
			} else {
				graphGroup.removeAllEdgesAndVertices();
			}
		});

	});


});
