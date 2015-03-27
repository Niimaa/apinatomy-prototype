(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("tweenjs"), require("kefir"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "tweenjs", "kefir", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("tweenjs"), require("kefir"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["TWEEN"], root["Kefir"], root["KefirJQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(4), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, Kefir, TWEEN) {
	  'use strict';
	  var plugin = $.circuitboard.plugin.do('three-d-camera-snapshot', {
	    resolves: ['three-d', 'snapshot'],
	    requires: ['three-d-auto-controls']
	  });
	  plugin.append('Snapshot.prototype.take', function() {
	    if (!this.options.camera3D) {
	      return;
	    }
	    this.object.camera3D = {
	      position: {
	        x: this.circuitboard.camera3D.position.x,
	        y: this.circuitboard.camera3D.position.y,
	        z: this.circuitboard.camera3D.position.z
	      },
	      rotation: {
	        x: this.circuitboard.camera3D.rotation.x,
	        y: this.circuitboard.camera3D.rotation.y,
	        z: this.circuitboard.camera3D.rotation.z
	      },
	      up: {
	        x: this.circuitboard.camera3D.up.x,
	        y: this.circuitboard.camera3D.up.y,
	        z: this.circuitboard.camera3D.up.z
	      }
	    };
	    var semanticTarget = this.circuitboard.camera3D.userData.semanticTarget;
	    if (semanticTarget) {
	      U.assert(semanticTarget.type === 'Tile', ("At this point in development, the only semantic camera target should be a Tile. But it's a " + semanticTarget.type + "!"));
	      this.object.camera3D.semanticTarget = semanticTarget.model.id;
	    } else {
	      this.object.camera3D.target = {
	        x: this.circuitboard.camera3D.userData.target.x,
	        y: this.circuitboard.camera3D.userData.target.y,
	        z: this.circuitboard.camera3D.userData.target.z
	      };
	    }
	  }).append('Snapshot.prototype.restore', function() {
	    var $__0 = this;
	    if (!this.options.camera3D) {
	      return;
	    }
	    this.circuitboard.cameraTargetTile = null;
	    var targetP;
	    if (this.object.camera3D.semanticTarget) {
	      targetP = this.circuitboard.tile(this.object.camera3D.semanticTarget).then((function(tile) {
	        return $__0.circuitboard.object3D.localToWorld(tile.object3D.position.clone());
	      }));
	    } else {
	      targetP = P.resolve(this.object.camera3D.target);
	    }
	    targetP.then((function(target) {
	      var easing = {
	        duration: 800,
	        easing: TWEEN.Easing.Sinusoidal.InOut
	      };
	      var from = $__0.circuitboard.camera3D;
	      var to = $__0.object.camera3D;
	      var tweenPosition = Kefir.tween(from.position, to.position, easing);
	      var tweenRotation = Kefir.tween(from.rotation, to.rotation, easing);
	      var tweenUp = Kefir.tween(from.up, to.up, easing);
	      var tweenTarget = Kefir.tween(from.userData.target, target, easing);
	      Kefir.merge([tweenPosition.start(), tweenRotation.start(), tweenUp.start(), tweenTarget.start()]);
	    }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(6), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjMGQzZmVmYTk4YTFmMGY0NDYxOSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWNhbWVyYS1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQ2xFRCxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7aUVDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0Esb0JBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQSxvQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0Esb0NBQW1DO0FBQ25DLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0Esb0JBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQSxzQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQix5QkFBeUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0Esc0JBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsRUFBQzs7Ozs7OztBQzlQRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQzFORCxnRDs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcInR3ZWVuanNcIiwgXCJrZWZpclwiLCBcImtlZmlyLWpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wiS2VmaXJcIl0sIHJvb3RbXCJLZWZpckpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjMGQzZmVmYTk4YTFmMGY0NDYxOVxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICdibHVlYmlyZCcsICcuL3V0aWwvbWlzYy5qcycsICcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnLCAndHdlZW5qcyddLCBmdW5jdGlvbigkLCBQLCBVLCBLZWZpciwgVFdFRU4pIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luLmRvKCd0aHJlZS1kLWNhbWVyYS1zbmFwc2hvdCcsIHtcbiAgICByZXNvbHZlczogWyd0aHJlZS1kJywgJ3NuYXBzaG90J10sXG4gICAgcmVxdWlyZXM6IFsndGhyZWUtZC1hdXRvLWNvbnRyb2xzJ11cbiAgfSk7XG4gIHBsdWdpbi5hcHBlbmQoJ1NuYXBzaG90LnByb3RvdHlwZS50YWtlJywgZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FtZXJhM0QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5vYmplY3QuY2FtZXJhM0QgPSB7XG4gICAgICBwb3NpdGlvbjoge1xuICAgICAgICB4OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5wb3NpdGlvbi54LFxuICAgICAgICB5OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5wb3NpdGlvbi55LFxuICAgICAgICB6OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC5wb3NpdGlvbi56XG4gICAgICB9LFxuICAgICAgcm90YXRpb246IHtcbiAgICAgICAgeDogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0Qucm90YXRpb24ueCxcbiAgICAgICAgeTogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0Qucm90YXRpb24ueSxcbiAgICAgICAgejogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0Qucm90YXRpb24uelxuICAgICAgfSxcbiAgICAgIHVwOiB7XG4gICAgICAgIHg6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVwLngsXG4gICAgICAgIHk6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVwLnksXG4gICAgICAgIHo6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVwLnpcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzZW1hbnRpY1RhcmdldCA9IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0O1xuICAgIGlmIChzZW1hbnRpY1RhcmdldCkge1xuICAgICAgVS5hc3NlcnQoc2VtYW50aWNUYXJnZXQudHlwZSA9PT0gJ1RpbGUnLCAoXCJBdCB0aGlzIHBvaW50IGluIGRldmVsb3BtZW50LCB0aGUgb25seSBzZW1hbnRpYyBjYW1lcmEgdGFyZ2V0IHNob3VsZCBiZSBhIFRpbGUuIEJ1dCBpdCdzIGEgXCIgKyBzZW1hbnRpY1RhcmdldC50eXBlICsgXCIhXCIpKTtcbiAgICAgIHRoaXMub2JqZWN0LmNhbWVyYTNELnNlbWFudGljVGFyZ2V0ID0gc2VtYW50aWNUYXJnZXQubW9kZWwuaWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub2JqZWN0LmNhbWVyYTNELnRhcmdldCA9IHtcbiAgICAgICAgeDogdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0LngsXG4gICAgICAgIHk6IHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC55LFxuICAgICAgICB6OiB0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQuelxuICAgICAgfTtcbiAgICB9XG4gIH0pLmFwcGVuZCgnU25hcHNob3QucHJvdG90eXBlLnJlc3RvcmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2FtZXJhM0QpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9IG51bGw7XG4gICAgdmFyIHRhcmdldFA7XG4gICAgaWYgKHRoaXMub2JqZWN0LmNhbWVyYTNELnNlbWFudGljVGFyZ2V0KSB7XG4gICAgICB0YXJnZXRQID0gdGhpcy5jaXJjdWl0Ym9hcmQudGlsZSh0aGlzLm9iamVjdC5jYW1lcmEzRC5zZW1hbnRpY1RhcmdldCkudGhlbigoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICByZXR1cm4gJF9fMC5jaXJjdWl0Ym9hcmQub2JqZWN0M0QubG9jYWxUb1dvcmxkKHRpbGUub2JqZWN0M0QucG9zaXRpb24uY2xvbmUoKSk7XG4gICAgICB9KSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldFAgPSBQLnJlc29sdmUodGhpcy5vYmplY3QuY2FtZXJhM0QudGFyZ2V0KTtcbiAgICB9XG4gICAgdGFyZ2V0UC50aGVuKChmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgIHZhciBlYXNpbmcgPSB7XG4gICAgICAgIGR1cmF0aW9uOiA4MDAsXG4gICAgICAgIGVhc2luZzogVFdFRU4uRWFzaW5nLlNpbnVzb2lkYWwuSW5PdXRcbiAgICAgIH07XG4gICAgICB2YXIgZnJvbSA9ICRfXzAuY2lyY3VpdGJvYXJkLmNhbWVyYTNEO1xuICAgICAgdmFyIHRvID0gJF9fMC5vYmplY3QuY2FtZXJhM0Q7XG4gICAgICB2YXIgdHdlZW5Qb3NpdGlvbiA9IEtlZmlyLnR3ZWVuKGZyb20ucG9zaXRpb24sIHRvLnBvc2l0aW9uLCBlYXNpbmcpO1xuICAgICAgdmFyIHR3ZWVuUm90YXRpb24gPSBLZWZpci50d2Vlbihmcm9tLnJvdGF0aW9uLCB0by5yb3RhdGlvbiwgZWFzaW5nKTtcbiAgICAgIHZhciB0d2VlblVwID0gS2VmaXIudHdlZW4oZnJvbS51cCwgdG8udXAsIGVhc2luZyk7XG4gICAgICB2YXIgdHdlZW5UYXJnZXQgPSBLZWZpci50d2Vlbihmcm9tLnVzZXJEYXRhLnRhcmdldCwgdGFyZ2V0LCBlYXNpbmcpO1xuICAgICAgS2VmaXIubWVyZ2UoW3R3ZWVuUG9zaXRpb24uc3RhcnQoKSwgdHdlZW5Sb3RhdGlvbi5zdGFydCgpLCB0d2VlblVwLnN0YXJ0KCksIHR3ZWVuVGFyZ2V0LnN0YXJ0KCldKTtcbiAgICB9KSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGhyZWUtZC1jYW1lcmEtc25hcHNob3QuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoZnVuY3Rpb24oUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBVID0ge1xuICAgIG5ld0NsYXNzOiBmdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgbmV3U3ViY2xhc3M6IGZ1bmN0aW9uKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgICB2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgVS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKG9iajEpIHtcbiAgICAgIGZvciAodmFyIHJlc3QgPSBbXSxcbiAgICAgICAgICAkX18xID0gMTsgJF9fMSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzErKylcbiAgICAgICAgcmVzdFskX18xIC0gMV0gPSBhcmd1bWVudHNbJF9fMV07XG4gICAgICByZXN0LmZvckVhY2goKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gb2JqMTtcbiAgICB9LFxuICAgIGZpZWxkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYWxsOiBmdW5jdGlvbihmbikge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzIgPSAxOyAkX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMisrKVxuICAgICAgICBhcmdzWyRfXzIgLSAxXSA9IGFyZ3VtZW50c1skX18yXTtcbiAgICAgIHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH0sXG4gICAgaWQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0sXG4gICAgZ2V0RGVmOiBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgb2JqZWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KTtcbiAgICB9LFxuICAgIGFycmF5OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKTtcbiAgICB9LFxuICAgIHB1bGw6IGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICB2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ha2VFbXB0eTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICB3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmluZEE6IGZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpO1xuICAgIH0sXG4gICAgYmluZDogZnVuY3Rpb24ob2JqLCBtKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMyA9IDI7ICRfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18zKyspXG4gICAgICAgIGFyZ3NbJF9fMyAtIDJdID0gYXJndW1lbnRzWyRfXzNdO1xuICAgICAgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpO1xuICAgIH0sXG4gICAgYXBwbHlDb25zdHJ1Y3RvcjogZnVuY3Rpb24oQ29uc3RydWN0b3JGbiwgYXJncykge1xuICAgICAgdmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcbiAgICB9LFxuICAgIGFzc2VydDogZnVuY3Rpb24oY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNQbGFpbk9iamVjdDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuICAgIH0sXG4gICAgb2JqVmFsdWVzOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIG1ha2VQb3NpdGlvbmVkOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVmT3I6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgdmFsdWVzID0gW10sXG4gICAgICAgICAgJF9fNCA9IDA7ICRfXzQgPCBhcmd1bWVudHMubGVuZ3RoOyAkX180KyspXG4gICAgICAgIHZhbHVlc1skX180XSA9IGFyZ3VtZW50c1skX180XTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcbiAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIHZhciBsYXRlckZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCAkX18wLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgb25jZVBlclN0YWNrOiBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgaWYgKG5vdFJ1bllldCkge1xuICAgICAgICAgIG5vdFJ1bllldCA9IGZhbHNlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgICAgICB9KSwgMCk7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBjYWNoZWQ6IGZ1bmN0aW9uKCRfXzYpIHtcbiAgICAgIHZhciAkX183ID0gJF9fNixcbiAgICAgICAgICByZXRyaWV2ZSA9ICRfXzcucmV0cmlldmUsXG4gICAgICAgICAgaXNFcXVhbCA9ICRfXzcuaXNFcXVhbDtcbiAgICAgIGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGEgPT09IGIpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIGNhY2hlO1xuICAgICAgZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gY2FjaGU7XG4gICAgICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgY2FjaGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBvbkNoYW5nZS5mb3JFYWNoKChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcbiAgICAgIHZhciByZXN1bHRGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgfSk7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBbXTtcbiAgICAgIHJlc3VsdEZuLm9uQ2hhbmdlID0gKGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIG9uQ2hhbmdlLnB1c2goY2IpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgICB9KTtcbiAgICAgIHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcbiAgICAgIH0pO1xuICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICB9LFxuICAgIHByb21pc2lmeTogZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgcmV0dXJuIG5ldyBQKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZmluZEluZGV4OiBmdW5jdGlvbihhcnJheSwgcHJlZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIG1lbW9pemU6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgdmFyIGNhY2hlID0gW107XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4ga2V5LmV2ZXJ5KChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYXJnc1tpXTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAga2V5cy5wdXNoKGFyZ3MpO1xuICAgICAgICBjYWNoZS5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgdmFyIEVQUyA9IDAuMDAwMDAxO1xuICB2YXIgc29ydE9mRXF1YWwgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24odG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfSk7XG4gIFUuUG9zaXRpb24uc3VidHJhY3QgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcbiAgfSk7XG4gIFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24oaGVpZ2h0LCB3aWR0aCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfSk7XG4gIFUuU2l6ZS5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuICB9KTtcbiAgcmV0dXJuIFU7XG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAna2VmaXInLCAndHdlZW5qcycsICdrZWZpci1qcXVlcnknXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIFRXRUVOLCBLZWZpckpRdWVyeSkge1xuICBLZWZpckpRdWVyeS5pbml0KEtlZmlyLCAkKTtcbiAgS2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvYmoub24oZXZlbnROYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoKGZ1bmN0aW9uKGYpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICB9KSk7XG4gIEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCk7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbkZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsICRfXzEpIHtcbiAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgIGR1cmF0aW9uID0gJF9fMi5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSAkX18yLmRlbGF5LFxuICAgICAgICBlYXNpbmcgPSAkX18yLmVhc2luZztcbiAgICB2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgYWRkU3RyZWFtID0gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBjaGFpbmVkU3RyZWFtcyArPSAxO1xuICAgICAgICBidXMucGx1ZyhzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ub25FbmQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoYWluZWRTdHJlYW1zIC09IDE7XG4gICAgICAgICAgaWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7XG4gICAgICAgICAgICBidXMuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9KSkoKTtcbiAgICBhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgaWYgKGVhc2luZykge1xuICAgICAgICB0dy5lYXNpbmcoZWFzaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICB0dy5kZWxheShkZWxheSk7XG4gICAgICB9XG4gICAgICB0dy5vblVwZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcbiAgICB9KSkpO1xuICAgIGJ1cy50d2VlbiA9IHR3O1xuICAgIGJ1cy5zdGFydCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHR3LnN0YXJ0KCk7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIGJ1cy5jaGFpbiA9IChmdW5jdGlvbihvdGhlcikge1xuICAgICAgYWRkU3RyZWFtKG90aGVyKTtcbiAgICAgIHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1cztcbiAgfTtcbiAgS2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG4gICAgcmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcpIHtcbiAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBVLmNhbGw7XG4gICAgdmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBvcGVuID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGNsb3NlID0gS2VmaXIuYnVzKCk7XG4gICAgcGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgb3Blbi5lbWl0KCk7XG4gICAgICAgIHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgY2xvc2UuZW1pdCgpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgYnVmZmVyID0gKGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSkuYnVmZmVyO1xuICAgICAgd2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcbiAgICAgIHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IChmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICAgIHJldHVybiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuICAgIHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvVGhpcyA9ICRfXzAub25WYWx1ZSgoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgb2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1RoaXMoKTtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1BhY2luZygpO1xuICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSA9PT0gdmFsdWU7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIGRvTm90aGluZyA9IChmdW5jdGlvbigpIHt9KTtcbiAgICB0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vZmZWYWx1ZShkb05vdGhpbmcpO1xuICAgIH0pO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihldmVudCkge1xuICAgICAgcmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24oYnV0dG9uSWQpIHtcbiAgICB2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6ICgoZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIGIgPT09IGJ1dHRvbklkO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBwcmVkKGUud2hpY2gpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKS5tYXAoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgIG1vdXNlRG93bkV2ZW50OiBtb3VzZURvd25FdmVudCxcbiAgICAgICAgICBtb3VzZU1vdmVFdmVudDogbW91c2VNb3ZlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICB1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG4gIH07XG4gIHJldHVybiBLZWZpcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJKUXVlcnlcIixcImNvbW1vbmpzMlwiOlwia2VmaXItanF1ZXJ5XCIsXCJjb21tb25qc1wiOlwia2VmaXItanF1ZXJ5XCIsXCJhbWRcIjpcImtlZmlyLWpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1jYW1lcmEtc25hcHNob3QuanMifQ==