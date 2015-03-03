define([
	'jquery',
	'bluebird',
	'./util/misc.js',
	'./util/defer.js',
	'./util/nested-flex-grow.js',
	'./p-core.scss'
], function ($, P, U, defer) {
	'use strict';


	var plugin = $.circuitboard.plugin({
		name: 'core',
		if: true
	});


	/* Circuitboard */
	plugin.modify('Circuitboard.prototype')
			.add('_registerTile', function _registerTile(tile) {

				// called by the Tile constructor

				U.getDef(this._p_circuitboardCore_tilesByModelId, tile.model.id, defer).resolve(tile);

			}).add('allTiles', function () {

				var tiles = {};

				Object.keys(this._p_circuitboardCore_tilesByModelId).forEach((id) => {
					tiles[id] = this._p_circuitboardCore_tilesByModelId[id].promise;
				});

				return tiles;

			}).add('tile', function (tileSelector) {

				return U.getDef(this._p_circuitboardCore_tilesByModelId, tileSelector, defer).promise;

			}).add('construct', function () {

				this._p_circuitboardCore_tilesByModelId = {};

				// create the root tilemap
				$('<div/>').appendTo(this.element)
						.css('flex-grow', 1)
						.tilemap({
							model: this.options.model,
							parent: this
						}).tilemap('instance');

			});


	/* Tilemap */
	plugin.modify('Tilemap.prototype')
			.add('refreshTiles', function () {

				/* sanity check */
				U.assert(U.isDefined(this.model),
						`An ApiNATOMY tilemap should have a model.`);

				/* render the new tilemap (through a promise chain, returning the final promise) */
				return P.resolve(this.model)
					/* get the id's of all child models */
						.call('getChildIds')
					/* filter out the ids of children that ought not be displayed */
						.map((id) => {
							return P.resolve(this.circuitboard.options.filter(id, U.bind(P.resolve(this.model).value(), 'getModels', id)))
									.then((show) => { return { id: id, show: show } });
						}).filter(U.field('show')).map(U.field('id'))
					/* get promises to all child entities */
						.then((ids) => P.resolve(this.model).value().getModels(ids))
					/* create a tile for each child entity */
						.then((childrenToDisplay) => {
							/* remove all old tiles */
							this.element.children().empty();
							this.element.empty();

							/* render and store references to the new tiles */
							this._p_tilemapCore_tiles = [];
							var rowCount = Math.floor(Math.sqrt(childrenToDisplay.length));
							var colCount = Math.ceil(childrenToDisplay.length / rowCount);
							while (rowCount--) {
								var row = $('<div/>').addClass('tilerow').appendTo(this.element);
								for (var column = 0; column < colCount && childrenToDisplay.length > 0; column += 1) {
									$('<div/>').tile({
										model: childrenToDisplay.shift(),
										parent: this
									}).appendTo(row).amyNestedFlexGrow(1);
								}
							}
						})
					/* signal that the tiles have been (re)rendered */
						.then(()=> { this.trigger('tiles-refreshed') });

			}).add('construct', function () {

				this.newEvent('tiles-refreshed');

				this._p_tilemapCore_tiles = null;
				Object.defineProperty(this, 'tiles', { get: () => this._p_tilemapCore_tiles });
				this.refreshTiles();

			});


	/* Tile */
	plugin.modify('Tile.prototype')
			.add('populateInnerTilemap', function populateInnerTilemap() {

				if (!this._p_tileCore_tilemap) {
					this._p_tileCore_tilemap = this.dom.tilemap({
						model: this.options.model,
						parent: this
					}).tilemap('instance');
				}

			}).add('construct', function () {

				this._p_tileCore_tilemap = null;

				/* support certain DOM-event subscriptions from the tile object itself */
				['mouseover', 'mouseout', 'mouseenter', 'mouseleave'].forEach((event) => {
					this.newEvent(event, { source: this.element.asKefirStream(event) });
				});
				this.newEvent('click', {
					source: this.element.mouseClick({ threshold: this.circuitboard.options.dragThreshold })
				});

				/* a field to hold the innermost HTML content element still belonging to this tile */
				this.dom = this.element;

				/* an element id for quick jQuery lookups */
				this.element.attr('id', this.id);

				/* notify the circuitboard of this new tile */
				this.circuitboard._registerTile(this);

			});


});
