(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "kefir-jquery", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["KefirJQuery"], root["DeltaJs"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, P, Kefir, U, ThreeDModelP) {
	  'use strict';
	  var plugin = $.circuitboard.plugin.do('three-d-geometric-models', {requires: ['three-d', 'three-d-spinner']});
	  plugin.add('Circuitboard.threeJsLoaders', {});
	  plugin.add('Tile.prototype.loadThreeDModels', function() {
	    var $__0 = this;
	    var threeDModels = this.circuitboard.options.threeDModels;
	    if (!threeDModels) {
	      return;
	    }
	    return P.all([this.model, ThreeDModelP]).spread((function(tileModel, ThreeDModel) {
	      if (threeDModels[tileModel.id]) {
	        $__0.threeDModels = {};
	        Object.keys(threeDModels[tileModel.id]).forEach((function(modelID) {
	          var clock = new THREE.Clock();
	          var clockStream = Kefir.animationFrames().map((function() {
	            return clock.getElapsedTime();
	          }));
	          var model = $__0.threeDModels[modelID] = new ThreeDModel(U.extend({}, threeDModels[tileModel.id][modelID], {
	            id: modelID,
	            parent: $__0,
	            clock: clockStream,
	            visible: false
	          }));
	          model.object3D.then((function(object) {
	            $__0.object3D.add(object);
	            $__0.p('size').onValue((function(size) {
	              $__0.threeDModels[modelID].adaptToSurfaceArea(size);
	            }));
	          }));
	          model.p('visible').value(true).take(1).onValue((function() {
	            $__0.loadingIndicator({until: model.object3D});
	          }));
	        }));
	        return $__0.threeDModels;
	      }
	    }));
	  });
	  plugin.append('Tile.prototype.construct', function() {
	    this.loadThreeDModels();
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
	  KefirJQuery.init(Kefir, $);
	  Kefir.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Kefir.fromBinder((function(emitter) {
	      obj.on(eventName, emitter.emit);
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Kefir.animationFrames = function animationFrames() {
	    return Kefir.fromBinder((function(emitter) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          emitter.emit();
	          if (subscribed) {
	            iterationFn();
	          }
	        }));
	      })();
	      return (function() {
	        subscribed = false;
	      });
	    }));
	  };
	  Kefir.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = Kefir.bus();
	    var addStream = ((function() {
	      var chainedStreams = 0;
	      return (function(stream) {
	        chainedStreams += 1;
	        bus.plug(stream);
	        stream.onEnd((function() {
	          chainedStreams -= 1;
	          if (chainedStreams === 0) {
	            bus.end();
	          }
	        }));
	      });
	    }))();
	    addStream(Kefir.fromBinder((function(emitter) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        emitter.emit(this);
	      });
	      tw.onComplete(emitter.end);
	    })));
	    bus.tween = tw;
	    bus.start = (function() {
	      tw.start();
	      return bus;
	    });
	    bus.chain = (function(other) {
	      addStream(other);
	      tw.chain(other.tween);
	      return bus;
	    });
	    return bus;
	  };
	  Kefir.keyPress = function keyPress(keyCode) {
	    return $(window).asKefirStream('keypress').filter((function(e) {
	      return e.keyCode === keyCode;
	    }));
	  };
	  Kefir.once = function once(value) {
	    return Kefir.fromBinder((function(emitter) {
	      emitter.emit(value);
	      emitter.end();
	    }));
	  };
	  Kefir.fromArray = function fromArray(array) {
	    return Kefir.fromBinder((function(emitter) {
	      array.forEach(emitter.emit);
	      emitter.end();
	    }));
	  };
	  Kefir.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = Kefir.bus();
	    var open = Kefir.bus();
	    var close = Kefir.bus();
	    pacing.filterBy(wantedBus.toProperty(false)).onValue((function() {
	      handler((function() {
	        open.emit();
	        wantedBus.emit(false);
	        close.emit();
	      }));
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.mapTo(true));
	      return Kefir.constant(true).take(1).concat(close).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntilBy(open).reduce(accumulator, []).flatMap(Kefir.fromArray);
	      }));
	    };
	  };
	  Kefir.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Kefir.Stream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Kefir.fromBinder((function(emitter) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(value);
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          oldBuffer.forEach(emitter.emit);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Kefir.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Kefir.Observable.prototype.run = function() {
	    var $__0 = this;
	    var doNothing = (function() {});
	    this.onValue(doNothing);
	    return (function() {
	      $__0.offValue(doNothing);
	    });
	  };
	  Kefir.Stream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Kefir.Stream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asKefirStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        stream = stream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return stream.takeUntilBy($(document).asKefirStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asKefirStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asKefirStream('mousemove');
	      if (threshold) {
	        var crossed = false;
	        untilStream = untilStream.filter((function(mouseMoveEvent) {
	          if (crossed) {
	            return true;
	          }
	          var dx = mouseDownEvent.pageX - mouseMoveEvent.pageX;
	          var dy = mouseDownEvent.pageY - mouseMoveEvent.pageY;
	          if (dx * dx + dy * dy > threshold * threshold) {
	            return crossed = true;
	          }
	          return false;
	        }));
	      }
	      return $(document).asKefirStream('mouseup').take(1).takeUntilBy(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asKefirStream('mousewheel DOMMouseScroll');
	  };
	  return Kefir;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  var U = {
	    newClass: function(constructor) {
	      var prototype = arguments[1] !== (void 0) ? arguments[1] : {};
	      constructor.prototype = prototype;
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    newSubclass: function(superClass, constructorMaker) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var constructor = constructorMaker(superClass.prototype.constructor);
	      constructor.prototype = Object.create(superClass.prototype);
	      U.extend(constructor.prototype, prototype);
	      constructor.prototype.constructor = constructor;
	      return constructor;
	    },
	    extend: function(obj1) {
	      for (var rest = [],
	          $__1 = 1; $__1 < arguments.length; $__1++)
	        rest[$__1 - 1] = arguments[$__1];
	      rest.forEach((function(obj) {
	        for (var key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            Object.defineProperty(obj1, key, Object.getOwnPropertyDescriptor(obj, key));
	          }
	        }
	      }));
	      return obj1;
	    },
	    field: function(name) {
	      return (function(obj) {
	        return obj[name];
	      });
	    },
	    call: function(fn) {
	      for (var args = [],
	          $__2 = 1; $__2 < arguments.length; $__2++)
	        args[$__2 - 1] = arguments[$__2];
	      return fn.apply(undefined, args);
	    },
	    id: function(v) {
	      return v;
	    },
	    getDef: function(obj, name, value) {
	      if (U.isUndefined(obj[name])) {
	        if (typeof value === 'function') {
	          value = value();
	        }
	        obj[name] = value;
	      }
	      return obj[name];
	    },
	    object: function(obj, name) {
	      return U.getDef(obj, name, {});
	    },
	    array: function(obj, name) {
	      return U.getDef(obj, name, []);
	    },
	    pull: function(arr, val) {
	      var i = arr.indexOf(val);
	      if (i !== -1) {
	        arr.splice(i);
	      }
	    },
	    makeEmpty: function(arr) {
	      while (arr.length > 0) {
	        arr.pop();
	      }
	    },
	    bindA: function(fn, ctx, args) {
	      return fn.bind.apply(fn, [ctx].concat(args));
	    },
	    bind: function(obj, m) {
	      for (var args = [],
	          $__3 = 2; $__3 < arguments.length; $__3++)
	        args[$__3 - 2] = arguments[$__3];
	      return U.bindA(obj[m], obj, args);
	    },
	    applyConstructor: function(ConstructorFn, args) {
	      var NewConstructorFn = ConstructorFn.bind.apply(ConstructorFn, [null].concat(args));
	      return new NewConstructorFn();
	    },
	    assert: function(condition, message) {
	      if (!condition) {
	        throw new Error(message || "Assertion failed");
	      }
	    },
	    isUndefined: function(val) {
	      return typeof val === 'undefined';
	    },
	    isDefined: function(val) {
	      return typeof val !== 'undefined';
	    },
	    isPlainObject: function(val) {
	      return typeof val === 'object' && val.constructor === Object;
	    },
	    isFunction: function(val) {
	      return typeof val === 'function';
	    },
	    objValues: function(obj) {
	      return Object.keys(obj).map((function(key) {
	        return obj[key];
	      }));
	    },
	    makePositioned: function(element) {
	      if (element.css('position') === 'static') {
	        element.css('position', 'relative');
	      }
	    },
	    defOr: function() {
	      for (var values = [],
	          $__4 = 0; $__4 < arguments.length; $__4++)
	        values[$__4] = arguments[$__4];
	      for (var i = 0; i < values.length; i += 1) {
	        if (U.isDefined(values[i])) {
	          return values[i];
	        }
	      }
	    },
	    debounce: function(func, wait, context) {
	      var timeout;
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var $__0 = this;
	        var laterFn = (function() {
	          timeout = null;
	          func.apply(context || $__0, args);
	        });
	        clearTimeout(timeout);
	        timeout = setTimeout(laterFn, wait);
	      };
	    },
	    oncePerStack: function(func, context) {
	      var notRunYet = true;
	      var result = function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        if (notRunYet) {
	          notRunYet = false;
	          setTimeout((function() {
	            notRunYet = true;
	          }), 0);
	          func.apply(context || this, args);
	        }
	      };
	      result.allowAdditionalCall = (function() {
	        notRunYet = true;
	      });
	      return result;
	    },
	    cached: function($__6) {
	      var $__7 = $__6,
	          retrieve = $__7.retrieve,
	          isEqual = $__7.isEqual;
	      isEqual = isEqual || ((function(a, b) {
	        return (a === b);
	      }));
	      var cache;
	      function retrieveValue() {
	        var newValue = retrieve();
	        var oldValue = cache;
	        if (!isEqual(newValue, oldValue)) {
	          cache = newValue;
	          onChange.forEach((function(fn) {
	            return fn(newValue, oldValue);
	          }));
	        }
	      }
	      var oncePerStackSetValue = U.oncePerStack(retrieveValue);
	      var resultFn = (function() {
	        oncePerStackSetValue();
	        return cache;
	      });
	      var onChange = [];
	      resultFn.onChange = (function(cb) {
	        onChange.push(cb);
	        return resultFn;
	      });
	      resultFn.allowAdditionalCall = (function() {
	        oncePerStackSetValue.allowAdditionalCall();
	      });
	      oncePerStackSetValue();
	      return resultFn;
	    },
	    promisify: function(obj, method) {
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        return new P((function(resolve, reject) {
	          try {
	            obj[method].apply(obj, args.concat(resolve));
	          } catch (error) {
	            reject(error);
	          }
	        }));
	      };
	    },
	    findIndex: function(array, pred) {
	      for (var i = 0; i < array.length; ++i) {
	        if (pred(array[i], i, array)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    memoize: function(fn) {
	      var keys = [];
	      var cache = [];
	      return function() {
	        for (var args = [],
	            $__5 = 0; $__5 < arguments.length; $__5++)
	          args[$__5] = arguments[$__5];
	        var index = U.findIndex(keys, (function(key) {
	          return key.every((function(v, i) {
	            return v === args[i];
	          }));
	        }));
	        if (index >= 0) {
	          return cache[index];
	        }
	        var result = fn.apply(this, args);
	        keys.push(args);
	        cache.push(result);
	        return result;
	      };
	    }
	  };
	  var EPS = 0.000001;
	  var sortOfEqual = (function(a, b) {
	    return (b - EPS < a && a < b + EPS);
	  });
	  U.Position = U.newClass(function(top, left) {
	    this.top = top;
	    this.left = left;
	  });
	  U.Position.subtract = (function(a, b) {
	    return new U.Position(a.top - b.top, a.left - b.left);
	  });
	  U.Position.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.top, b.top) && sortOfEqual(a.left, b.left);
	  });
	  U.Size = U.newClass(function(height, width) {
	    this.height = height;
	    this.width = width;
	  });
	  U.Size.equals = (function(a, b) {
	    return U.isDefined(a) && U.isDefined(b) && sortOfEqual(a.height, b.height) && sortOfEqual(a.width, b.width);
	  });
	  return U;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(3), __webpack_require__(4), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP) {
	  'use strict';
	  function isGeometry(v) {
	    return v instanceof THREE.Geometry || v instanceof THREE.BufferGeometry;
	  }
	  function isObject3D(v) {
	    return v instanceof THREE.Object3D;
	  }
	  function endsWith(str, suffix) {
	    return str.indexOf(suffix, str.length - suffix.length) !== -1;
	  }
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_ThreeDModel)) {
	      return window._amy_ThreeDModel;
	    }
	    var ThreeDModel = window._amy_ThreeDModel = Artefact.newSubclass('ThreeDModel', function ThreeDModel($__1) {
	      var $__2 = $__1,
	          rootThreeDModel = $__2.rootThreeDModel,
	          visible = $__2.visible,
	          file = $__2.file,
	          parts = $__2.parts;
	      var $__0 = this;
	      if (U.isUndefined(rootThreeDModel)) {
	        rootThreeDModel = this;
	      }
	      this.rootThreeDModel = rootThreeDModel;
	      this.newProperty('visible', {initial: visible});
	      this.newProperty('hidden').plug(this.p('visible').not());
	      this.p('visible').plug(this.p('hidden').not());
	      Object.keys(parts || {}).map((function(id) {
	        var newChildOptions = U.extend({}, parts[id], {
	          id: id,
	          parent: $__0,
	          visible: visible,
	          rootThreeDModel: $__0.rootThreeDModel
	        });
	        ['color', 'animation', 'clock'].forEach((function(prop) {
	          if (U.isUndefined(newChildOptions[prop])) {
	            newChildOptions[prop] = $__0.options[prop];
	          }
	        }));
	        new window._amy_ThreeDModel(newChildOptions);
	      }));
	      this.object3D.then((function(object3D) {
	        $__0.p('visible').merge($__0.on('destroy').mapTo(false)).onValue((function(visible) {
	          object3D.visible = visible;
	        }));
	      }));
	    }, {
	      get geometry3D() {
	        var $__0 = this;
	        if (!this._geometry3D) {
	          this._geometry3D = new P((function(resolve, reject) {
	            if (U.isDefined($__0.options.file)) {
	              $__0.rootThreeDModel.p('visible').value(true).take(1).onValue((function() {
	                $__0._loadGeometryFromFile().then(resolve, reject);
	              }));
	            } else {
	              resolve(null);
	            }
	          }));
	        }
	        return this._geometry3D;
	      },
	      get originalBoundingBox() {
	        var $__0 = this;
	        if (!this._originalBoundingBox) {
	          this._originalBoundingBox = new P((function(resolve, reject) {
	            if (U.isDefined($__0.options.file)) {
	              $__0.geometry3D.then((function(geometry) {
	                var boxFromFile = new THREE.Box3();
	                if (geometry instanceof THREE.BufferGeometry) {
	                  geometry.computeBoundingBox();
	                  boxFromFile.expandByPoint(geometry.boundingBox.min);
	                  boxFromFile.expandByPoint(geometry.boundingBox.max);
	                }
	                (geometry.morphTargets || []).concat([geometry]).forEach((function($__1) {
	                  var vertices = $__1.vertices;
	                  (vertices || []).forEach((function(point) {
	                    boxFromFile.expandByPoint(point);
	                  }));
	                }));
	                return boxFromFile;
	              })).then(resolve, reject);
	            } else if (U.isDefined($__0.options.parts)) {
	              P.all($__0.children).map((function(part) {
	                return part.originalBoundingBox;
	              })).reduce((function(result, bbox) {
	                return result.expandByPoint(bbox.min).expandByPoint(bbox.max);
	              }), new THREE.Box3()).then(resolve, reject);
	            }
	          }));
	        }
	        return this._originalBoundingBox;
	      },
	      get object3D() {
	        var $__0 = this;
	        if (!this._object3D) {
	          this._object3D = this.geometry3D.then((function(geometry3D) {
	            if (geometry3D) {
	              return $__0.rootThreeDModel.originalBoundingBox.then((function(originalBoundingBox) {
	                var correction = originalBoundingBox.center().negate();
	                var correctionMatrix = new THREE.Matrix4().setPosition(correction);
	                (geometry3D.morphTargets || []).forEach((function($__1) {
	                  var vertices = $__1.vertices;
	                  vertices.forEach((function(point) {
	                    point.applyMatrix4(correctionMatrix);
	                  }));
	                }));
	                geometry3D.applyMatrix(correctionMatrix);
	                var $__1 = $__0.options,
	                    animation = $__1.animation,
	                    color = $__1.color;
	                var material = new THREE.MeshLambertMaterial({color: color || 'white'});
	                material.side = THREE.DoubleSide;
	                var object;
	                if (animation) {
	                  object = new THREE.MorphAnimMesh(geometry3D, material);
	                  object.duration = animation.duration;
	                  material.morphTargets = true;
	                  geometry3D.computeMorphNormals();
	                  var clock = $__0.options.clock;
	                  var lastTime = 0;
	                  clock.takeUntilBy($__0.event('destroy')).onValue((function(time) {
	                    object.updateAnimation(1000 * (time - lastTime));
	                    lastTime = time;
	                  }));
	                } else {
	                  object = new THREE.Mesh(geometry3D, material);
	                }
	                object.castShadow = true;
	                object.receiveShadow = false;
	                return object;
	              }));
	            } else {
	              var object = new THREE.Object3D();
	              $__0.children.map((function(part) {
	                return part.object3D;
	              })).forEach((function(partObjectP) {
	                partObjectP.then((function(partObject) {
	                  object.add(partObject);
	                }));
	              }));
	              return P.all($__0.children.map((function(part) {
	                return part.object3D;
	              }))).each((function(subObject) {
	                object.add(subObject);
	              })).return(object);
	            }
	          }));
	        }
	        return this._object3D;
	      },
	      adaptToSurfaceArea: function(size) {
	        var $__0 = this;
	        U.assert(this.rootThreeDModel === this, "The 'adaptToSurfaceArea' method should only be called on a root ThreeDModel.");
	        P.all([this.object3D, this.originalBoundingBox]).spread((function(obj, boundingBox) {
	          var $__1;
	          var objWidth = boundingBox.size().x;
	          var objHeight = boundingBox.size().y;
	          if ((size.width < size.height) !== (objWidth < objHeight)) {
	            obj.rotation.z = 0.5 * Math.PI;
	            ($__1 = [objHeight, objWidth], objWidth = $__1[0], objHeight = $__1[1], $__1);
	          } else {
	            obj.rotation.z = 0;
	          }
	          var ratio = 0.8 * Math.min(size.width / objWidth, size.height / objHeight);
	          obj.scale.set(ratio, ratio, ratio);
	          var elevation = U.defOr($__0.options.elevation, Math.min(size.width, size.height) / 4);
	          obj.position.z = 0.5 * ratio * boundingBox.size().z + elevation;
	        }));
	      },
	      _loadGeometryFromFile: function() {
	        var file = this.options.file;
	        var ext = '';
	        Object.keys($.circuitboard.Circuitboard.threeJsLoaders).forEach((function(extension) {
	          if (extension.length > ext.length) {
	            if (endsWith(file, ("." + extension))) {
	              ext = extension;
	            }
	          }
	        }));
	        U.assert(ext.length > 0, ("The file '" + file + "' is not recognized as a 3D model."));
	        var Loader = $.circuitboard.Circuitboard.threeJsLoaders[ext];
	        U.assert(U.isDefined(Loader), "Something went wrong retrieving the 3D model loader.");
	        return U.promisify(new Loader(), 'load')(file).then((function(geometry) {
	          U.assert(isGeometry(geometry) || isObject3D(geometry), ("The 3D model loader for the '" + ext + "' extension returned an unsupported value."));
	          if (!isGeometry(geometry)) {
	            geometry = geometry.geometry || geometry.children[0].geometry;
	          }
	          return geometry;
	        }));
	      }
	    }, {visible: false});
	    window._amy_ThreeDModel.loaders = {};
	    return window._amy_ThreeDModel;
	  })).tap((function(c) {
	    $.circuitboard.ThreeDModel = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(5), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, deltaJs, defer) {
	  'use strict';
	  return deltaJs.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = deltaJs.vp('Artefact', U.newSubclass(KefirSignalHandler, (function(superFn) {
	      return function Artefact(options) {
	        superFn.apply(this, arguments);
	        this._options = options;
	        var $__1 = options,
	            id = $__1.id,
	            type = $__1.type,
	            parent = $__1.parent,
	            beforeConstruction = $__1.beforeConstruction;
	        this._id = id || uniqueID(type);
	        this._type = type;
	        this._parent = parent;
	        this._children = [];
	        if (parent) {
	          U.array(parent, '_children').push(this);
	        }
	        this.newEvent('destroy');
	        this.beforeConstruction(beforeConstruction);
	        if (this.root === this) {
	          this._artefactsByID = {};
	          this._registerArtefact = function(artefact) {
	            U.getDef(this._artefactsByID, artefact.id, defer).resolve(artefact);
	          };
	        }
	      };
	    }), {
	      beforeConstruction: function(possiblePromise) {
	        if (!possiblePromise || !$.isFunction(possiblePromise.then)) {
	          return;
	        }
	        if (!this.constructed) {
	          this.constructed = P.resolve(this);
	        }
	        this.constructed = this.constructed.tap((function() {
	          return P.resolve(possiblePromise);
	        }));
	      },
	      get options() {
	        return this._options;
	      },
	      get id() {
	        return this._id;
	      },
	      get type() {
	        return this._type;
	      },
	      get parent() {
	        return this._parent;
	      },
	      get children() {
	        return this._children;
	      },
	      get root() {
	        if (!this._root) {
	          this._root = this.parent ? this.parent.root : this;
	        }
	        return this._root;
	      },
	      artefactById: function(id) {
	        return U.getDef(this.root._artefactsByID, id, defer).promise;
	      },
	      traverseArtefacts: function(fn) {
	        var options = arguments[1] !== (void 0) ? arguments[1] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix') {
	          fn(this);
	        }
	        this.children.forEach((function(child) {
	          child.traverseArtefacts(fn, options);
	        }));
	        if (order === 'postfix') {
	          fn(this);
	        }
	      },
	      traverseArtefactsByType: function(type, fn) {
	        var options = arguments[2] !== (void 0) ? arguments[2] : {};
	        var order = options.order;
	        if (!order) {
	          order = 'prefix';
	        }
	        if (order === 'prefix' && this.type === type) {
	          fn(this);
	        }
	        if (options.beforeGoingIn) {
	          options.beforeGoingIn(this);
	        }
	        this.closestDescendantsByType(type).forEach((function(descendent) {
	          descendent.traverseArtefactsByType(type, fn, options);
	        }));
	        if (options.beforeGoingOut) {
	          options.beforeGoingOut(this);
	        }
	        if (order === 'postfix' && this.type === type) {
	          fn(this);
	        }
	      },
	      closestAncestorByType: function(type) {
	        var result = this;
	        do {
	          result = result.parent;
	        } while (result && result.type && result.type !== type);
	        return result;
	      },
	      closestDescendantsByType: function(type) {
	        var result = [];
	        this.children.forEach((function(child) {
	          if (child.type === type) {
	            result.push(child);
	          } else {
	            result = result.concat(child.closestDescendantsByType(type));
	          }
	        }));
	        return result;
	      },
	      destroy: function() {
	        this.trigger('destroy');
	        this.children.forEach((function(child) {
	          child.destroy();
	        }));
	      }
	    }));
	    window._amy_Artefact.newSubclass = function newSubClass(name, constructor) {
	      var prototype = arguments[2] !== (void 0) ? arguments[2] : {};
	      var optionDefaults = arguments[3] !== (void 0) ? arguments[3] : {};
	      return deltaJs.vp(name, U.newSubclass(window._amy_Artefact, (function(superFn) {
	        return function() {
	          var options = arguments[0] !== (void 0) ? arguments[0] : {};
	          var $__0 = this;
	          var processedOptions = options;
	          Object.keys(optionDefaults).forEach((function(key) {
	            if (U.isUndefined(processedOptions[key])) {
	              processedOptions[key] = optionDefaults[key];
	            }
	          }));
	          processedOptions.type = name;
	          superFn.call(this, U.extend(options, processedOptions));
	          constructor.call(this, processedOptions);
	          if (this.constructed) {
	            this.constructed = this.constructed.then((function() {
	              if ($.isFunction($__0.construct)) {
	                return P.resolve($__0.construct(options)).return($__0);
	              }
	              return $__0;
	            }));
	          } else if ($.isFunction(this.construct)) {
	            this.beforeConstruction(this.construct(options));
	          }
	          (this.constructed || P.resolve()).then((function() {
	            $__0.root._registerArtefact($__0);
	          }));
	        };
	      }), U.extend({}, prototype, {get circuitboard() {
	          if (!this._circuitboard) {
	            this._circuitboard = this.closestAncestorByType('Circuitboard');
	          }
	          return this._circuitboard;
	        }})));
	    };
	    return window._amy_Artefact;
	  })).tap((function(c) {
	    $.circuitboard.Artefact = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  var KefirSignalHandler = U.newClass(function KefirSignalHandler() {
	    this._events = {};
	    this._properties = {};
	    this._propertyBusses = {};
	  }, {
	    newEvent: function(name) {
	      var source = (arguments[1] !== (void 0) ? arguments[1] : {}).source;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      var bus = Kefir.bus();
	      if (source) {
	        bus.plug(source);
	      }
	      return this._events[name] = bus;
	    },
	    event: function(name) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      return this._events[name];
	    },
	    property: function(name) {
	      return this._properties[name];
	    },
	    p: function(name) {
	      return this._properties[name];
	    },
	    newProperty: function(name) {
	      var $__1 = arguments[1] !== (void 0) ? arguments[1] : {},
	          settable = $__1.settable,
	          initial = $__1.initial,
	          isEqual = $__1.isEqual;
	      U.assert(!this._events[name], ("There is already an event '" + name + "' on this object."));
	      U.assert(!this._properties[name], ("There is already a property '" + name + "' on this object."));
	      if (U.isUndefined(settable)) {
	        settable = true;
	      }
	      var bus = Kefir.bus();
	      var property = this._properties[name] = bus.toProperty(initial).skipDuplicates(isEqual);
	      property.plug = (function(observable) {
	        bus.plug(observable);
	        return property;
	      });
	      property.unplug = (function(observable) {
	        bus.unplug(observable);
	        return property;
	      });
	      property.get = (function() {
	        return property._current;
	      });
	      if (settable) {
	        property.set = (function(value) {
	          bus.emit(value);
	          return property;
	        });
	      }
	      Object.defineProperty(this, name, {
	        get: property.get,
	        set: settable ? property.set : undefined
	      });
	      property.run();
	      this.event('destroy').onValue((function() {
	        bus.end();
	      }));
	      return property;
	    },
	    trigger: function(name, value) {
	      U.assert(this._events[name], ("There is no event '" + name + "' on this object."));
	      this._events[name].emit(value);
	    },
	    on: function(name, expectedValue, options, callback) {
	      var argsObj = this._gatherOnArguments(name, expectedValue, options, callback);
	      return this._on(argsObj);
	    },
	    _on: function($__1) {
	      var $__2 = $__1,
	          name = $__2.name,
	          expectedValue = $__2.expectedValue,
	          callback = $__2.callback;
	      U.assert(this._events[name] || this._properties[name], ("There is no event or property '" + name + "' on this object."));
	      var result = this._events[name] || this._properties[name];
	      if (U.isDefined(expectedValue)) {
	        result = result.filter((function(v) {
	          return v === expectedValue;
	        }));
	      }
	      if (callback) {
	        result = result.onValue(callback);
	      }
	      return result;
	    },
	    _gatherOnArguments: function() {
	      for (var args = [],
	          $__0 = 0; $__0 < arguments.length; $__0++)
	        args[$__0] = arguments[$__0];
	      var result = {name: args.shift()};
	      if (U.isDefined(args[0]) && !U.isFunction(args[0]) && !U.isPlainObject(args[0])) {
	        result.expectedValue = args.shift();
	      }
	      if (U.isDefined(args[0]) && U.isFunction(args[0])) {
	        result.callback = args.shift();
	      }
	      return result;
	    }
	  });
	  return KefirSignalHandler;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(15), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DeltaJs, defer) {
	  'use strict';
	  if (window.__apinatomy_core_deltajs) {
	    return window.__apinatomy_core_deltajs;
	  }
	  var deltaJs = window.__apinatomy_core_deltajs = new DeltaJs();
	  var deferred = defer();
	  deltaJs.selected = deferred.promise;
	  var oldSelect = deltaJs.select;
	  deltaJs.select = function() {
	    for (var args = [],
	        $__0 = 0; $__0 < arguments.length; $__0++)
	      args[$__0] = arguments[$__0];
	    oldSelect.apply(this, args);
	    deferred.resolve(args);
	  };
	  return window.__apinatomy_core_deltajs;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
	  'use strict';
	  return function defer() {
	    var resolve,
	        reject;
	    var promise = new P(function() {
	      resolve = arguments[0];
	      reject = arguments[1];
	    });
	    return {
	      resolve: resolve,
	      reject: reject,
	      promise: promise
	    };
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_15__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyOTM3NDZjMDdiYzYzZDk0MTBlYSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVGhyZWVETW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlySlF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImtlZmlyLWpxdWVyeVwiLFwiY29tbW9uanNcIjpcImtlZmlyLWpxdWVyeVwiLFwiYW1kXCI6XCJrZWZpci1qcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL0FydGVmYWN0LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYWluLWRlbHRhanMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhSnNcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBO0FBQ0E7QUFDQSxzRUFBcUUseUNBQXlDO0FBQzlHLCtDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCwrRUFBOEU7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0Esb0NBQW1DLHNCQUFzQjtBQUN6RCxZQUFXO0FBQ1gsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQ3pDRCxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTyxjQUFjLGNBQWM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSCxFQUFDOzs7Ozs7O0FDM0tEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsK0RBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7aUVDMUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDTkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQix5QkFBeUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDakJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ2ZELGlEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJrZWZpclwiLCBcInR3ZWVuanNcIiwgXCJrZWZpci1qcXVlcnlcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJLZWZpckpRdWVyeVwiXSwgcm9vdFtcIkRlbHRhSnNcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjkzNzQ2YzA3YmM2M2Q5NDEwZWFcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJywgJy4vdXRpbC9taXNjLmpzJywgJy4vVGhyZWVETW9kZWwuanMnXSwgZnVuY3Rpb24oJCwgVEhSRUUsIFAsIEtlZmlyLCBVLCBUaHJlZURNb2RlbFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luLmRvKCd0aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMnLCB7cmVxdWlyZXM6IFsndGhyZWUtZCcsICd0aHJlZS1kLXNwaW5uZXInXX0pO1xuICBwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMnLCB7fSk7XG4gIHBsdWdpbi5hZGQoJ1RpbGUucHJvdG90eXBlLmxvYWRUaHJlZURNb2RlbHMnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIHRocmVlRE1vZGVscyA9IHRoaXMuY2lyY3VpdGJvYXJkLm9wdGlvbnMudGhyZWVETW9kZWxzO1xuICAgIGlmICghdGhyZWVETW9kZWxzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBQLmFsbChbdGhpcy5tb2RlbCwgVGhyZWVETW9kZWxQXSkuc3ByZWFkKChmdW5jdGlvbih0aWxlTW9kZWwsIFRocmVlRE1vZGVsKSB7XG4gICAgICBpZiAodGhyZWVETW9kZWxzW3RpbGVNb2RlbC5pZF0pIHtcbiAgICAgICAgJF9fMC50aHJlZURNb2RlbHMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmtleXModGhyZWVETW9kZWxzW3RpbGVNb2RlbC5pZF0pLmZvckVhY2goKGZ1bmN0aW9uKG1vZGVsSUQpIHtcbiAgICAgICAgICB2YXIgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICAgICAgICB2YXIgY2xvY2tTdHJlYW0gPSBLZWZpci5hbmltYXRpb25GcmFtZXMoKS5tYXAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHZhciBtb2RlbCA9ICRfXzAudGhyZWVETW9kZWxzW21vZGVsSURdID0gbmV3IFRocmVlRE1vZGVsKFUuZXh0ZW5kKHt9LCB0aHJlZURNb2RlbHNbdGlsZU1vZGVsLmlkXVttb2RlbElEXSwge1xuICAgICAgICAgICAgaWQ6IG1vZGVsSUQsXG4gICAgICAgICAgICBwYXJlbnQ6ICRfXzAsXG4gICAgICAgICAgICBjbG9jazogY2xvY2tTdHJlYW0sXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICBtb2RlbC5vYmplY3QzRC50aGVuKChmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgICRfXzAub2JqZWN0M0QuYWRkKG9iamVjdCk7XG4gICAgICAgICAgICAkX18wLnAoJ3NpemUnKS5vblZhbHVlKChmdW5jdGlvbihzaXplKSB7XG4gICAgICAgICAgICAgICRfXzAudGhyZWVETW9kZWxzW21vZGVsSURdLmFkYXB0VG9TdXJmYWNlQXJlYShzaXplKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgbW9kZWwucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLnRha2UoMSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkX18wLmxvYWRpbmdJbmRpY2F0b3Ioe3VudGlsOiBtb2RlbC5vYmplY3QzRH0pO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gJF9fMC50aHJlZURNb2RlbHM7XG4gICAgICB9XG4gICAgfSkpO1xuICB9KTtcbiAgcGx1Z2luLmFwcGVuZCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5sb2FkVGhyZWVETW9kZWxzKCk7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJywgJ2tlZmlyLWpxdWVyeSddLCBmdW5jdGlvbigkLCBVLCBLZWZpciwgVFdFRU4sIEtlZmlySlF1ZXJ5KSB7XG4gIEtlZmlySlF1ZXJ5LmluaXQoS2VmaXIsICQpO1xuICBLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgb2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9iai5vbihldmVudE5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9KTtcbiAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICgoZnVuY3Rpb24oZikge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gIH0pKTtcbiAgS2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoKTtcbiAgICAgICAgICBpZiAoc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgaXRlcmF0aW9uRm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBzdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwgJF9fMSkge1xuICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgZHVyYXRpb24gPSAkX18yLmR1cmF0aW9uLFxuICAgICAgICBkZWxheSA9ICRfXzIuZGVsYXksXG4gICAgICAgIGVhc2luZyA9ICRfXzIuZWFzaW5nO1xuICAgIHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG4gICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBhZGRTdHJlYW0gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNoYWluZWRTdHJlYW1zID0gMDtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGNoYWluZWRTdHJlYW1zICs9IDE7XG4gICAgICAgIGJ1cy5wbHVnKHN0cmVhbSk7XG4gICAgICAgIHN0cmVhbS5vbkVuZCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hhaW5lZFN0cmVhbXMgLT0gMTtcbiAgICAgICAgICBpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHtcbiAgICAgICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0pKSgpO1xuICAgIGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBpZiAoZWFzaW5nKSB7XG4gICAgICAgIHR3LmVhc2luZyhlYXNpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIHR3LmRlbGF5KGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIHR3Lm9uVXBkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQodGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuICAgIH0pKSk7XG4gICAgYnVzLnR3ZWVuID0gdHc7XG4gICAgYnVzLnN0YXJ0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdHcuc3RhcnQoKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgYnVzLmNoYWluID0gKGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICBhZGRTdHJlYW0ob3RoZXIpO1xuICAgICAgdHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuICAgICAgcmV0dXJuIGJ1cztcbiAgICB9KTtcbiAgICByZXR1cm4gYnVzO1xuICB9O1xuICBLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZS5rZXlDb2RlID09PSBrZXlDb2RlO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgZW1pdHRlci5lbWl0KHZhbHVlKTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgYXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgZW1pdHRlci5lbmQoKTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZykge1xuICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IFUuY2FsbDtcbiAgICB2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIG9wZW4gPSBLZWZpci5idXMoKTtcbiAgICB2YXIgY2xvc2UgPSBLZWZpci5idXMoKTtcbiAgICBwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICBvcGVuLmVtaXQoKTtcbiAgICAgICAgd2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuICAgICAgICBjbG9zZS5lbWl0KCk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBidWZmZXIgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5idWZmZXI7XG4gICAgICB3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuICAgICAgcmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY3VtdWxhdG9yID0gKGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICAgICAgcmV0dXJuIChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuICAgICAgfSkpO1xuICAgIH07XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gJF9fMC5vblZhbHVlKChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgICB2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICBvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YnNjcmliZVRvVGhpcygpO1xuICAgICAgICB1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG4gICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24odmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlID09PSB2YWx1ZTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB2YXIgZG9Ob3RoaW5nID0gKGZ1bmN0aW9uKCkge30pO1xuICAgIHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLm9mZlZhbHVlKGRvTm90aGluZyk7XG4gICAgfSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24obGFiZWwpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcbiAgICB9KSkubWFwKChmdW5jdGlvbihldmVudCkge1xuICAgICAgVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbihidXR0b25JZCkge1xuICAgIHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKChmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gYiA9PT0gYnV0dG9uSWQ7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHByZWQoZS53aGljaCk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZygpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gKGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fSkudGhyZXNob2xkO1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKGZ1bmN0aW9uKG1vdXNlRG93bkV2ZW50KSB7XG4gICAgICB2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKGNyb3NzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuICAgICAgICAgIHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpLm1hcCgoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQ6IG1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgIG1vdXNlTW92ZUV2ZW50OiBtb3VzZU1vdmVFdmVudFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcbiAgfTtcbiAgcmV0dXJuIEtlZmlyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoZnVuY3Rpb24oUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBVID0ge1xuICAgIG5ld0NsYXNzOiBmdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgbmV3U3ViY2xhc3M6IGZ1bmN0aW9uKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgICB2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgVS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKG9iajEpIHtcbiAgICAgIGZvciAodmFyIHJlc3QgPSBbXSxcbiAgICAgICAgICAkX18xID0gMTsgJF9fMSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzErKylcbiAgICAgICAgcmVzdFskX18xIC0gMV0gPSBhcmd1bWVudHNbJF9fMV07XG4gICAgICByZXN0LmZvckVhY2goKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gb2JqMTtcbiAgICB9LFxuICAgIGZpZWxkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYWxsOiBmdW5jdGlvbihmbikge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzIgPSAxOyAkX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMisrKVxuICAgICAgICBhcmdzWyRfXzIgLSAxXSA9IGFyZ3VtZW50c1skX18yXTtcbiAgICAgIHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH0sXG4gICAgaWQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0sXG4gICAgZ2V0RGVmOiBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgb2JqZWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KTtcbiAgICB9LFxuICAgIGFycmF5OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKTtcbiAgICB9LFxuICAgIHB1bGw6IGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICB2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ha2VFbXB0eTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICB3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmluZEE6IGZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpO1xuICAgIH0sXG4gICAgYmluZDogZnVuY3Rpb24ob2JqLCBtKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMyA9IDI7ICRfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18zKyspXG4gICAgICAgIGFyZ3NbJF9fMyAtIDJdID0gYXJndW1lbnRzWyRfXzNdO1xuICAgICAgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpO1xuICAgIH0sXG4gICAgYXBwbHlDb25zdHJ1Y3RvcjogZnVuY3Rpb24oQ29uc3RydWN0b3JGbiwgYXJncykge1xuICAgICAgdmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcbiAgICB9LFxuICAgIGFzc2VydDogZnVuY3Rpb24oY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNQbGFpbk9iamVjdDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuICAgIH0sXG4gICAgb2JqVmFsdWVzOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIG1ha2VQb3NpdGlvbmVkOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVmT3I6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgdmFsdWVzID0gW10sXG4gICAgICAgICAgJF9fNCA9IDA7ICRfXzQgPCBhcmd1bWVudHMubGVuZ3RoOyAkX180KyspXG4gICAgICAgIHZhbHVlc1skX180XSA9IGFyZ3VtZW50c1skX180XTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcbiAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIHZhciBsYXRlckZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCAkX18wLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgb25jZVBlclN0YWNrOiBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgaWYgKG5vdFJ1bllldCkge1xuICAgICAgICAgIG5vdFJ1bllldCA9IGZhbHNlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgICAgICB9KSwgMCk7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBjYWNoZWQ6IGZ1bmN0aW9uKCRfXzYpIHtcbiAgICAgIHZhciAkX183ID0gJF9fNixcbiAgICAgICAgICByZXRyaWV2ZSA9ICRfXzcucmV0cmlldmUsXG4gICAgICAgICAgaXNFcXVhbCA9ICRfXzcuaXNFcXVhbDtcbiAgICAgIGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGEgPT09IGIpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIGNhY2hlO1xuICAgICAgZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gY2FjaGU7XG4gICAgICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgY2FjaGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBvbkNoYW5nZS5mb3JFYWNoKChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcbiAgICAgIHZhciByZXN1bHRGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgfSk7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBbXTtcbiAgICAgIHJlc3VsdEZuLm9uQ2hhbmdlID0gKGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIG9uQ2hhbmdlLnB1c2goY2IpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgICB9KTtcbiAgICAgIHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcbiAgICAgIH0pO1xuICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICB9LFxuICAgIHByb21pc2lmeTogZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgcmV0dXJuIG5ldyBQKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZmluZEluZGV4OiBmdW5jdGlvbihhcnJheSwgcHJlZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIG1lbW9pemU6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgdmFyIGNhY2hlID0gW107XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4ga2V5LmV2ZXJ5KChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYXJnc1tpXTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAga2V5cy5wdXNoKGFyZ3MpO1xuICAgICAgICBjYWNoZS5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgdmFyIEVQUyA9IDAuMDAwMDAxO1xuICB2YXIgc29ydE9mRXF1YWwgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24odG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfSk7XG4gIFUuUG9zaXRpb24uc3VidHJhY3QgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcbiAgfSk7XG4gIFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24oaGVpZ2h0LCB3aWR0aCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfSk7XG4gIFUuU2l6ZS5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuICB9KTtcbiAgcmV0dXJuIFU7XG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICcuL3V0aWwvbWlzYy5qcycsICdibHVlYmlyZCcsICcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnLCAnLi9BcnRlZmFjdC5qcyddLCBmdW5jdGlvbigkLCBUSFJFRSwgVSwgUCwgS2VmaXIsIEFydGVmYWN0UCkge1xuICAndXNlIHN0cmljdCc7XG4gIGZ1bmN0aW9uIGlzR2VvbWV0cnkodikge1xuICAgIHJldHVybiB2IGluc3RhbmNlb2YgVEhSRUUuR2VvbWV0cnkgfHwgdiBpbnN0YW5jZW9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICB9XG4gIGZ1bmN0aW9uIGlzT2JqZWN0M0Qodikge1xuICAgIHJldHVybiB2IGluc3RhbmNlb2YgVEhSRUUuT2JqZWN0M0Q7XG4gIH1cbiAgZnVuY3Rpb24gZW5kc1dpdGgoc3RyLCBzdWZmaXgpIHtcbiAgICByZXR1cm4gc3RyLmluZGV4T2Yoc3VmZml4LCBzdHIubGVuZ3RoIC0gc3VmZml4Lmxlbmd0aCkgIT09IC0xO1xuICB9XG4gIHJldHVybiBBcnRlZmFjdFAudGhlbigoZnVuY3Rpb24oQXJ0ZWZhY3QpIHtcbiAgICBpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfVGhyZWVETW9kZWwpKSB7XG4gICAgICByZXR1cm4gd2luZG93Ll9hbXlfVGhyZWVETW9kZWw7XG4gICAgfVxuICAgIHZhciBUaHJlZURNb2RlbCA9IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ1RocmVlRE1vZGVsJywgZnVuY3Rpb24gVGhyZWVETW9kZWwoJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIHJvb3RUaHJlZURNb2RlbCA9ICRfXzIucm9vdFRocmVlRE1vZGVsLFxuICAgICAgICAgIHZpc2libGUgPSAkX18yLnZpc2libGUsXG4gICAgICAgICAgZmlsZSA9ICRfXzIuZmlsZSxcbiAgICAgICAgICBwYXJ0cyA9ICRfXzIucGFydHM7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICBpZiAoVS5pc1VuZGVmaW5lZChyb290VGhyZWVETW9kZWwpKSB7XG4gICAgICAgIHJvb3RUaHJlZURNb2RlbCA9IHRoaXM7XG4gICAgICB9XG4gICAgICB0aGlzLnJvb3RUaHJlZURNb2RlbCA9IHJvb3RUaHJlZURNb2RlbDtcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ3Zpc2libGUnLCB7aW5pdGlhbDogdmlzaWJsZX0pO1xuICAgICAgdGhpcy5uZXdQcm9wZXJ0eSgnaGlkZGVuJykucGx1Zyh0aGlzLnAoJ3Zpc2libGUnKS5ub3QoKSk7XG4gICAgICB0aGlzLnAoJ3Zpc2libGUnKS5wbHVnKHRoaXMucCgnaGlkZGVuJykubm90KCkpO1xuICAgICAgT2JqZWN0LmtleXMocGFydHMgfHwge30pLm1hcCgoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgdmFyIG5ld0NoaWxkT3B0aW9ucyA9IFUuZXh0ZW5kKHt9LCBwYXJ0c1tpZF0sIHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgcGFyZW50OiAkX18wLFxuICAgICAgICAgIHZpc2libGU6IHZpc2libGUsXG4gICAgICAgICAgcm9vdFRocmVlRE1vZGVsOiAkX18wLnJvb3RUaHJlZURNb2RlbFxuICAgICAgICB9KTtcbiAgICAgICAgWydjb2xvcicsICdhbmltYXRpb24nLCAnY2xvY2snXS5mb3JFYWNoKChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgaWYgKFUuaXNVbmRlZmluZWQobmV3Q2hpbGRPcHRpb25zW3Byb3BdKSkge1xuICAgICAgICAgICAgbmV3Q2hpbGRPcHRpb25zW3Byb3BdID0gJF9fMC5vcHRpb25zW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBuZXcgd2luZG93Ll9hbXlfVGhyZWVETW9kZWwobmV3Q2hpbGRPcHRpb25zKTtcbiAgICAgIH0pKTtcbiAgICAgIHRoaXMub2JqZWN0M0QudGhlbigoZnVuY3Rpb24ob2JqZWN0M0QpIHtcbiAgICAgICAgJF9fMC5wKCd2aXNpYmxlJykubWVyZ2UoJF9fMC5vbignZGVzdHJveScpLm1hcFRvKGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24odmlzaWJsZSkge1xuICAgICAgICAgIG9iamVjdDNELnZpc2libGUgPSB2aXNpYmxlO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfSwge1xuICAgICAgZ2V0IGdlb21ldHJ5M0QoKSB7XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl9nZW9tZXRyeTNEKSB7XG4gICAgICAgICAgdGhpcy5fZ2VvbWV0cnkzRCA9IG5ldyBQKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGlmIChVLmlzRGVmaW5lZCgkX18wLm9wdGlvbnMuZmlsZSkpIHtcbiAgICAgICAgICAgICAgJF9fMC5yb290VGhyZWVETW9kZWwucCgndmlzaWJsZScpLnZhbHVlKHRydWUpLnRha2UoMSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJF9fMC5fbG9hZEdlb21ldHJ5RnJvbUZpbGUoKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9nZW9tZXRyeTNEO1xuICAgICAgfSxcbiAgICAgIGdldCBvcmlnaW5hbEJvdW5kaW5nQm94KCkge1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fb3JpZ2luYWxCb3VuZGluZ0JveCkge1xuICAgICAgICAgIHRoaXMuX29yaWdpbmFsQm91bmRpbmdCb3ggPSBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoVS5pc0RlZmluZWQoJF9fMC5vcHRpb25zLmZpbGUpKSB7XG4gICAgICAgICAgICAgICRfXzAuZ2VvbWV0cnkzRC50aGVuKChmdW5jdGlvbihnZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBib3hGcm9tRmlsZSA9IG5ldyBUSFJFRS5Cb3gzKCk7XG4gICAgICAgICAgICAgICAgaWYgKGdlb21ldHJ5IGluc3RhbmNlb2YgVEhSRUUuQnVmZmVyR2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICAgIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuICAgICAgICAgICAgICAgICAgYm94RnJvbUZpbGUuZXhwYW5kQnlQb2ludChnZW9tZXRyeS5ib3VuZGluZ0JveC5taW4pO1xuICAgICAgICAgICAgICAgICAgYm94RnJvbUZpbGUuZXhwYW5kQnlQb2ludChnZW9tZXRyeS5ib3VuZGluZ0JveC5tYXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAoZ2VvbWV0cnkubW9ycGhUYXJnZXRzIHx8IFtdKS5jb25jYXQoW2dlb21ldHJ5XSkuZm9yRWFjaCgoZnVuY3Rpb24oJF9fMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHZlcnRpY2VzID0gJF9fMS52ZXJ0aWNlcztcbiAgICAgICAgICAgICAgICAgICh2ZXJ0aWNlcyB8fCBbXSkuZm9yRWFjaCgoZnVuY3Rpb24ocG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm94RnJvbUZpbGUuZXhwYW5kQnlQb2ludChwb2ludCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBib3hGcm9tRmlsZTtcbiAgICAgICAgICAgICAgfSkpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoVS5pc0RlZmluZWQoJF9fMC5vcHRpb25zLnBhcnRzKSkge1xuICAgICAgICAgICAgICBQLmFsbCgkX18wLmNoaWxkcmVuKS5tYXAoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5vcmlnaW5hbEJvdW5kaW5nQm94O1xuICAgICAgICAgICAgICB9KSkucmVkdWNlKChmdW5jdGlvbihyZXN1bHQsIGJib3gpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmV4cGFuZEJ5UG9pbnQoYmJveC5taW4pLmV4cGFuZEJ5UG9pbnQoYmJveC5tYXgpO1xuICAgICAgICAgICAgICB9KSwgbmV3IFRIUkVFLkJveDMoKSkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3JpZ2luYWxCb3VuZGluZ0JveDtcbiAgICAgIH0sXG4gICAgICBnZXQgb2JqZWN0M0QoKSB7XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLl9vYmplY3QzRCkge1xuICAgICAgICAgIHRoaXMuX29iamVjdDNEID0gdGhpcy5nZW9tZXRyeTNELnRoZW4oKGZ1bmN0aW9uKGdlb21ldHJ5M0QpIHtcbiAgICAgICAgICAgIGlmIChnZW9tZXRyeTNEKSB7XG4gICAgICAgICAgICAgIHJldHVybiAkX18wLnJvb3RUaHJlZURNb2RlbC5vcmlnaW5hbEJvdW5kaW5nQm94LnRoZW4oKGZ1bmN0aW9uKG9yaWdpbmFsQm91bmRpbmdCb3gpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ycmVjdGlvbiA9IG9yaWdpbmFsQm91bmRpbmdCb3guY2VudGVyKCkubmVnYXRlKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3Rpb25NYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4NCgpLnNldFBvc2l0aW9uKGNvcnJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIChnZW9tZXRyeTNELm1vcnBoVGFyZ2V0cyB8fCBbXSkuZm9yRWFjaCgoZnVuY3Rpb24oJF9fMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHZlcnRpY2VzID0gJF9fMS52ZXJ0aWNlcztcbiAgICAgICAgICAgICAgICAgIHZlcnRpY2VzLmZvckVhY2goKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50LmFwcGx5TWF0cml4NChjb3JyZWN0aW9uTWF0cml4KTtcbiAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkzRC5hcHBseU1hdHJpeChjb3JyZWN0aW9uTWF0cml4KTtcbiAgICAgICAgICAgICAgICB2YXIgJF9fMSA9ICRfXzAub3B0aW9ucyxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uID0gJF9fMS5hbmltYXRpb24sXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yID0gJF9fMS5jb2xvcjtcbiAgICAgICAgICAgICAgICB2YXIgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCh7Y29sb3I6IGNvbG9yIHx8ICd3aGl0ZSd9KTtcbiAgICAgICAgICAgICAgICBtYXRlcmlhbC5zaWRlID0gVEhSRUUuRG91YmxlU2lkZTtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0O1xuICAgICAgICAgICAgICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBUSFJFRS5Nb3JwaEFuaW1NZXNoKGdlb21ldHJ5M0QsIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICAgIG9iamVjdC5kdXJhdGlvbiA9IGFuaW1hdGlvbi5kdXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgIG1hdGVyaWFsLm1vcnBoVGFyZ2V0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeTNELmNvbXB1dGVNb3JwaE5vcm1hbHMoKTtcbiAgICAgICAgICAgICAgICAgIHZhciBjbG9jayA9ICRfXzAub3B0aW9ucy5jbG9jaztcbiAgICAgICAgICAgICAgICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgICAgICAgICAgICAgICBjbG9jay50YWtlVW50aWxCeSgkX18wLmV2ZW50KCdkZXN0cm95JykpLm9uVmFsdWUoKGZ1bmN0aW9uKHRpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0LnVwZGF0ZUFuaW1hdGlvbigxMDAwICogKHRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0VGltZSA9IHRpbWU7XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIG9iamVjdCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5M0QsIG1hdGVyaWFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb2JqZWN0LmNhc3RTaGFkb3cgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9iamVjdC5yZWNlaXZlU2hhZG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuICAgICAgICAgICAgICAkX18wLmNoaWxkcmVuLm1hcCgoZnVuY3Rpb24ocGFydCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXJ0Lm9iamVjdDNEO1xuICAgICAgICAgICAgICB9KSkuZm9yRWFjaCgoZnVuY3Rpb24ocGFydE9iamVjdFApIHtcbiAgICAgICAgICAgICAgICBwYXJ0T2JqZWN0UC50aGVuKChmdW5jdGlvbihwYXJ0T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICBvYmplY3QuYWRkKHBhcnRPYmplY3QpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICByZXR1cm4gUC5hbGwoJF9fMC5jaGlsZHJlbi5tYXAoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5vYmplY3QzRDtcbiAgICAgICAgICAgICAgfSkpKS5lYWNoKChmdW5jdGlvbihzdWJPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvYmplY3QuYWRkKHN1Yk9iamVjdCk7XG4gICAgICAgICAgICAgIH0pKS5yZXR1cm4ob2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX29iamVjdDNEO1xuICAgICAgfSxcbiAgICAgIGFkYXB0VG9TdXJmYWNlQXJlYTogZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIFUuYXNzZXJ0KHRoaXMucm9vdFRocmVlRE1vZGVsID09PSB0aGlzLCBcIlRoZSAnYWRhcHRUb1N1cmZhY2VBcmVhJyBtZXRob2Qgc2hvdWxkIG9ubHkgYmUgY2FsbGVkIG9uIGEgcm9vdCBUaHJlZURNb2RlbC5cIik7XG4gICAgICAgIFAuYWxsKFt0aGlzLm9iamVjdDNELCB0aGlzLm9yaWdpbmFsQm91bmRpbmdCb3hdKS5zcHJlYWQoKGZ1bmN0aW9uKG9iaiwgYm91bmRpbmdCb3gpIHtcbiAgICAgICAgICB2YXIgJF9fMTtcbiAgICAgICAgICB2YXIgb2JqV2lkdGggPSBib3VuZGluZ0JveC5zaXplKCkueDtcbiAgICAgICAgICB2YXIgb2JqSGVpZ2h0ID0gYm91bmRpbmdCb3guc2l6ZSgpLnk7XG4gICAgICAgICAgaWYgKChzaXplLndpZHRoIDwgc2l6ZS5oZWlnaHQpICE9PSAob2JqV2lkdGggPCBvYmpIZWlnaHQpKSB7XG4gICAgICAgICAgICBvYmoucm90YXRpb24ueiA9IDAuNSAqIE1hdGguUEk7XG4gICAgICAgICAgICAoJF9fMSA9IFtvYmpIZWlnaHQsIG9ialdpZHRoXSwgb2JqV2lkdGggPSAkX18xWzBdLCBvYmpIZWlnaHQgPSAkX18xWzFdLCAkX18xKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqLnJvdGF0aW9uLnogPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcmF0aW8gPSAwLjggKiBNYXRoLm1pbihzaXplLndpZHRoIC8gb2JqV2lkdGgsIHNpemUuaGVpZ2h0IC8gb2JqSGVpZ2h0KTtcbiAgICAgICAgICBvYmouc2NhbGUuc2V0KHJhdGlvLCByYXRpbywgcmF0aW8pO1xuICAgICAgICAgIHZhciBlbGV2YXRpb24gPSBVLmRlZk9yKCRfXzAub3B0aW9ucy5lbGV2YXRpb24sIE1hdGgubWluKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KSAvIDQpO1xuICAgICAgICAgIG9iai5wb3NpdGlvbi56ID0gMC41ICogcmF0aW8gKiBib3VuZGluZ0JveC5zaXplKCkueiArIGVsZXZhdGlvbjtcbiAgICAgICAgfSkpO1xuICAgICAgfSxcbiAgICAgIF9sb2FkR2VvbWV0cnlGcm9tRmlsZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBmaWxlID0gdGhpcy5vcHRpb25zLmZpbGU7XG4gICAgICAgIHZhciBleHQgPSAnJztcbiAgICAgICAgT2JqZWN0LmtleXMoJC5jaXJjdWl0Ym9hcmQuQ2lyY3VpdGJvYXJkLnRocmVlSnNMb2FkZXJzKS5mb3JFYWNoKChmdW5jdGlvbihleHRlbnNpb24pIHtcbiAgICAgICAgICBpZiAoZXh0ZW5zaW9uLmxlbmd0aCA+IGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChlbmRzV2l0aChmaWxlLCAoXCIuXCIgKyBleHRlbnNpb24pKSkge1xuICAgICAgICAgICAgICBleHQgPSBleHRlbnNpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIFUuYXNzZXJ0KGV4dC5sZW5ndGggPiAwLCAoXCJUaGUgZmlsZSAnXCIgKyBmaWxlICsgXCInIGlzIG5vdCByZWNvZ25pemVkIGFzIGEgM0QgbW9kZWwuXCIpKTtcbiAgICAgICAgdmFyIExvYWRlciA9ICQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVyc1tleHRdO1xuICAgICAgICBVLmFzc2VydChVLmlzRGVmaW5lZChMb2FkZXIpLCBcIlNvbWV0aGluZyB3ZW50IHdyb25nIHJldHJpZXZpbmcgdGhlIDNEIG1vZGVsIGxvYWRlci5cIik7XG4gICAgICAgIHJldHVybiBVLnByb21pc2lmeShuZXcgTG9hZGVyKCksICdsb2FkJykoZmlsZSkudGhlbigoZnVuY3Rpb24oZ2VvbWV0cnkpIHtcbiAgICAgICAgICBVLmFzc2VydChpc0dlb21ldHJ5KGdlb21ldHJ5KSB8fCBpc09iamVjdDNEKGdlb21ldHJ5KSwgKFwiVGhlIDNEIG1vZGVsIGxvYWRlciBmb3IgdGhlICdcIiArIGV4dCArIFwiJyBleHRlbnNpb24gcmV0dXJuZWQgYW4gdW5zdXBwb3J0ZWQgdmFsdWUuXCIpKTtcbiAgICAgICAgICBpZiAoIWlzR2VvbWV0cnkoZ2VvbWV0cnkpKSB7XG4gICAgICAgICAgICBnZW9tZXRyeSA9IGdlb21ldHJ5Lmdlb21ldHJ5IHx8IGdlb21ldHJ5LmNoaWxkcmVuWzBdLmdlb21ldHJ5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZ2VvbWV0cnk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9LCB7dmlzaWJsZTogZmFsc2V9KTtcbiAgICB3aW5kb3cuX2FteV9UaHJlZURNb2RlbC5sb2FkZXJzID0ge307XG4gICAgcmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsO1xuICB9KSkudGFwKChmdW5jdGlvbihjKSB7XG4gICAgJC5jaXJjdWl0Ym9hcmQuVGhyZWVETW9kZWwgPSBjO1xuICB9KSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvVGhyZWVETW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlySlF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImtlZmlyLWpxdWVyeVwiLFwiY29tbW9uanNcIjpcImtlZmlyLWpxdWVyeVwiLFwiYW1kXCI6XCJrZWZpci1qcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJywgJy4vdXRpbC91bmlxdWUtaWQuanMnLCAnLi91dGlsL21haW4tZGVsdGFqcy5qcycsICcuL3V0aWwvZGVmZXIuanMnXSwgZnVuY3Rpb24oJCwgUCwgVSwgS2VmaXJTaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZGVsdGFKcywgZGVmZXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZGVsdGFKcy5zZWxlY3RlZC50aGVuKChmdW5jdGlvbigpIHtcbiAgICBpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfQXJ0ZWZhY3QpKSB7XG4gICAgICByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG4gICAgfVxuICAgIHdpbmRvdy5fYW15X0FydGVmYWN0ID0gZGVsdGFKcy52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEtlZmlyU2lnbmFsSGFuZGxlciwgKGZ1bmN0aW9uKHN1cGVyRm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBBcnRlZmFjdChvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHZhciAkX18xID0gb3B0aW9ucyxcbiAgICAgICAgICAgIGlkID0gJF9fMS5pZCxcbiAgICAgICAgICAgIHR5cGUgPSAkX18xLnR5cGUsXG4gICAgICAgICAgICBwYXJlbnQgPSAkX18xLnBhcmVudCxcbiAgICAgICAgICAgIGJlZm9yZUNvbnN0cnVjdGlvbiA9ICRfXzEuYmVmb3JlQ29uc3RydWN0aW9uO1xuICAgICAgICB0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucm9vdCA9PT0gdGhpcykge1xuICAgICAgICAgIHRoaXMuX2FydGVmYWN0c0J5SUQgPSB7fTtcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlckFydGVmYWN0ID0gZnVuY3Rpb24oYXJ0ZWZhY3QpIHtcbiAgICAgICAgICAgIFUuZ2V0RGVmKHRoaXMuX2FydGVmYWN0c0J5SUQsIGFydGVmYWN0LmlkLCBkZWZlcikucmVzb2x2ZShhcnRlZmFjdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSwge1xuICAgICAgYmVmb3JlQ29uc3RydWN0aW9uOiBmdW5jdGlvbihwb3NzaWJsZVByb21pc2UpIHtcbiAgICAgICAgaWYgKCFwb3NzaWJsZVByb21pc2UgfHwgISQuaXNGdW5jdGlvbihwb3NzaWJsZVByb21pc2UudGhlbikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSxcbiAgICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgIH0sXG4gICAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICAgIH0sXG4gICAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgICB9LFxuICAgICAgZ2V0IHBhcmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgIH0sXG4gICAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgIH0sXG4gICAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290KSB7XG4gICAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucm9vdCA6IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICB9LFxuICAgICAgYXJ0ZWZhY3RCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gVS5nZXREZWYodGhpcy5yb290Ll9hcnRlZmFjdHNCeUlELCBpZCwgZGVmZXIpLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHM6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnKSB7XG4gICAgICAgICAgZm4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGNoaWxkLnRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4Jykge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHNCeVR5cGU6IGZ1bmN0aW9uKHR5cGUsIGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nSW4pIHtcbiAgICAgICAgICBvcHRpb25zLmJlZm9yZUdvaW5nSW4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkuZm9yRWFjaCgoZnVuY3Rpb24oZGVzY2VuZGVudCkge1xuICAgICAgICAgIGRlc2NlbmRlbnQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nT3V0KSB7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVHb2luZ091dCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3Nlc3RBbmNlc3RvckJ5VHlwZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQ7XG4gICAgICAgIH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgd2luZG93Ll9hbXlfQXJ0ZWZhY3QubmV3U3ViY2xhc3MgPSBmdW5jdGlvbiBuZXdTdWJDbGFzcyhuYW1lLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBvcHRpb25EZWZhdWx0cyA9IGFyZ3VtZW50c1szXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbM10gOiB7fTtcbiAgICAgIHJldHVybiBkZWx0YUpzLnZwKG5hbWUsIFUubmV3U3ViY2xhc3Mod2luZG93Ll9hbXlfQXJ0ZWZhY3QsIChmdW5jdGlvbihzdXBlckZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgICAgdmFyIHByb2Nlc3NlZE9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAgIE9iamVjdC5rZXlzKG9wdGlvbkRlZmF1bHRzKS5mb3JFYWNoKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIGlmIChVLmlzVW5kZWZpbmVkKHByb2Nlc3NlZE9wdGlvbnNba2V5XSkpIHtcbiAgICAgICAgICAgICAgcHJvY2Vzc2VkT3B0aW9uc1trZXldID0gb3B0aW9uRGVmYXVsdHNba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgcHJvY2Vzc2VkT3B0aW9ucy50eXBlID0gbmFtZTtcbiAgICAgICAgICBzdXBlckZuLmNhbGwodGhpcywgVS5leHRlbmQob3B0aW9ucywgcHJvY2Vzc2VkT3B0aW9ucykpO1xuICAgICAgICAgIGNvbnN0cnVjdG9yLmNhbGwodGhpcywgcHJvY2Vzc2VkT3B0aW9ucyk7XG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0ZWQgPSB0aGlzLmNvbnN0cnVjdGVkLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKCRfXzAuY29uc3RydWN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBQLnJlc29sdmUoJF9fMC5jb25zdHJ1Y3Qob3B0aW9ucykpLnJldHVybigkX18wKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gJF9fMDtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCQuaXNGdW5jdGlvbih0aGlzLmNvbnN0cnVjdCkpIHtcbiAgICAgICAgICAgIHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKHRoaXMuY29uc3RydWN0KG9wdGlvbnMpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgKHRoaXMuY29uc3RydWN0ZWQgfHwgUC5yZXNvbHZlKCkpLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJF9fMC5yb290Ll9yZWdpc3RlckFydGVmYWN0KCRfXzApO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfTtcbiAgICAgIH0pLCBVLmV4dGVuZCh7fSwgcHJvdG90eXBlLCB7Z2V0IGNpcmN1aXRib2FyZCgpIHtcbiAgICAgICAgICBpZiAoIXRoaXMuX2NpcmN1aXRib2FyZCkge1xuICAgICAgICAgICAgdGhpcy5fY2lyY3VpdGJvYXJkID0gdGhpcy5jbG9zZXN0QW5jZXN0b3JCeVR5cGUoJ0NpcmN1aXRib2FyZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2lyY3VpdGJvYXJkO1xuICAgICAgICB9fSkpKTtcbiAgICB9O1xuICAgIHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcbiAgfSkpLnRhcCgoZnVuY3Rpb24oYykge1xuICAgICQuY2lyY3VpdGJvYXJkLkFydGVmYWN0ID0gYztcbiAgfSkpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0FydGVmYWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnLi9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbigkLCBVLCBLZWZpcikge1xuICB2YXIgS2VmaXJTaWduYWxIYW5kbGVyID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBLZWZpclNpZ25hbEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgdGhpcy5fcHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMuX3Byb3BlcnR5QnVzc2VzID0ge307XG4gIH0sIHtcbiAgICBuZXdFdmVudDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIHNvdXJjZSA9IChhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge30pLnNvdXJjZTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgVS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sIChcIlRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnXCIgKyBuYW1lICsgXCInIG9uIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICB2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGJ1cy5wbHVnKHNvdXJjZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdID0gYnVzO1xuICAgIH0sXG4gICAgZXZlbnQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICB9LFxuICAgIHByb3BlcnR5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICB9LFxuICAgIHA6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuICAgIH0sXG4gICAgbmV3UHJvcGVydHk6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciAkX18xID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgICAgIHNldHRhYmxlID0gJF9fMS5zZXR0YWJsZSxcbiAgICAgICAgICBpbml0aWFsID0gJF9fMS5pbml0aWFsLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX18xLmlzRXF1YWw7XG4gICAgICBVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQoc2V0dGFibGUpKSB7XG4gICAgICAgIHNldHRhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSBidXMudG9Qcm9wZXJ0eShpbml0aWFsKS5za2lwRHVwbGljYXRlcyhpc0VxdWFsKTtcbiAgICAgIHByb3BlcnR5LnBsdWcgPSAoZnVuY3Rpb24ob2JzZXJ2YWJsZSkge1xuICAgICAgICBidXMucGx1ZyhvYnNlcnZhYmxlKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS51bnBsdWcgPSAoZnVuY3Rpb24ob2JzZXJ2YWJsZSkge1xuICAgICAgICBidXMudW5wbHVnKG9ic2VydmFibGUpO1xuICAgICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgICB9KTtcbiAgICAgIHByb3BlcnR5LmdldCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5Ll9jdXJyZW50O1xuICAgICAgfSk7XG4gICAgICBpZiAoc2V0dGFibGUpIHtcbiAgICAgICAgcHJvcGVydHkuc2V0ID0gKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgYnVzLmVtaXQodmFsdWUpO1xuICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuICAgICAgICBnZXQ6IHByb3BlcnR5LmdldCxcbiAgICAgICAgc2V0OiBzZXR0YWJsZSA/IHByb3BlcnR5LnNldCA6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS5ydW4oKTtcbiAgICAgIHRoaXMuZXZlbnQoJ2Rlc3Ryb3knKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVzLmVuZCgpO1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgIH0sXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdGhpcy5fZXZlbnRzW25hbWVdLmVtaXQodmFsdWUpO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcbiAgICB9LFxuICAgIF9vbjogZnVuY3Rpb24oJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIG5hbWUgPSAkX18yLm5hbWUsXG4gICAgICAgICAgZXhwZWN0ZWRWYWx1ZSA9ICRfXzIuZXhwZWN0ZWRWYWx1ZSxcbiAgICAgICAgICBjYWxsYmFjayA9ICRfXzIuY2FsbGJhY2s7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgb3IgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuICAgICAgaWYgKFUuaXNEZWZpbmVkKGV4cGVjdGVkVmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4gdiA9PT0gZXhwZWN0ZWRWYWx1ZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5vblZhbHVlKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBfZ2F0aGVyT25Bcmd1bWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzAgPSAwOyAkX18wIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMCsrKVxuICAgICAgICBhcmdzWyRfXzBdID0gYXJndW1lbnRzWyRfXzBdO1xuICAgICAgdmFyIHJlc3VsdCA9IHtuYW1lOiBhcmdzLnNoaWZ0KCl9O1xuICAgICAgaWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuICAgICAgICByZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcbiAgICAgICAgcmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gS2VmaXJTaWduYWxIYW5kbGVyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgX25leHRJZCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgICByZXR1cm4gKChwcmVmaXggfHwgXCJ1bmlxdWUtaWRcIikgKyBcIi1cIiArIF9uZXh0SWQrKyk7XG4gIH07XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnZGVsdGEtanMnLCAnLi9kZWZlci5qcyddLCBmdW5jdGlvbihQLCBEZWx0YUpzLCBkZWZlcikge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YWpzKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhanM7XG4gIH1cbiAgdmFyIGRlbHRhSnMgPSB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YWpzID0gbmV3IERlbHRhSnMoKTtcbiAgdmFyIGRlZmVycmVkID0gZGVmZXIoKTtcbiAgZGVsdGFKcy5zZWxlY3RlZCA9IGRlZmVycmVkLnByb21pc2U7XG4gIHZhciBvbGRTZWxlY3QgPSBkZWx0YUpzLnNlbGVjdDtcbiAgZGVsdGFKcy5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICRfXzAgPSAwOyAkX18wIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMCsrKVxuICAgICAgYXJnc1skX18wXSA9IGFyZ3VtZW50c1skX18wXTtcbiAgICBvbGRTZWxlY3QuYXBwbHkodGhpcywgYXJncyk7XG4gICAgZGVmZXJyZWQucmVzb2x2ZShhcmdzKTtcbiAgfTtcbiAgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhanM7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9tYWluLWRlbHRhanMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24oUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcbiAgICB2YXIgcmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuICAgICAgcmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICBwcm9taXNlOiBwcm9taXNlXG4gICAgfTtcbiAgfTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2RlZmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFKc1wiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLmpzIn0=