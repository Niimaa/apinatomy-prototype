(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs")) : factory(root["jQuery"], root["P"], root["Kefir"], root["TWEEN"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-button-to-point-camera',
	    requires: ['tile-buttons', 'three-d']
	  });
	  plugin.insert('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('cameraTargetTile', {initial: null});
	    var newTarget = this.p('cameraTargetTile').changes();
	    var newTileTarget = newTarget.filter((function(t) {
	      return t !== null;
	    }));
	    this.p('cameraTargetTile').plug(newTileTarget.flatMapLatest((function(tile) {
	      return tile.p('hidden').value(true).merge($__0.on('destroy')).takeUntilBy($__0.p('cameraTargetTile').value(null));
	    })).mapTo(null));
	    newTarget.flatMapLatest((function(tile) {
	      if (!tile) {
	        return Kefir.never();
	      }
	      return Kefir.merge([Kefir.once(), tile.p('size').changes(), tile.p('position').changes()]).mapTo(tile);
	    })).onValue((function(tile) {
	      $__0.camera3D.userData.target = $__0.object3D.localToWorld(tile.object3D.position.clone());
	      $__0.camera3D.userData.semanticTarget = tile;
	    }));
	    newTarget.value(null).onValue((function() {
	      delete $__0.camera3D.userData.semanticTarget;
	    }));
	    Kefir.fromArray([null, null]).concat(newTarget).slidingWindow(2).map((function($__1) {
	      var $__2 = $__1,
	          a = $__2[0],
	          b = $__2[1];
	      return [b, a];
	    })).onValue((function($__1) {
	      var $__2 = $__1,
	          newTarget = $__2[0],
	          oldTarget = $__2[1];
	      if (newTarget) {
	        newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(4) + ")")});
	      }
	      if (oldTarget) {
	        oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(5) + ")")});
	      }
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.addButton({
	      name: 'pointCamera',
	      icon: __webpack_require__(5)
	    }).onValue((function() {
	      if ($__0.circuitboard.cameraTargetTile === $__0) {
	        $__0.circuitboard.cameraTargetTile = null;
	      } else {
	        $__0.circuitboard.cameraTargetTile = $__0;
	      }
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(6)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3gwXARsL0/gt/QAAEaJJREFUeNrtnXlQk1e/x78JARRMSAIJBmRTiMuAEhVlUzu9jCvjBri0rq/avo5LtWMHfe2t71R7W6VjvTMt1JlWvWqrVdDCKJaxt5U6QqsdZHMBVEhk01AiSwQEcu4fxlylPE8iW56E85k5M8A5JL9zzvd5nrP8zu8BKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhWKH8GzEzokA5gEIBeANwJmDthMAbQCqANwEkAkgj0qsd0QB+BlAPYCnADqNDc3l1Gm0td5oexTtxte9lAgZAuAjAK0ADDbQ6UzJYKzDR8Y6USzofFcAKTbc6Uwp2Vg3CkvnOwH4Tzvs/Bdpt7GOlG46nwcg0o47/0WKNNaV0s3VnzMIBJDLpbsAl5QYCeAaWwGZTAaZTAZHR0dOiri9vR1arRZardaSuubSy/5VzrJdOSqVipw5c4Z0dHQQrtLR0UHOnDlDVCqVubvAGdrdrzIcwDOmBvP39ydXrlwhtsKvv/5K/Pz82ATwDIAnFxqezxEBrAfAeF9fuHAhoqOjbUbN06ZNw8KFC9mKOBrrTAVACOED+AdTvlwux7Rp0+Dg4GAzAnBwcMC0adMgl8vZiv2DC7MBqwuAx+PNBRDAlB8WFoYZM2bY3DNtxowZmDx5MluRkca6D/pHwHvG5+LfcHZ2RnR0NNzd3W1OAB4eHoiOjoazszPjzc9Y90EtACWAMKbpqFKpxOzZs212ZDt79mwolUq2KXgYgKDBLIANAFyYMidOnIjQ0FCbFYBKpYJKpWIr4mpsg8EnAEKIAMAiptG/QqHAvHnzbH5+O2/ePAwfPpxtNrDI2BaDjpUAGpjmyhEREaStrY3YOm1tbSQiIoJtTaABwIrB+AhYAUDY7X3R1RWzZs2Ck5Ptb5w5OTlh1qxZcHFhfNIJjReDfUMI4Rnn/DAOfjRMV0VAQAApKSkh9sLdu3dJQEAA211AY2wTEEL4A7k+IOiPjgbg8FLi83i8YTweLxBACIAxAP4DgFe3tyQ+H6GhoWyjZ5tj9OjRmDBhAtRqNQwGQ3dFvAAcBfC/PB7vLoAiAPcIIc147lXU+SLxeDzCpataQAhxMRgM4vT0dDkAHwBT8Xxl7yCALACVeI3tUrFYTDIyMoi9kZ6eTsRi8etuHVca2/AggHXGtvVJT0+XGwwGMSHEpbcDSN5rdrgLj8eTGKcvHsZ5/JiX0ujeiio4OBhFRUV2+RgMCQlBcXFxX3xUCYC7L6VSAHUA9IQQHY/He9rXV7oIwHQA/wbwG9vovTfJ0dGRfPLJJ8Re2bdvH3F0dOwvR5MGY9/8G8B0Qoiwz4QL4L8BNKOfvWXc3d1JVVWV3QqgqqqKuLu7D4TXUbOxz0J62/kxAK5jgNylEhISiL0TFxc3kO5n14192KNZQCSArwGM6tdpiEAAhUIBLy8vvPde/+yN1NfXQ6PRoLq6GnV1dXjy5An0ej06OjpMNri6ukIsFsPDwwNeXl7w9fWFVCrtc1u2bduGyspKVFdXo6amxmRDPxFm7MNVeO5vadkgMD09Xb5gwYJLeH4ki6CPfAflcjn8/Pzg6+sLb29v+Pr6QqFQmHz9xo8fDz6/b9am7ty5g9zcXBQUFODBgweora2FVquFTqdDU1MTCHl1NsXj8SAUCiGRSCCTyaBQKBAQEIAJEyYgMjISY8aM6RO7DAYDCgsLTb6DNTU10Gg0qKqqgkajgVqtxuPHj/ts+GbsuzydTjdbIpFoLZ0FfALgXz39VldXVyiVSgQEBGDkyJEICAiAl5cXpFIpJBIJpFIpxGIxXF379pxER0cH0tLScOHCBdy+fRsVFRWor6/v1WdKpVL4+/sjODgYsbGxWLx4cZ87p+j1ejx58gT19fXQ6XSor69HdXU1ysvL8eDBA5SXl6O0tBR6vb43X/NfAHZbIgBPAOUAhppdR+bzMXr0aCiVSgQFBSEoKAgBAQFwc3ODm5sbhEKhKfU3hw8fxvfff4+SkhI8evSoX75j+PDhUCqVePvtt/HOO+/0e52amppMqaGhAQ0NDSgvL0dZWRnKyspQWlqKkpISpsWlrrTgueON2cb5J9vAgsfjkdWrV5OsrCxSXFxMysvLSW1tLWlsbCTt7e0DPqi6ePEiCQ8P78kiS4+TWCwm4eHhJDMzc8Dr297eThobG0ltbS0pLy8nxcXFJCsri6xatYoYVwnZ0ruWKCWD6QP4fD757LPPSHNzs9VH03q9nqxZs4ZIpVKrHfKQSqVk7dq1RK/XW709mpubyaeffmpOBBmWCIBxkyY2NpZoNBqrVzYnJ4eMHTuWCAQCq5/0EQgEZNy4cSQ3N9fq7aJWq0lsbCybvWpLBMDon5+YmGj1Sh45coTIZDLOHfmSyWTk6NGjVm+fxMRENjvbLFkHYPTPHzp0KKxJUlIS9u7di6amJss2OnjPx7gikQhTpkzBG2+8AZVKhcDAQCgUCgwbNsw02Hr06BHKysqQl5eH7Oxs/PHHH6bv6Tpl7A6tVoutW7eirq4OO3bssFobmekjixwsGBW0Z88eqyn7wIEDxMXFxaKrkc/nE5FIRGJiYkhqaippbW197e9raWkhZ86cITExMUQkEhE+n2/Rd7u6upIDBw5YrZ327NljzkbbE8DXX39NRCKRxfsJcXFx5ObNm332/Xl5eSQ+Pp54eHhYZIObmxs5fPgwFUBf7aN7eXmZbXQnJycSGRlJLl261G+2/PTTTyQyMpI4OTmZtcfb29sqfg12JYDCwkIyZcoUi6ZjW7ZsIS0tLf1uU0tLC9m0aRORSCRm7Zo6dSopLCykAugJOp2OrFu3zqIrLTk5ecCvtC+//JKMGDHCrH3r168nOp2OCuB1z9kfP37cbOOOGDGCnD171moDrtTUVOLj42PWzhMnTpDOzk5OCoCTBxI0Gg3279/PWkYsFuPQoUOIi4uz+HO1Wi1u374NtVqNuro66PV6CIVCLFu2jO3wBiNxcXHg8/lYt24ddDodY7kDBw4gOjoa/v7+nGtrzgmgra0NZ8+exa1bt1jL7d+/3+LOv3nzJtLT0/Hnn3/i/v37qK6uRmNjoym/qKgI3377bY/sXbRoEerq6lg3h4qKipCamoqtW7faxFkHqz4CNBqN2ZW+7du3WzTgq6mpIbt27SLBwcGs83hPT89eDwzff/99Vps9PT3Jw4cPOfcI4HNJee3t7Th//jxrkCWVSoWNGzdiyBD2wJs5OTmIj4/H559/juLiYsYtUwcHB+zcubNXdg8ZMgQbN27ExIkTGcs8evQI586dQ3t7O70DMPH06VMSGBjIquBTp04Rg8HA+jlZWVmMg7NZs2aRpKQkkpmZSX7//Xdy69atPtvNO3XqFKvtSqWy33cObXYWYDAYyJUrV1iNnzt3rtndyJycnG5X7FauXEny8/OJTqcjra2tZkXU08fX3LlzWetw9erVfvlum38EEEJw9uxZ1jLLly+Hj48PY35VVRXeeust1NXVmf7m7e2N06dP45tvvsGECRMgFovh7Oxs2ijqS3x8fLBs2TLWMj/88INFm0sDBacEkJHB7K8wZcoU1mARra2t+PDDD1FRUWH6W1BQEI4dO4alS5cO2Og7NDQUYWFhzN42GRlUAN2hVqvx8OFDxvzp06cjMDCQUTw3b97EsWPHTH9TKBTYu3cvYmJiBrQegYGBmD59Ousah0ajoQLoytWrV1n39UNDQxlH/p2dndi3b9//L24IBFi+fDmWLl1qlf14lUrF+oj57bffqAC6kpfH/HaVMWPGsK6i1dTUIDMz0/R7cHAwtmzZYrW6+Pv7Y/To0awLU1QAXbhz5w5jnp+fH7y8vBjzz507Z/rZ0dERUVFRVl12VSgU8PPz61FdB60AXh68dWX48OHw8PBgzP/ll19MP7u7u1s9uJSHhwfr3gJbXQetANhW/yQSCevhkpfjCQiFQtYVuYFAJBJBIpEw5vfh0S/7EcDLmzNdYQmwBACorKw0/ezk5ARPT+sH4maz2VKn1kElALbjTQIB+6bly+vrXNltY7O5s7OTCuBvhrCcCjZ3hPrdd981TcFWrVrFifqw2dxXJ6D7RKhcMUQkEuHJkyfd5j19yh7y5uOPP8acOXMwdOhQREREcKI+bDa7ublRAXRFJpMxCuDFmX6mgaBcLseCBQs406hNTU2sHkIymYw+ArpbPGGitrb2lQ0erlNXV4fa2toe1XXQCmDcuHGMeWq1GtXV1TYjgOrqaqjVzOcwx44dSwXQFbadvrt373Jq8cQcFRUVKCkpYcw3E0J+cAqAbQeNEIL8/Hy0trZyvvNbW1uRn5/PuuXLVtdBKwA/Pz9WZ4/s7GyUlZVxXgBlZWXIzs5mzPf19YWvry8VQFd4PB7mz5/PmH/jxg0UFBRwXgD5+fm4ceMGY/78+fP7xRvJLgSwZMkS1jKnT59mdRqxNg8fPsTp06dZyyxZsoQKgEkAYWFhCApifofSxYsXce3aNU65VL08Trl27dorfgldUSqVmDx5MhUAEwKBAJs3b2Ytk5SUhPv373NOAPfu3UNSUhJrmc2bN5vd1xjUAnB0dMTixYtZ37iZl5eHlJQUTs0IWlpakJyczOrV5OnpiUWLFnHuzed8rl1JcrncbIydgwcP4uTJk5yx+cSJEzh06BBrmR07dph7lSwVAPB8Ozc+Ph4hIeyRzhMTE5GWlmZ1e9PS0rBr1y7WMiEhIYiPj+fkwVDOCeDFmkBiYiJrmfr6emzbts3sYZL+JDU1Fdu2bTMbj3jnzp2cmvtzXgB8Ph+xsbFYv579DeuVlZXYvn07vvrqqwG3MTk52RT6nY0NGzZg3rx5nPIBMDujAUdiBBUVFZGpU6eajcAhkUjIpk2bBiRka0tLC9m8ebNFMYLCw8NJUVERjRHUGzIyMoi3t7dF7xsKDw/v1yhhly5dIhERERZFCRsxYgSNEtZXpKSkEKFQaHGcwISEBFJQUNBn35+fn08SEhIsjhMoFApJSkoKjRNo7UihM2fOJOfOnetRpNDW1laSlpZGZs6cadeRQm3mrdUffPABAFgUK9hgMKCxsRGXL1/G5cuXIRKJEB4ejjfffBOhoaEYNWoUPD09TW8s0ev1qKmpwb1791BQUIDs7Gzk5uaaXNUtXXoWCoX46KOPrBor2K4Ggd1x/PhxIpfLORctXC6XkxMnTli9fWw6RpAlrFy5EhcvXkRwcDAn1tUFAgFCQkJw4cIFrFixwuaudr4t3qImT56MGzduYMWKFf3yajdLkUqlWLlyJa5fv84aFIIKoB8YMmQIjh49ipMnTyIyMpL1LF5fI5FIEBUVhe+++w5HjhwxG7GMywhg48yZMwdz5szB0aNHcezYMZSWlrK6ZPeGF28NW7NmDdauXQt7QAA7Ye3atVi9ejXS0tKQmZmJoqIiVFRU4K+//urV57q7u8Pf3x8hISGYO3cu4uPjOeXQQQXQZQ8hISEBCQkJKC0txbVr11BYWGgKD/v48WPodDo0Nzd3+//Dhg2DRCKBXC6Hl5cXRo0ahfHjxyMqKgpKpRL2iAB2ilKpNHWaTqfDgwcPTO8ObmxsxNOnT02nih0dHeHi4gKRSGR6d/DIkSMHdFxBBdDPg7ZJkyZh0qRJoNjJLIBiBQHY0+DHXnndPupOAIzhK7gU2YLSoz7qsEQAjPOmiooKNDQ00FbmKC/eLs7CX5YIgDGI3fnz51kPPlCsS2ZmJn788Ue2In/rW4duCo0A8GZ3//3s2TP8/PPPaG9vx7hx40zbqRTrotVq8cUXX2D37t3mtsq/AfBKTN7uRgz+AMpps9olAQAqzD0CNAC+p21ld3xn7FuYuwMAgB+AfABi2m52wRMAoQDUlq4DaABsANBK287maQGwvrur3+yaAoB3AGjBMfcrmixOWuOF3KsVvAUAcgC00Qa1mdRm7LP55jrXwQIBlADIAtBgXElyAOBq4f9SBo52AA8BXAfwPwB2A/jTktv866AAMME4nZAAcOzt7YXSa4ix83XG6Xs+gFraLBQKhUKhUCgUCoVCoVAoFAqFQjHyf5btloOrf9h/AAAAAElFTkSuQmCC"

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5MTBmZGFjODU4ZTUwOWVjN2IyYiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLWJsYWNrLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FB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Q0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQzFORCxrQ0FBaUMsb2lNOzs7Ozs7QUNBakMsa0NBQWlDLDRpSjs7Ozs7O0FDQWpDLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJibHVlYmlyZFwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MTBmZGFjODU4ZTUwOWVjN2IyYlxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICcuL3V0aWwvbWlzYy5qcycsICcuL3V0aWwva2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcbiAgICBuYW1lOiAndGlsZS1idXR0b24tdG8tcG9pbnQtY2FtZXJhJyxcbiAgICByZXF1aXJlczogWyd0aWxlLWJ1dHRvbnMnLCAndGhyZWUtZCddXG4gIH0pO1xuICBwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB0aGlzLm5ld1Byb3BlcnR5KCdjYW1lcmFUYXJnZXRUaWxlJywge2luaXRpYWw6IG51bGx9KTtcbiAgICB2YXIgbmV3VGFyZ2V0ID0gdGhpcy5wKCdjYW1lcmFUYXJnZXRUaWxlJykuY2hhbmdlcygpO1xuICAgIHZhciBuZXdUaWxlVGFyZ2V0ID0gbmV3VGFyZ2V0LmZpbHRlcigoZnVuY3Rpb24odCkge1xuICAgICAgcmV0dXJuIHQgIT09IG51bGw7XG4gICAgfSkpO1xuICAgIHRoaXMucCgnY2FtZXJhVGFyZ2V0VGlsZScpLnBsdWcobmV3VGlsZVRhcmdldC5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbih0aWxlKSB7XG4gICAgICByZXR1cm4gdGlsZS5wKCdoaWRkZW4nKS52YWx1ZSh0cnVlKS5tZXJnZSgkX18wLm9uKCdkZXN0cm95JykpLnRha2VVbnRpbEJ5KCRfXzAucCgnY2FtZXJhVGFyZ2V0VGlsZScpLnZhbHVlKG51bGwpKTtcbiAgICB9KSkubWFwVG8obnVsbCkpO1xuICAgIG5ld1RhcmdldC5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbih0aWxlKSB7XG4gICAgICBpZiAoIXRpbGUpIHtcbiAgICAgICAgcmV0dXJuIEtlZmlyLm5ldmVyKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gS2VmaXIubWVyZ2UoW0tlZmlyLm9uY2UoKSwgdGlsZS5wKCdzaXplJykuY2hhbmdlcygpLCB0aWxlLnAoJ3Bvc2l0aW9uJykuY2hhbmdlcygpXSkubWFwVG8odGlsZSk7XG4gICAgfSkpLm9uVmFsdWUoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICRfXzAuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0ID0gJF9fMC5vYmplY3QzRC5sb2NhbFRvV29ybGQodGlsZS5vYmplY3QzRC5wb3NpdGlvbi5jbG9uZSgpKTtcbiAgICAgICRfXzAuY2FtZXJhM0QudXNlckRhdGEuc2VtYW50aWNUYXJnZXQgPSB0aWxlO1xuICAgIH0pKTtcbiAgICBuZXdUYXJnZXQudmFsdWUobnVsbCkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgJF9fMC5jYW1lcmEzRC51c2VyRGF0YS5zZW1hbnRpY1RhcmdldDtcbiAgICB9KSk7XG4gICAgS2VmaXIuZnJvbUFycmF5KFtudWxsLCBudWxsXSkuY29uY2F0KG5ld1RhcmdldCkuc2xpZGluZ1dpbmRvdygyKS5tYXAoKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgICBhID0gJF9fMlswXSxcbiAgICAgICAgICBiID0gJF9fMlsxXTtcbiAgICAgIHJldHVybiBbYiwgYV07XG4gICAgfSkpLm9uVmFsdWUoKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgICBuZXdUYXJnZXQgPSAkX18yWzBdLFxuICAgICAgICAgIG9sZFRhcmdldCA9ICRfXzJbMV07XG4gICAgICBpZiAobmV3VGFyZ2V0KSB7XG4gICAgICAgIG5ld1RhcmdldC5lbGVtZW50LmZpbmQoJz4gLnRpbGUtYnV0dG9uLWhvbGRlciA+IC50aWxlLWJ1dHRvbi5wb2ludENhbWVyYScpLmNzcyh7YmFja2dyb3VuZEltYWdlOiAoXCJ1cmwoXCIgKyByZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS1ibGFjay5wbmcnKSArIFwiKVwiKX0pO1xuICAgICAgfVxuICAgICAgaWYgKG9sZFRhcmdldCkge1xuICAgICAgICBvbGRUYXJnZXQuZWxlbWVudC5maW5kKCc+IC50aWxlLWJ1dHRvbi1ob2xkZXIgPiAudGlsZS1idXR0b24ucG9pbnRDYW1lcmEnKS5jc3Moe2JhY2tncm91bmRJbWFnZTogKFwidXJsKFwiICsgcmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nJykgKyBcIilcIil9KTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0pLmluc2VydCgnVGlsZS5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMuYWRkQnV0dG9uKHtcbiAgICAgIG5hbWU6ICdwb2ludENhbWVyYScsXG4gICAgICBpY29uOiByZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmcnKVxuICAgIH0pLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCRfXzAuY2lyY3VpdGJvYXJkLmNhbWVyYVRhcmdldFRpbGUgPT09ICRfXzApIHtcbiAgICAgICAgJF9fMC5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkX18wLmNpcmN1aXRib2FyZC5jYW1lcmFUYXJnZXRUaWxlID0gJF9fMDtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGlsZS1idXR0b24tdG8tcG9pbnQtY2FtZXJhLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgVSA9IHtcbiAgICBuZXdDbGFzczogZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIG5ld1N1YmNsYXNzOiBmdW5jdGlvbihzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvYmoxKSB7XG4gICAgICBmb3IgKHZhciByZXN0ID0gW10sXG4gICAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICAgIHJlc3RbJF9fMSAtIDFdID0gYXJndW1lbnRzWyRfXzFdO1xuICAgICAgcmVzdC5mb3JFYWNoKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIG9iajE7XG4gICAgfSxcbiAgICBmaWVsZDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18yID0gMTsgJF9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzIrKylcbiAgICAgICAgYXJnc1skX18yIC0gMV0gPSBhcmd1bWVudHNbJF9fMl07XG4gICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIGdldERlZjogZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSk7XG4gICAgfSxcbiAgICBwdWxsOiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgdmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWtlRW1wdHk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgd2hpbGUgKGFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRBOiBmdW5jdGlvbihmbiwgY3R4LCBhcmdzKSB7XG4gICAgICByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKG9iaiwgbSkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzMgPSAyOyAkX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMysrKVxuICAgICAgICBhcmdzWyRfXzMgLSAyXSA9IGFyZ3VtZW50c1skX18zXTtcbiAgICAgIHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKTtcbiAgICB9LFxuICAgIGFwcGx5Q29uc3RydWN0b3I6IGZ1bmN0aW9uKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcbiAgICAgIHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG4gICAgfSxcbiAgICBhc3NlcnQ6IGZ1bmN0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuICAgIG9ialZhbHVlczogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBtYWtlUG9zaXRpb25lZDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZk9yOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlcyA9IFtdLFxuICAgICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgICB2YWx1ZXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZW91dDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICB2YXIgbGF0ZXJGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgJF9fMCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2VQZXJTdGFjazogZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgICAgdmFyIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIGlmIChub3RSdW5ZZXQpIHtcbiAgICAgICAgICBub3RSdW5ZZXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICAgICAgfSksIDApO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbigkX182KSB7XG4gICAgICB2YXIgJF9fNyA9ICRfXzYsXG4gICAgICAgICAgcmV0cmlldmUgPSAkX183LnJldHJpZXZlLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX183LmlzRXF1YWw7XG4gICAgICBpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhID09PSBiKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBjYWNoZTtcbiAgICAgIGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlID0gbmV3VmFsdWU7XG4gICAgICAgICAgb25DaGFuZ2UuZm9yRWFjaCgoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG4gICAgICB2YXIgcmVzdWx0Rm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9uQ2hhbmdlID0gW107XG4gICAgICByZXN1bHRGbi5vbkNoYW5nZSA9IChmdW5jdGlvbihjYikge1xuICAgICAgICBvbkNoYW5nZS5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgICAgfSk7XG4gICAgICByZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG4gICAgICB9KTtcbiAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgfSxcbiAgICBwcm9taXNpZnk6IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHJldHVybiBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24oYXJyYXksIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBtZW1vaXplOiBmdW5jdGlvbihmbikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleS5ldmVyeSgoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGFyZ3NbaV07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGtleXMucHVzaChhcmdzKTtcbiAgICAgICAgY2FjaGUucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIHZhciBFUFMgPSAwLjAwMDAwMTtcbiAgdmFyIHNvcnRPZkVxdWFsID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcbiAgfSk7XG4gIFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH0pO1xuICBVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcbiAgfSk7XG4gIFUuUG9zaXRpb24uZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG4gIH0pO1xuICBVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKGhlaWdodCwgd2lkdGgpIHtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH0pO1xuICBVLlNpemUuZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcbiAgfSk7XG4gIHJldHVybiBVO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIFRXRUVOKSB7XG4gIEtlZmlySlF1ZXJ5LmluaXQoS2VmaXIsICQpO1xuICBLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgb2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9iai5vbihldmVudE5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9KTtcbiAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICgoZnVuY3Rpb24oZikge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gIH0pKTtcbiAgS2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoKTtcbiAgICAgICAgICBpZiAoc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgaXRlcmF0aW9uRm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBzdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwgJF9fMSkge1xuICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgZHVyYXRpb24gPSAkX18yLmR1cmF0aW9uLFxuICAgICAgICBkZWxheSA9ICRfXzIuZGVsYXksXG4gICAgICAgIGVhc2luZyA9ICRfXzIuZWFzaW5nO1xuICAgIHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG4gICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBhZGRTdHJlYW0gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNoYWluZWRTdHJlYW1zID0gMDtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGNoYWluZWRTdHJlYW1zICs9IDE7XG4gICAgICAgIGJ1cy5wbHVnKHN0cmVhbSk7XG4gICAgICAgIHN0cmVhbS5vbkVuZCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hhaW5lZFN0cmVhbXMgLT0gMTtcbiAgICAgICAgICBpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHtcbiAgICAgICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0pKSgpO1xuICAgIGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBpZiAoZWFzaW5nKSB7XG4gICAgICAgIHR3LmVhc2luZyhlYXNpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIHR3LmRlbGF5KGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIHR3Lm9uVXBkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQodGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuICAgIH0pKSk7XG4gICAgYnVzLnR3ZWVuID0gdHc7XG4gICAgYnVzLnN0YXJ0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdHcuc3RhcnQoKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgYnVzLmNoYWluID0gKGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICBhZGRTdHJlYW0ob3RoZXIpO1xuICAgICAgdHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuICAgICAgcmV0dXJuIGJ1cztcbiAgICB9KTtcbiAgICByZXR1cm4gYnVzO1xuICB9O1xuICBLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZS5rZXlDb2RlID09PSBrZXlDb2RlO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgZW1pdHRlci5lbWl0KHZhbHVlKTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgYXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgZW1pdHRlci5lbmQoKTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZykge1xuICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IFUuY2FsbDtcbiAgICB2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIG9wZW4gPSBLZWZpci5idXMoKTtcbiAgICB2YXIgY2xvc2UgPSBLZWZpci5idXMoKTtcbiAgICBwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICBvcGVuLmVtaXQoKTtcbiAgICAgICAgd2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuICAgICAgICBjbG9zZS5lbWl0KCk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBidWZmZXIgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5idWZmZXI7XG4gICAgICB3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuICAgICAgcmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY3VtdWxhdG9yID0gKGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICAgICAgcmV0dXJuIChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuICAgICAgfSkpO1xuICAgIH07XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gJF9fMC5vblZhbHVlKChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgICB2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICBvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YnNjcmliZVRvVGhpcygpO1xuICAgICAgICB1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG4gICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24odmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlID09PSB2YWx1ZTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB2YXIgZG9Ob3RoaW5nID0gKGZ1bmN0aW9uKCkge30pO1xuICAgIHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLm9mZlZhbHVlKGRvTm90aGluZyk7XG4gICAgfSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24obGFiZWwpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcbiAgICB9KSkubWFwKChmdW5jdGlvbihldmVudCkge1xuICAgICAgVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbihidXR0b25JZCkge1xuICAgIHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKChmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gYiA9PT0gYnV0dG9uSWQ7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHByZWQoZS53aGljaCk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZygpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gKGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fSkudGhyZXNob2xkO1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKGZ1bmN0aW9uKG1vdXNlRG93bkV2ZW50KSB7XG4gICAgICB2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKGNyb3NzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuICAgICAgICAgIHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpLm1hcCgoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQ6IG1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgIG1vdXNlTW92ZUV2ZW50OiBtb3VzZU1vdmVFdmVudFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcbiAgfTtcbiAgcmV0dXJuIEtlZmlyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDNnd1hBUnNMMC9ndC9RQUFFYUpKUkVGVWVOcnRuWGxRazFlL3g3OEpBUlJNU0FJSkJtUlRpTXVBRWhWbFV6dTlqQ3ZqQnJpMHJxL2F2bzVMdFdNSGZlMnQ3MVI3VzZWanZUTXQxSmxXdldxclZkRENLSmF4dDVVNlFxc2RaSE1CVkVoazAxQWlTd1FFY3U0ZnhseWxQRThpVzU2RTg1azVNOEE1Skw5enp2ZDVuclA4enU4QktCUUtoVUtoVUNnVUNvVkNvVkFvRkFxRlFxRlFLQlFLaFdLSDhHekV6b2tBNWdFSUJlQU53Sm1EdGhNQWJRQ3FBTndFa0FrZ2owcXNkMFFCK0JsQVBZQ25BRHFORGMzbDFHbTB0ZDVvZXhUdHh0ZTlsQWdaQXVBakFLMEFERGJRNlV6SllLekRSOFk2VVN6b2ZGY0FLVGJjNlV3cDJWZzNDa3ZuT3dINFR6dnMvQmRwdDdHT2xHNDZud2NnMG80Ny8wV0tOTmFWMHMzVm56TUlCSkRMcGJzQWw1UVlDZUFhV3dHWlRBYVpUQVpIUjBkT2lyaTl2UjFhclJaYXJkYVN1dWJTeS81VnpySmRPU3FWaXB3NWM0WjBkSFFRcnRMUjBVSE9uRGxEVkNxVnVidkFHZHJkcnpJY3dET21CdlAzOXlkWHJsd2h0c0t2di81Sy9QejgyQVR3RElBbkZ4cWV6eEVCckFmQWVGOWZ1SEFob3FPamJVYk4wNlpOdzhLRkM5bUtPQnJyVEFWQUNPRUQrQWRUdmx3dXg3UnAwK0RnNEdBekFuQndjTUMwYWRNZ2w4dlppdjJEQzdNQnF3dUF4K1BOQlJEQWxCOFdGb1laTTJiWTNETnR4b3dabUR4NU1sdVJrY2E2RC9wSHdIdkc1K0xmY0haMlJuUjBOTnpkM1cxT0FCNGVIb2lPam9henN6UGp6YzlZOTBFdEFDV0FNS2JwcUZLcHhPelpzMjEyWkR0Nzltd29sVXEyS1hnWWdLREJMSUFOQUZ5WU1pZE9uSWpRMEZDYkZZQktwWUpLcFdJcjRtcHNnOEVuQUVLSUFNQWlwdEcvUXFIQXZIbnpiSDUrTzIvZVBBd2ZQcHh0TnJESTJCYURqcFVBR3BqbXloRVJFYVN0clkzWU9tMXRiU1FpSW9KdFRhQUJ3SXJCK0FoWUFVRFk3WDNSMVJXelpzMkNrNVB0YjV3NU9UbGgxcXhaY0hGaGZOSUpqUmVEZlVNSTRSbm4vREFPZmpSTVYwVkFRQUFwS1NraDlzTGR1M2RKUUVBQTIxMUFZMndURUVMNEE3aytJT2lQamdiZzhGTGk4M2k4WVR3ZUx4QkFDSUF4QVA0RGdGZTN0eVErSDZHaG9XeWpaNXRqOU9qUm1EQmhBdFJxTlF3R1EzZEZ2QUFjQmZDL1BCN3ZMb0FpQVBjSUljMTQ3bFhVK1NMeGVEekNwYXRhUUFoeE1SZ000dlQwZERrQUh3QlQ4WHhsN3lDQUxBQ1ZlSTN0VXJGWVRESXlNb2k5a1o2ZVRzUmk4ZXR1SFZjYTIvQWdnSFhHdHZWSlQwK1hHd3dHTVNIRXBiY0RTTjVyZHJnTGo4ZVRHS2N2SHNaNS9KaVgwdWplaWlvNE9CaEZSVVYyK1JnTUNRbEJjWEZ4WDN4VUNZQzdMNlZTQUhVQTlJUVFIWS9IZTlyWFY3b0l3SFFBL3did0c5dm92VGZKMGRHUmZQTEpKOFJlMmJkdkgzRjBkT3d2UjVNR1k5LzhHOEIwUW9pd3o0UUw0TDhCTktPZnZXWGMzZDFKVlZXVjNRcWdxcXFLdUx1N0Q0VFhVYk94ejBKNjIva3hBSzVqZ055bEVoSVNpTDBURnhjM2tPNW4xNDE5MktOWlFDU0Fyd0dNNnRkcGlFQUFoVUlCTHk4dnZQZGUvK3lOMU5mWFE2UFJvTHE2R25WMWRYank1QW4wZWowNk9qcE1Ocmk2dWtJc0ZzUER3d05lWGw3dzlmV0ZWQ3J0YzF1MmJkdUd5c3BLVkZkWG82YW14bVJEUHhGbTdNTlZlTzV2YWRrZ01EMDlYYjVnd1lKTGVINGtpNkNQZkFmbGNqbjgvUHpnNitzTGIyOXYrUHI2UXFGUW1Iejl4bzhmRHo2L2I5YW03dHk1Zzl6Y1hCUVVGT0RCZ3dlb3JhMkZWcXVGVHFkRFUxTVRDSGwxTnNYajhTQVVDaUdSU0NDVHlhQlFLQkFRRUlBSkV5WWdNaklTWThhTTZSTzdEQVlEQ2dzTFRiNkROVFUxMEdnMHFLcXFna2FqZ1ZxdHh1UEhqL3RzK0dic3V6eWRUamRiSXBGb0xaMEZmQUxnWHozOVZsZFhWeWlWU2dRRUJHRGt5SkVJQ0FpQWw1Y1hwRklwSkJJSnBGSXB4R0l4WEYzNzlweEVSMGNIMHRMU2NPSENCZHkrZlJzVkZSV29yNi92MVdkS3BWTDQrL3NqT0RnWXNiR3hXTHg0Y1o4N3ArajFlang1OGdUMTlmWFE2WFNvcjY5SGRYVTF5c3ZMOGVEQkE1U1hsNk8wdEJSNnZiNDNYL05mQUhaYklnQlBBT1VBaHBwZFIrYnpNWHIwYUNpVlNnUUZCU0VvS0FnQkFRRndjM09EbTVzYmhFS2hLZlUzaHc4Znh2ZmZmNCtTa2hJOGV2U29YNzVqK1BEaFVDcVZlUHZ0dC9IT08rLzBlNTJhbXBwTXFhR2hBUTBORFNndkwwZFpXUm5LeXNwUVdscUtrcElTcHNXbHJyVGd1ZU9OMmNiNUo5dkFnc2Zqa2RXclY1T3NyQ3hTWEZ4TXlzdkxTVzF0TFdsc2JDVHQ3ZTBEUHFpNmVQRWlDUThQNzhraVM0K1RXQ3dtNGVIaEpETXpjOERyMjk3ZVRob2JHMGx0YlMwcEx5OG54Y1hGSkNzcmk2eGF0WW9ZVnduWjBydVdLQ1dENlFQNGZENzU3TFBQU0hOenM5VkgwM3E5bnF4WnM0WklwVktySGZLUVNxVms3ZHExUksvWFc3MDltcHVieWFlZmZtcE9CQm1XQ0lCeGt5WTJOcFpvTkJxclZ6WW5KNGVNSFR1V0NBUUNxNS8wRVFnRVpOeTRjU1EzTjlmcTdhSldxMGxzYkN5YnZXcExCTURvbjUrWW1HajFTaDQ1Y29USVpETE9IZm1TeVdUazZOR2pWbStmeE1SRU5qdmJMRmtIWVBUUEh6cDBLS3hKVWxJUzl1N2RpNmFtSnNzMk9ualB4N2dpa1FoVHBrekJHMis4QVpWS2hjREFRQ2dVQ2d3Yk5zdzAySHIwNkJIS3lzcVFsNWVIN094cy9QSEhINmJ2NlRwbDdBNnRWb3V0VzdlaXJxNE9PM2Jzc0ZvYm1la2ppeHdzR0JXMFo4OGVxeW43d0lFRHhNWEZ4YUtya2MvbkU1RklSR0ppWWtocWFpcHBiVzE5N2U5cmFXa2haODZjSVRFeE1VUWtFaEUrbjIvUmQ3dTZ1cElEQnc1WXJaMzI3TmxqemtiYkU4RFhYMzlOUkNLUnhmc0pjWEZ4NU9iTm0zMzIvWGw1ZVNRK1BwNTRlSGhZWklPYm14czVmUGd3RlVCZjdhTjdlWG1aYlhRbkp5Y1NHUmxKTGwyNjFHKzIvUFRUVHlReU1wSTRPVG1adGNmYjI5c3FmZzEySllEQ3drSXlaY29VaTZaalc3WnNJUzB0TGYxdVUwdExDOW0wYVJPUlNDUm03Wm82ZFNvcExDeWtBdWdKT3AyT3JGdTN6cUlyTFRrNWVjQ3Z0QysvL0pLTUdESENySDNyMTY4bk9wMk9DdUIxejlrZlAzN2NiT09PR0RHQ25EMTcxbW9EcnRUVVZPTGo0MlBXemhNblRwRE96azVPQ29DVEJ4STBHZzMyNzkvUFdrWXNGdVBRb1VPSWk0dXorSE8xV2kxdTM3NE50VnFOdXJvNjZQVjZDSVZDTEZ1MmpPM3dCaU54Y1hIZzgvbFl0MjRkZERvZFk3a0RCdzRnT2pvYS92NytuR3RyemdtZ3JhME5aOCtleGExYnQxakw3ZCsvMytMT3YzbnpKdExUMC9Ibm4zL2kvdjM3cUs2dVJtTmpveW0vcUtnSTMzNzdiWS9zWGJSb0VlcnE2bGczaDRxS2lwQ2Ftb3F0VzdmYXhGa0hxejRDTkJxTjJaVys3ZHUzV3pUZ3E2bXBJYnQyN1NMQndjR3M4M2hQVDg5ZUR3emZmLzk5VnBzOVBUM0p3NGNQT2ZjSTRITkplZTN0N1RoLy9qeHJrQ1dWU29XTkd6ZGl5QkQyd0pzNU9UbUlqNC9INTU5L2p1TGlZc1l0VXdjSEIremN1Yk5YZGc4Wk1nUWJOMjdFeElrVEdjczhldlFJNTg2ZFEzdDdPNzBETVBIMDZWTVNHQmpJcXVCVHAwNFJnOEhBK2psWldWbU1nN05aczJhUnBLUWtrcG1aU1g3Ly9YZHk2OWF0UHR2Tk8zWHFGS3Z0U3FXeTMzY09iWFlXWURBWXlKVXJWMWlObnp0M3J0bmR5Snljbkc1WDdGYXVYRW55OC9PSlRxY2pyYTJ0WmtYVTA4ZlgzTGx6V2V0dzllclZmdmx1bTM4RUVFSnc5dXhaMWpMTGx5K0hqNDhQWTM1VlZSWGVldXN0MU5YVm1mN203ZTJOMDZkUDQ1dHZ2c0dFQ1JNZ0Zvdmg3T3hzMmlqcVMzeDhmTEJzMlRMV01qLzg4SU5GbTBzREJhY0VrSkhCN0s4d1pjb1UxbUFScmEydCtQREREMUZSVVdINlcxQlFFSTRkTzRhbFM1Y08yT2c3TkRRVVlXRmh6TjQyR1JsVUFOMmhWcXZ4OE9GRHh2enAwNmNqTURDUVVUdzNiOTdFc1dQSFRIOVRLQlRZdTNjdlltSmlCclFlZ1lHQm1ENTlPdXNhaDBham9RTG95dFdyVjFuMzlVTkRReGxIL3AyZG5kaTNiOS8vTDI0SUJGaStmRG1XTGwxcWxmMTRsVXJGK29qNTdiZmZxQUM2a3BmSC9IYVZNV1BHc0s2aTFkVFVJRE16MC9SN2NIQXd0bXpaWXJXNitQdjdZL1RvMGF3TFUxUUFYYmh6NXc1am5wK2ZIN3k4dkJqeno1MDdaL3JaMGRFUlVWRlJWbDEyVlNnVThQUHo2MUZkQjYwQVhoNjhkV1g0OE9IdzhQQmd6UC9sbDE5TVA3dTd1MXM5dUpTSGh3ZnIzZ0piWFFldEFOaFcveVFTQ2V2aGtwZmpDUWlGUXRZVnVZRkFKQkpCSXBFdzV2ZmgwUy83RWNETG16TmRZUW13QkFDb3JLdzAvZXprNUFSUFQrc0g0bWF6MlZLbjFrRWxBTGJqVFFJQis2Ymx5K3ZyWE5sdFk3TzVzN09UQ3VCdmhyQ2NDalozaFByZGQ5ODFUY0ZXclZyRmlmcXcyZHhYSjZEN1JLaGNNVVFrRXVISmt5ZmQ1ajE5eWg3eTV1T1BQOGFjT1hNd2RPaFFSRVJFY0tJK2JEYTd1YmxSQVhSRkpwTXhDdURGbVg2bWdhQmNMc2VDQlFzNDA2aE5UVTJzSGtJeW1ZdytBcnBiUEdHaXRyYjJsUTBlcmxOWFY0ZmEydG9lMVhYUUNtRGN1SEdNZVdxMUd0WFYxVFlqZ09ycWFxalZ6T2N3eDQ0ZFN3WFFGYmFkdnJ0MzczSnE4Y1FjRlJVVktDa3BZY3czRTBKK2NBcUFiUWVORUlMOC9IeTB0clp5dnZOYlcxdVJuNS9QdXVYTFZ0ZEJLd0EvUHo5V1o0L3M3R3lVbFpWeFhnQmxaV1hJenM1bXpQZjE5WVd2cnk4VlFGZDRQQjdtejUvUG1IL2p4ZzBVRkJSd1hnRDUrZm00Y2VNR1kvNzgrZlA3eFJ2SkxnU3daTWtTMWpLblQ1OW1kUnF4Tmc4ZlBzVHAwNmRaeXl4WnNvUUtnRWtBWVdGaENBcGlmb2ZTeFlzWGNlM2FOVTY1VkwwOFRybDI3ZG9yZmdsZFVTcVZtRHg1TWhVQUV3S0JBSnMzYjJZdGs1U1VoUHYzNzNOT0FQZnUzVU5TVWhKcm1jMmJONXZkMXhqVUFuQjBkTVRpeFl0WjM3aVpsNWVIbEpRVVRzMElXbHBha0p5Y3pPclY1T25waVVXTEZuSHV6ZWQ4cmwxSmNybmNiSXlkZ3djUDR1VEprNXl4K2NTSkV6aDA2QkJybVIwN2RwaDdsU3dWQVBCOE96YytQaDRoSWV5UnpoTVRFNUdXbG1aMWU5UFMwckJyMXk3V01pRWhJWWlQaitma3dWRE9DZURGbWtCaVlpSnJtZnI2ZW16YnRzM3NZWkwrSkRVMUZkdTJiVE1iajNqbnpwMmNtdnR6WGdCOFBoK3hzYkZZdjU3OURldVZsWlhZdm4wN3Z2cnFxd0czTVRrNTJSVDZuWTBOR3paZzNyeDVuUElCTUR1akFVZGlCQlVWRlpHcFU2ZWFqY0Foa1VqSXBrMmJCaVJrYTB0TEM5bThlYk5GTVlMQ3c4TkpVVkVSalJIVUd6SXlNb2kzdDdkRjd4c0tEdy92MXloaGx5NWRJaEVSRVJaRkNSc3hZZ1NORXRaWHBLU2tFS0ZRYUhHY3dJU0VCRkpRVU5CbjM1K2ZuMDhTRWhJc2poTW9GQXBKU2tvS2pSTm83VWloTTJmT0pPZk9uZXRScE5EVzFsYVNscFpHWnM2Y2FkZVJRbTNtcmRVZmZQQUJBRmdVSzloZ01LQ3hzUkdYTDEvRzVjdVhJUktKRUI0ZWpqZmZmQk9ob2FFWU5Xb1VQRDA5VFc4czBldjFxS21wd2IxNzkxQlFVSURzN0d6azV1YWFYTlV0WFhvV0NvWDQ2S09QckJvcjJLNEdnZDF4L1BoeElwZkxPUmN0WEM2WGt4TW5UbGk5Zld3NlJwQWxyRnk1RWhjdlhrUndjREFuMXRVRkFnRkNRa0p3NGNJRnJGaXh3dWF1ZHI0dDNxSW1UNTZNR3pkdVlNV0tGZjN5YWpkTGtVcWxXTGx5SmE1ZnY4NGFGSUlLb0I4WU1tUUlqaDQ5aXBNblR5SXlNcEwxTEY1Zkk1RklFQlVWaGUrKyt3NUhqaHd4RzdHTXl3aGc0OHlaTXdkejVzekIwYU5IY2V6WU1aU1dscks2WlBlR0YyOE5XN05tRGRhdVhRdDdRQUE3WWUzYXRWaTllalhTMHRLUW1abUpvcUlpVkZSVTRLKy8vdXJWNTdxN3U4UGYzeDhoSVNHWU8zY3U0dVBqT2VYUVFRWFFaUThoSVNFQkNRa0pLQzB0eGJWcjExQllXR2dLRC92NDhXUG9kRG8wTnpkMysvL0RoZzJEUkNLQlhDNkhsNWNYUm8wYWhmSGp4eU1xS2dwS3BSTDJpQUIyaWxLcE5IV2FUcWZEZ3djUFRPOE9ibXhzeE5PblQwMm5paDBkSGVIaTRnS1JTR1I2ZC9ESWtTTUhkRnhCQmREUGc3WkpreVpoMHFSSm9OakpMSUJpQlFIWTArREhYbm5kUHVwT0FJemhLN2dVMllMU296N3FzRVFBalBPbWlvb0tORFEwMEZibUtDL2VMczdDWDVZSWdER0kzZm56NTFrUFBsQ3NTMlptSm43ODhVZTJJbi9yVzRkdUNvMEE4R1ozLy8zczJUUDgvUFBQYUc5dng3aHg0MHpicVJUcm90VnE4Y1VYWDJEMzd0M210c3EvQWZCS1RON3VSZ3orQU1wcHM5b2xBUUFxekQwQ05BQytwMjFsZDN4bjdGdVl1d01BZ0IrQWZBQmkybTUyd1JNQW9RRFVscTREYUFCc0FOQksyODdtYVFHd3ZydXIzK3lhQW9CM0FHakJNZmNybWl4T1d1T0YzS3NWdkFVQWNnQzAwUWExbWRSbTdMUDU1anJYd1FJQmxBRElBdEJnWEVseUFPQnE0ZjlTQm81MkFBOEJYQWZ3UHdCMkEvalRrdHY4NjZBQU1NRTRuWkFBY096dDdZWFNhNGl4ODNYRzZYcytnRnJhTEJRS2hVS2hVQ2dVQ29WQ29WQW9GQXFGUWpIeWY1YnRsb09yZjloL0FBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3VybC1sb2FkZXIhLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUgzZ3dYQUEwc2E2aEhkZ0FBRFNaSlJFRlVlTnJ0blh1UVhWV1ZoNy9WNlR3a0JrZ001SUdRWkpRQVFraUlvZ0lxbG9NT0V4Q0ZpRm96b0tnb0lHVkpxWWlsZ3BibEF3VWRSV3FvR1I4UlFVVmVPZ3hJVVRMVWpHTkFVWk5BZ21JSUpHbE1PZ2xKZDU3azJmbjV4MTVkdWVudXM4L3A3dHYzbm50N2YxV251cE43K3R5MTlsNW5QOWRhR3hLSlJDS1JTQ1FTaVVRaWtVZ2tFb2xFSXBGSUpCS0pSQ0xSaEZnakNDbHBMbkFPTUFjNENoaGRRdGtGN0FiV0FJdUJYNW5ab21SaWc2djRNeVE5TEtsRDBvdVN1bFIrdWx6V0RwZjlqRlNUL2EvNE1aS3VrN1JMMG40MUx2dGRoK3NralVrMVc2enl4MHE2UmMzSHYwc2FXN2J5YmlsWjVZOENQZ0ZjM29TMmZRVndsZXVZQm9GOVZMNEJwd0VMbTd5Uk93TjR6TXlVV29DREdRbmNPQXg2dVcrNnJxa0Y2TkVDbkY3ZzdYL0JyNzBscmR5UndCRit4VGpkekI1TEk3NkREZUN1bkVIVUlra1hTaHBSWWgxR3VJeUxjblM1TTlYNHdRVTNXZEtlU0lHdGxIUm1BK256Wmttckl2cnNrVFFwalFFT2NHbE92L2hMNExjTlpOUC83ekxIdW9wTDA2c1BkSFYxdFVoNkx2SzJySmQwUVFPMmF2TmQ5aXllYlc5dnQyRnZBSkxPemVrdjc1ZjBzZ2JVYTZLa0IzSjBPeWQxQWZCeHdrWktYK3dHZm10bW14ck5BTXhzbzNkYnU3TnN4SFVmMW0vL1RFbWJJMi9JazVMbU5MQitwN2dPV1hSS09uWTR0d0FmQmc2SmZMN0l6SlkwcWdHWTJXTEMxbkFXWTcwTWh1WGIzeXBwUmVUdFdDdnB3aWJRODkyUzJpTjZQaU9wZFRnYXdNV1N0a1FLNXRHeWJad01VTTlScmtzV1d5UmROQnk3Z0l1QWNSbWY3UUFlTXJNOWpXNEFyc05Ed0lzWnQ0d0RMaDRPYjd4SmF2SGZUNVhVRm5rcm5wTTBzNGwwUHk1bnJhTk4wcWwrYjR2dmpOYUUxcUdvYUdCRXhkVUN2QlI0SlRCTDB2SEFQd0pUTXg2eEgxaGlac3VieFFETTdLK1NuZ0NtWmJTNlU0RUZrdjRIZUJwWUtta0ZzTjNMbzZ2N3F2WTJjdXNnSzdzVkdGVnhqWFpsVGdSTzhwOG5FaHc1aTdJVldOQ0VqZUFDNE0zQTRYMThOcUtpckNwWkF6eFZjUzJUdE5iWEZ2WjBYMmEyYjhERzJjOEtQd1FZNzlPWGljQk00UGlLNjdncUZOUXlNNXZWcE4zZ1VuOHhCc3RmdmFYb3ZwWURHMzNzMUdsbUwxYTFCWkIwS01FbCt5MSt6UVlPSFlJeTJndjhySW1IUW5jQVgyRHdEaUhIK2ZXT0hpM25FOEFqa2g0QkZwdlp0bXBZN1N4SjM1RzB2UWFPa3hzbFRXM2lnZkJVMTNHbzJlNTFObXV3QXA4bDZmRWFlczQydmFPRXBMdHJXSjZQU3pwclFHTUFkOUg2TWZDS0lTNlRmVUE3c0JiNHBKa3RISUpDbndBYzR3UFVpVDRRRzF2UkJlN3ovbk96OTZWcmdUWXo2eGdDV2Q1QThIMmNDa3daaXBsWUQ1NEYzbWRtanhZMkFFbEhBZzhDY3dtN1Z0V2FsMjRBVmdOdFBzSnQ4OHJ2OXZWNzBzejJWNm1nVHlCNEdjOEcvZ0dZVFBEVkcrK0xMejExRXJBTjZIUloyb0dWM3E4K2FtWlBWMG11RnVCa0R2Z09UbkhqUE1wL1RnT09ySmE5dVo2TGdMUE43SVdpQnZBVjRMT0QrT0lkUGpKZENUem5QOWNDSFY3QUhjQm1NOXRSNWJlckZaZ1BuQXU4Q3BnT1RCamtZenVBVmNBeTRIN2dYalBycXJMY1k3MVZtdUFHT3NGYmlCbHV2RE44eGpXWXdKS3ZtdG5uY2czQWZkVldBaThwOE5EOVBpVlpEanpqMTBwZ2kxL2JnRzFWR1kzbUYrSmx3TC80Nkhpby9PM1d1YTQvTWJQL3JJRk80N3kxR2djYzV0Y000RmkvWnJxK1JaYjBkd0l6ekd4OTNwZGVYaURlN1VlUzNpYnBSRW5USlUyU05LNGV1MXFTNWtsNnpQZldhMFduZitjLzEwSGZWaS9yU1Y3MkozcGQzRm9nanZLeUlsOXdYMDdrNnpWbGlIR1RkSWlrQlpJMjFUSGViNU9rSC9vQ1diM0xZNnlreitRWXdYMUZIaFRicFBsdlNVZVhRTm5USlAxWjB0NFNCSDN1bGZTVXBOZVhvRnlPOFRyS1luWFB2K21yNzVnYytZNm56T3o1T2l2NUFlQy9nQk5xTUlVcXVwcjZLdUErU1pmVVV4QXpheVBzR1dReHVjaFM4TWljZ1VROUsvOXE0RnF5L1FqNm1nWjFMNU0rRHZ3dndVVnJCZEJ1WnRzckJsdVRmR0ExRnpnVGVGM0Y5eFNaQmg4QjNDUnBvcG5WTThZeFZrZWppaFJ5akMvV3MvSWw3ZWhIbG80dGtuN3Qvdm1qQi9COVl6ek02OWYrcks1K0xNTmVYY2R5K21KTXVJWTBBRW1YNWJpUDlkeFB1THVhM3NUdTNYdVhwQmNLeXJCWjBrZVNBVlJIb2ZNa3JTbFE2THNsTFpSMDloREs4ay8rSGJzTHlQTTNTVzlQQmpBNFpXWkorbjNCNmRoTnRjakQ0MTNEelo0RUtvL2ZEWHBIYnJnYWdLVERKWDIvNEp0MlJSM2V0Q3NsUFY5QXZ1OUpPandaUVArVUdPRnU0M2s4TCtsZGRSeHd6YzlaTitubW9tNkgyTElaUUZrREVvNEJyc201WnpOd2xabmQwNC9DT2NMbjdOTUkyOEpqQ2ZzVmQ1alp1Z0hNdSsrUnRCLzRBV0VUSjR0UEUrSUVWNVd0b0V0bkFENWx1NURlRHBJOXVhWm81VXM2aGVBKzlScUNmOE5VRG5acG13VjhhSUNMTDcrUU5CR0liUTdOQXQ0bDZhYlN4enJVdXd1UWRMU2tEVGx5Zkt2SWdNOHpqM3hWMHRLY2VmeTZRY284UnRJM2MyUmVKK25sWmVzQ3lwWW5jQ1J3UHZFa1M0dUJXOHhzVjg2elRnZnVCajVGOE1UTjByVUx1SDZRUzdDN2dGc0lqaGRaVEFJdWNCMVRGeENSNTJNNTkzekRsM0pqbGY4MjRQdEFYeHRYRHdFUEU5Yk1PM3dNTU9pKzJjeFdTTHFCdUZmemxTNVhXYk9jMWE4TDhOQ3hNM08rLzRHODNVamZLZXhyeGU3SGttYjc5SEwwVUlSZmVmZVZseFhrRFVNWit0WElYWUQ1NEMvR3oySzdrWktPQW43cUkveHUxZ0R2QlM0MXN5Zk1iTE9aN1I2S1RKMHUyeDA1dDcySEV1Vm5MSnNCbkJmNS9IRmdTV3dnQm55WjRBZll6VFBBSldiMjh4cU92cGNBZjRoOGZsNHlnTDZabHRGbmQvT2JyTDdmbTlSVGdFc3EvcnNkdU5iTUhxNnhIaXRjMXRnYXh6SEpBSHJ6eGxqWFJvZ1l6aHI1andBK1gvSHZmZDVkL0x6bXpaalpUcCtweExxWU55VUQ2TTNjeUdkUDU0elVwd0R6S3Y2OURQaHVIWFZaUmZDV3p1S1VaQUM5T1NIeTJXcENYRUVXbFlrazl3SUx6V3hWSFhWcGQ1a0hvdXV3TllEcGtjL1dFVUsyc25oTHhlK2JnQWZxck10R2wza2d1ZzViQTRpdC9uWG1CSmRVN3Jsdkk3NGlWNHR4d0ZaQ0JGUVdSeVlENkUwczMwQmV3b1BLTmZZOXVkRXZ0U0VtODdoa0FQMlRKUzhGU3VYNmVsbDIyMkl5ajBnRzBKdFlWSERlbnNWLytNK2RoSkQyTXRBNlFGMUxJMlN0MlVyZkNaUWduazRXNERwQ09QdE9vQ3hIc2NSazNwSU1vRGN2UkF4Z3ZLUnhXUU5CTTl0QWlCWXFCUjVvTWo1SDE5UUY5Q0EyYjUvTXdSczhaV2NpOFJDN1Zja0FldlBueUdmVHlFNHNXVWFtdXN4Wi9DVVpRRzlpYWVHUHAwU0xKd1dZVGp4bjR1SmtBTDJKN2FBWk1LY1JEbUIyR2VjUTMvTDlUVEtBM3F3R1lxSG5aeEtpZDh2T3NTNXJGbTErSlFQbytmSUFzUXdXcHhJeWZwV2RPUzVyRnZjUjN5b2UxZ2FRbHlqeXZXWElVQkpwL284bXVKL0Z1RE1aUU45emVSRmNxWjZKM0hZT2NFWXQ4K24zby9LTmNETDR2TWh0eTRFL2x1WGs4TEsxQUJEV3oyL091ZWRxaGo1NzZVQjRwY3NXNDJieTl6V0dyd0dZMlY3Z1hrSkcwU3ptQWxlVWFVWWc2U1hBUjRsN05hMEhmdUU2SmdPSXNJR1FTemZHSndobkRwV0ZpNEdyY3U2NU1jZXdrd0Y0SzdDSEVOSzFOT2ZXcjB1YVg0SzNmejd3dFp6YmxnSjNsekV3dEl3dFFQZWF3TmR6N3BrQWZMdWVad3Q2Ym9Kdms1K1ArUG95emYxTGJ3Q2VNZngrUWh4ZGpKY0QveWJweWpwVS9rZTk4dk1pZnI4SFBGQ3RMT2kxVUt4TU9ZSk84anc3ZVhSNDNwNURhaURUR0VuZkxaZ2o2REZKSjlXNHpKb3VTOWpiUFE5UUhudTh3SWN5UzlqWmZncm83b0xwYTFLV3NDb3BkYm1rcmYzSUUzaW5wSk9yK1Ayei9abEY4d1J1bFhSNW5jcXErUXpBNVJwSXB0Q0hKSjAvd0V5aG95VmQ0TTlvMmt5aERYTnF0Wm5kNFBJWHlSWGNRbkF6ZjZ0Zld5WDlEbmlFNEhmd0xMQytzN056eC9qeDR5RWtpNXJpcTNtekNidDVwM0hBVmIzbzB2TTI0RXQxemhYY1BJUEFEUGt1bHJSZTVXTjlQVThCSDJnTDBOSm9CbXBtdHhFMmhaWlJqblgxZmI3UWM2NlozZDVvNWRuU2lLMlVtZjJSc09kK095SFBUNzNvQUc0RFhtdG1mMmpFc214SUEzQWoyR1ZtSHlEc0NUeEtQQmF2Mm5RQ0M0Ri9OYk1QNW1Vc0t6T3RORGhtOWlEd29KOGtjZ25oSkszSlEvUjEzYWVHL2NqTW11S0U4MWFhQkROYklPbFd3cm1COHdnUnc5T0JsdzN5MFpzSWZ2eExnVjhSTm5YVUxPWFdOQWJnUnJBZnVBdTRTOUpNZ29mT3lSeElEM3NrSVdMbnBSbVAyTzdOK3daQ1FvcG5nU2NKQ1NlVzA0UzAwcVI0aFMzM3FkRjR3Z21jM1djSEgwcUkzZXVPS3Q1TENPZmV5b0d6ZzU4enMwNmFuRmFHQVY2UmYvSXIwUXl6Z0VSOURFQ3B5RXFQQm1zQXNaT3hSNlR5TFQyeE90cFh4QUEyUlI0d1hkSmhxWXhMK3VxSHVwbVJNNlhOTllCWTZQTDV4QU1mRXZWbEh2RE95T2QvS1dKRm55OXdLT0sxZnY1T29oeHYvaEZlYjV0ejZ1NXp2V1pJZlR4c09yQXlGV3RUTXFObkJ0Vyt1b0EyUXM3OVJIUHhFL3B3VGJlTUptVWF3WFBtOEZSdVRjRm1ZSTZaclM2NkR0QUdmQmpZbGNxdTRka0pYRXBHWUVxZkJ1QzdYZmNBSHllZXBEbFJialo2SGQ2YnRZT1o2K3dvNlIyRVV6eGZEWXhLWmRvUTdDSHNlMXh2WnJHc0s4VzhYZjNBdy9jVFRycVlDUnpGd2ZsNUUvVm5MK0dBck9YQS93RzNtdG1hdkQvcVY2WU5TVk1JYnRNekNQdnFJeW5SQVVqRGRSbkFLNy9UcCs5TEJuSU9jaUtSU0NRU2lVUWlrVWdrRW9sRUlwRklKSnFXdndNaGFqUnUxa0FsdkFBQUFBQkpSVTVFcmtKZ2dnPT1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3VybC1sb2FkZXIhLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9XG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYS5qcyJ9