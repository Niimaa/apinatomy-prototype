(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "baconjs", "tweenjs", "bacon.model", "bacon.jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("baconjs"), require("tweenjs"), require("bacon.model"), require("bacon.jquery")) : factory(root["jQuery"], root["THREE"], root["P"], root["Bacon"], root["TWEEN"], root["bacon.model"], root["bacon.jquery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, THREE) {
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
	    this.p('cameraTargetTile').addSource(newTileTarget.flatMapLatest((function(tile) {
	      return tile.p('hidden').value(true).takeUntil($__0.p('cameraTargetTile').value(null));
	    })).map(null));
	    newTarget.flatMapLatest((function(tile) {
	      if (!tile) {
	        return Bacon.never();
	      }
	      return Bacon.mergeAll([Bacon.once(), tile.p('size').changes(), tile.p('position').changes()]).map(tile);
	    })).onValue((function(tile) {
	      $__0.camera3D.userData.target = $__0.object3D.localToWorld(tile.object3D.position.clone());
	      $__0.camera3D.userData.semanticTarget = tile;
	    }));
	    newTarget.value(null).onValue((function() {
	      delete $__0.camera3D.userData.semanticTarget;
	    }));
	    newTarget.startWith(null).startWith(null).slidingWindow(2).map((function($__1) {
	      var $__2 = $__1,
	          a = $__2[0],
	          b = $__2[1];
	      return [b, a];
	    })).onValue((function($__1) {
	      var $__2 = $__1,
	          newTarget = $__2[0],
	          oldTarget = $__2[1];
	      if (newTarget) {
	        newTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(5) + ")")});
	      }
	      if (oldTarget) {
	        oldTarget.element.find('> .tile-button-holder > .tile-button.pointCamera').css({backgroundImage: ("url(" + __webpack_require__(6) + ")")});
	      }
	    }));
	  }).insert('Tile.prototype.construct', function() {
	    var $__0 = this;
	    this.addButton({
	      name: 'pointCamera',
	      icon: __webpack_require__(6)
	    }).onValue((function() {
	      if ($__0.circuitboard.cameraTargetTile === $__0) {
	        $__0.circuitboard.cameraTargetTile = null;
	      } else {
	        $__0.circuitboard.cameraTargetTile = $__0;
	      }
	    }));
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(8), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Bacon, TWEEN) {
	  __webpack_require__(10);
	  __webpack_require__(11);
	  Bacon.fromOnNull = U.memoize(function fromOnNull(obj, eventName) {
	    return Bacon.fromBinder((function(sink) {
	      obj.on(eventName, (function(v) {
	        sink(new Bacon.Next(v));
	      }));
	      return (function() {
	        obj.on(eventName, null);
	      });
	    }));
	  });
	  var requestAnimationFrameFn = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || ((function(f) {
	    window.setTimeout(f, 1000 / 60);
	  }));
	  Bacon.animationFrames = function animationFrames() {
	    return Bacon.fromBinder((function(sink) {
	      var subscribed = true;
	      (function iterationFn() {
	        requestAnimationFrameFn((function() {
	          if (sink() === Bacon.noMore) {
	            subscribed = false;
	          }
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
	  Bacon.tween = function tween(objStart, objEnd, $__1) {
	    var $__2 = $__1,
	        duration = $__2.duration,
	        delay = $__2.delay,
	        easing = $__2.easing;
	    var tw = new TWEEN.Tween(objStart).to(objEnd, duration);
	    var bus = new Bacon.Bus();
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
	    addStream(Bacon.fromBinder((function(sink) {
	      if (easing) {
	        tw.easing(easing);
	      }
	      if (delay) {
	        tw.delay(delay);
	      }
	      tw.onUpdate(function() {
	        var $__0 = this;
	        sink(new Bacon.Next((function() {
	          return $__0;
	        })));
	      });
	      tw.onComplete((function() {
	        sink(new Bacon.End());
	      }));
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
	  Bacon.keyPress = function keyPress(keycode) {
	    return $(window).asEventStream('keypress').filter((function(e) {
	      return e.keyCode === keycode;
	    }));
	  };
	  Bacon.limiter = function limiter(pacing) {
	    var handler = arguments[1] !== (void 0) ? arguments[1] : U.call;
	    var wantedBus = new Bacon.Bus();
	    var open = new Bacon.Bus();
	    var close = new Bacon.Bus();
	    pacing.filter(wantedBus.toProperty(false)).onValue(handler, (function() {
	      open.push();
	      wantedBus.push(false);
	      close.push();
	    }));
	    return function(stream) {
	      var buffer = (arguments[1] !== (void 0) ? arguments[1] : {}).buffer;
	      wantedBus.plug(stream.map(true));
	      return close.startWith(true).flatMapLatest((function() {
	        var accumulator = (function(arr, val) {
	          return (buffer ? arr.concat([val]) : [val]);
	        });
	        return stream.takeUntil(open).reduce([], accumulator).flatMap(Bacon.fromArray);
	      }));
	    };
	  };
	  Bacon.Observable.prototype.limitedBy = function limitedBy(wrapper, options) {
	    return wrapper(this, options);
	  };
	  Bacon.EventStream.prototype.holdUntil = function holdUntil(pacing) {
	    var $__0 = this;
	    return Bacon.fromBinder((function(sink) {
	      var buffer = [];
	      var unsubscribeToThis = $__0.onValue((function(value) {
	        buffer.push(new Bacon.Next((function() {
	          return value;
	        })));
	      }));
	      var unsubscribeToPacing = pacing.onValue((function() {
	        if (buffer.length > 0) {
	          var oldBuffer = buffer;
	          buffer = [];
	          sink(oldBuffer);
	        }
	      }));
	      return (function() {
	        unsubscribeToThis();
	        unsubscribeToPacing();
	        buffer = null;
	      });
	    }));
	  };
	  Bacon.Observable.prototype.value = function(value, comparator) {
	    comparator = comparator || ((function(e) {
	      return e === value;
	    }));
	    return this.skipDuplicates().filter(comparator);
	  };
	  Bacon.Observable.prototype.run = function() {
	    return this.subscribe((function() {}));
	  };
	  Bacon.EventStream.prototype.skipPropagation = function(label) {
	    return this.filter((function(event) {
	      return !U.array(event.originalEvent, '_onlyOnceFor')[label];
	    })).map((function(event) {
	      U.array(event.originalEvent, '_onlyOnceFor')[label] = true;
	    }));
	  };
	  Bacon.EventStream.prototype.which = function(buttonId) {
	    var pred = (typeof buttonId === 'function') ? (buttonId) : ((function(b) {
	      return b === buttonId;
	    }));
	    return this.filter((function(e) {
	      return pred(e.which);
	    }));
	  };
	  $.fn.mouseDrag = function mouseDrag() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var stream = $(document).asEventStream('mousemove');
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
	      return stream.takeUntil($(document).asEventStream('mouseup')).map((function(mouseMoveEvent) {
	        return ({
	          mouseDownEvent: mouseDownEvent,
	          mouseMoveEvent: mouseMoveEvent
	        });
	      }));
	    }));
	  };
	  $.fn.mouseClick = function mouseClick() {
	    var threshold = (arguments[0] !== (void 0) ? arguments[0] : {}).threshold;
	    return $(this).asEventStream('mousedown').flatMap((function(mouseDownEvent) {
	      var untilStream = $(document).asEventStream('mousemove');
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
	      return $(document).asEventStream('mouseup').take(1).takeUntil(untilStream);
	    }));
	  };
	  $.fn.mouseWheel = function mouseWheel() {
	    return $(this).asEventStream('mousewheel DOMMouseScroll');
	  };
	  return Bacon;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

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

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNzNmODAxYzU4MzcyZGViZWE4ZCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL21pc2MuanMiLCJ3ZWJwYWNrOi8vL0B0cmFjZXVyL2dlbmVyYXRlZC9UZW1wbGF0ZVBhcnNlci8wIiwid2VicGFjazovLy9AdHJhY2V1ci9nZW5lcmF0ZWQvVGVtcGxhdGVQYXJzZXIvMSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9iYWNvbi1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nIiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiQmFjb25cIixcImNvbW1vbmpzMlwiOlwiYmFjb25qc1wiLFwiY29tbW9uanNcIjpcImJhY29uanNcIixcImFtZFwiOlwiYmFjb25qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJiYWNvbi5tb2RlbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImJhY29uLmpxdWVyeVwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVUsd0JBQWtCLHdCQUE0Qix3QkFBVSxDQUFHLDBDQUFVLEVBQUcsR0FBRyxNQUFJLENBQUcsTUFBSTtBQUN2RyxjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLDhCQUE0QjtBQUNsQyxZQUFPLENBQUcsRUFBQyxjQUFhLENBQUcsVUFBUSxDQUFDO0FBQUEsR0FDckMsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMsa0NBQWlDLENBQUcsVUFBVTs7QUFFM0QsUUFBRyxZQUFhLENBQUMsa0JBQWlCLENBQUcsRUFBRSxPQUFNLENBQUcsS0FBRyxDQUFFLENBQUMsQ0FBQztBQUVuRCxpQkFBUSxFQUFJLEtBQUcsRUFBRyxDQUFDLGtCQUFpQixDQUFDLFFBQVMsRUFBQyxDQUFDO0FBQ2hELHFCQUFZLEVBQUksVUFBUSxPQUFRLEVBQUM7WUFBSyxNQUFNLEtBQUc7S0FBQSxFQUFDLENBQUM7QUFJckQsUUFBRyxFQUFHLENBQUMsa0JBQWlC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QkFBTyxNQUFJLENBQUM7U0FDYixFQUFDLENBQUM7T0FDSDtBQUNBLFlBQU8sRUFBQyxDQUFDLFFBQU8sQ0FBQyxjQUFlLENBQUMsU0FBUSxDQUFDLEtBQU0sQ0FBQyxFQUFDLFVBQVcsQ0FBQyxXQUFVLENBQUMsQ0FBQztLQUMzRSxFQUFDLENBQUM7R0FDSCxDQUFDO0FBR0QsTUFBRyxXQUFXLEVBQUksU0FBUyxXQUFTLENBQUUsQ0FBRTtBQUN2QyxVQUFPLEVBQUMsQ0FBQyxJQUFHLENBQUMsY0FBZSxDQUFDLDJCQUEwQixDQUFDLENBQUM7R0FDMUQsQ0FBQztBQUdELFFBQU8sTUFBSSxDQUFDO0FBR2IsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBQy9PQSxrQ0FBaUMsb2lNOzs7Ozs7QUNBakMsa0NBQWlDLDRpSjs7Ozs7O0FDQWpDLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQSxpRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJiYWNvbmpzXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImJhY29uLm1vZGVsXCIpLCByZXF1aXJlKFwiYmFjb24uanF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJiYWNvbmpzXCIsIFwidHdlZW5qc1wiLCBcImJhY29uLm1vZGVsXCIsIFwiYmFjb24uanF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiYmFjb25qc1wiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJiYWNvbi5tb2RlbFwiKSwgcmVxdWlyZShcImJhY29uLmpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJCYWNvblwiXSwgcm9vdFtcIlRXRUVOXCJdLCByb290W1wiYmFjb24ubW9kZWxcIl0sIHJvb3RbXCJiYWNvbi5qcXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGY3M2Y4MDFjNTgzNzJkZWJlYThkXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vdXRpbC9iYWNvbi1hbmQtZWdncy5qcycsICd0aHJlZS1qcyddLCBmdW5jdGlvbiAoJCwgVSwgQmFjb24sIFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEnLFxuXHRcdHJlcXVpcmVzOiBbJ3RpbGUtYnV0dG9ucycsICd0aHJlZS1kJ11cblx0fSk7XG5cblxuXHRwbHVnaW4uaW5zZXJ0KCdDaXJjdWl0Ym9hcmQucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMubmV3UHJvcGVydHkoJ2NhbWVyYVRhcmdldFRpbGUnLCB7IGluaXRpYWw6IG51bGwgfSk7XG5cblx0XHR2YXIgbmV3VGFyZ2V0ID0gdGhpcy5wKCdjYW1lcmFUYXJnZXRUaWxlJykuY2hhbmdlcygpO1xuXHRcdHZhciBuZXdUaWxlVGFyZ2V0ID0gbmV3VGFyZ2V0LmZpbHRlcih0ID0+IHQgIT09IG51bGwpO1xuXG5cblx0XHQvKiB1bi10YXJnZXQgdGlsZSB3aGVuIHRhcmdldGVkIHRpbGUgaXMgaGlkZGVuICovXG5cdFx0dGhpcy5wKCdjYW1lcmFUYXJnZXRUaWxlJykuYWRkU291cmNlKG5ld1RpbGVUYXJnZXQuZmxhdE1hcExhdGVzdCgodGlsZSkgPT4ge1xuXHRcdFx0cmV0dXJuIHRpbGUucCgnaGlkZGVuJykudmFsdWUodHJ1ZSkudGFrZVVudGlsKHRoaXMucCgnY2FtZXJhVGFyZ2V0VGlsZScpLnZhbHVlKG51bGwpKTtcblx0XHR9KS5tYXAobnVsbCkpO1xuXG5cdFx0Lyogd2hlbiBhIHRpbGUgaXMgdGFyZ2V0ZWQsIGNvbnNpc3RlbnRseSBwb2ludCB0aGUgY2FtZXJhIHRoZXJlICovXG5cdFx0bmV3VGFyZ2V0LmZsYXRNYXBMYXRlc3QoKHRpbGUpID0+IHtcblx0XHRcdGlmICghdGlsZSkgeyByZXR1cm4gQmFjb24ubmV2ZXIoKSB9XG5cdFx0XHRyZXR1cm4gQmFjb24ubWVyZ2VBbGwoW1xuXHRcdFx0XHRCYWNvbi5vbmNlKCksXG5cdFx0XHRcdHRpbGUucCgnc2l6ZScpLmNoYW5nZXMoKSxcblx0XHRcdFx0dGlsZS5wKCdwb3NpdGlvbicpLmNoYW5nZXMoKVxuXHRcdFx0XSkubWFwKHRpbGUpO1xuXHRcdH0pLm9uVmFsdWUoKHRpbGUpID0+IHtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0ID0gdGhpcy5vYmplY3QzRC5sb2NhbFRvV29ybGQodGlsZS5vYmplY3QzRC5wb3NpdGlvbi5jbG9uZSgpKTtcblx0XHRcdHRoaXMuY2FtZXJhM0QudXNlckRhdGEuc2VtYW50aWNUYXJnZXQgPSB0aWxlO1xuXHRcdH0pO1xuXHRcdG5ld1RhcmdldC52YWx1ZShudWxsKS5vblZhbHVlKCgpID0+IHtcblx0XHRcdGRlbGV0ZSB0aGlzLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0O1xuXHRcdH0pO1xuXG5cblx0XHQvKiB3aGVuIGEgbmV3IHRpbGUgaXMgdGFyZ2V0ZWQsIGNoYW5nZSB0aGUgY29sb3Igb2YgaXRzIGNhbWVyYSBidXR0b24gKi9cblx0XHRuZXdUYXJnZXQuc3RhcnRXaXRoKG51bGwpLnN0YXJ0V2l0aChudWxsKS5zbGlkaW5nV2luZG93KDIpLm1hcCgoW2EsIGJdKSA9PiBbYiwgYV0pLm9uVmFsdWUoKFtuZXdUYXJnZXQsIG9sZFRhcmdldF0pID0+IHtcblx0XHRcdGlmIChuZXdUYXJnZXQpIHtcblx0XHRcdFx0bmV3VGFyZ2V0LmVsZW1lbnQuZmluZCgnPiAudGlsZS1idXR0b24taG9sZGVyID4gLnRpbGUtYnV0dG9uLnBvaW50Q2FtZXJhJykuY3NzKHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtyZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS1ibGFjay5wbmcnKX0pYFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmIChvbGRUYXJnZXQpIHtcblx0XHRcdFx0b2xkVGFyZ2V0LmVsZW1lbnQuZmluZCgnPiAudGlsZS1idXR0b24taG9sZGVyID4gLnRpbGUtYnV0dG9uLnBvaW50Q2FtZXJhJykuY3NzKHtcblx0XHRcdFx0XHRiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtyZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zL2NhbWVyYS13aGl0ZS5wbmcnKX0pYFxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9KS5pbnNlcnQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuYWRkQnV0dG9uKHsgbmFtZTogJ3BvaW50Q2FtZXJhJywgaWNvbjogcmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nJykgfSkub25WYWx1ZSgoKSA9PiB7XG5cblx0XHRcdGlmICh0aGlzLmNpcmN1aXRib2FyZC5jYW1lcmFUYXJnZXRUaWxlID09PSB0aGlzKSB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLmNhbWVyYVRhcmdldFRpbGUgPSBudWxsO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQuY2FtZXJhVGFyZ2V0VGlsZSA9IHRoaXM7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1idXR0b24tdG8tcG9pbnQtY2FtZXJhLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydibHVlYmlyZCddLCAoUCkgPT4ge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIFUgPSB7XG5cblx0XHQvLyBjcmVhdGUgYSBuZXcgY2xhc3MsIGdpdmVuIGEgY29uc3RydWN0b3IgYW5kIHBvc3NpYmxlIHByb3RvdHlwZVxuXHRcdG5ld0NsYXNzKGNvbnN0cnVjdG9yLCBwcm90b3R5cGUgPSB7fSkge1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG5cdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIG5ldyBzdWJjbGFzcywgZ2l2ZW4gYSBzdXBlcmNsYXNzLCBjb25zdHJ1Y3RvciBhbmQgcG9zc2libGUgcHJvdG90eXBlXG5cdFx0bmV3U3ViY2xhc3Moc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlciwgcHJvdG90eXBlID0ge30pIHtcblx0XHRcdHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuXHRcdFx0Y29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG5cdFx0XHRVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG5cdFx0XHRjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcblx0XHRcdHJldHVybiBjb25zdHJ1Y3Rvcjtcblx0XHR9LFxuXG5cdFx0Ly8gZXh0ZW5kIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0IHdpdGggdGhlIHByb3BlcnRpZXNcblx0XHQvLyBvZiB0aGUgb3RoZXIgb2JqZWN0cywgZnJvbSBsZWZ0IHRvIHJpZ2h0LCBhbmQgcmV0dXJuc1xuXHRcdC8vIHRoZSBmaXJzdCBwYXNzZWQgb2JqZWN0XG5cdFx0ZXh0ZW5kKG9iajEsIC4uLnJlc3QpIHtcblx0XHRcdHJlc3QuZm9yRWFjaCgob2JqKSA9PiB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBvYmopIHtcblx0XHRcdFx0XHRpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG9iajE7XG5cdFx0fSxcblxuXHRcdC8vIGNyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgdmFsdWUgb2Zcblx0XHQvLyBhIHNwZWNpZmljIGZpZWxkIGZyb20gYSBnaXZlbiBvYmplY3Rcblx0XHRmaWVsZChuYW1lKSB7IHJldHVybiAob2JqKSA9PiB7IHJldHVybiBvYmpbbmFtZV0gfSB9LFxuXG5cdFx0Ly8gY3JlYXRlIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBvZlxuXHRcdC8vIGEgc3BlY2lmaWMgZmllbGQgZnJvbSBhIGdpdmVuIG9iamVjdFxuXHRcdGNhbGwoZm4sIC4uLmFyZ3MpIHsgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncykgfSxcblxuXHRcdC8vIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGl0cyBmaXJzdCBhcmd1bWVudFxuXHRcdGlkKHYpIHsgcmV0dXJuIHYgfSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBkZWZpbmVkLCBnaXZlIGl0IGEgZGVmYXVsdCB2YWx1ZSBmaXJzdDsgaWYgdGhlIGdpdmVuIHZhbHVlXG5cdFx0Ly8gaXMgYSBmdW5jdGlvbiwgaXQgaXMgY2FsbGVkLCBhbmQgaXRzIHJlc3VsdCBpcyB1c2VkXG5cdFx0Z2V0RGVmKG9iaiwgbmFtZSwgdmFsdWUpIHtcblx0XHRcdGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykgeyB2YWx1ZSA9IHZhbHVlKCkgfVxuXHRcdFx0XHRvYmpbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvYmpbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8vIGdldCB0aGUgb2JqZWN0IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhIChwbGFpbikgb2JqZWN0LCBtYWtlIGl0IGFuIGVtcHR5IG9iamVjdCBmaXJzdFxuXHRcdG9iamVjdChvYmosIG5hbWUpIHsgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pIH0sXG5cblx0XHQvLyBnZXQgdGhlIGFycmF5IGBvYmpbbmFtZV1gOyBpZiBgb2JqW25hbWVdYCBpcyBub3Rcblx0XHQvLyBhbiBhcnJheSwgbWFrZSBpdCBhbiBlbXB0eSBhcnJheSBmaXJzdFxuXHRcdGFycmF5KG9iaiwgbmFtZSkgeyByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSkgfSxcblxuXHRcdC8vIHB1bGwgYSB2YWx1ZSBmcm9tIGFuIGFycmF5XG5cdFx0cHVsbChhcnIsIHZhbCkge1xuXHRcdFx0dmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuXHRcdFx0aWYgKGkgIT09IC0xKSB7IGFyci5zcGxpY2UoaSkgfVxuXHRcdH0sXG5cblx0XHQvLyBlbXB0eSBvdXQgYW4gYXJyYXlcblx0XHRtYWtlRW1wdHkoYXJyKSB7XG5cdFx0XHR3aGlsZSAoYXJyLmxlbmd0aCA+IDApIHsgYXJyLnBvcCgpIH1cblx0XHR9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgdGFraW5nIGFuIGFycmF5IGxpa2UgYEZ1bmN0aW9uLmFwcGx5YCBkb2VzXG5cdFx0YmluZEEoZm4sIGN0eCwgYXJncykgeyByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKSB9LFxuXG5cdFx0Ly8gYEZ1bmN0aW9uLmJpbmRgLCBidXQgb25seSBoYXZpbmcgdG8gc3BlY2lmeSB0aGUgY29udGV4dC1vYmplY3Qgb25jZVxuXHRcdGJpbmQob2JqLCBtLCAuLi5hcmdzKSB7IHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKSB9LFxuXG5cdFx0Ly8gYWxsb3dzIHRoZSBGdW5jdGlvbiBjb25zdHJ1Y3RvciB0byBiZSB1c2VkXG5cdFx0Ly8gd2l0aCBhbiBhcnJheSBvZiBmb3JtYWwgcGFyYW1ldGVyc1xuXHRcdGFwcGx5Q29uc3RydWN0b3IoQ29uc3RydWN0b3JGbiwgYXJncykge1xuXHRcdFx0dmFyIE5ld0NvbnN0cnVjdG9yRm4gPSBDb25zdHJ1Y3RvckZuLmJpbmQuYXBwbHkoQ29uc3RydWN0b3JGbiwgW251bGxdLmNvbmNhdChhcmdzKSk7XG5cdFx0XHRyZXR1cm4gbmV3IE5ld0NvbnN0cnVjdG9yRm4oKTtcblx0XHR9LFxuXG5cdFx0Ly8gYSBzaW1wbGUgYGFzc2VydGAgZnVuY3Rpb24sIHRvIGV4cHJlc3MgYVxuXHRcdC8vIGNvbmRpdGlvbiB0aGF0IGlzIGV4cGVjdGVkIHRvIGJlIHRydWVcblx0XHRhc3NlcnQoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG5cdFx0XHRpZiAoIWNvbmRpdGlvbikgeyB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBcIkFzc2VydGlvbiBmYWlsZWRcIikgfVxuXHRcdH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYHVuZGVmaW5lZGBcblx0XHRpc1VuZGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgZGVmaW5lZCAobm90IGB1bmRlZmluZWRgKVxuXHRcdGlzRGVmaW5lZCh2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnIH0sXG5cblx0XHQvLyB0ZXN0IGlmIGEgdmFsdWUgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRpc1BsYWluT2JqZWN0KHZhbCkgeyByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3QgfSxcblxuXHRcdC8vIHRlc3QgaWYgYSB2YWx1ZSBpcyBhIGZ1bmN0aW9uXG5cdFx0aXNGdW5jdGlvbih2YWwpIHsgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicgfSxcblxuXHRcdC8vIGV4dHJhY3QgYW4gYXJyYXkgb2YgdmFsdWVzIGZyb20gYW4gb2JqZWN0XG5cdFx0b2JqVmFsdWVzKG9iaikgeyByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoa2V5ID0+IG9ialtrZXldKSB9LFxuXG5cdFx0Ly8gZW5hYmxlIGFuIEhUTUwgZWxlbWVudCB0byBzZXJ2ZSBhcyBhbmNob3IgZm9yIGFic29sdXRlbHkgcG9zaXRpb25lZCBjaGlsZHJlblxuXHRcdG1ha2VQb3NpdGlvbmVkKGVsZW1lbnQpIHtcblx0XHRcdGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcblx0XHRcdFx0ZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIHJldHVybiB0aGUgZmlyc3QgcGFyYW1ldGVyIHRoYXQgaXMgbm90ICd1bmRlZmluZWQnXG5cdFx0ZGVmT3IoLi4udmFsdWVzKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkgeyByZXR1cm4gdmFsdWVzW2ldIH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0Ly8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuXHRcdC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3Jcblx0XHQvLyBOIG1pbGxpc2Vjb25kcy5cblx0XHRkZWJvdW5jZShmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgdGltZW91dDtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHR2YXIgbGF0ZXJGbiA9ICgpID0+IHtcblx0XHRcdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXJGbiwgd2FpdCk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQgd2lsbCBvbmx5IGJlIHRyaWdnZXJlZCBvbmNlIHBlciBzeW5jaHJvbm91cyAnc3RhY2snLlxuXHRcdG9uY2VQZXJTdGFjayhmdW5jLCBjb250ZXh0KSB7XG5cdFx0XHR2YXIgbm90UnVuWWV0ID0gdHJ1ZTtcblx0XHRcdHZhciByZXN1bHQgPSBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHRpZiAobm90UnVuWWV0KSB7XG5cdFx0XHRcdFx0bm90UnVuWWV0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7IG5vdFJ1bllldCA9IHRydWUgfSwgMCk7XG5cdFx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0IHx8IHRoaXMsIGFyZ3MpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0cmVzdWx0LmFsbG93QWRkaXRpb25hbENhbGwgPSAoKSA9PiB7XG5cdFx0XHRcdG5vdFJ1bllldCA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9LFxuXG5cdFx0LyogIENyZWF0ZSBhIG5ldyBjYWNoZSB0byBtYW5hZ2UgYSBzcGVjaWZpYyB2YWx1ZSB0aGF0IGlzIGNvc3RseSB0byBjb21wdXRlIG9yIHJldHJpZXZlLiAgICAqL1xuXHRcdC8qICBJdCBlbnN1cmVzIHRoYXQgdGhlIHJldHJpZXZhbCBmdW5jdGlvbiBpcyBub3QgY2FsbGVkIG9ubHkgb25jZSBwZXIgc3RhY2ssIGFuZCB1c2VzIGEgICAgKi9cblx0XHQvKiAgY2FjaGUgdG8gcmV0dXJuIGEga25vd24gdmFsdWUgaW4gYmV0d2Vlbi4gSXQgaXMgYWxzbyBhYmxlIHRvIG5vdGlmeSB5b3Ugd2hlbiB0aGUgdmFsdWUgICovXG5cdFx0LyogIGhhcyBhY3R1YWxseSBjaGFuZ2VkLiBJdCBkb2VzIHNvIHVzaW5nIGA9PT1gIGNvbXBhcmlzb24sIGJ1dCB5b3UgY2FuIHByb3ZpZGUgeW91ciBvd24gICAqL1xuXHRcdC8qICBjb21wYXJpc29uIGZ1bmN0aW9uLiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi9cblx0XHRjYWNoZWQoe3JldHJpZXZlLCBpc0VxdWFsfSkge1xuXG5cdFx0XHQvKiBub3JtYWxpemUgcGFyYW1ldGVycyAqL1xuXHRcdFx0aXNFcXVhbCA9IGlzRXF1YWwgfHwgKChhLCBiKSA9PiAoYSA9PT0gYikpO1xuXG5cdFx0XHQvKiBrZWVwIGEgY2FjaGUgYW5kIGdpdmUgaXQgYW4gaW5pdGlhbCB2YWx1ZSAqL1xuXHRcdFx0dmFyIGNhY2hlO1xuXG5cdFx0XHQvKiBob3cgdG8gcmV0cmlldmUgYSBuZXcgdmFsdWUsIGFuZCBwcm9jZXNzIGl0IGlmIGl0IGlzIG5ldyAqL1xuXHRcdFx0ZnVuY3Rpb24gcmV0cmlldmVWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIG5ld1ZhbHVlID0gcmV0cmlldmUoKTtcblx0XHRcdFx0dmFyIG9sZFZhbHVlID0gY2FjaGU7XG5cdFx0XHRcdGlmICghaXNFcXVhbChuZXdWYWx1ZSwgb2xkVmFsdWUpKSB7XG5cdFx0XHRcdFx0Y2FjaGUgPSBuZXdWYWx1ZTtcblx0XHRcdFx0XHRvbkNoYW5nZS5mb3JFYWNoKChmbikgPT4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0LyogcmV0cmlldmUgYSB2YWx1ZSBhdCBtb3N0IG9uY2UgcGVyIHN0YWNrICovXG5cdFx0XHR2YXIgb25jZVBlclN0YWNrU2V0VmFsdWUgPSBVLm9uY2VQZXJTdGFjayhyZXRyaWV2ZVZhbHVlKTtcblxuXHRcdFx0LyogIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gcG9zc2libHkgcGVyZm9ybXMgcmV0cmlldmFsLCAgICAgICAgICAgICAqL1xuXHRcdFx0LyogIGFuZCBhbHdheXMgcmV0dXJucyB0aGUgY2FjaGUgKHdoaWNoIG1heSBjb250YWluIHRoZSBuZXcgdmFsdWUpICAqL1xuXHRcdFx0dmFyIHJlc3VsdEZuID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXHRcdFx0XHRyZXR1cm4gY2FjaGU7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiBhbGxvdyBhbiBvbkNoYW5nZSBjYWxsYmFjayB0byBiZSBzZXQgKi9cblx0XHRcdHZhciBvbkNoYW5nZSA9IFtdO1xuXHRcdFx0cmVzdWx0Rm4ub25DaGFuZ2UgPSAoY2IpID0+IHtcblx0XHRcdFx0b25DaGFuZ2UucHVzaChjYik7XG5cdFx0XHRcdHJldHVybiByZXN1bHRGbjtcblx0XHRcdH07XG5cblx0XHRcdC8qIGFsbG93IGJyZWFraW5nIG9mIHRoZSBjYWNoZSwgYWxsb3dpbmcgbXVsdGlwbGUgY2FsbHMgcGVyIHN0YWNrICovXG5cdFx0XHRyZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKCkgPT4ge1xuXHRcdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKiByZXRyaWV2ZSB0aGUgZmlyc3QgdmFsdWUgcmlnaHQgbm93ICovXG5cdFx0XHRvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0Rm47XG5cdFx0fSxcblxuXHRcdHByb21pc2lmeShvYmosIG1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgUCgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuXHRcdFx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHRmaW5kSW5kZXgoYXJyYXksIHByZWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcblx0XHRcdFx0aWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkgeyByZXR1cm4gaSB9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fSxcblxuXHRcdC8vIHRoaXMgYG1lbW9pemVgIGZ1bmN0aW9uIGlzIFNMT1csIGFzIGl0IHVzZXMgbGluZWFyIHNlYXJjaFxuXHRcdG1lbW9pemUoZm4pIHtcblx0XHRcdHZhciBrZXlzID0gW107XG5cdFx0XHR2YXIgY2FjaGUgPSBbXTtcblx0XHRcdHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuXHRcdFx0XHQvKiBjaGVjayB0aGUgY2FjaGUgKi9cblx0XHRcdFx0dmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGtleSkgPT4ga2V5LmV2ZXJ5KCh2LCBpKSA9PiB2ID09PSBhcmdzW2ldKSk7XG5cdFx0XHRcdGlmIChpbmRleCA+PSAwKSB7IHJldHVybiBjYWNoZVtpbmRleF0gfVxuXG5cdFx0XHRcdC8qIG5vIGNhY2hlIGhpdDsgY29tcHV0ZSB2YWx1ZSwgc3RvcmUgYW5kIHJldHVybiAqL1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG5cdFx0XHRcdGtleXMucHVzaChhcmdzKTtcblx0XHRcdFx0Y2FjaGUucHVzaChyZXN1bHQpO1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdFx0fTtcblx0XHR9XG5cblx0fTtcblxuXG5cdHZhciBFUFMgPSAwLjAwMDAwMTtcblx0dmFyIHNvcnRPZkVxdWFsID0gKGEsIGIpID0+IChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG5cblx0LyogSFRNTCBlbGVtZW50IHBvc2l0aW9uICovXG5cdFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uICh0b3AsIGxlZnQpIHtcblx0XHR0aGlzLnRvcCA9IHRvcDtcblx0XHR0aGlzLmxlZnQgPSBsZWZ0O1xuXHR9KTtcblx0VS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG5cdH07XG5cdFUuUG9zaXRpb24uZXF1YWxzID0gKGEsIGIpID0+IHtcblx0XHRyZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG5cdH07XG5cblxuXHQvKiBIVE1MIGVsZW1lbnQgc2l6ZSAqL1xuXHRVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uIChoZWlnaHQsIHdpZHRoKSB7XG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xuXHR9KTtcblx0VS5TaXplLmVxdWFscyA9IChhLCBiKSA9PiB7XG5cdFx0cmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG5cdH07XG5cblxuXHRyZXR1cm4gVTtcblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzBcbiAqKi8iLCJudWxsXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogQHRyYWNldXIvZ2VuZXJhdGVkL1RlbXBsYXRlUGFyc2VyLzFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnYmFjb25qcycsICd0d2VlbmpzJ10sIGZ1bmN0aW9uICgkLCBVLCBCYWNvbiwgVFdFRU4pIHtcblxuXHRyZXF1aXJlKCdiYWNvbi5tb2RlbCcpO1xuXHRyZXF1aXJlKCdiYWNvbi5qcXVlcnknKTtcblxuXG5cdC8qIEV2ZW50U3RyZWFtIGdlbmVyYXRvcnMgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblxuXHQvLyBUaGlzIG1ldGhvZCB3b3JrcyB3aXRoIGV2ZW50cyB0aGF0IGNhbiBoYXZlIG9ubHkgb25lIHN1YnNjcmliZXIsXG5cdC8vIHRoYXQgY2FuIGJlIHVuLXN1YnNjcmliZWQgYnkgc2V0dGluZyB0aGUgc3Vic2NyaWJlciB0byBgbnVsbGAuXG5cdC8vIFRoaXMgZnVuY3Rpb24gaXMgbWVtb2l6ZWQsIHNvIG9ubHkgb25lIHN1YnNjcmlwdGlvbiBpcyB0YWtlbixcblx0Ly8gYW5kIHRoZSBzYW1lIHN0cmVhbSBmb3IgaXQgcmV0dXJuZWQgZm9yIGVhY2ggcmVxdWVzdC5cblx0QmFjb24uZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG5cdFx0cmV0dXJuIEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdG9iai5vbihldmVudE5hbWUsICh2KSA9PiB7IHNpbmsobmV3IEJhY29uLk5leHQodikpIH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHsgb2JqLm9uKGV2ZW50TmFtZSwgbnVsbCkgfTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4gPVxuXHRcdFx0d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuXHRcdFx0d2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuXHRcdFx0d2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSAgICB8fFxuXHRcdFx0d2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuXHRcdFx0d2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lICAgICB8fFxuXHRcdFx0KChmKSA9PiB7IHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCkgfSk7XG5cdEJhY29uLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXG5cdFx0XHQvKiBzZWxmLWNhbGxpbmcgYW5pbWF0aW9uLWZyYW1lIGxvb3AgKi9cblx0XHRcdHZhciBzdWJzY3JpYmVkID0gdHJ1ZTtcblx0XHRcdChmdW5jdGlvbiBpdGVyYXRpb25GbigpIHtcblx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lRm4oKCkgPT4ge1xuXHRcdFx0XHRcdGlmIChzaW5rKCkgPT09IEJhY29uLm5vTW9yZSkgeyBzdWJzY3JpYmVkID0gZmFsc2UgfVxuXHRcdFx0XHRcdGlmIChzdWJzY3JpYmVkKSB7IGl0ZXJhdGlvbkZuKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH0pKCk7XG5cblx0XHRcdC8qIHVuc3Vic2NyaWJlIGZ1bmN0aW9uICovXG5cdFx0XHRyZXR1cm4gKCkgPT4geyBzdWJzY3JpYmVkID0gZmFsc2UgfTtcblxuXHRcdH0pO1xuXHR9O1xuXG5cblx0QmFjb24udHdlZW4gPSBmdW5jdGlvbiB0d2VlbihvYmpTdGFydCwgb2JqRW5kLCB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9KSB7XG5cblx0XHQvKiB0aGUgdHdlZW4gKi9cblx0XHR2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuXG5cdFx0LyogdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdHZhciBidXMgPSBuZXcgQmFjb24uQnVzKCk7XG5cblx0XHQvKiBhIGxvY2FsIGZ1bmN0aW9uIHRvIHBsdWcgaW4gb3RoZXIgc3RyZWFtcywga2VlcGluZyB0cmFjayBpbiBvcmRlciB0byAnZW5kJyB0aGUgYnVzICovXG5cdFx0dmFyIGFkZFN0cmVhbSA9ICgoKSA9PiB7XG5cdFx0XHR2YXIgY2hhaW5lZFN0cmVhbXMgPSAwO1xuXHRcdFx0cmV0dXJuIChzdHJlYW0pID0+IHtcblx0XHRcdFx0Y2hhaW5lZFN0cmVhbXMgKz0gMTtcblx0XHRcdFx0YnVzLnBsdWcoc3RyZWFtKTtcblx0XHRcdFx0c3RyZWFtLm9uRW5kKCgpID0+IHtcblx0XHRcdFx0XHRjaGFpbmVkU3RyZWFtcyAtPSAxO1xuXHRcdFx0XHRcdGlmIChjaGFpbmVkU3RyZWFtcyA9PT0gMCkgeyBidXMuZW5kKCkgfVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0fSkoKTtcblxuXHRcdC8qIG1haW4gc3RyZWFtICovXG5cdFx0YWRkU3RyZWFtKEJhY29uLmZyb21CaW5kZXIoKHNpbmspID0+IHtcblx0XHRcdGlmIChlYXNpbmcpIHsgdHcuZWFzaW5nKGVhc2luZykgfVxuXHRcdFx0aWYgKGRlbGF5KSAgeyB0dy5kZWxheShkZWxheSkgfVxuXHRcdFx0dHcub25VcGRhdGUoZnVuY3Rpb24gKCkgeyBzaW5rKG5ldyBCYWNvbi5OZXh0KCgpID0+IHRoaXMpKSB9KTtcblx0XHRcdHR3Lm9uQ29tcGxldGUoKCkgPT4geyBzaW5rKG5ldyBCYWNvbi5FbmQoKSkgfSk7XG5cdFx0fSkpO1xuXG5cdFx0LyogYWRkaW5nIHR3ZWVuLXNwZWNpZmljIHByb3BlcnRpZXMgdG8gdGhlIHJldHVybmVkIGJ1cyAqL1xuXHRcdGJ1cy50d2VlbiA9IHR3O1xuXHRcdGJ1cy5zdGFydCA9ICgpID0+IHtcblx0XHRcdHR3LnN0YXJ0KCk7XG5cdFx0XHRyZXR1cm4gYnVzO1xuXHRcdH07XG5cdFx0YnVzLmNoYWluID0gKG90aGVyKSA9PiB7XG5cdFx0XHRhZGRTdHJlYW0ob3RoZXIpO1xuXHRcdFx0dHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuXHRcdFx0cmV0dXJuIGJ1cztcblx0XHR9O1xuXG5cdFx0LyogcmV0dXJuaW5nIHRoZSBidXMgKi9cblx0XHRyZXR1cm4gYnVzO1xuXG5cdH07XG5cblxuXHRCYWNvbi5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleWNvZGUpIHtcblx0XHRyZXR1cm4gJCh3aW5kb3cpLmFzRXZlbnRTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChlKSA9PiBlLmtleUNvZGUgPT09IGtleWNvZGUpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gY29udmVydGVycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXG5cdC8vIFRoaXMgY3JlYXRlcyBhICd3aW5kb3cgb2Ygb3Bwb3J0dW5pdHknIHRvIGxpbWl0IG90aGVyIHN0cmVhbXMgYnkuXG5cdC8vIFRoaXMgd2luZG93IGlzIHByb3ZpZGVkIGJ5IHRoZSBgcGFjaW5nYCBvYnNlcnZhYmxlLiBBbiBvcHRpb25hbCBgaGFuZGxlcmBcblx0Ly8gcGFyYW1ldGVyIGNhbiBiZSBnaXZlbiB0byBkbyBzb21lIHNldHVwIGFuZCBzb21lIGJyZWFrZG93bi4gSXQgaXMgcGFzc2VkIGEgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnRcblx0Ly8gdGhhdCBzaG91bGQgYmUgY2FsbGVkICpvbmNlKiBpbiB0aGUgcGxhY2Ugd2hlcmUgb3RoZXIgc3RyZWFtcyBjYW4gZG8gdGhlaXJcblx0Ly8gdGhpbmcuIEl0IHJldHVybnMgYSBmdW5jdGlvbiB1c2VkIHRvIHdyYXAgb3RoZXIgc3RyZWFtcy4gSXQgZG9lcyBub3Rcblx0Ly8gcmV0dXJuIGEgc3RyZWFtLlxuXHRCYWNvbi5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcsIGhhbmRsZXIgPSBVLmNhbGwpIHtcblx0XHR2YXIgd2FudGVkQnVzID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBvcGVuID0gbmV3IEJhY29uLkJ1cygpO1xuXHRcdHZhciBjbG9zZSA9IG5ldyBCYWNvbi5CdXMoKTtcblxuXHRcdC8qIHRha2VzICd0aGlzJyBzdHJlYW0gYXMgcGFjaW5nIGZvciBhIHdpbmRvdyBvZiBvcHBvcnR1bml0eSBmb3Igb3RoZXIgc3RyZWFtcyAqL1xuXHRcdHBhY2luZy5maWx0ZXIod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKGhhbmRsZXIsICgpID0+IHtcblx0XHRcdG9wZW4ucHVzaCgpO1xuXHRcdFx0d2FudGVkQnVzLnB1c2goZmFsc2UpO1xuXHRcdFx0Y2xvc2UucHVzaCgpO1xuXHRcdH0pO1xuXG5cdFx0LyogcmV0dXJucyBhIGZ1bmN0aW9uIHRvIHdyYXAgYSBzdHJlYW0gaW4gdGhpcyB3cmFwcGVyICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHtidWZmZXJ9ID0ge30pIHtcblx0XHRcdHdhbnRlZEJ1cy5wbHVnKHN0cmVhbS5tYXAodHJ1ZSkpO1xuXHRcdFx0cmV0dXJuIGNsb3NlLnN0YXJ0V2l0aCh0cnVlKS5mbGF0TWFwTGF0ZXN0KCgpID0+IHtcblx0XHRcdFx0dmFyIGFjY3VtdWxhdG9yID0gKGFyciwgdmFsKSA9PiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG5cdFx0XHRcdHJldHVybiBzdHJlYW0udGFrZVVudGlsKG9wZW4pLnJlZHVjZShbXSwgYWNjdW11bGF0b3IpLmZsYXRNYXAoQmFjb24uZnJvbUFycmF5KTtcblx0XHRcdH0pO1xuXHRcdH07XG5cdH07XG5cblx0Ly8gVGhpcyByZXN0cmljdHMgYSBnaXZlbiBzdHJlYW0gdG8gYSB3cmFwcGVyIHN0cmVhbSBjcmVhdGVkIHdpdGggdGhlIG1ldGhvZCBhYm92ZS5cblx0Ly8gQWxsIGl0cyBvcmlnaW5hbCBldmVudHMgYXJlIG5vdyBmaXJlZCBpbnNpZGUgdGhlIHByb3ZpZGVkIHdpbmRvdy4gU2V0IGBvcHRpb25zLmJ1ZmZlcmBcblx0Ly8gdG8gYHRydWVgIGlmIGFsbCBpdHMgZXZlbnRzIHNob3VsZCBiZSBidWZmZXJlZCBhbmQgcmVsZWFzZWQgaW5zaWRlIHRoZSBuZXh0IHdpbmRvdy5cblx0Ly8gT3RoZXJ3aXNlLCBvbmx5IHRoZSBsYXN0IGV2ZW50IGlzIHJldGFpbmVkLlxuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuXHRcdHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0Ly8gVGhpcyBpcyBhIGNoZWFwIHZlcnNpb24gb2YgdGhlIGxpbWl0ZXIgZGVmaW5lZCBhYm92ZS4gVE9ETzogdXNlIHRoZSBsaW1pdGVyIHdoZXJlIHRoaXMgaXMgbm93IHVzZWRcblx0QmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcblx0XHRyZXR1cm4gQmFjb24uZnJvbUJpbmRlcigoc2luaykgPT4ge1xuXHRcdFx0dmFyIGJ1ZmZlciA9IFtdO1xuXHRcdFx0dmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gdGhpcy5vblZhbHVlKCh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRidWZmZXIucHVzaChuZXcgQmFjb24uTmV4dCgoKSA9PiB2YWx1ZSkpO1xuXHRcdFx0fSk7XG5cdFx0XHR2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKCgpID0+IHtcblx0XHRcdFx0aWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFx0dmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcblx0XHRcdFx0XHRidWZmZXIgPSBbXTtcblx0XHRcdFx0XHRzaW5rKG9sZEJ1ZmZlcik7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1RoaXMoKTtcblx0XHRcdFx0dW5zdWJzY3JpYmVUb1BhY2luZygpO1xuXHRcdFx0XHRidWZmZXIgPSBudWxsO1xuXHRcdFx0fTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBUaGlzIGZpbHRlcnMgYW4gb2JzZXJ2YWJsZSB0byBvbmx5IGxldCB0aHJvdWdoIHZhbHVlcyBlcXVhbCB0byB0aGUgZ2l2ZW4gdmFsdWUuXG5cdEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gKHZhbHVlLCBjb21wYXJhdG9yKSB7XG5cdFx0Y29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChlKSA9PiBlID09PSB2YWx1ZSk7XG5cdFx0cmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG5cdH07XG5cblx0Ly8gVGhpcyBtYWtlcyBhIHN1YnNjcmlwdGlvbiB0byBhbiBvYnNlcnZhYmxlIHRoYXQgZG9lc24ndCBkbyBhbnl0aGluZ1xuXHRCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuc3Vic2NyaWJlKCgpPT57fSk7XG5cdH07XG5cblx0Ly8gVGhpcyBpcyBhICdzbWFydCcgLnN0b3BQcm9wYWdhdGlvbiwgbWFya2luZyBldmVudHMgd2l0aCBhIGxhYmVsXG5cdC8vIGFuZCBza2lwcGluZyB0aG9zZSB0aGF0IGFscmVhZHkgaGF2ZSB0aGF0IGxhYmVsLlxuXHRCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGxhYmVsKSB7XG5cdFx0cmV0dXJuIHRoaXMuZmlsdGVyKChldmVudCkgPT4ge1xuXHRcdFx0cmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG5cdFx0fSkubWFwKChldmVudCkgPT4ge1xuXHRcdFx0VS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcblx0XHR9KTtcblx0fTtcblxuXHQvLyBGaWx0ZXIgZXZlbnRzIHRvIG9ubHkgY2VydGFpbiBrZXlzIC8gYnV0dG9ucy4gQ2FuIGJlIGEgcHJlZGljYXRlIGZ1bmN0aW9uIG9yIHNpbmdsZSBudW1iZXIuXG5cdEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS53aGljaCA9IGZ1bmN0aW9uIChidXR0b25JZCkge1xuXHRcdHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKGIgPT4gYiA9PT0gYnV0dG9uSWQpO1xuXHRcdHJldHVybiB0aGlzLmZpbHRlcihlID0+IHByZWQoZS53aGljaCkpO1xuXHR9O1xuXG5cblx0LyogRXZlbnRTdHJlYW0gZ2VuZXJhdG9ycyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXHQkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZyh7dGhyZXNob2xkfSA9IHt9KSB7XG5cdFx0cmV0dXJuICQodGhpcykuYXNFdmVudFN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgobW91c2VEb3duRXZlbnQpID0+IHtcblx0XHRcdHZhciBzdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0c3RyZWFtID0gc3RyZWFtLmZpbHRlcigobW91c2VNb3ZlRXZlbnQpID0+IHsgLy8gVE9ETzogZG9uJ3QgdXNlICdmaWx0ZXInLCBidXQgc29tZXRoaW5nIGxpa2UgJ3NraXBVbnRpbCcgb3IgJ2ZsYXRNYXAnXG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cmVhbVxuXHRcdFx0XHRcdC50YWtlVW50aWwoJChkb2N1bWVudCkuYXNFdmVudFN0cmVhbSgnbW91c2V1cCcpKVxuXHRcdFx0XHRcdC5tYXAoKG1vdXNlTW92ZUV2ZW50KSA9PiAoeyBtb3VzZURvd25FdmVudCwgbW91c2VNb3ZlRXZlbnQgfSkpO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soe3RocmVzaG9sZH0gPSB7fSkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKG1vdXNlRG93bkV2ZW50KSA9PiB7XG5cdFx0XHR2YXIgdW50aWxTdHJlYW0gPSAkKGRvY3VtZW50KS5hc0V2ZW50U3RyZWFtKCdtb3VzZW1vdmUnKTtcblx0XHRcdGlmICh0aHJlc2hvbGQpIHtcblx0XHRcdFx0dmFyIGNyb3NzZWQgPSBmYWxzZTtcblx0XHRcdFx0dW50aWxTdHJlYW0gPSB1bnRpbFN0cmVhbS5maWx0ZXIoKG1vdXNlTW92ZUV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGNyb3NzZWQpIHsgcmV0dXJuIHRydWUgfVxuXHRcdFx0XHRcdHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG5cdFx0XHRcdFx0dmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcblx0XHRcdFx0XHRpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHsgcmV0dXJuIGNyb3NzZWQgPSB0cnVlIH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICQoZG9jdW1lbnQpLmFzRXZlbnRTdHJlYW0oJ21vdXNldXAnKS50YWtlKDEpLnRha2VVbnRpbCh1bnRpbFN0cmVhbSk7XG5cdFx0fSk7XG5cdH07XG5cblxuXHQkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuXHRcdHJldHVybiAkKHRoaXMpLmFzRXZlbnRTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcblx0fTtcblxuXG5cdHJldHVybiBCYWNvbjtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvYmFjb24tYW5kLWVnZ3MuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJQUFBQUNBQ0FZQUFBRERQbUhMQUFBQUJtSkxSMFFBQUFBQUFBRDVRN3QvQUFBQUNYQklXWE1BQUFzVEFBQUxFd0VBbXB3WUFBQUFCM1JKVFVVSDNnd1hBUnNMMC9ndC9RQUFFYUpKUkVGVWVOcnRuWGxRazFlL3g3OEpBUlJNU0FJSkJtUlRpTXVBRWhWbFV6dTlqQ3ZqQnJpMHJxL2F2bzVMdFdNSGZlMnQ3MVI3VzZWanZUTXQxSmxXdldxclZkRENLSmF4dDVVNlFxc2RaSE1CVkVoazAxQWlTd1FFY3U0ZnhseWxQRThpVzU2RTg1azVNOEE1Skw5enp2ZDVuclA4enU4QktCUUtoVUtoVUNnVUNvVkNvVkFvRkFxRlFxRlFLQlFLaFdLSDhHekV6b2tBNWdFSUJlQU53Sm1EdGhNQWJRQ3FBTndFa0FrZ2owcXNkMFFCK0JsQVBZQ25BRHFORGMzbDFHbTB0ZDVvZXhUdHh0ZTlsQWdaQXVBakFLMEFERGJRNlV6SllLekRSOFk2VVN6b2ZGY0FLVGJjNlV3cDJWZzNDa3ZuT3dINFR6dnMvQmRwdDdHT2xHNDZud2NnMG80Ny8wV0tOTmFWMHMzVm56TUlCSkRMcGJzQWw1UVlDZUFhV3dHWlRBYVpUQVpIUjBkT2lyaTl2UjFhclJaYXJkYVN1dWJTeS81VnpySmRPU3FWaXB3NWM0WjBkSFFRcnRMUjBVSE9uRGxEVkNxVnVidkFHZHJkcnpJY3dET21CdlAzOXlkWHJsd2h0c0t2di81Sy9QejgyQVR3RElBbkZ4cWV6eEVCckFmQWVGOWZ1SEFob3FPamJVYk4wNlpOdzhLRkM5bUtPQnJyVEFWQUNPRUQrQWRUdmx3dXg3UnAwK0RnNEdBekFuQndjTUMwYWRNZ2w4dlppdjJEQzdNQnF3dUF4K1BOQlJEQWxCOFdGb1laTTJiWTNETnR4b3dabUR4NU1sdVJrY2E2RC9wSHdIdkc1K0xmY0haMlJuUjBOTnpkM1cxT0FCNGVIb2lPam9henN6UGp6YzlZOTBFdEFDV0FNS2JwcUZLcHhPelpzMjEyWkR0Nzltd29sVXEyS1hnWWdLREJMSUFOQUZ5WU1pZE9uSWpRMEZDYkZZQktwWUpLcFdJcjRtcHNnOEVuQUVLSUFNQWlwdEcvUXFIQXZIbnpiSDUrTzIvZVBBd2ZQcHh0TnJESTJCYURqcFVBR3BqbXloRVJFYVN0clkzWU9tMXRiU1FpSW9KdFRhQUJ3SXJCK0FoWUFVRFk3WDNSMVJXelpzMkNrNVB0YjV3NU9UbGgxcXhaY0hGaGZOSUpqUmVEZlVNSTRSbm4vREFPZmpSTVYwVkFRQUFwS1NraDlzTGR1M2RKUUVBQTIxMUFZMndURUVMNEE3aytJT2lQamdiZzhGTGk4M2k4WVR3ZUx4QkFDSUF4QVA0RGdGZTN0eVErSDZHaG9XeWpaNXRqOU9qUm1EQmhBdFJxTlF3R1EzZEZ2QUFjQmZDL1BCN3ZMb0FpQVBjSUljMTQ3bFhVK1NMeGVEekNwYXRhUUFoeE1SZ000dlQwZERrQUh3QlQ4WHhsN3lDQUxBQ1ZlSTN0VXJGWVRESXlNb2k5a1o2ZVRzUmk4ZXR1SFZjYTIvQWdnSFhHdHZWSlQwK1hHd3dHTVNIRXBiY0RTTjVyZHJnTGo4ZVRHS2N2SHNaNS9KaVgwdWplaWlvNE9CaEZSVVYyK1JnTUNRbEJjWEZ4WDN4VUNZQzdMNlZTQUhVQTlJUVFIWS9IZTlyWFY3b0l3SFFBL3did0c5dm92VGZKMGRHUmZQTEpKOFJlMmJkdkgzRjBkT3d2UjVNR1k5LzhHOEIwUW9pd3o0UUw0TDhCTktPZnZXWGMzZDFKVlZXVjNRcWdxcXFLdUx1N0Q0VFhVYk94ejBKNjIva3hBSzVqZ055bEVoSVNpTDBURnhjM2tPNW4xNDE5MktOWlFDU0Fyd0dNNnRkcGlFQUFoVUlCTHk4dnZQZGUvK3lOMU5mWFE2UFJvTHE2R25WMWRYank1QW4wZWowNk9qcE1Ocmk2dWtJc0ZzUER3d05lWGw3dzlmV0ZWQ3J0YzF1MmJkdUd5c3BLVkZkWG82YW14bVJEUHhGbTdNTlZlTzV2YWRrZ01EMDlYYjVnd1lKTGVINGtpNkNQZkFmbGNqbjgvUHpnNitzTGIyOXYrUHI2UXFGUW1Iejl4bzhmRHo2L2I5YW03dHk1Zzl6Y1hCUVVGT0RCZ3dlb3JhMkZWcXVGVHFkRFUxTVRDSGwxTnNYajhTQVVDaUdSU0NDVHlhQlFLQkFRRUlBSkV5WWdNaklTWThhTTZSTzdEQVlEQ2dzTFRiNkROVFUxMEdnMHFLcXFna2FqZ1ZxdHh1UEhqL3RzK0dic3V6eWRUamRiSXBGb0xaMEZmQUxnWHozOVZsZFhWeWlWU2dRRUJHRGt5SkVJQ0FpQWw1Y1hwRklwSkJJSnBGSXB4R0l4WEYzNzlweEVSMGNIMHRMU2NPSENCZHkrZlJzVkZSV29yNi92MVdkS3BWTDQrL3NqT0RnWXNiR3hXTHg0Y1o4N3ArajFlang1OGdUMTlmWFE2WFNvcjY5SGRYVTF5c3ZMOGVEQkE1U1hsNk8wdEJSNnZiNDNYL05mQUhaYklnQlBBT1VBaHBwZFIrYnpNWHIwYUNpVlNnUUZCU0VvS0FnQkFRRndjM09EbTVzYmhFS2hLZlUzaHc4Znh2ZmZmNCtTa2hJOGV2U29YNzVqK1BEaFVDcVZlUHZ0dC9IT08rLzBlNTJhbXBwTXFhR2hBUTBORFNndkwwZFpXUm5LeXNwUVdscUtrcElTcHNXbHJyVGd1ZU9OMmNiNUo5dkFnc2Zqa2RXclY1T3NyQ3hTWEZ4TXlzdkxTVzF0TFdsc2JDVHQ3ZTBEUHFpNmVQRWlDUThQNzhraVM0K1RXQ3dtNGVIaEpETXpjOERyMjk3ZVRob2JHMGx0YlMwcEx5OG54Y1hGSkNzcmk2eGF0WW9ZVnduWjBydVdLQ1dENlFQNGZENzU3TFBQU0hOenM5VkgwM3E5bnF4WnM0WklwVktySGZLUVNxVms3ZHExUksvWFc3MDltcHVieWFlZmZtcE9CQm1XQ0lCeGt5WTJOcFpvTkJxclZ6WW5KNGVNSFR1V0NBUUNxNS8wRVFnRVpOeTRjU1EzTjlmcTdhSldxMGxzYkN5YnZXcExCTURvbjUrWW1HajFTaDQ1Y29USVpETE9IZm1TeVdUazZOR2pWbStmeE1SRU5qdmJMRmtIWVBUUEh6cDBLS3hKVWxJUzl1N2RpNmFtSnNzMk9ualB4N2dpa1FoVHBrekJHMis4QVpWS2hjREFRQ2dVQ2d3Yk5zdzAySHIwNkJIS3lzcVFsNWVIN094cy9QSEhINmJ2NlRwbDdBNnRWb3V0VzdlaXJxNE9PM2Jzc0ZvYm1la2ppeHdzR0JXMFo4OGVxeW43d0lFRHhNWEZ4YUtya2MvbkU1RklSR0ppWWtocWFpcHBiVzE5N2U5cmFXa2haODZjSVRFeE1VUWtFaEUrbjIvUmQ3dTZ1cElEQnc1WXJaMzI3TmxqemtiYkU4RFhYMzlOUkNLUnhmc0pjWEZ4NU9iTm0zMzIvWGw1ZVNRK1BwNTRlSGhZWklPYm14czVmUGd3RlVCZjdhTjdlWG1aYlhRbkp5Y1NHUmxKTGwyNjFHKzIvUFRUVHlReU1wSTRPVG1adGNmYjI5c3FmZzEySllEQ3drSXlaY29VaTZaalc3WnNJUzB0TGYxdVUwdExDOW0wYVJPUlNDUm03Wm82ZFNvcExDeWtBdWdKT3AyT3JGdTN6cUlyTFRrNWVjQ3Z0QysvL0pLTUdESENySDNyMTY4bk9wMk9DdUIxejlrZlAzN2NiT09PR0RHQ25EMTcxbW9EcnRUVVZPTGo0MlBXemhNblRwRE96azVPQ29DVEJ4STBHZzMyNzkvUFdrWXNGdVBRb1VPSWk0dXorSE8xV2kxdTM3NE50VnFOdXJvNjZQVjZDSVZDTEZ1MmpPM3dCaU54Y1hIZzgvbFl0MjRkZERvZFk3a0RCdzRnT2pvYS92NytuR3RyemdtZ3JhME5aOCtleGExYnQxakw3ZCsvMytMT3YzbnpKdExUMC9Ibm4zL2kvdjM3cUs2dVJtTmpveW0vcUtnSTMzNzdiWS9zWGJSb0VlcnE2bGczaDRxS2lwQ2Ftb3F0VzdmYXhGa0hxejRDTkJxTjJaVys3ZHUzV3pUZ3E2bXBJYnQyN1NMQndjR3M4M2hQVDg5ZUR3emZmLzk5VnBzOVBUM0p3NGNQT2ZjSTRITkplZTN0N1RoLy9qeHJrQ1dWU29XTkd6ZGl5QkQyd0pzNU9UbUlqNC9INTU5L2p1TGlZc1l0VXdjSEIremN1Yk5YZGc4Wk1nUWJOMjdFeElrVEdjczhldlFJNTg2ZFEzdDdPNzBETVBIMDZWTVNHQmpJcXVCVHAwNFJnOEhBK2psWldWbU1nN05aczJhUnBLUWtrcG1aU1g3Ly9YZHk2OWF0UHR2Tk8zWHFGS3Z0U3FXeTMzY09iWFlXWURBWXlKVXJWMWlObnp0M3J0bmR5Snljbkc1WDdGYXVYRW55OC9PSlRxY2pyYTJ0WmtYVTA4ZlgzTGx6V2V0dzllclZmdmx1bTM4RUVFSnc5dXhaMWpMTGx5K0hqNDhQWTM1VlZSWGVldXN0MU5YVm1mN203ZTJOMDZkUDQ1dHZ2c0dFQ1JNZ0Zvdmg3T3hzMmlqcVMzeDhmTEJzMlRMV01qLzg4SU5GbTBzREJhY0VrSkhCN0s4d1pjb1UxbUFScmEydCtQREREMUZSVVdINlcxQlFFSTRkTzRhbFM1Y08yT2c3TkRRVVlXRmh6TjQyR1JsVUFOMmhWcXZ4OE9GRHh2enAwNmNqTURDUVVUdzNiOTdFc1dQSFRIOVRLQlRZdTNjdlltSmlCclFlZ1lHQm1ENTlPdXNhaDBham9RTG95dFdyVjFuMzlVTkRReGxIL3AyZG5kaTNiOS8vTDI0SUJGaStmRG1XTGwxcWxmMTRsVXJGK29qNTdiZmZxQUM2a3BmSC9IYVZNV1BHc0s2aTFkVFVJRE16MC9SN2NIQXd0bXpaWXJXNitQdjdZL1RvMGF3TFUxUUFYYmh6NXc1am5wK2ZIN3k4dkJqeno1MDdaL3JaMGRFUlVWRlJWbDEyVlNnVThQUHo2MUZkQjYwQVhoNjhkV1g0OE9IdzhQQmd6UC9sbDE5TVA3dTd1MXM5dUpTSGh3ZnIzZ0piWFFldEFOaFcveVFTQ2V2aGtwZmpDUWlGUXRZVnVZRkFKQkpCSXBFdzV2ZmgwUy83RWNETG16TmRZUW13QkFDb3JLdzAvZXprNUFSUFQrc0g0bWF6MlZLbjFrRWxBTGJqVFFJQis2Ymx5K3ZyWE5sdFk3TzVzN09UQ3VCdmhyQ2NDalozaFByZGQ5ODFUY0ZXclZyRmlmcXcyZHhYSjZEN1JLaGNNVVFrRXVISmt5ZmQ1ajE5eWg3eTV1T1BQOGFjT1hNd2RPaFFSRVJFY0tJK2JEYTd1YmxSQVhSRkpwTXhDdURGbVg2bWdhQmNMc2VDQlFzNDA2aE5UVTJzSGtJeW1ZdytBcnBiUEdHaXRyYjJsUTBlcmxOWFY0ZmEydG9lMVhYUUNtRGN1SEdNZVdxMUd0WFYxVFlqZ09ycWFxalZ6T2N3eDQ0ZFN3WFFGYmFkdnJ0MzczSnE4Y1FjRlJVVktDa3BZY3czRTBKK2NBcUFiUWVORUlMOC9IeTB0clp5dnZOYlcxdVJuNS9QdXVYTFZ0ZEJLd0EvUHo5V1o0L3M3R3lVbFpWeFhnQmxaV1hJenM1bXpQZjE5WVd2cnk4VlFGZDRQQjdtejUvUG1IL2p4ZzBVRkJSd1hnRDUrZm00Y2VNR1kvNzgrZlA3eFJ2SkxnU3daTWtTMWpLblQ1OW1kUnF4Tmc4ZlBzVHAwNmRaeXl4WnNvUUtnRWtBWVdGaENBcGlmb2ZTeFlzWGNlM2FOVTY1VkwwOFRybDI3ZG9yZmdsZFVTcVZtRHg1TWhVQUV3S0JBSnMzYjJZdGs1U1VoUHYzNzNOT0FQZnUzVU5TVWhKcm1jMmJONXZkMXhqVUFuQjBkTVRpeFl0WjM3aVpsNWVIbEpRVVRzMElXbHBha0p5Y3pPclY1T25waVVXTEZuSHV6ZWQ4cmwxSmNybmNiSXlkZ3djUDR1VEprNXl4K2NTSkV6aDA2QkJybVIwN2RwaDdsU3dWQVBCOE96YytQaDRoSWV5UnpoTVRFNUdXbG1aMWU5UFMwckJyMXk3V01pRWhJWWlQaitma3dWRE9DZURGbWtCaVlpSnJtZnI2ZW16YnRzM3NZWkwrSkRVMUZkdTJiVE1iajNqbnpwMmNtdnR6WGdCOFBoK3hzYkZZdjU3OURldVZsWlhZdm4wN3Z2cnFxd0czTVRrNTJSVDZuWTBOR3paZzNyeDVuUElCTUR1akFVZGlCQlVWRlpHcFU2ZWFqY0Foa1VqSXBrMmJCaVJrYTB0TEM5bThlYk5GTVlMQ3c4TkpVVkVSalJIVUd6SXlNb2kzdDdkRjd4c0tEdy92MXloaGx5NWRJaEVSRVJaRkNSc3hZZ1NORXRaWHBLU2tFS0ZRYUhHY3dJU0VCRkpRVU5CbjM1K2ZuMDhTRWhJc2poTW9GQXBKU2tvS2pSTm83VWloTTJmT0pPZk9uZXRScE5EVzFsYVNscFpHWnM2Y2FkZVJRbTNtcmRVZmZQQUJBRmdVSzloZ01LQ3hzUkdYTDEvRzVjdVhJUktKRUI0ZWpqZmZmQk9ob2FFWU5Xb1VQRDA5VFc4czBldjFxS21wd2IxNzkxQlFVSURzN0d6azV1YWFYTlV0WFhvV0NvWDQ2S09QckJvcjJLNEdnZDF4L1BoeElwZkxPUmN0WEM2WGt4TW5UbGk5Zld3NlJwQWxyRnk1RWhjdlhrUndjREFuMXRVRkFnRkNRa0p3NGNJRnJGaXh3dWF1ZHI0dDNxSW1UNTZNR3pkdVlNV0tGZjN5YWpkTGtVcWxXTGx5SmE1ZnY4NGFGSUlLb0I4WU1tUUlqaDQ5aXBNblR5SXlNcEwxTEY1Zkk1RklFQlVWaGUrKyt3NUhqaHd4RzdHTXl3aGc0OHlaTXdkejVzekIwYU5IY2V6WU1aU1dscks2WlBlR0YyOE5XN05tRGRhdVhRdDdRQUE3WWUzYXRWaTllalhTMHRLUW1abUpvcUlpVkZSVTRLKy8vdXJWNTdxN3U4UGYzeDhoSVNHWU8zY3U0dVBqT2VYUVFRWFFaUThoSVNFQkNRa0pLQzB0eGJWcjExQllXR2dLRC92NDhXUG9kRG8wTnpkMysvL0RoZzJEUkNLQlhDNkhsNWNYUm8wYWhmSGp4eU1xS2dwS3BSTDJpQUIyaWxLcE5IV2FUcWZEZ3djUFRPOE9ibXhzeE5PblQwMm5paDBkSGVIaTRnS1JTR1I2ZC9ESWtTTUhkRnhCQmREUGc3WkpreVpoMHFSSm9OakpMSUJpQlFIWTArREhYbm5kUHVwT0FJemhLN2dVMllMU296N3FzRVFBalBPbWlvb0tORFEwMEZibUtDL2VMczdDWDVZSWdER0kzZm56NTFrUFBsQ3NTMlptSm43ODhVZTJJbi9yVzRkdUNvMEE4R1ozLy8zczJUUDgvUFBQYUc5dng3aHg0MHpicVJUcm90VnE4Y1VYWDJEMzd0M210c3EvQWZCS1RON3VSZ3orQU1wcHM5b2xBUUFxekQwQ05BQytwMjFsZDN4bjdGdVl1d01BZ0IrQWZBQmkybTUyd1JNQW9RRFVscTREYUFCc0FOQksyODdtYVFHd3ZydXIzK3lhQW9CM0FHakJNZmNybWl4T1d1T0YzS3NWdkFVQWNnQzAwUWExbWRSbTdMUDU1anJYd1FJQmxBRElBdEJnWEVseUFPQnE0ZjlTQm81MkFBOEJYQWZ3UHdCMkEvalRrdHY4NjZBQU1NRTRuWkFBY096dDdZWFNhNGl4ODNYRzZYcytnRnJhTEJRS2hVS2hVQ2dVQ29WQ29WQW9GQXFGUWpIeWY1YnRsb09yZjloL0FBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3VybC1sb2FkZXIhLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtYmxhY2sucG5nXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUFCbUpMUjBRQUFBQUFBQUQ1UTd0L0FBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUgzZ3dYQUEwc2E2aEhkZ0FBRFNaSlJFRlVlTnJ0blh1UVhWV1ZoNy9WNlR3a0JrZ001SUdRWkpRQVFraUlvZ0lxbG9NT0V4Q0ZpRm96b0tnb0lHVkpxWWlsZ3BibEF3VWRSV3FvR1I4UlFVVmVPZ3hJVVRMVWpHTkFVWk5BZ21JSUpHbE1PZ2xKZDU3azJmbjV4MTVkdWVudXM4L3A3dHYzbm50N2YxV251cE43K3R5MTlsNW5QOWRhR3hLSlJDS1JTQ1FTaVVRaWtVZ2tFb2xFSXBGSUpCS0pSQ0xSaEZnakNDbHBMbkFPTUFjNENoaGRRdGtGN0FiV0FJdUJYNW5ab21SaWc2djRNeVE5TEtsRDBvdVN1bFIrdWx6V0RwZjlqRlNUL2EvNE1aS3VrN1JMMG40MUx2dGRoK3NralVrMVc2enl4MHE2UmMzSHYwc2FXN2J5YmlsWjVZOENQZ0ZjM29TMmZRVndsZXVZQm9GOVZMNEJwd0VMbTd5Uk93TjR6TXlVV29DREdRbmNPQXg2dVcrNnJxa0Y2TkVDbkY3ZzdYL0JyNzBscmR5UndCRit4VGpkekI1TEk3NkREZUN1bkVIVUlra1hTaHBSWWgxR3VJeUxjblM1TTlYNHdRVTNXZEtlU0lHdGxIUm1BK256Wmttckl2cnNrVFFwalFFT2NHbE92L2hMNExjTlpOUC83ekxIdW9wTDA2c1BkSFYxdFVoNkx2SzJySmQwUVFPMmF2TmQ5aXllYlc5dnQyRnZBSkxPemVrdjc1ZjBzZ2JVYTZLa0IzSjBPeWQxQWZCeHdrWktYK3dHZm10bW14ck5BTXhzbzNkYnU3TnN4SFVmMW0vL1RFbWJJMi9JazVMbU5MQitwN2dPV1hSS09uWTR0d0FmQmc2SmZMN0l6SlkwcWdHWTJXTEMxbkFXWTcwTWh1WGIzeXBwUmVUdFdDdnB3aWJRODkyUzJpTjZQaU9wZFRnYXdNV1N0a1FLNXRHeWJad01VTTlScmtzV1d5UmROQnk3Z0l1QWNSbWY3UUFlTXJNOWpXNEFyc05Ed0lzWnQ0d0RMaDRPYjd4SmF2SGZUNVhVRm5rcm5wTTBzNGwwUHk1bnJhTk4wcWwrYjR2dmpOYUUxcUdvYUdCRXhkVUN2QlI0SlRCTDB2SEFQd0pUTXg2eEgxaGlac3VieFFETTdLK1NuZ0NtWmJTNlU0RUZrdjRIZUJwWUtta0ZzTjNMbzZ2N3F2WTJjdXNnSzdzVkdGVnhqWFpsVGdSTzhwOG5FaHc1aTdJVldOQ0VqZUFDNE0zQTRYMThOcUtpckNwWkF6eFZjUzJUdE5iWEZ2WjBYMmEyYjhERzJjOEtQd1FZNzlPWGljQk00UGlLNjdncUZOUXlNNXZWcE4zZ1VuOHhCc3RmdmFYb3ZwWURHMzNzMUdsbUwxYTFCWkIwS01FbCt5MSt6UVlPSFlJeTJndjhySW1IUW5jQVgyRHdEaUhIK2ZXT0hpM25FOEFqa2g0QkZwdlp0bXBZN1N4SjM1RzB2UWFPa3hzbFRXM2lnZkJVMTNHbzJlNTFObXV3QXA4bDZmRWFlczQydmFPRXBMdHJXSjZQU3pwclFHTUFkOUg2TWZDS0lTNlRmVUE3c0JiNHBKa3RISUpDbndBYzR3UFVpVDRRRzF2UkJlN3ovbk96OTZWcmdUWXo2eGdDV2Q1QThIMmNDa3daaXBsWUQ1NEYzbWRtanhZMkFFbEhBZzhDY3dtN1Z0V2FsMjRBVmdOdFBzSnQ4OHJ2OXZWNzBzejJWNm1nVHlCNEdjOEcvZ0dZVFBEVkcrK0xMejExRXJBTjZIUloyb0dWM3E4K2FtWlBWMG11RnVCa0R2Z09UbkhqUE1wL1RnT09ySmE5dVo2TGdMUE43SVdpQnZBVjRMT0QrT0lkUGpKZENUem5QOWNDSFY3QUhjQm1NOXRSNWJlckZaZ1BuQXU4Q3BnT1RCamtZenVBVmNBeTRIN2dYalBycXJMY1k3MVZtdUFHT3NGYmlCbHV2RE44eGpXWXdKS3ZtdG5uY2czQWZkVldBaThwOE5EOVBpVlpEanpqMTBwZ2kxL2JnRzFWR1kzbUYrSmx3TC80Nkhpby9PM1d1YTQvTWJQL3JJRk80N3kxR2djYzV0Y000RmkvWnJxK1JaYjBkd0l6ekd4OTNwZGVYaURlN1VlUzNpYnBSRW5USlUyU05LNGV1MXFTNWtsNnpQZldhMFduZitjLzEwSGZWaS9yU1Y3MkozcGQzRm9nanZLeUlsOXdYMDdrNnpWbGlIR1RkSWlrQlpJMjFUSGViNU9rSC9vQ1diM0xZNnlreitRWXdYMUZIaFRicFBsdlNVZVhRTm5USlAxWjB0NFNCSDN1bGZTVXBOZVhvRnlPOFRyS1luWFB2K21yNzVnYytZNm56T3o1T2l2NUFlQy9nQk5xTUlVcXVwcjZLdUErU1pmVVV4QXpheVBzR1dReHVjaFM4TWljZ1VROUsvOXE0RnF5L1FqNm1nWjFMNU0rRHZ3dndVVnJCZEJ1WnRzckJsdVRmR0ExRnpnVGVGM0Y5eFNaQmg4QjNDUnBvcG5WTThZeFZrZWppaFJ5akMvV3MvSWw3ZWhIbG80dGtuN3Qvdm1qQi9COVl6ek02OWYrcks1K0xNTmVYY2R5K21KTXVJWTBBRW1YNWJpUDlkeFB1THVhM3NUdTNYdVhwQmNLeXJCWjBrZVNBVlJIb2ZNa3JTbFE2THNsTFpSMDloREs4ay8rSGJzTHlQTTNTVzlQQmpBNFpXWkorbjNCNmRoTnRjakQ0MTNEelo0RUtvL2ZEWHBIYnJnYWdLVERKWDIvNEp0MlJSM2V0Q3NsUFY5QXZ1OUpPandaUVArVUdPRnU0M2s4TCtsZGRSeHd6YzlaTitubW9tNkgyTElaUUZrREVvNEJyc201WnpOd2xabmQwNC9DT2NMbjdOTUkyOEpqQ2ZzVmQ1alp1Z0hNdSsrUnRCLzRBV0VUSjR0UEUrSUVWNVd0b0V0bkFENWx1NURlRHBJOXVhWm81VXM2aGVBKzlScUNmOE5VRG5acG13VjhhSUNMTDcrUU5CR0liUTdOQXQ0bDZhYlN4enJVdXd1UWRMU2tEVGx5Zkt2SWdNOHpqM3hWMHRLY2VmeTZRY284UnRJM2MyUmVKK25sWmVzQ3lwWW5jQ1J3UHZFa1M0dUJXOHhzVjg2elRnZnVCajVGOE1UTjByVUx1SDZRUzdDN2dGc0lqaGRaVEFJdWNCMVRGeENSNTJNNTkzekRsM0pqbGY4MjRQdEFYeHRYRHdFUEU5Yk1PM3dNTU9pKzJjeFdTTHFCdUZmemxTNVhXYk9jMWE4TDhOQ3hNM08rLzRHODNVamZLZXhyeGU3SGttYjc5SEwwVUlSZmVmZVZseFhrRFVNWit0WElYWUQ1NEMvR3oySzdrWktPQW43cUkveHUxZ0R2QlM0MXN5Zk1iTE9aN1I2S1RKMHUyeDA1dDcySEV1Vm5MSnNCbkJmNS9IRmdTV3dnQm55WjRBZll6VFBBSldiMjh4cU92cGNBZjRoOGZsNHlnTDZabHRGbmQvT2JyTDdmbTlSVGdFc3EvcnNkdU5iTUhxNnhIaXRjMXRnYXh6SEpBSHJ6eGxqWFJvZ1l6aHI1andBK1gvSHZmZDVkL0x6bXpaalpUcCtweExxWU55VUQ2TTNjeUdkUDU0elVwd0R6S3Y2OURQaHVIWFZaUmZDV3p1S1VaQUM5T1NIeTJXcENYRUVXbFlrazl3SUx6V3hWSFhWcGQ1a0hvdXV3TllEcGtjL1dFVUsyc25oTHhlK2JnQWZxck10R2wza2d1ZzViQTRpdC9uWG1CSmRVN3Jsdkk3NGlWNHR4d0ZaQ0JGUVdSeVlENkUwczMwQmV3b1BLTmZZOXVkRXZ0U0VtODdoa0FQMlRKUzhGU3VYNmVsbDIyMkl5ajBnRzBKdFlWSERlbnNWLytNK2RoSkQyTXRBNlFGMUxJMlN0MlVyZkNaUWduazRXNERwQ09QdE9vQ3hIc2NSazNwSU1vRGN2UkF4Z3ZLUnhXUU5CTTl0QWlCWXFCUjVvTWo1SDE5UUY5Q0EyYjUvTXdSczhaV2NpOFJDN1Zja0FldlBueUdmVHlFNHNXVWFtdXN4Wi9DVVpRRzlpYWVHUHAwU0xKd1dZVGp4bjR1SmtBTDJKN2FBWk1LY1JEbUIyR2VjUTMvTDlUVEtBM3F3R1lxSG5aeEtpZDh2T3NTNXJGbTErSlFQbytmSUFzUXdXcHhJeWZwV2RPUzVyRnZjUjN5b2UxZ2FRbHlqeXZXWElVQkpwL284bXVKL0Z1RE1aUU45emVSRmNxWjZKM0hZT2NFWXQ4K24zby9LTmNETDR2TWh0eTRFL2x1WGs4TEsxQUJEV3oyL091ZWRxaGo1NzZVQjRwY3NXNDJieTl6V0dyd0dZMlY3Z1hrSkcwU3ptQWxlVWFVWWc2U1hBUjRsN05hMEhmdUU2SmdPSXNJR1FTemZHSndobkRwV0ZpNEdyY3U2NU1jZXdrd0Y0SzdDSEVOSzFOT2ZXcjB1YVg0SzNmejd3dFp6YmxnSjNsekV3dEl3dFFQZWF3TmR6N3BrQWZMdWVad3Q2Ym9Kdms1K1ArUG95emYxTGJ3Q2VNZngrUWh4ZGpKY0QveWJweWpwVS9rZTk4dk1pZnI4SFBGQ3RMT2kxVUt4TU9ZSk84anc3ZVhSNDNwNURhaURUR0VuZkxaZ2o2REZKSjlXNHpKb3VTOWpiUFE5UUhudTh3SWN5UzlqWmZncm83b0xwYTFLV3NDb3BkYm1rcmYzSUUzaW5wSk9yK1Ayei9abEY4d1J1bFhSNW5jcXErUXpBNVJwSXB0Q0hKSjAvd0V5aG95VmQ0TTlvMmt5aERYTnF0Wm5kNFBJWHlSWGNRbkF6ZjZ0Zld5WDlEbmlFNEhmd0xMQytzN056eC9qeDR5RWtpNXJpcTNtekNidDVwM0hBVmIzbzB2TTI0RXQxemhYY1BJUEFEUGt1bHJSZTVXTjlQVThCSDJnTDBOSm9CbXBtdHhFMmhaWlJqblgxZmI3UWM2NlozZDVvNWRuU2lLMlVtZjJSc09kK095SFBUNzNvQUc0RFhtdG1mMmpFc214SUEzQWoyR1ZtSHlEc0NUeEtQQmF2Mm5RQ0M0Ri9OYk1QNW1Vc0t6T3RORGhtOWlEd29KOGtjZ25oSkszSlEvUjEzYWVHL2NqTW11S0U4MWFhQkROYklPbFd3cm1COHdnUnc5T0JsdzN5MFpzSWZ2eExnVjhSTm5YVUxPWFdOQWJnUnJBZnVBdTRTOUpNZ29mT3lSeElEM3NrSVdMbnBSbVAyTzdOK3daQ1FvcG5nU2NKQ1NlVzA0UzAwcVI0aFMzM3FkRjR3Z21jM1djSEgwcUkzZXVPS3Q1TENPZmV5b0d6ZzU4enMwNmFuRmFHQVY2UmYvSXIwUXl6Z0VSOURFQ3B5RXFQQm1zQXNaT3hSNlR5TFQyeE90cFh4QUEyUlI0d1hkSmhxWXhMK3VxSHVwbVJNNlhOTllCWTZQTDV4QU1mRXZWbEh2RE95T2QvS1dKRm55OXdLT0sxZnY1T29oeHYvaEZlYjV0ejZ1NXp2V1pJZlR4c09yQXlGV3RUTXFObkJ0Vyt1b0EyUXM3OVJIUHhFL3B3VGJlTUptVWF3WFBtOEZSdVRjRm1ZSTZaclM2NkR0QUdmQmpZbGNxdTRka0pYRXBHWUVxZkJ1QzdYZmNBSHllZXBEbFJialo2SGQ2YnRZT1o2K3dvNlIyRVV6eGZEWXhLWmRvUTdDSHNlMXh2WnJHc0s4VzhYZjNBdy9jVFRycVlDUnpGd2ZsNUUvVm5MK0dBck9YQS93RzNtdG1hdkQvcVY2WU5TVk1JYnRNekNQdnFJeW5SQVVqRGRSbkFLNy9UcCs5TEJuSU9jaUtSU0NRU2lVUWlrVWdrRW9sRUlwRklKSnFXdndNaGFqUnUxa0FsdkFBQUFBQkpSVTVFcmtKZ2dnPT1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3VybC1sb2FkZXIhLi9zcmMvdXRpbC9pY29ucy9jYW1lcmEtd2hpdGUucG5nXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJCYWNvblwiLFwiY29tbW9uanMyXCI6XCJiYWNvbmpzXCIsXCJjb21tb25qc1wiOlwiYmFjb25qc1wiLFwiYW1kXCI6XCJiYWNvbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTBfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24ubW9kZWxcIlxuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYmFjb24uanF1ZXJ5XCJcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLWJ1dHRvbi10by1wb2ludC1jYW1lcmEuanMifQ==