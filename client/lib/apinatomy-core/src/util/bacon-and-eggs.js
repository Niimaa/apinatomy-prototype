'use strict';

define(['jquery', './misc.js', 'baconjs', 'tweenjs'], function ($, U, Bacon, TWEEN) {

	require('bacon.model');
	require('bacon.jquery');


	/* EventStream generators *****************************************************************************************/


	// This method works with events that can have only one subscriber,
	// that can be un-subscribed by setting the subscriber to `null`.
	// This function is memoized, so only one subscription is taken,
	// and the same stream for it returned for each request.
	Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
		return Bacon.fromBinder((sink) => {
			obj.on(eventName, (v) => { sink(new Bacon.Next(v)) });
			return () => { obj.on(eventName, null) };
		});
	});


	var requestAnimationFrameFn =
			window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			((f) => { window.setTimeout(f, 1000 / 60) });
	Bacon.animationFrames = function animationFrames() {
		return Bacon.fromBinder((sink) => {

			/* self-calling animation-frame loop */
			var subscribed = true;
			(function iterationFn() {
				requestAnimationFrameFn(() => {
					if (sink() === Bacon.noMore) { subscribed = false }
					if (subscribed) { iterationFn() }
				});
			})();

			/* unsubscribe function */
			return () => { subscribed = false };

		});
	};


	Bacon.tween = function tween(objStart, objEnd, {duration, delay, easing}) {

		/* the tween */
		var tw = new TWEEN.Tween(objStart).to(objEnd, duration);

		/* the returned bus */
		var bus = new Bacon.Bus();

		/* a local function to plug in other streams, keeping track in order to 'end' the bus */
		var addStream = (() => {
			var chainedStreams = 0;
			return (stream) => {
				chainedStreams += 1;
				bus.plug(stream);
				stream.onEnd(() => {
					chainedStreams -= 1;
					if (chainedStreams === 0) { bus.end() }
				});
			};
		})();

		/* main stream */
		addStream(Bacon.fromBinder((sink) => {
			if (easing) { tw.easing(easing) }
			if (delay)  { tw.delay(delay) }
			tw.onUpdate(function () { sink(new Bacon.Next(() => this)) });
			tw.onComplete(() => { sink(new Bacon.End()) });
		}));

		/* adding tween-specific properties to the returned bus */
		bus.tween = tw;
		bus.start = () => {
			tw.start();
			return bus;
		};
		bus.chain = (other) => {
			addStream(other);
			tw.chain(other.tween);
			return bus;
		};

		/* returning the bus */
		return bus;

	};


	Bacon.keyPress = function keyPress(keycode) {
		return $(window).asEventStream('keypress').filter((e) => e.keyCode === keycode);
	};


	/* EventStream converters *****************************************************************************************/


	// This creates a 'window of opportunity' to limit other streams by.
	// This window is provided by the `pacing` observable. An optional `handler`
	// parameter can be given to do some setup and some breakdown. It is passed a function as an argument
	// that should be called *once* in the place where other streams can do their
	// thing. It returns a function used to wrap other streams. It does not
	// return a stream.
	Bacon.limiter = function limiter(pacing, handler = U.call) {
		var wantedBus = new Bacon.Bus();
		var open = new Bacon.Bus();
		var close = new Bacon.Bus();

		/* takes 'this' stream as pacing for a window of opportunity for other streams */
		pacing.filter(wantedBus.toProperty(false)).onValue(handler, () => {
			open.push();
			wantedBus.push(false);
			close.push();
		});

		/* returns a function to wrap a stream in this wrapper */
		return function (stream, {buffer} = {}) {
			wantedBus.plug(stream.map(true));
			return close.startWith(true).flatMapLatest(() => {
				var accumulator = (arr, val) => (buffer ? arr.concat([val]) : [val]);
				return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
			});
		};
	};

	// This restricts a given stream to a wrapper stream created with the method above.
	// All its original events are now fired inside the provided window. Set `options.buffer`
	// to `true` if all its events should be buffered and released inside the next window.
	// Otherwise, only the last event is retained.
	Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
		return wrapper(this, options);
	};


	// This is a cheap version of the limiter defined above. TODO: use the limiter where this is now used
	Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
		return Bacon.fromBinder((sink) => {
			var buffer = [];
			var unsubscribeToThis = this.onValue((value) => {
				buffer.push(new Bacon.Next(() => value));
			});
			var unsubscribeToPacing = pacing.onValue(() => {
				if (buffer.length > 0) {
					var oldBuffer = buffer;
					buffer = [];
					sink(oldBuffer);
				}
			});
			return () => {
				unsubscribeToThis();
				unsubscribeToPacing();
				buffer = null;
			};
		});
	};

	// This filters an observable to only let through values equal to the given value.
	Bacon.Observable.prototype.value = function (value, comparator) {
		comparator = comparator || ((e) => e === value);
		return this.skipDuplicates().filter(comparator);
	};

	// This makes a subscription to an observable that doesn't do anything
	Bacon.Observable.prototype.run = function () {
		return this.subscribe(()=>{});
	};

	// This is a 'smart' .stopPropagation, marking events with a label
	// and skipping those that already have that label.
	Bacon.EventStream.prototype.skipPropagation = function (label) {
		return this.filter((event) => {
			return !U.array(event.originalEvent, '_onlyOnceFor')[label];
		}).map((event) => {
			U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
		});
	};

	// Filter events to only certain keys / buttons. Can be a predicate function or single number.
	Bacon.EventStream.prototype.which = function (buttonId) {
		var pred = (typeof buttonId === 'function') ? (buttonId) : (b => b === buttonId);
		return this.filter(e => pred(e.which));
	};


	/* EventStream generators *****************************************************************************************/

	$.fn.mouseDrag = function mouseDrag({threshold} = {}) {
		return $(this).asEventStream('mousedown').flatMap((mouseDownEvent) => {
			var stream = $(document).asEventStream('mousemove');
			if (threshold) {
				var crossed = false;
				stream = stream.filter((mouseMoveEvent) => { // TODO: don't use 'filter', but something like 'skipUntil' or 'flatMap'
					if (crossed) { return true }
					var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
					var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
					if (dx * dx + dy * dy > threshold * threshold) { return crossed = true }
					return false;
				});
			}
			return stream
					.takeUntil($(document).asEventStream('mouseup'))
					.map((mouseMoveEvent) => ({ mouseDownEvent, mouseMoveEvent }));
		});
	};

	$.fn.mouseClick = function mouseClick({threshold} = {}) {
		return $(this).asEventStream('mousedown').flatMap((mouseDownEvent) => {
			var untilStream = $(document).asEventStream('mousemove');
			if (threshold) {
				var crossed = false;
				untilStream = untilStream.filter((mouseMoveEvent) => {
					if (crossed) { return true }
					var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
					var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
					if (dx * dx + dy * dy > threshold * threshold) { return crossed = true }
					return false;
				});
			}
			return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
		});
	};


	$.fn.mouseWheel = function mouseWheel() {
		return $(this).asEventStream('mousewheel DOMMouseScroll');
	};


	return Bacon;


});
