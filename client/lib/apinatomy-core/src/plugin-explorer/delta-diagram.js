define(['jquery', 'd3', '../util/misc.js', '../util/bacon-and-eggs.js', './intersects.js'], function ($, d3, U, Bacon) {
	'use strict';

	var NODE_MARGIN = 15;

	return function createDiagram(svgElement, graph) {

		//////////////////// processing graph //////////////////////////////////////////////////////////

		var transReductGraph = graph.transitiveReduction();
		var deltas = [];
		var applicationOrder = [];

		var mapNameToDelta = {};
		transReductGraph.topologically((key) => {
			var val = { model: graph.vertexValue(key) };
			val.show = true;
			val.width = val.height = 0; // some initial value to avoid NaNs
			deltas.push(val);
			mapNameToDelta[val.model.name] = val;
		});
		transReductGraph.eachEdge((v1, v2) => {
			applicationOrder.push({
				source: mapNameToDelta[v2],
				target: mapNameToDelta[v1]
			});
		});


		//////////////////// creating the graph ////////////////////////////////////////////////////////

		/* create the force layout */
		var force = d3.layout.force()
				.gravity(0.08)
				.charge((d) => (d.distanceFromFocus === null ? -500 : -800)) // deltas that are in the focus chain get lower repulsion
				.linkDistance((d) => (d.source.width + d.target.width + 2 * (d.source.height + d.target.height)) / 3)
				.linkStrength(0.1);

		/* create corresponding svg elements */
		var svgCanvas = d3.select(svgElement.find('> g.main')[0]);
		var orderArrows = svgCanvas.selectAll('.application-order');
		var deltaNodes = svgCanvas.selectAll('.delta');


		//////////////////// set positions /////////////////////////////////////////////////////////////

		function tick(e) {
			shownOrder.forEach((d) => {
				var sourceWidth  = d.source.width  + NODE_MARGIN;
				var sourceHeight = d.source.height + NODE_MARGIN;
				var targetWidth  = d.target.width  + NODE_MARGIN;
				var targetHeight = d.target.height + NODE_MARGIN;

				var line = {
					x1: d.source.x,
					y1: d.source.y,
					x2: d.target.x,
					y2: d.target.y
				};

				var from, to;

				//// line FROM
				var s1 = (line.y2 - line.y1) / (line.x2 - line.x1);
				if (-sourceHeight <= s1 * sourceWidth && s1 * sourceWidth <= sourceHeight) {
					if (line.x1 > line.x2) {
						// left edge
						from = U.intersects(line, {
							x1: d.source.x - sourceWidth / 2,
							y1: d.source.y - sourceHeight / 2,
							x2: d.source.x - sourceWidth / 2,
							y2: d.source.y + sourceHeight / 2
						});
					} else {
						// right edge
						from = U.intersects(line, {
							x1: d.source.x + sourceWidth / 2,
							y1: d.source.y - sourceHeight / 2,
							x2: d.source.x + sourceWidth / 2,
							y2: d.source.y + sourceHeight / 2
						});
					}
				} else {
					if (line.y1 > line.y2) {
						// top edge
						from = U.intersects(line, {
							x1: d.source.x - sourceWidth / 2,
							y1: d.source.y - sourceHeight / 2,
							x2: d.source.x + sourceWidth / 2,
							y2: d.source.y - sourceHeight / 2
						});
					} else {
						// bottom edge
						from = U.intersects(line, {
							x1: d.source.x - sourceWidth / 2,
							y1: d.source.y + sourceHeight / 2,
							x2: d.source.x + sourceWidth / 2,
							y2: d.source.y + sourceHeight / 2
						});
					}
				}

				//// line TO
				var s2 = (line.y1 - line.y2) / (line.x1 - line.x2);
				if (-targetHeight <= s2 * targetWidth && s2 * targetWidth <= targetHeight) {
					if (line.x1 > line.x2) {
						// right edge
						to = U.intersects(line, {
							x1: d.target.x + targetWidth / 2,
							y1: d.target.y - targetHeight / 2,
							x2: d.target.x + targetWidth / 2,
							y2: d.target.y + targetHeight / 2
						});
					} else {
						// left edge
						to = U.intersects(line, {
							x1: d.target.x - targetWidth / 2,
							y1: d.target.y - targetHeight / 2,
							x2: d.target.x - targetWidth / 2,
							y2: d.target.y + targetHeight / 2
						});
					}
				} else {
					if (line.y1 > line.y2) {
						// bottom edge
						to = U.intersects(line, {
							x1: d.target.x - targetWidth / 2,
							y1: d.target.y + targetHeight / 2,
							x2: d.target.x + targetWidth / 2,
							y2: d.target.y + targetHeight / 2
						});
					} else {
						// top edge
						to = U.intersects(line, {
							x1: d.target.x - targetWidth / 2,
							y1: d.target.y - targetHeight / 2,
							x2: d.target.x + targetWidth / 2,
							y2: d.target.y - targetHeight / 2
						});
					}
				}

				d.x1 = from.x;
				d.y1 = from.y;
				d.x2 = to.x;
				d.y2 = to.y;
			});


			/* position deltas below their subordinates */
			var k = 0.3 * (e ? e.alpha : 0);
			shownOrder.forEach((order) => {
				var factor = 1;
				if (U.isDefined(order.source.distanceFromFocus)) { // target will also be defined
					if ((order.source.distanceFromFocus === null) !== (order.target.distanceFromFocus === null)) { return }
					if (order.source.distanceFromFocus !== null && order.target.distanceFromFocus !== null) {
						factor = 2;
					}
				}
				var dist = order.source.y - order.target.y -
						1.25 * (order.source.height + order.target.height + 4 * NODE_MARGIN);
				if (dist < 0) {
					if (!order.source.dragging) { order.source.y -= factor * k * dist }
					if (!order.target.dragging) { order.target.y += factor * k * dist }
				}
			});

			deltaNodes
					.attr("x", (d) => d.x)
					.attr("y", (d) => d.y);
			orderArrows
					.attr("x1", (d) => d.x1)
					.attr("y1", (d) => d.y1)
					.attr("x2", (d) => d.x2)
					.attr("y2", (d) => d.y2);
		}


		//////////////////// updating the graph ////////////////////////////////////////////////////////

		var shownDeltas;
		var shownOrder;

		function updateDiagram() {
			shownDeltas = deltas.filter((d) => d.show);
			shownOrder = applicationOrder.filter((d) => d.source.show && d.target.show);

			shownOrder.forEach((order) => {
				U.array(order.source, 'inferiors').push(order.target);
				U.array(order.target, 'superiors').push(order.source);
			});

			// using the d3 general update pattern:
			// http://bl.ocks.org/mbostock/3808218

			/* restart the force */
			force.nodes(shownDeltas)
			     .links(shownOrder)
			     .start().alpha(0.2);


			function makeNode(d) {
				var element = $(`
					<svg class="delta">
						<rect />
						<text>${d.model.name}</text>
					</svg>
				`);
				d.element = element;
				return element[0];
			}
			function setNodeSizing(delta) {
				var rect = delta.element.find('rect');
				var text = delta.element.find('text');
				var bbox = text[0].getBBox();
				delta.width = bbox.width;
				delta.height = bbox.height;

				rect.attr('width',  delta.width + NODE_MARGIN)
				    .attr('height', delta.height + NODE_MARGIN)
				    .attr('x',    -(delta.width + NODE_MARGIN)  / 2)
				    .attr('y',    -(delta.height + NODE_MARGIN) / 2);

				text.attr('x', -delta.width / 2)
				    .attr('y', delta.height / 2 - 4);
			}

			/* new nodes */
			deltaNodes = svgCanvas.selectAll('.delta').data(shownDeltas.filter((d) => d.show), (d) => d.model.name);
			deltaNodes.enter()
					.append(makeNode)
					.classed('always', (d) => (d.model.if === true))
					.classed('resolution', (d) => !d.model.manuallySelectable)
					.on('click', (d) => {
						if (d3.event.defaultPrevented) { return } // ignore drag
						focus.set(d.distanceFromFocus === 0 ? null : d);
					})
					.call(force.drag);

			/* orderArrows */
			orderArrows = svgCanvas.selectAll('.application-order')
					.data(shownOrder, (d) => `${d.source.model.name} - ${d.target.model.name}`);
			orderArrows.enter()
					.append("line")
					.classed('application-order', true)
					.classed('resolution', (d) => (!d.source.model.manuallySelectable || !d.target.model.manuallySelectable));
			orderArrows.exit().remove();

			/* changes to all nodes and arrows */
			shownDeltas.forEach(setNodeSizing);
			deltaNodes.classed('focus', (d) => d.distanceFromFocus === 0);
			deltaNodes.classed('focus-connected', (d) => U.isDefined(d.distanceFromFocus) && d.distanceFromFocus !== null);
			orderArrows.classed('focus-connected', (d) => ((U.isDefined(d.source.distanceFromFocus) && d.source.distanceFromFocus !== null) && (U.isDefined(d.target.distanceFromFocus) && d.target.distanceFromFocus !== null)));
			deltaNodes.classed('not-focus-connected', (d) => d.distanceFromFocus === null);
			orderArrows.classed('not-focus-connected', (d) => (d.source.distanceFromFocus === null || d.target.distanceFromFocus === null));


			/* define a nice visual z-order for the svg elements */
			svgCanvas.selectAll('.delta, .application-order').sort((a, b) =>
				(U.isDefined(a.source) && U.isUndefined(b.source)) ?
						(-1) : (U.isUndefined(a.source) === U.isUndefined(b.source) ? 0 : 1)
			);
		}


		//////////////////// reacting to changes ///////////////////////////////////////////////////////

		force.drag()
				.on('drag', () => { force.alpha(0.2) })
				.on('dragstart', (d) => { d.dragging = true })
				.on('dragend', (d) => { d.dragging = false });

		force.on('tick', tick);

		function onResize() {
			force.size([svgElement.width(), svgElement.height()]);
			updateDiagram();
		}
		$(window).resize(onResize);
		onResize();


		/* keeping track of which delta has focus */
		function visitInferiors(dd, fn, before = ()=>{}, after = ()=>{}, done = {}) {
			if (done[dd.model.name]) { return }
			done[dd.model.name] = true;
			fn(dd);
			before();
			(dd.inferiors || []).forEach((inferior) => { visitInferiors(inferior, fn, before, after, done) });
			after();
		}
		function visitSuperiors(dd, fn, before = ()=>{}, after = ()=>{}, done = {}) {
			if (done[dd.model.name]) { return }
			done[dd.model.name] = true;
			fn(dd);
			before();
			(dd.superiors || []).forEach((superior) => { visitSuperiors(superior, fn, before, after, done) });
			after();
		}
		var focus = new Bacon.Model(null);
		focus.onValue((newD) => {
			if (newD) {
				deltas.forEach((d) => {
					d.distanceFromFocus = null;
				});
				var i = 0;
				visitInferiors(newD,
						(d) => { d.distanceFromFocus = i },
						() => {i--},
						() => {i++}
				);
				visitSuperiors(newD,
						(d) => { d.distanceFromFocus = i },
						() => {i++},
						() => {i--}
				);
			} else {
				deltas.forEach((d) => {
					delete d.distanceFromFocus;
				});
			}
			updateDiagram();
		});



	};

});
