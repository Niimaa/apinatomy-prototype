(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "kefir", "tweenjs", "kefir-jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("kefir"), require("tweenjs"), require("kefir-jquery")) : factory(root["jQuery"], root["P"], root["Kefir"], root["TWEEN"], root["KefirJQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	  var plugin = $.circuitboard.plugin.do('tile-button-to-point-camera', {requires: ['tile-buttons', 'three-d']});
	  plugin.append('Circuitboard.prototype.construct', function() {
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
	  }).append('Tile.prototype.construct', function() {
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
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3ZGY0MGJlODllNTk2N2ZlODA4YiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLWJsYWNrLnBuZyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIktlZmlySlF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImtlZmlyLWpxdWVyeVwiLFwiY29tbW9uanNcIjpcImtlZmlyLWpxdWVyeVwiLFwi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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQSxrRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxtRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7QUMxTkQsa0NBQWlDLG9pTTs7Ozs7O0FDQWpDLGtDQUFpQyw0aUo7Ozs7OztBQ0FqQyxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEOzs7Ozs7QUNBQSxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpLCByZXF1aXJlKFwia2VmaXItanF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwia2VmaXJcIiwgXCJ0d2VlbmpzXCIsIFwia2VmaXItanF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJQXCJdLCByb290W1wiS2VmaXJcIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcIktlZmlySlF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdkZjQwYmU4OWU1OTY3ZmU4MDhiXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbigkLCBVLCBLZWZpcikge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4uZG8oJ3RpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYScsIHtyZXF1aXJlczogWyd0aWxlLWJ1dHRvbnMnLCAndGhyZWUtZCddfSk7XG4gIHBsdWdpbi5hcHBlbmQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMubmV3UHJvcGVydHkoJ2NhbWVyYVRhcmdldFRpbGUnLCB7aW5pdGlhbDogbnVsbH0pO1xuICAgIHZhciBuZXdUYXJnZXQgPSB0aGlzLnAoJ2NhbWVyYVRhcmdldFRpbGUnKS5jaGFuZ2VzKCk7XG4gICAgdmFyIG5ld1RpbGVUYXJnZXQgPSBuZXdUYXJnZXQuZmlsdGVyKChmdW5jdGlvbih0KSB7XG4gICAgICByZXR1cm4gdCAhPT0gbnVsbDtcbiAgICB9KSk7XG4gICAgdGhpcy5wKCdjYW1lcmFUYXJnZXRUaWxlJykucGx1ZyhuZXdUaWxlVGFyZ2V0LmZsYXRNYXBMYXRlc3QoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgIHJldHVybiB0aWxlLnAoJ2hpZGRlbicpLnZhbHVlKHRydWUpLm1lcmdlKCRfXzAub24oJ2Rlc3Ryb3knKSkudGFrZVVudGlsQnkoJF9fMC5wKCdjYW1lcmFUYXJnZXRUaWxlJykudmFsdWUobnVsbCkpO1xuICAgIH0pKS5tYXBUbyhudWxsKSk7XG4gICAgbmV3VGFyZ2V0LmZsYXRNYXBMYXRlc3QoKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgIGlmICghdGlsZSkge1xuICAgICAgICByZXR1cm4gS2VmaXIubmV2ZXIoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBLZWZpci5tZXJnZShbS2VmaXIub25jZSgpLCB0aWxlLnAoJ3NpemUnKS5jaGFuZ2VzKCksIHRpbGUucCgncG9zaXRpb24nKS5jaGFuZ2VzKCldKS5tYXBUbyh0aWxlKTtcbiAgICB9KSkub25WYWx1ZSgoZnVuY3Rpb24odGlsZSkge1xuICAgICAgJF9fMC5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQgPSAkX18wLm9iamVjdDNELmxvY2FsVG9Xb3JsZCh0aWxlLm9iamVjdDNELnBvc2l0aW9uLmNsb25lKCkpO1xuICAgICAgJF9fMC5jYW1lcmEzRC51c2VyRGF0YS5zZW1hbnRpY1RhcmdldCA9IHRpbGU7XG4gICAgfSkpO1xuICAgIG5ld1RhcmdldC52YWx1ZShudWxsKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSAkX18wLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0O1xuICAgIH0pKTtcbiAgICBLZWZpci5mcm9tQXJyYXkoW251bGwsIG51bGxdKS5jb25jYXQobmV3VGFyZ2V0KS5zbGlkaW5nV2luZG93KDIpLm1hcCgoZnVuY3Rpb24oJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIGEgPSAkX18yWzBdLFxuICAgICAgICAgIGIgPSAkX18yWzFdO1xuICAgICAgcmV0dXJuIFtiLCBhXTtcbiAgICB9KSkub25WYWx1ZSgoZnVuY3Rpb24oJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIG5ld1RhcmdldCA9ICRfXzJbMF0sXG4gICAgICAgICAgb2xkVGFyZ2V0ID0gJF9fMlsxXTtcbiAgICAgIGlmIChuZXdUYXJnZXQpIHtcbiAgICAgICAgbmV3VGFyZ2V0LmVsZW1lbnQuZmluZCgnPiAudGlsZS1idXR0b24taG9sZGVyID4gLnRpbGUtYnV0dG9uLnBvaW50Q2FtZXJhJykuY3NzKHtiYWNrZ3JvdW5kSW1hZ2U6IChcInVybChcIiArIHJlcXVpcmUoJ3VybCEuL3V0aWwvaWNvbnMvY2FtZXJhLWJsYWNrLnBuZycpICsgXCIpXCIpfSk7XG4gICAgICB9XG4gICAgICBpZiAob2xkVGFyZ2V0KSB7XG4gICAgICAgIG9sZFRhcmdldC5lbGVtZW50LmZpbmQoJz4gLnRpbGUtYnV0dG9uLWhvbGRlciA+IC50aWxlLWJ1dHRvbi5wb2ludENhbWVyYScpLmNzcyh7YmFja2dyb3VuZEltYWdlOiAoXCJ1cmwoXCIgKyByZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmcnKSArIFwiKVwiKX0pO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSkuYXBwZW5kKCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdGhpcy5hZGRCdXR0b24oe1xuICAgICAgbmFtZTogJ3BvaW50Q2FtZXJhJyxcbiAgICAgIGljb246IHJlcXVpcmUoJ3VybCEuL3V0aWwvaWNvbnMvY2FtZXJhLXdoaXRlLnBuZycpXG4gICAgfSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoJF9fMC5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9PT0gJF9fMCkge1xuICAgICAgICAkX18wLmNpcmN1aXRib2FyZC5jYW1lcmFUYXJnZXRUaWxlID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRfXzAuY2lyY3VpdGJvYXJkLmNhbWVyYVRhcmdldFRpbGUgPSAkX18wO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoZnVuY3Rpb24oUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBVID0ge1xuICAgIG5ld0NsYXNzOiBmdW5jdGlvbihjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgbmV3U3ViY2xhc3M6IGZ1bmN0aW9uKHN1cGVyQ2xhc3MsIGNvbnN0cnVjdG9yTWFrZXIpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgICB2YXIgY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvck1ha2VyKHN1cGVyQ2xhc3MucHJvdG90eXBlLmNvbnN0cnVjdG9yKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICAgICAgVS5leHRlbmQoY29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b3R5cGUpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uKG9iajEpIHtcbiAgICAgIGZvciAodmFyIHJlc3QgPSBbXSxcbiAgICAgICAgICAkX18xID0gMTsgJF9fMSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzErKylcbiAgICAgICAgcmVzdFskX18xIC0gMV0gPSBhcmd1bWVudHNbJF9fMV07XG4gICAgICByZXN0LmZvckVhY2goKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqMSwga2V5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gb2JqMTtcbiAgICB9LFxuICAgIGZpZWxkOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKG9iaikge1xuICAgICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjYWxsOiBmdW5jdGlvbihmbikge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzIgPSAxOyAkX18yIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMisrKVxuICAgICAgICBhcmdzWyRfXzIgLSAxXSA9IGFyZ3VtZW50c1skX18yXTtcbiAgICAgIHJldHVybiBmbi5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgIH0sXG4gICAgaWQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIHJldHVybiB2O1xuICAgIH0sXG4gICAgZ2V0RGVmOiBmdW5jdGlvbihvYmosIG5hbWUsIHZhbHVlKSB7XG4gICAgICBpZiAoVS5pc1VuZGVmaW5lZChvYmpbbmFtZV0pKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgb2JqW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqW25hbWVdO1xuICAgIH0sXG4gICAgb2JqZWN0OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIHt9KTtcbiAgICB9LFxuICAgIGFycmF5OiBmdW5jdGlvbihvYmosIG5hbWUpIHtcbiAgICAgIHJldHVybiBVLmdldERlZihvYmosIG5hbWUsIFtdKTtcbiAgICB9LFxuICAgIHB1bGw6IGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICB2YXIgaSA9IGFyci5pbmRleE9mKHZhbCk7XG4gICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgYXJyLnNwbGljZShpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG1ha2VFbXB0eTogZnVuY3Rpb24oYXJyKSB7XG4gICAgICB3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXJyLnBvcCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYmluZEE6IGZ1bmN0aW9uKGZuLCBjdHgsIGFyZ3MpIHtcbiAgICAgIHJldHVybiBmbi5iaW5kLmFwcGx5KGZuLCBbY3R4XS5jb25jYXQoYXJncykpO1xuICAgIH0sXG4gICAgYmluZDogZnVuY3Rpb24ob2JqLCBtKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMyA9IDI7ICRfXzMgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18zKyspXG4gICAgICAgIGFyZ3NbJF9fMyAtIDJdID0gYXJndW1lbnRzWyRfXzNdO1xuICAgICAgcmV0dXJuIFUuYmluZEEob2JqW21dLCBvYmosIGFyZ3MpO1xuICAgIH0sXG4gICAgYXBwbHlDb25zdHJ1Y3RvcjogZnVuY3Rpb24oQ29uc3RydWN0b3JGbiwgYXJncykge1xuICAgICAgdmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcbiAgICB9LFxuICAgIGFzc2VydDogZnVuY3Rpb24oY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBpc1VuZGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc0RlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNQbGFpbk9iamVjdDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBpc0Z1bmN0aW9uOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nO1xuICAgIH0sXG4gICAgb2JqVmFsdWVzOiBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgIH0pKTtcbiAgICB9LFxuICAgIG1ha2VQb3NpdGlvbmVkOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIGVsZW1lbnQuY3NzKCdwb3NpdGlvbicsICdyZWxhdGl2ZScpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVmT3I6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgdmFsdWVzID0gW10sXG4gICAgICAgICAgJF9fNCA9IDA7ICRfXzQgPCBhcmd1bWVudHMubGVuZ3RoOyAkX180KyspXG4gICAgICAgIHZhbHVlc1skX180XSA9IGFyZ3VtZW50c1skX180XTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChVLmlzRGVmaW5lZCh2YWx1ZXNbaV0pKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlc1tpXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGVib3VuY2U6IGZ1bmN0aW9uKGZ1bmMsIHdhaXQsIGNvbnRleHQpIHtcbiAgICAgIHZhciB0aW1lb3V0O1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIHZhciBsYXRlckZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCAkX18wLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgb25jZVBlclN0YWNrOiBmdW5jdGlvbihmdW5jLCBjb250ZXh0KSB7XG4gICAgICB2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIHZhciByZXN1bHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgaWYgKG5vdFJ1bllldCkge1xuICAgICAgICAgIG5vdFJ1bllldCA9IGZhbHNlO1xuICAgICAgICAgIHNldFRpbWVvdXQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgICAgICB9KSwgMCk7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgcmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBjYWNoZWQ6IGZ1bmN0aW9uKCRfXzYpIHtcbiAgICAgIHZhciAkX183ID0gJF9fNixcbiAgICAgICAgICByZXRyaWV2ZSA9ICRfXzcucmV0cmlldmUsXG4gICAgICAgICAgaXNFcXVhbCA9ICRfXzcuaXNFcXVhbDtcbiAgICAgIGlzRXF1YWwgPSBpc0VxdWFsIHx8ICgoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGEgPT09IGIpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIGNhY2hlO1xuICAgICAgZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gY2FjaGU7XG4gICAgICAgIGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgY2FjaGUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBvbkNoYW5nZS5mb3JFYWNoKChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZuKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcbiAgICAgIHZhciByZXN1bHRGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgfSk7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBbXTtcbiAgICAgIHJlc3VsdEZuLm9uQ2hhbmdlID0gKGZ1bmN0aW9uKGNiKSB7XG4gICAgICAgIG9uQ2hhbmdlLnB1c2goY2IpO1xuICAgICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgICB9KTtcbiAgICAgIHJlc3VsdEZuLmFsbG93QWRkaXRpb25hbENhbGwgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlLmFsbG93QWRkaXRpb25hbENhbGwoKTtcbiAgICAgIH0pO1xuICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUoKTtcbiAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICB9LFxuICAgIHByb21pc2lmeTogZnVuY3Rpb24ob2JqLCBtZXRob2QpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgcmV0dXJuIG5ldyBQKChmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChyZXNvbHZlKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZmluZEluZGV4OiBmdW5jdGlvbihhcnJheSwgcHJlZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAocHJlZChhcnJheVtpXSwgaSwgYXJyYXkpKSB7XG4gICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAtMTtcbiAgICB9LFxuICAgIG1lbW9pemU6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgdmFyIGNhY2hlID0gW107XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciBpbmRleCA9IFUuZmluZEluZGV4KGtleXMsIChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICByZXR1cm4ga2V5LmV2ZXJ5KChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdiA9PT0gYXJnc1tpXTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICByZXR1cm4gY2FjaGVbaW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAga2V5cy5wdXNoKGFyZ3MpO1xuICAgICAgICBjYWNoZS5wdXNoKHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgdmFyIEVQUyA9IDAuMDAwMDAxO1xuICB2YXIgc29ydE9mRXF1YWwgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiAoYiAtIEVQUyA8IGEgJiYgYSA8IGIgKyBFUFMpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbiA9IFUubmV3Q2xhc3MoZnVuY3Rpb24odG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfSk7XG4gIFUuUG9zaXRpb24uc3VidHJhY3QgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBuZXcgVS5Qb3NpdGlvbihhLnRvcCAtIGIudG9wLCBhLmxlZnQgLSBiLmxlZnQpO1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLnRvcCwgYi50b3ApICYmIHNvcnRPZkVxdWFsKGEubGVmdCwgYi5sZWZ0KTtcbiAgfSk7XG4gIFUuU2l6ZSA9IFUubmV3Q2xhc3MoZnVuY3Rpb24oaGVpZ2h0LCB3aWR0aCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgfSk7XG4gIFUuU2l6ZS5lcXVhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBVLmlzRGVmaW5lZChhKSAmJiBVLmlzRGVmaW5lZChiKSAmJiBzb3J0T2ZFcXVhbChhLmhlaWdodCwgYi5oZWlnaHQpICYmIHNvcnRPZkVxdWFsKGEud2lkdGgsIGIud2lkdGgpO1xuICB9KTtcbiAgcmV0dXJuIFU7XG59KSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvbWlzYy5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAna2VmaXInLCAndHdlZW5qcycsICdrZWZpci1qcXVlcnknXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIFRXRUVOLCBLZWZpckpRdWVyeSkge1xuICBLZWZpckpRdWVyeS5pbml0KEtlZmlyLCAkKTtcbiAgS2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvYmoub24oZXZlbnROYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoKGZ1bmN0aW9uKGYpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICB9KSk7XG4gIEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCk7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbkZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsICRfXzEpIHtcbiAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgIGR1cmF0aW9uID0gJF9fMi5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSAkX18yLmRlbGF5LFxuICAgICAgICBlYXNpbmcgPSAkX18yLmVhc2luZztcbiAgICB2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgYWRkU3RyZWFtID0gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBjaGFpbmVkU3RyZWFtcyArPSAxO1xuICAgICAgICBidXMucGx1ZyhzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ub25FbmQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoYWluZWRTdHJlYW1zIC09IDE7XG4gICAgICAgICAgaWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7XG4gICAgICAgICAgICBidXMuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9KSkoKTtcbiAgICBhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgaWYgKGVhc2luZykge1xuICAgICAgICB0dy5lYXNpbmcoZWFzaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICB0dy5kZWxheShkZWxheSk7XG4gICAgICB9XG4gICAgICB0dy5vblVwZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcbiAgICB9KSkpO1xuICAgIGJ1cy50d2VlbiA9IHR3O1xuICAgIGJ1cy5zdGFydCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHR3LnN0YXJ0KCk7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIGJ1cy5jaGFpbiA9IChmdW5jdGlvbihvdGhlcikge1xuICAgICAgYWRkU3RyZWFtKG90aGVyKTtcbiAgICAgIHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1cztcbiAgfTtcbiAgS2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG4gICAgcmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcpIHtcbiAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBVLmNhbGw7XG4gICAgdmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBvcGVuID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGNsb3NlID0gS2VmaXIuYnVzKCk7XG4gICAgcGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgb3Blbi5lbWl0KCk7XG4gICAgICAgIHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgY2xvc2UuZW1pdCgpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgYnVmZmVyID0gKGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSkuYnVmZmVyO1xuICAgICAgd2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcbiAgICAgIHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IChmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICAgIHJldHVybiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuICAgIHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvVGhpcyA9ICRfXzAub25WYWx1ZSgoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgb2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1RoaXMoKTtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1BhY2luZygpO1xuICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSA9PT0gdmFsdWU7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIGRvTm90aGluZyA9IChmdW5jdGlvbigpIHt9KTtcbiAgICB0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vZmZWYWx1ZShkb05vdGhpbmcpO1xuICAgIH0pO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihldmVudCkge1xuICAgICAgcmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24oYnV0dG9uSWQpIHtcbiAgICB2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6ICgoZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIGIgPT09IGJ1dHRvbklkO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBwcmVkKGUud2hpY2gpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKS5tYXAoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgIG1vdXNlRG93bkV2ZW50OiBtb3VzZURvd25FdmVudCxcbiAgICAgICAgICBtb3VzZU1vdmVFdmVudDogbW91c2VNb3ZlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICB1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG4gIH07XG4gIHJldHVybiBLZWZpcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUgzZ3dYQVJzTDAvZ3QvUUFBRWFKSlJFRlVlTnJ0blhsUWsxZS94NzhKQVJSTVNBSUpCbVJUaU11QUVoVmxVenU5akN2akJyaTBycS9hdm81THRXTUhmZTJ0NzFSN1c2Vmp2VE10MUpsV3ZXcXJWZERDS0pheHQ1VTZRcXNkWkhNQlZFaGswMUFpU3dRRWN1NGZ4bHlsUEU4aVc1NkU4NWs1TThBNUpMOXp6dmQ1bnJQOHp1OEJLQlFLaFVLaFVDZ1VDb1ZDb1ZBb0ZBcUZRcUZRS0JRS2hXS0g4R3pFem9rQTVnRUlCZUFOd0ptRHRoTUFiUUNxQU53RWtBa2dqMHFzZDBRQitCbEFQWUNuQURxTkRjM2wxR20wdGQ1b2V4VHR4dGU5bEFnWkF1QWpBSzBBRERiUTZVekpZS3pEUjhZNlVTem9mRmNBS1RiYzZVd3AyVmczQ2t2bk93SDRUenZzL0JkcHQ3R09sRzQ2bndjZzBvNDcvMFdLTk5hVjBzM1Zuek1JQkpETHBic0FsNVFZQ2VBYVd3R1pUQWFaVEFaSFIwZE9pcmk5dlIxYXJSWmFyZGFTdXViU3kvNVZ6ckpkT1NxVmlwdzVjNFowZEhRUXJ0TFIwVUhPbkRsRFZDcVZ1YnZBR2RyZHJ6SWN3RE9tQnZQMzl5ZFhybHdodHNLdnYvNUsvUHo4MkFUd0RJQW5GeHFlenhFQnJBZkFlRjlmdUhBaG9xT2piVWJOMDZaTnc4S0ZDOW1LT0JyclRBVkFDT0VEK0FkVHZsd3V4N1JwMCtEZzRHQXpBbkJ3Y01DMGFkTWdsOHZaaXYyREM3TUJxd3VBeCtQTkJSREFsQjhXRm9ZWk0yYlkzRE50eG93Wm1EeDVNbHVSa2NhNkQvcEh3SHZHNStMZmNIWjJSblIwTk56ZDNXMU9BQjRlSG9pT2pvYXpzelBqemM5WTkwRXRBQ1dBTUticHFGS3B4T3paczIxMlpEdDc5bXdvbFVxMktYZ1lnS0RCTElBTkFGeVlNaWRPbklqUTBGQ2JGWUJLcFlKS3BXSXI0bXBzZzhFbkFFS0lBTUFpcHRHL1FxSEF2SG56Ykg1K08yL2VQQXdmUHB4dE5yREkyQmFEanBVQUdwam15aEVSRWFTdHJZM1lPbTF0YlNRaUlvSnRUYUFCd0lyQitBaFlBVURZN1gzUjFSV3paczJDazVQdGI1dzVPVGxoMXF4WmNIRmhmTklKalJlRGZVTUk0Um5uL0RBT2ZqUk1WMFZBUUFBcEtTa2g5c0xkdTNkSlFFQUEyMTFBWTJ3VEVFTDRBN2srSU9pUGpnYmc4RkxpODNpOFlUd2VMeEJBQ0lBeEFQNERnRmUzdHlRK0g2R2hvV3lqWjV0ajlPalJtREJoQXRScU5Rd0dRM2RGdkFBY0JmQy9QQjd2TG9BaUFQY0lJYzE0N2xYVStTTHhlRHpDcGF0YVFBaHhNUmdNNHZUMGREa0FId0JUOFh4bDd5Q0FMQUNWZUkzdFVyRllUREl5TW9pOWtaNmVUc1JpOGV0dUhWY2EyL0FnZ0hYR3R2VkpUMCtYR3d3R01TSEVwYmNEU041cmRyZ0xqOGVUR0tjdkhzWjUvSmlYMHVqZWlpbzRPQmhGUlVWMitSZ01DUWxCY1hGeFgzeFVDWUM3TDZWU0FIVUE5SVFRSFkvSGU5clhWN29Jd0hRQS93YndHOXZvdlRmSjBkR1JmUExKSjhSZTJiZHZIM0YwZE93dlI1TUdZOS84RzhCMFFvaXd6NFFMNEw4Qk5LT2Z2V1hjM2QxSlZWV1YzUXFncXFxS3VMdTdENFRYVWJPeHowSjYyL2t4QUs1amdOeWxFaElTaUwwVEZ4YzNrTzVuMTQxOTJLTlpRQ1NBcndHTTZ0ZHBpRUFBaFVJQkx5OHZ2UGRlLyt5TjFOZlhRNlBSb0xxNkduVjFkWGp5NUFuMGVqMDZPanBNTnJpNnVrSXNGc1BEd3dOZVhsN3c5ZldGVkNydGMxdTJiZHVHeXNwS1ZGZFhvNmFteG1SRFB4Rm03TU5WZU81dmFka2dNRDA5WGI1Z3dZSkxlSDRraTZDUGZBZmxjam44L1B6ZzYrc0xiMjl2K1ByNlFxRlFtSHo5eG84ZkR6Ni9iOWFtN3R5NWc5emNYQlFVRk9EQmd3ZW9yYTJGVnF1RlRxZERVMU1UQ0hsMU5zWGo4U0FVQ2lHUlNDQ1R5YUJRS0JBUUVJQUpFeVlnTWpJU1k4YU02Uk83REFZRENnc0xUYjZETlRVMTBHZzBxS3FxZ2thamdWcXR4dVBIai90cytHYnN1enlkVGpkYklwRm9MWjBGZkFMZ1h6MzlWbGRYVnlpVlNnUUVCR0RreUpFSUNBaUFsNWNYcEZJcEpCSUpwRklweEdJeFhGMzc5cHhFUjBjSDB0TFNjT0hDQmR5K2ZSc1ZGUldvcjYvdjFXZEtwVkw0Ky9zak9EZ1lzYkd4V0x4NGNaODdwK2oxZWp4NThnVDE5ZlhRNlhTb3I2OUhkWFUxeXN2TDhlREJBNVNYbDZPMHRCUjZ2YjQzWC9OZkFIWmJJZ0JQQU9VQWhwcGRSK2J6TVhyMGFDaVZTZ1FGQlNFb0tBZ0JBUUZ3YzNPRG01c2JoRUtoS2ZVM2h3OGZ4dmZmZjQrU2toSThldlNvWDc1aitQRGhVQ3FWZVB2dHQvSE9PKy8wZTUyYW1wcE1xYUdoQVEwTkRTZ3ZMMGRaV1JuS3lzcFFXbHFLa3BJU3BzV2xyclRndWVPTjJjYjVKOXZBZ3NmamtkV3JWNU9zckN4U1hGeE15c3ZMU1cxdExXbHNiQ1R0N2UwRFBxaTZlUEVpQ1E4UDc4a2lTNCtUV0N3bTRlSGhKRE16YzhEcjI5N2VUaG9iRzBsdGJTMHBMeThueGNYRkpDc3JpNnhhdFlvWVZ3blowcnVXS0NXRDZRUDRmRDc1N0xQUFNITnpzOVZIMDNxOW5xeFpzNFpJcFZLckhmS1FTcVZrN2RxMVJLL1hXNzA5bXB1YnlhZWZmbXBPQkJtV0NJQnhreVkyTnBab05CcXJWelluSjRlTUhUdVdDQVFDcTUvMEVRZ0VaTnk0Y1NRM045ZnE3YUpXcTBsc2JDeWJ2V3BMQk1Eb241K1ltR2oxU2g0NWNvVElaRExPSGZtU3lXVGs2TkdqVm0rZnhNUkVOanZiTEZrSFlQVFBIenAwS0t4SlVsSVM5dTdkaTZhbUpzczJPbmpQeDdnaWtRaFRwa3pCRzIrOEFaVktoY0RBUUNnVUNnd2JOc3cwMkhyMDZCSEt5c3FRbDVlSDdPeHMvUEhISDZidjZUcGw3QTZ0Vm91dFc3ZWlycTRPTzNic3NGb2JtZWtqaXh3c0dCVzBaODhlcXluN3dJRUR4TVhGeGFLcmtjL25FNUZJUkdKaVlraHFhaXBwYlcxOTdlOXJhV2toWjg2Y0lURXhNVVFrRWhFK24yL1JkN3U2dXBJREJ3NVlyWjMyN05sanprYmJFOERYWDM5TlJDS1J4ZnNKY1hGeDVPYk5tMzMyL1hsNWVTUStQcDU0ZUhoWVpJT2JteHM1ZlBnd0ZVQmY3YU43ZVhtWmJYUW5KeWNTR1JsSkxsMjYxRysyL1BUVFR5UXlNcEk0T1RtWnRjZmIyOXNxZmcxMkpZREN3a0l5WmNvVWk2WmpXN1pzSVMwdExmMXVVMHRMQzltMGFST1JTQ1JtN1pvNmRTb3BMQ3lrQXVnSk9wMk9yRnUzenFJckxUazVlY0N2dEMrLy9KS01HREhDckgzcjE2OG5PcDJPQ3VCMXo5a2ZQMzdjYk9PT0dER0NuRDE3MW1vRHJ0VFVWT0xqNDJQV3poTW5UcERPems1T0NvQ1RCeEkwR2czMjc5L1BXa1lzRnVQUW9VT0lpNHV6K0hPMVdpMXUzNzROdFZxTnVybzY2UFY2Q0lWQ0xGdTJqTzN3QmlOeGNYSGc4L2xZdDI0ZGREb2RZN2tEQnc0Z09qb2Evdjcrbkd0cnpnbWdyYTBOWjgrZXhhMWJ0MWpMN2QrLzMrTE92M256SnRMVDAvSG5uMy9pL3YzN3FLNnVSbU5qb3ltL3FLZ0kzMzc3Ylkvc1hiUm9FZXJxNmxnM2g0cUtpcENhbW9xdFc3ZmF4RmtIcXo0Q05CcU4yWlcrN2R1M1d6VGdxNm1wSWJ0MjdTTEJ3Y0dzODNoUFQ4OWVEd3pmZi85OVZwczlQVDNKdzRjUE9mY0k0SE5KZWUzdDdUaC8vanhya0NXVlNvV05HemRpeUJEMndKczVPVG1JajQvSDU1OS9qdUxpWXNZdFV3Y0hCK3pjdWJOWGRnOFpNZ1FiTjI3RXhJa1RHY3M4ZXZRSTU4NmRRM3Q3TzcwRE1QSDA2Vk1TR0JqSXF1QlRwMDRSZzhIQStqbFpXVm1NZzdOWnMyYVJwS1Fra3BtWlNYNy8vWGR5NjlhdFB0dk5PM1hxRkt2dFNxV3kzM2NPYlhZV1lEQVl5SlVyVjFpTm56dDNydG5keUp5Y25HNVg3RmF1WEVueTgvT0pUcWNqcmEydFprWFUwOGZYM0xseldldHc5ZXJWZnZsdW0zOEVFRUp3OXV4WjFqTExseStIajQ4UFkzNVZWUlhlZXVzdDFOWFZtZjdtN2UyTjA2ZFA0NXR2dnNHRUNSTWdGb3ZoN094czJpanFTM3g4ZkxCczJUTFdNai84OElORm0wc0RCYWNFa0pIQjdLOHdaY29VMW1BUnJhMnQrUERERDFGUlVXSDZXMUJRRUk0ZE80YWxTNWNPMk9nN05EUVVZV0Zoek40MkdSbFVBTjJoVnF2eDhPRkR4dnpwMDZjak1EQ1FVVHczYjk3RXNXUEhUSDlUS0JUWXUzY3ZZbUppQnJRZWdZR0JtRDU5T3VzYWgwYWpvUUxveXRXclYxbjM5VU5EUXhsSC9wMmRuZGkzYjkvL0wyNElCRmkrZkRtV0xsMXFsZjE0bFVyRitvajU3YmZmcUFDNmtwZkgvSGFWTVdQR3NLNmkxZFRVSURNejAvUjdjSEF3dG16WllyVzYrUHY3WS9UbzBhd0xVMVFBWGJoejV3NWpucCtmSDd5OHZCanp6NTA3Wi9yWjBkRVJVVkZSVmwxMlZTZ1U4UFB6NjFGZEI2MEFYaDY4ZFdYNDhPSHc4UEJnelAvbGwxOU1QN3U3dTFzOXVKU0hod2ZyM2dKYlhRZXRBTmhXL3lRU0NldmhrcGZqQ1FpRlF0WVZ1WUZBSkJKQklwRXc1dmZoMFMvN0VjRExtek5kWVFtd0JBQ29yS3cwL2V6azVBUlBUK3NING1hejJWS24xa0VsQUxialRRSUIrNmJseSt2clhObHRZN081czdPVEN1QnZockNjQ2paM2hQcmRkOTgxVGNGV3JWckZpZnF3MmR4WEo2RDdSS2hjTVVRa0V1SEpreWZkNWoxOXloN3k1dU9QUDhhY09YTXdkT2hRUkVSRWNLSStiRGE3dWJsUkFYUkZKcE14Q3VERm1YNm1nYUJjTHNlQ0JRczQwNmhOVFUyc0hrSXltWXcrQXJwYlBHR2l0cmIybFEwZXJsTlhWNGZhMnRvZTFYWFFDbURjdUhHTWVXcTFHdFhWMVRZamdPcnFhcWpWek9jd3g0NGRTd1hRRmJhZHZydDM3M0pxOGNRY0ZSVVZLQ2twWWN3M0UwSitjQXFBYlFlTkVJTDgvSHkwdHJaeXZ2TmJXMXVSbjUvUHV1WExWdGRCS3dBL1B6OVdaNC9zN0d5VWxaVnhYZ0JsWldYSXpzNW16UGYxOVlXdnJ5OFZRRmQ0UEI3bXo1L1BtSC9qeGcwVUZCUndYZ0Q1K2ZtNGNlTUdZLzc4K2ZQN3hSdkpMZ1N3Wk1rUzFqS25UNTltZFJxeE5nOGZQc1RwMDZkWnl5eFpzb1FLZ0VrQVlXRmhDQXBpZm9mU3hZc1hjZTNhTlU2NVZMMDhUcmwyN2RvcmZnbGRVU3FWbUR4NU1oVUFFd0tCQUpzM2IyWXRrNVNVaFB2MzczTk9BUGZ1M1VOU1VoSnJtYzJiTjV2ZDF4alVBbkIwZE1UaXhZdFozN2labDVlSGxKUVVUczBJV2xwYWtKeWN6T3JWNU9ucGlVV0xGbkh1emVkOHJsMUpjcm5jYkl5ZGd3Y1A0dVRKazV5eCtjU0pFemgwNkJCcm1SMDdkcGg3bFN3VkFQQjhPemMrUGg0aElleVJ6aE1URTVHV2xtWjFlOVBTMHJCcjF5N1dNaUVoSVlpUGorZmt3VkRPQ2VERm1rQmlZaUpybWZyNmVtemJ0czNzWVpMK0pEVTFGZHUyYlRNYmozam56cDJjbXZ0elhnQjhQaCt4c2JGWXY1NzlEZXVWbFpYWXZuMDd2dnJxcXdHM01UazUyUlQ2blkwTkd6Wmczcng1blBJQk1EdWpBVWRpQkJVVkZaR3BVNmVhamNBaGtVaklwazJiQmlSa2EwdExDOW04ZWJORk1ZTEN3OE5KVVZFUmpSSFVHekl5TW9pM3Q3ZEY3eHNLRHcvdjF5aGhseTVkSWhFUkVSWkZDUnN4WWdTTkV0WlhwS1NrRUtGUWFIR2N3SVNFQkZKUVVOQm4zNStmbjA4U0VoSXNqaE1vRkFwSlNrb0tqUk5vN1VpaE0yZk9KT2ZPbmV0UnBORFcxbGFTbHBaR1pzNmNhZGVSUW0zbXJkVWZmUEFCQUZnVUs5aGdNS0N4c1JHWEwxL0c1Y3VYSVJLSkVCNGVqamZmZkJPaG9hRVlOV29VUEQwOVRXOHMwZXYxcUttcHdiMTc5MUJRVUlEczdHems1dWFhWE5VdFhYb1dDb1g0NktPUHJCb3IySzRHZ2QxeC9QaHhJcGZMT1JjdFhDNlhreE1uVGxpOWZXdzZScEFsckZ5NUVoY3ZYa1J3Y0RBbjF0VUZBZ0ZDUWtKdzRjSUZyRml4d3VhdWRyNHQzcUltVDU2TUd6ZHVZTVdLRmYzeWFqZExrVXFsV0xseUphNWZ2ODRhRklJS29COFlNbVFJamg0OWlwTW5UeUl5TXBMMUxGNWZJNUZJRUJVVmhlKysrdzVIamh3eEc3R015d2hnNDh5Wk13ZHo1c3pCMGFOSGNlellNWlNXbHJLNlpQZUdGMjhOVzdObURkYXVYUXQ3UUFBN1llM2F0Vmk5ZWpYUzB0S1FtWm1Kb3FJaVZGUlU0SysvL3VyVjU3cTd1OFBmM3g4aElTR1lPM2N1NHVQak9lWFFRUVhRWlE4aElTRUJDUWtKS0MwdHhiVnIxMUJZV0dnS0QvdjQ4V1BvZERvME56ZDMrLy9EaGcyRFJDS0JYQzZIbDVjWFJvMGFoZkhqeHlNcUtncEtwUkwyaUFCMmlsS3BOSFdhVHFmRGd3Y1BUTzhPYm14c3hOT25UMDJuaWgwZEhlSGk0Z0tSU0dSNmQvRElrU01IZEZ4QkJkRFBnN1pKa3laaDBxUkpvTmpKTElCaUJRSFkwK0RIWG5uZFB1cE9BSXpoSzdnVTJZTFNvejdxc0VRQWpQT21pb29LTkRRMDBGYm1LQy9lTHM3Q1g1WUlnREdJM2ZuejUxa1BQbENzUzJabUpuNzg4VWUySW4vclc0ZHVDbzBBOEdaMy8vM3MyVFA4L1BQUGFHOXZ4N2h4NDB6YnFSVHJvdFZxOGNVWFgyRDM3dDNtdHNxL0FmQktUTjd1Umd6K0FNcHBzOW9sQVFBcXpEMENOQUMrcDIxbGQzeG43RnVZdXdNQWdCK0FmQUJpMm01MndSTUFvUURVbHE0RGFBQnNBTkJLMjg3bWFRR3d2cnVyMyt5YUFvQjNBR2pCTWZjcm1peE9XdU9GM0tzVnZBVUFjZ0MwMFFhMW1kUm03TFA1NWpyWHdRSUJsQURJQXRCZ1hFbHlBT0JxNGY5U0JvNTJBQThCWEFmd1B3QjJBL2pUa3R2ODY2QUFNTUU0blpBQWNPenQ3WVhTYTRpeDgzWEc2WHMrZ0ZyYUxCUUtoVUtoVUNnVUNvVkNvVkFvRkFxRlFqSHlmNWJ0bG9PcmY5aC9BQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLWJsYWNrLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFBQm1KTFIwUUFBQUFBQUFENVE3dC9BQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVIM2d3WEFBMHNhNmhIZGdBQURTWkpSRUZVZU5ydG5YdVFYVldWaDcvVjZUd2tCa2dNNUlHUVpKUUFRa2lJb2dJcWxvTU9FeENGaUZvem9LZ29JR1ZKcVlpbGdwYmxBd1VkUldxb0dSOFJRVVZlT2d4SVVUTFVqR05BVVpOQWdtSUlKR2xNT2dsSmQ1N2syZm41eDE1ZHVlbnVzOC9wN3R2M25udDdmMVdudXBONyt0eTE5bDVuUDlkYUd4S0pSQ0tSU0NRU2lVUWlrVWdrRW9sRUlwRklKQktKUkNMUmhGZ2pDQ2xwTG5BT01BYzRDaGhkUXRrRjdBYldBSXVCWDVuWm9tUmlnNnY0TXlROUxLbEQwb3VTdWxSK3VseldEcGY5akZTVC9hLzRNWkt1azdSTDBuNDFMdnRkaCtza2pVazFXNnp5eDBxNlJjM0h2MHNhVzdieWJpbFo1WThDUGdGYzNvUzJmUVZ3bGV1WUJvRjlWTDRCcHdFTG03eVJPd040ek15VVdvQ0RHUW5jT0F4NnVXKzZycWtGNk5FQ25GN2c3WC9CcjcwbHJkeVJ3QkYreFRqZHpCNUxJNzZERGVDdW5FSFVJa2tYU2hwUlloMUd1SXlMY25TNU05WDR3UVUzV2RLZVNJR3RsSFJtQStuelprbXJJdnJza1RRcGpRRU9jR2xPdi9oTDRMY05aTlAvN3pMSHVvcEwwNnNQZEhWMXRVaDZMdksyckpkMFFRTzJhdk5kOWl5ZWJXOXZ0MkZ2QUpMT3pla3Y3NWYwc2diVWE2S2tCM0owT3lkMUFmQnh3a1pLWCt3R2ZtdG1teHJOQU14c28zZGJ1N05zeEhVZjFtLy9URW1iSTIvSWs1TG1OTEIrcDdnT1dYUktPblk0dHdBZkJnNkpmTDdJekpZMHFnR1kyV0xDMW5BV1k3ME1odVhiM3lwcFJlVHRXQ3Zwd2liUTg5MlMyaU42UGlPcGRUZ2F3TVdTdGtRSzV0R3liWndNVU05UnJrc1dXeVJkTkJ5N2dJdUFjUm1mN1FBZU1yTTlqVzRBcnNORHdJc1p0NHdETGg0T2I3eEphdkhmVDVYVUZua3JucE0wczRsMFB5NW5yYU5OMHFsK2I0dnZqTmFFMXFHb2FHQkV4ZFVDdkJSNEpUQkwwdkhBUHdKVE14NnhIMWhpWnN1YnhRRE03SytTbmdDbVpiUzZVNEVGa3Y0SGVCcFlLbWtGc04zTG82djdxdlkyY3VzZ0s3c1ZHRlZ4alhabFRnUk84cDhuRWh3NWk3SVZXTkNFamVBQzRNM0E0WDE4TnFLaXJDcFpBenhWY1MyVHROYlhGdlowWDJhMmI4REcyYzhLUHdRWTc5T1hpY0JNNFBpSzY3Z3FGTlF5TTV2VnBOM2dVbjh4QnN0ZnZhWG92cFlERzMzczFHbG1MMWExQlpCMEtNRWwreTErelFZT0hZSXkyZ3Y4ckltSFFuY0FYMkR3RGlISCtmV09IaTNuRThBamtoNEJGcHZadG1wWTdTeEozNUcwdlFhT2t4c2xUVzNpZ2ZCVTEzR28yZTUxTm11d0FwOGw2ZkVhZXM0MnZhT0VwTHRyV0o2UFN6cHJRR01BZDlINk1mQ0tJUzZUZlVBN3NCYjRwSmt0SElKQ253QWM0d1BVaVQ0UUcxdlJCZTd6L25Pejk2VnJnVFl6NnhnQ1dkNUE4SDJjQ2t3WmlwbFlENTRGM21kbWp4WTJBRWxIQWc4Q2N3bTdWdFdhbDI0QVZnTnRQc0p0ODhydjl2Vjcwc3oyVjZtZ1R5QjRHYzhHL2dHWVRQRFZHKytMTHoxMUVyQU42SFJaMm9HVjNxOCthbVpQVjBtdUZ1QmtEdmdPVG5IalBNcC9UZ09PckphOXVaNkxnTFBON0lXaUJ2QVY0TE9EK09JZFBqSmRDVHpuUDljQ0hWN0FIY0JtTTl0UjViZXJGWmdQbkF1OENwZ09UQmprWXp1QVZjQXk0SDdnWGpQcnFyTGNZNzFWbXVBR09zRmJpQmx1dkROOHhqV1l3Skt2bXRubmNnM0FmZFZXQWk4cDhORDlQaVZaRGp6ajEwcGdpMS9iZ0cxVkdZM21GK0psd0wvNDZIaW8vTzNXdWE0L01iUC9ySUZPNDd5MUdnY2M1dGNNNEZpL1pycStSWmIwZHdJenpHeDkzcGRlWGlEZTdVZVMzaWJwUkVuVEpVMlNOSzRldTFxUzVrbDZ6UGZXYTBXbmYrYy8xMEhmVmkvclNWNzJKM3BkM0ZvZ2p2S3lJbDl3WDA3azZ6VmxpSEdUZElpa0JaSTIxVEhlYjVPa0gvb0NXYjNMWTZ5a3orUVl3WDFGSGhUYnBQbHZTVWVYUU5uVEpQMVowdDRTQkgzdWxmU1VwTmVYb0Z5TzhUcktZblhQdittcjc1Z2MrWTZuek96NU9pdjVBZUMvZ0JOcU1JVXF1cHI2S3VBK1NaZlVVeEF6YXlQc0dXUXh1Y2hTOE1pY2dVUTlLLzlxNEZxeS9RajZtZ1oxTDVNK0R2d3Z3VVZyQmRCdVp0c3JCbHVUZkdBMUZ6Z1RlRjNGOXhTWkJoOEIzQ1Jwb3BuVk04WXhWa2VqaWhSeWpDL1dzL0lsN2VoSGxvNHRrbjd0L3ZtakIvQjlZenpNNjlmK3JLNStMTU5lWGNkeSttSk11SVkwQUVtWDViaVA5ZHhQdUx1YTNzVHUzWHVYcEJjS3lyQlowa2VTQVZSSG9mTWtyU2xRNkxzbExaUjA5aERLOGsvK0hic0x5UE0zU1c5UEJqQTRaV1pKK24zQjZkaE50Y2pENDEzRHpaNEVLby9mRFhwSGJyZ2FnS1RESlgyLzRKdDJSUjNldENzbFBWOUF2dTlKT2p3WlFQK1VHT0Z1NDNrOEwrbGRkUnh3emM5Wk4rbm1vbTZIMkxJWlFGa0RFbzRCcnNtNVp6TndsWm5kMDQvQ09jTG43Tk1JMjhKakNmc1ZkNWpadWdITXUrK1J0Qi80QVdFVEo0dFBFK0lFVjVXdG9FdG5BRDVsdTVEZURwSTl1YVpvNVVzNmhlQSs5UnFDZjhOVURuWnBtd1Y4YUlDTEw3K1FOQkdJYlE3TkF0NGw2YWJTeHpyVXV3dVFkTFNrRFRseWZLdklnTTh6ajN4VjB0S2NlZnk2UWNvOFJ0STNjMlJlSitubFplc0N5cFluY0NSd1B2RWtTNHVCVzh4c1Y4NnpUZ2Z1Qmo1RjhNVE4wclVMdUg2UVM3QzdnRnNJamhkWlRBSXVjQjFURnhDUjUyTTU5M3pEbDNKamxmODI0UHRBWHh0WER3RVBFOWJNTzN3TU1PaSsyY3hXU0xxQnVGZnpsUzVYV2JPYzFhOEw4TkN4TTNPKy80RzgzVWpmS2V4cnhlN0hrbWI3OUhMMFVJUmZlZmVWbHhYa0RVTVordFhJWFlENTRDL0d6Mks3a1pLT0FuN3FJL3h1MWdEdkJTNDFzeWZNYkxPWjdSNktUSjB1MngwNXQ3MkhFdVZuTEpzQm5CZjUvSEZnU1d3Z0JueVo0QWZZelRQQUpXYjI4eHFPdnBjQWY0aDhmbDR5Z0w2Wmx0Rm5kL09ickw3Zm05UlRnRXNxL3JzZHVOYk1IcTZ4SGl0YzF0Z2F4ekhKQUhyenhsalhSb2dZemhyNWp3QStYL0h2ZmQ1ZC9Mem16WmpaVHArcHhMcVlOeVVENk0zY3lHZFA1NHpVcHdEekt2NjlEUGh1SFhWWlJmQ1d6dUtVWkFDOU9TSHkyV3BDWEVFV2xZa2s5d0lMeld4VkhYVnBkNWtIb3V1d05ZRHBrYy9XRVVLMnNuaEx4ZStiZ0FmcXJNdEdsM2tndWc1YkE0aXQvblhtQkpkVTdybHZJNzRpVjR0eHdGWkNCRlFXUnlZRDZFMHMzMEJld29QS05mWTl1ZEV2dFNFbTg3aGtBUDJUSlM4RlN1WDZlbGwyMjJJeWowZ0cwSnRZVkhEZW5zVi8rTStkaEpEMk10QTZRRjFMSTJTdDJVcmZDWlFnbms0VzREcENPUHRPb0N4SHNjUmszcElNb0RjdlJBeGd2S1J4V1FOQk05dEFpQllxQlI1b01qNUgxOVFGOUNBMmI1L013UnM4WldjaThSQzdWY2tBZXZQbnlHZlR5RTRzV1VhbXVzeFovQ1VaUUc5aWFlR1BwMFNMSndXWVRqeG40dUprQUwySjdhQVpNS2NSRG1CMkdlY1EzL0w5VFRLQTNxd0dZcUhuWnhLaWQ4dk9zUzVyRm0xK0pRUG8rZklBc1F3V3B4SXlmcFdkT1M1ckZ2Y1IzeW9lMWdhUWx5anl2V1hJVUJKcC9vOG11Si9GdURNWlFOOXplUkZjcVo2SjNIWU9jRVl0OCtuM28vS05jREw0dk1odHk0RS9sdVhrOExLMUFCRFd6Mi9PdWVkcWhqNTc2VUI0cGNzVzQyYnk5eldHcndHWTJWN2dYa0pHMFN6bUFsZVVhVVlnNlNYQVI0bDdOYTBIZnVFNkpnT0lzSUdRU3pmR0p3aG5EcFdGaTRHcmN1NjVNY2V3a3dGNEs3Q0hFTksxTk9mV3IwdWFYNEszZno3d3RaemJsZ0ozbHpFd3RJd3RRUGVhd05kejdwa0FmTHVlWnd0NmJvSnZrNStQK1BveXpmMUxid0NlTWZ4K1FoeGRqSmNEL3licHlqcFUva2U5OHZNaWZyOEhQRkN0TE9pMVVLeE1PWUpPOGp3N2VYUjQzcDVEYWlEVEdFbmZMWmdqNkRGSko5VzR6Sm91UzlqYlBROVFIbnU4d0ljeVM5alpmZ3JvN29McGExS1dzQ29wZGJta3JmM0lFM2lucEpPcitQMnovWmxGOHdSdWxYUjVuY3FxK1F6QTVScElwdENISkowL3dFeWhveVZkNE05bzJreWhEWE5xdFpuZDRQSVh5UlhjUW5BemY2dGZXeVg5RG5pRTRIZndMTEMrczdOengvang0eUVraTVyaXEzbXpDYnQ1cDNIQVZiM28wdk0yNEV0MXpoWGNQSVBBRFBrdWxyUmU1V045UFU4QkgyZ0wwTkpvQm1wbXR4RTJoWlpSam5YMWZiN1FjNjZaM2Q1bzVkblNpSzJVbWYyUnNPZCtPeUhQVDczb0FHNERYbXRtZjJqRXNteElBM0FqMkdWbUh5RHNDVHhLUEJhdjJuUUNDNEYvTmJNUDVtVXNLek90TkRobTlpRHdvSjhrY2duaEpLM0pRL1IxM2FlRy9jak1tdUtFODFhYUJETmJJT2xXd3JtQjh3Z1J3OU9CbHczeTBac0lmdnhMZ1Y4Uk5uWFVMT1hXTkFiZ1JyQWZ1QXU0UzlKTWdvZk95UnhJRDNza0lXTG5wUm1QMk83Tit3WkNRb3BuZ1NjSkNTZVcwNFMwMHFSNGhTMzNxZEY0d2dtYzNXY0hIMHFJM2V1T0t0NUxDT2ZleW9Hemc1OHpzMDZhbkZhR0FWNlJmL0lyMFF5emdFUjlERUNweUVxUEJtc0FzWk94UjZUeUxUMnhPdHBYeEFBMlJSNHdYZEpocVl4TCt1cUh1cG1STTZYTk5ZQlk2UEw1eEFNZkV2VmxIdkRPeU9kL0tXSkZueTl3S09LMWZ2NU9vaHh2L2hGZWI1dHo2dTV6dldaSWZUeHNPckF5Rld0VE1xTm5CdFcrdW9BMlFzNzlSSFB4RS9wd1RiZU1KbVVhd1hQbThGUnVUY0ZtWUk2WnJTNjZEdEFHZkJqWWxjcXU0ZGtKWEVwR1lFcWZCdUM3WGZjQUh5ZWVwRGxSYmpaNkhkNmJ0WU9aNit3bzZSMkVVenhmRFl4S1pkb1E3Q0hzZTF4dlpyR3NLOFc4WGYzQXcvY1RUcnFZQ1J6RndmbDVFL1ZuTCtHQXJPWEEvd0czbXRtYXZEL3FWNllOU1ZNSWJ0TXpDUHZxSXluUkFVakRkUm5BSzcvVHArOUxCbklPY2lLUlNDUVNpVVFpa1Vna0VvbEVJcEZJSkpxV3Z3TWhhalJ1MWtBbHZBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvY2FtZXJhLXdoaXRlLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlySlF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImtlZmlyLWpxdWVyeVwiLFwiY29tbW9uanNcIjpcImtlZmlyLWpxdWVyeVwiLFwiYW1kXCI6XCJrZWZpci1qcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtYnV0dG9uLXRvLXBvaW50LWNhbWVyYS5qcyJ9