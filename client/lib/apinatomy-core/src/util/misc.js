define(['bluebird'], (P) => {
	'use strict';

	var U = {

		// create a new class, given a constructor and possible prototype
		newClass(constructor, prototype = {}) {
			constructor.prototype = prototype;
			constructor.prototype.constructor = constructor;
			return constructor;
		},

		// create a new subclass, given a superclass, constructor and possible prototype
		newSubclass(superClass, constructorMaker, prototype = {}) {
			var constructor = constructorMaker(superClass.prototype.constructor);
			constructor.prototype = Object.create(superClass.prototype);
			U.extend(constructor.prototype, prototype);
			constructor.prototype.constructor = constructor;
			return constructor;
		},

		// extend the first passed object with the properties
		// of the other objects, from left to right, and returns
		// the first passed object
		extend(obj1, ...rest) {
			rest.forEach((obj) => {
				for (var key in obj) {
					if (obj.hasOwnProperty(key)) {
						Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
					}
				}
			});
			return obj1;
		},

		// create a function that returns the value of
		// a specific field from a given object
		field(name) { return (obj) => { return obj[name] } },

		// create a function that returns the value of
		// a specific field from a given object
		call(fn, ...args) { return fn.apply(undefined, args) },

		// a function that returns its first argument
		id(v) { return v },

		// get the object `obj[name]`; if `obj[name]` is not
		// defined, give it a default value first; if the given value
		// is a function, it is called, and its result is used
		getDef(obj, name, value) {
			if (U.isUndefined(obj[name])) {
				if (typeof value === 'function') { value = value() }
				obj[name] = value;
			}
			return obj[name];
		},

		// get the object `obj[name]`; if `obj[name]` is not
		// a (plain) object, make it an empty object first
		object(obj, name) { return U.getDef(obj, name, {}) },

		// get the array `obj[name]`; if `obj[name]` is not
		// an array, make it an empty array first
		array(obj, name) { return U.getDef(obj, name, []) },

		// pull a value from an array
		pull(arr, val) {
			var i = arr.indexOf(val);
			if (i !== -1) { arr.splice(i) }
		},

		// empty out an array
		makeEmpty(arr) {
			while (arr.length > 0) { arr.pop() }
		},

		// `Function.bind`, but taking an array like `Function.apply` does
		bindA(fn, ctx, args) { return fn.bind.apply(fn, [ctx].concat(args)) },

		// `Function.bind`, but only having to specify the context-object once
		bind(obj, m, ...args) { return U.bindA(obj[m], obj, args) },

		// allows the Function constructor to be used
		// with an array of formal parameters
		applyConstructor(ConstructorFn, args) {
			var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
			return new NewConstructorFn();
		},

		// a simple `assert` function, to express a
		// condition that is expected to be true
		assert(condition, message) {
			if (!condition) { throw new Error(message || "Assertion failed") }
		},

		// test if a value is `undefined`
		isUndefined(val) { return typeof val === 'undefined' },

		// test if a value is defined (not `undefined`)
		isDefined(val) { return typeof val !== 'undefined' },

		// test if a value is a plain object
		isPlainObject(val) { return typeof val === 'object' && val.constructor === Object },

		// test if a value is a function
		isFunction(val) { return typeof val === 'function' },

		// extract an array of values from an object
		objValues(obj) { return Object.keys(obj).map(key => obj[key]) },

		// enable an HTML element to serve as anchor for absolutely positioned children
		makePositioned(element) {
			if (element.css('position') === 'static') {
				element.css('position', 'relative');
			}
		},

		// return the first parameter that is not 'undefined'
		defOr(...values) {
			for (var i = 0; i < values.length; i += 1) {
				if (U.isDefined(values[i])) { return values[i] }
			}
		},

		// Returns a function, that, as long as it continues to be invoked, will not
		// be triggered. The function will be called after it stops being called for
		// N milliseconds.
		debounce(func, wait, context) {
			var timeout;
			return function (...args) {
				var laterFn = () => {
					timeout = null;
					func.apply(context || this, args);
				};
				clearTimeout(timeout);
				timeout = setTimeout(laterFn, wait);
			};
		},

		// Returns a function, that will only be triggered once per synchronous 'stack'.
		oncePerStack(func, context) {
			var notRunYet = true;
			var result = function (...args) {
				if (notRunYet) {
					notRunYet = false;
					setTimeout(() => { notRunYet = true }, 0);
					func.apply(context || this, args);
				}
			};
			result.allowAdditionalCall = () => {
				notRunYet = true;
			};
			return result;
		},

		/*  Create a new cache to manage a specific value that is costly to compute or retrieve.    */
		/*  It ensures that the retrieval function is not called only once per stack, and uses a    */
		/*  cache to return a known value in between. It is also able to notify you when the value  */
		/*  has actually changed. It does so using `===` comparison, but you can provide your own   */
		/*  comparison function.                                                                    */
		cached({retrieve, isEqual}) {

			/* normalize parameters */
			isEqual = isEqual || ((a, b) => (a === b));

			/* keep a cache and give it an initial value */
			var cache;

			/* how to retrieve a new value, and process it if it is new */
			function retrieveValue() {
				var newValue = retrieve();
				var oldValue = cache;
				if (!isEqual(newValue, oldValue)) {
					cache = newValue;
					onChange.forEach((fn) => fn(newValue, oldValue));
				}
			}

			/* retrieve a value at most once per stack */
			var oncePerStackSetValue = U.oncePerStack(retrieveValue);

			/*  the resulting function possibly performs retrieval,             */
			/*  and always returns the cache (which may contain the new value)  */
			var resultFn = () => {
				oncePerStackSetValue();
				return cache;
			};

			/* allow an onChange callback to be set */
			var onChange = [];
			resultFn.onChange = (cb) => {
				onChange.push(cb);
				return resultFn;
			};

			/* allow breaking of the cache, allowing multiple calls per stack */
			resultFn.allowAdditionalCall = () => {
				oncePerStackSetValue.allowAdditionalCall();
			};

			/* retrieve the first value right now */
			oncePerStackSetValue();

			return resultFn;
		},

		promisify(obj, method) {
			return function (...args) {
				return new P((resolve, reject) => {
					try {
						obj[method].apply(obj, args.concat(resolve));
					} catch (error) {
						reject(error);
					}
				});
			};
		},

		findIndex(array, pred) {
			for (var i = 0; i < array.length; ++i) {
				if (pred(array[i], i, array)) { return i }
			}
			return -1;
		},

		// this `memoize` function is SLOW, as it uses linear search
		memoize(fn) {
			var keys = [];
			var cache = [];
			return function (...args) {
				/* check the cache */
				var index = U.findIndex(keys, (key) => key.every((v, i) => v === args[i]));
				if (index >= 0) { return cache[index] }

				/* no cache hit; compute value, store and return */
				var result = fn.apply(this, args);
				keys.push(args);
				cache.push(result);
				return result;
			};
		}

	};


	var EPS = 0.000001;
	var sortOfEqual = (a, b) => (b - EPS < a && a < b + EPS);

	/* HTML element position */
	U.Position = U.newClass(function (top, left) {
		this.top = top;
		this.left = left;
	});
	U.Position.subtract = (a, b) => {
		return new U.Position(a.top - b.top, a.left - b.left);
	};
	U.Position.equals = (a, b) => {
		return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
	};


	/* HTML element size */
	U.Size = U.newClass(function (height, width) {
		this.height = height;
		this.width = width;
	});
	U.Size.equals = (a, b) => {
		return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
	};


	return U;

});
