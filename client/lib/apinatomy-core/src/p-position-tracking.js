define(['jquery', './util/misc.js', './util/kefir-and-eggs.js'], function ($, U, Kefir) {
	'use strict';


	var plugin = $.circuitboard.plugin.do('position-tracking', {
		requires: ['core', 'tile-grow-when-open', 'tile-grow-when-maximized', 'tile-shrink-when-hidden']
	});


	/* a stream limiter, setting up a window for calculating element offsets */
	plugin.add('Circuitboard.prototype._posTrackingWindow', function (window) { window() });
	plugin.append('Circuitboard.prototype.construct', function () {
		this._posTrackingLimiter = Kefir.limiter(Kefir.merge([
			Kefir.once(),
			Kefir.interval(100)
		]), this._posTrackingWindow.bind(this));
	});


	plugin.append('Tile.prototype.construct', function () {

		this.newProperty('animationIdle', { settable: false, initial: true })
			.plug(Kefir.and([
				this.p('fullyOpen').or(this.p('fullyClosed')),
				this.p('fullyHidden').or(this.p('fullyVisible')),
				this.p('fullyMaximized').or(this.p('fullyNotMaximized'))
			]));

	});


	/* the 'offset' observable */
	plugin.append('Circuitboard.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			Kefir.interval(1000)
			// TODO: allow outside stream to trigger this
		]).limitedBy(this._posTrackingLimiter).map(() => this.element.offset()));

	}).append('Tilemap.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes(),
			this.parent.p('offset').changes()
		]).limitedBy(this.circuitboard._posTrackingLimiter).map(() => this.element.offset()));

	}).append('Tile.prototype.construct', function () {

		this.newProperty('offset', {
			settable: false,
			isEqual: U.Position.equals,
			initial: this.element.offset()
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes(),
			this.parent.p('offset').changes(),
			this.parent.on('reorganize'),
			this.p('animationIdle').value(true),
			Kefir.interval(1000).filterBy(this.p('animationIdle')) // backup timer
		]).filter(() => !this._offsetUpdated).limitedBy(this.circuitboard._posTrackingLimiter).map(() => {
			this._offsetUpdated = true;
			return this.element.offset();
		}));

		/* making sure size is only updated once every 100ms, to keep things fast */
		this._offsetUpdated = false; // TODO: write Kefir modifier to do this more easily; using .throttle doesn't work
		Kefir.interval(100).onValue(() => { this._offsetUpdated = false });

	});


	/* the 'position' observable */
	plugin.append('Circuitboard.prototype.construct', function () {

		/* for completeness sake; it's (0, 0) by definition */
		this.newProperty('position', {
			settable: false,
			initial: new U.Position(0, 0)
		});

	}).append('Tilemap.prototype.construct', function () {

		this.newProperty('position', {
			settable: false,
			isEqual: U.Position.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.p('offset').changes(),
			this.circuitboard.p('offset').changes()
		]).map(() => U.Position.subtract(this.offset, this.circuitboard.offset)));

	}).append('Tile.prototype.construct', function () {

		this.newProperty('position', {
			settable: false,
			isEqual: U.Position.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.p('offset').changes(),
			this.circuitboard.p('offset').changes(),
			this.p('animationIdle').value(true),
			Kefir.interval(1000).filterBy(this.p('animationIdle')) // backup timer
		]).filter(() => !this._positionUpdated).map(() => {
			this._positionUpdated = true;
			return U.Position.subtract(this.offset, this.circuitboard.offset);
		}));

		/* making sure size is only updated once every 100ms, to keep things fast */
		this._positionUpdated = false; // TODO: write Kefir modifier to do this more easily; using .throttle doesn't work
		Kefir.interval(100).onValue(() => { this._positionUpdated = false });

	});


	/* the 'size' observable */
	plugin.append('Circuitboard.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.options.resizeEvent || $(window).asKefirStream('resize')
		]).map(() => new U.Size(this.element.height(), this.element.width())));

	}).append('Tilemap.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes()
		]).map(() => new U.Size(this.element.height(), this.element.width())));

	}).append('Tile.prototype.construct', function () {

		this.newProperty('size', {
			settable: false,
			isEqual: U.Size.equals
		}).plug(Kefir.merge([
			Kefir.once(),
			this.parent.p('size').changes(),
			this.parent.on('reorganize'),
			this.p('animationIdle').value(true),
			Kefir.interval(1000).filterBy(this.p('animationIdle')) // backup timer
		]).filter(() => !this._sizeUpdated).map(() => {
			this._sizeUpdated = true;
			return new U.Size(this.element.height(), this.element.width());
		}));

		/* making sure size is only updated once every 100ms, to keep things fast */
		this._sizeUpdated = false; // TODO: write Kefir modifier to do this more easily; using .throttle doesn't work
		Kefir.interval(100).onValue(() => { this._sizeUpdated = false });

	});


	/*  if the size of any tile changes, trigger the 'reorganize'     */
	/*  event on the parent tilemap, so that sibling tiles can react  */
	plugin.append('Tilemap.prototype.construct', function () {

		this.newEvent('reorganize');

	}).append('Tile.prototype.construct', function () {

		this.p('size').onValue(() => { this.parent.trigger('reorganize') });

	});

});

