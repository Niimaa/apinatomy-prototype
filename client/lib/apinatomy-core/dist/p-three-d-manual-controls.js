(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(2), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, THREE, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-manual-controls',
	    requires: ['three-d']
	  });
	  var MOUSE_BUTTON = {
	    LEFT: 1,
	    MIDDLE: 2,
	    RIGHT: 3
	  };
	  plugin.append('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.newProperty('threeDManualControlsEnabled', {initial: true});
	    this.newEvent('three-d-manual-controls-used');
	    this.on('threeDMode').value(true).onValue((function() {
	      var somethingChanged = false;
	      $__0._screen = {};
	      $__0.on('threeDCanvasSize').onValue((function(size) {
	        $__0._screen.width = size.width;
	        $__0._screen.height = size.height;
	        $__0._screen.left = parseFloat($__0.threeDCanvasElement.css('left'));
	        $__0._screen.top = parseFloat($__0.threeDCanvasElement.css('top'));
	      }));
	      $__0.getMouseOnScreen = (function(pageX, pageY) {
	        return new THREE.Vector2((pageX - $__0._screen.left) / $__0._screen.width, (pageY - $__0._screen.top) / $__0._screen.height);
	      });
	      $__0.threeDCanvasElement.asKefirStream('contextmenu').onValue((function(event) {
	        event.preventDefault();
	      }));
	      var dragging = $__0.threeDCanvasElement.mouseDrag({threshold: $__0.options.dragThreshold}).filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keydown = $(window).asKefirStream('keydown').filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var keyup = $(window).asKefirStream('keyup');
	      var scrolling = $__0.threeDCanvasElement.mouseWheel().filter((function() {
	        return $__0.threeDManualControlsEnabled;
	      }));
	      var button = (function(b) {
	        return (function($__1) {
	          var mouseDownEvent = $__1.mouseDownEvent;
	          return (mouseDownEvent.which === b);
	        });
	      });
	      var key = (function(from, to) {
	        return (function(event) {
	          return (event.which >= from && event.which <= (to || from));
	        });
	      });
	      $__0._rotateStart = new THREE.Vector3();
	      $__0._rotateEnd = new THREE.Vector3();
	      var canvasOffset = $__0.threeDCanvasElement.offset();
	      dragging.filter(button(MOUSE_BUTTON.LEFT)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._rotateStart.copy($__0.getMouseProjectionOnBall(mouseDownEvent.pageX - canvasOffset.left, mouseDownEvent.pageY - canvasOffset.top));
	        }
	        $__0._rotateEnd.copy($__0.getMouseProjectionOnBall(mouseMoveEvent.pageX - canvasOffset.left, mouseMoveEvent.pageY - canvasOffset.top));
	      }));
	      $__0.newProperty('currentArrowKey', {initial: false}).plug(keydown.filter(key(37, 40)).flatMapLatest((function(keydownEvent) {
	        return Kefir.merge([Kefir.once(keydownEvent), keyup.filter(key(keydownEvent.which)).mapTo(false).take(1)]);
	      })));
	      $__0.on('currentArrowKey').changes().onValue((function() {
	        somethingChanged = true;
	      }));
	      $__0._zoomStart = new THREE.Vector2();
	      $__0._zoomEnd = new THREE.Vector2();
	      dragging.filter(button(MOUSE_BUTTON.MIDDLE)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._zoomStart.copy($__0.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
	        }
	        $__0._zoomEnd.copy($__0.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
	      }));
	      scrolling.onValue((function(event) {
	        somethingChanged = true;
	        event.preventDefault();
	        event.stopPropagation();
	        event = event.originalEvent;
	        var diff = 0;
	        if (event.wheelDelta) {
	          diff = event.wheelDelta / 40;
	        } else if (event.detail) {
	          diff = -event.detail / 3;
	        }
	        $__0._zoomStart.y += diff * 0.01;
	      }));
	      $__0._panStart = new THREE.Vector2();
	      $__0._panEnd = new THREE.Vector2();
	      dragging.filter(button(MOUSE_BUTTON.RIGHT)).onValue((function($__1) {
	        var $__2 = $__1,
	            mouseDownEvent = $__2.mouseDownEvent,
	            mouseMoveEvent = $__2.mouseMoveEvent;
	        somethingChanged = true;
	        if (!mouseDownEvent._pastFirst) {
	          mouseDownEvent._pastFirst = true;
	          $__0._panStart.copy($__0.getMouseOnScreen(mouseDownEvent.pageX, mouseDownEvent.pageY));
	        }
	        $__0._panEnd.copy($__0.getMouseOnScreen(mouseMoveEvent.pageX, mouseMoveEvent.pageY));
	      }));
	      $__0._eye = new THREE.Vector3();
	      $__0._panSpeed = 1.0;
	      $__0._rotateSpeed = 1.0;
	      $__0.zoomSpeed = 1.0;
	      $__0.on('3d-render').takeWhileBy($__0.p('threeDMode')).onValue((function() {
	        if (somethingChanged || $__0.currentArrowKey) {
	          somethingChanged = false;
	          $__0.event('three-d-manual-controls-used').emit();
	          $__0._eye.subVectors($__0.camera3D.position, $__0.camera3D.userData.target);
	          ((function() {
	            var mouseChange = new THREE.Vector2();
	            var objectUp = new THREE.Vector3();
	            var pan = new THREE.Vector3();
	            mouseChange.copy($__0._panEnd).sub($__0._panStart);
	            if (mouseChange.lengthSq()) {
	              mouseChange.multiplyScalar($__0._eye.length() * $__0._panSpeed);
	              pan.copy($__0._eye);
	              pan.cross($__0.camera3D.up);
	              pan.setLength(mouseChange.x);
	              pan.add(objectUp.copy($__0.camera3D.up).setLength(mouseChange.y));
	              $__0.camera3D.position.add(pan);
	              if (!$__0.camera3D.userData.semanticTarget) {
	                $__0.camera3D.userData.target.add(pan);
	              }
	              $__0._panStart.copy($__0._panEnd);
	            }
	          }))();
	          ((function() {
	            var axis = new THREE.Vector3();
	            var quaternion = new THREE.Quaternion();
	            var angle = Math.acos($__0._rotateStart.dot($__0._rotateEnd) / $__0._rotateStart.length() / $__0._rotateEnd.length());
	            if (angle) {
	              axis.crossVectors($__0._rotateStart, $__0._rotateEnd).normalize();
	              angle *= $__0._rotateSpeed;
	              quaternion.setFromAxisAngle(axis, -angle);
	              $__0._eye.applyQuaternion(quaternion);
	              $__0.camera3D.up.applyQuaternion(quaternion);
	              $__0._rotateEnd.applyQuaternion(quaternion);
	              $__0._rotateStart.copy($__0._rotateEnd);
	            }
	          }))();
	          ((function() {
	            if ($__0.currentArrowKey) {
	              var $__1 = $__0.currentArrowKey,
	                  which = $__1.which,
	                  ctrlKey = $__1.ctrlKey;
	              var axis = new THREE.Vector3();
	              if ((which === 38 || which === 40) && !ctrlKey) {
	                axis.set(1, 0, 0);
	              } else if ((which === 37 || which === 39) && !ctrlKey) {
	                axis.set(0, 1, 0);
	              } else if ((which === 37 || which === 39) && ctrlKey) {
	                axis.set(0, 0, 1);
	              } else {
	                return;
	              }
	              var angle = 0.015 * Math.PI * $__0._rotateSpeed;
	              if (which === 39 || which === 40) {
	                angle *= -1;
	              }
	              var quaternion = new THREE.Quaternion();
	              quaternion.setFromAxisAngle(axis, -angle);
	              $__0._eye.applyQuaternion(quaternion);
	              $__0.camera3D.up.applyQuaternion(quaternion);
	            }
	          }))();
	          ((function() {
	            if ($__0.currentArrowKey) {
	              var $__1 = $__0.currentArrowKey,
	                  which = $__1.which,
	                  ctrlKey = $__1.ctrlKey;
	              if (which === 38 && ctrlKey) {
	                $__0._zoomStart.y += 0.02;
	              } else if (which === 40 && ctrlKey) {
	                $__0._zoomStart.y -= 0.02;
	              }
	            }
	          }))();
	          ((function() {
	            var factor = 1.0 + ($__0._zoomEnd.y - $__0._zoomStart.y) * $__0.zoomSpeed;
	            if (factor !== 1.0 && factor > 0.0) {
	              $__0._eye.multiplyScalar(factor);
	              $__0._zoomStart.copy($__0._zoomEnd);
	            }
	          }))();
	          if ($__0.options.forbidSubZeroZ) {
	            var eyeLength = $__0._eye.length();
	            if ($__0.camera3D.userData.target.z < 0) {
	              $__0.camera3D.userData.target.z = 0;
	            }
	            if ($__0._eye.z < 0) {
	              $__0._eye.z = 0;
	            }
	            $__0._eye.setLength(eyeLength);
	          }
	          $__0.camera3D.position.addVectors($__0.camera3D.userData.target, $__0._eye);
	        }
	        $__0.camera3D.lookAt($__0.camera3D.userData.target);
	      }));
	    }));
	  });
	  plugin.add('Circuitboard.prototype.getMouseProjectionOnBall', function getMouseProjectionOnBall(pageX, pageY) {
	    var vector = new THREE.Vector3();
	    var objectUp = new THREE.Vector3();
	    var mouseOnBall = new THREE.Vector3();
	    mouseOnBall.set((pageX - this._screen.width * 0.5 - this._screen.left) / (this._screen.width * 0.5), (this._screen.height * 0.5 + this._screen.top - pageY) / (this._screen.height * 0.5), 0.0);
	    var length = mouseOnBall.length();
	    if (length > 1.0) {
	      mouseOnBall.normalize();
	    } else {
	      mouseOnBall.z = Math.sqrt(1.0 - length * length);
	    }
	    this._eye.copy(this.camera3D.position).sub(this.camera3D.userData.target);
	    vector.copy(this.camera3D.up).setLength(mouseOnBall.y);
	    vector.add(objectUp.copy(this.camera3D.up).cross(this._eye).setLength(mouseOnBall.x));
	    vector.add(this._eye.setLength(mouseOnBall.z));
	    return vector;
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5OGM4YjI2NTdhYTQ3MDk4N2JmOSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLW1hbnVhbC1jb250cm9scy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1hbmQtZWdncy5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7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UDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQzFORCxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiLCBcImJsdWViaXJkXCIsIFwia2VmaXJcIiwgXCJ0d2VlbmpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwia2VmaXJcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOThjOGIyNjU3YWE0NzA5ODdiZjlcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnLCAndGhyZWUtanMnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJ10sIGZ1bmN0aW9uKCQsIFUsIFRIUkVFLCBLZWZpcikge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuICAgIG5hbWU6ICd0aHJlZS1kLW1hbnVhbC1jb250cm9scycsXG4gICAgcmVxdWlyZXM6IFsndGhyZWUtZCddXG4gIH0pO1xuICB2YXIgTU9VU0VfQlVUVE9OID0ge1xuICAgIExFRlQ6IDEsXG4gICAgTUlERExFOiAyLFxuICAgIFJJR0hUOiAzXG4gIH07XG4gIHBsdWdpbi5hcHBlbmQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMubmV3UHJvcGVydHkoJ3RocmVlRE1hbnVhbENvbnRyb2xzRW5hYmxlZCcsIHtpbml0aWFsOiB0cnVlfSk7XG4gICAgdGhpcy5uZXdFdmVudCgndGhyZWUtZC1tYW51YWwtY29udHJvbHMtdXNlZCcpO1xuICAgIHRoaXMub24oJ3RocmVlRE1vZGUnKS52YWx1ZSh0cnVlKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAkX18wLl9zY3JlZW4gPSB7fTtcbiAgICAgICRfXzAub24oJ3RocmVlRENhbnZhc1NpemUnKS5vblZhbHVlKChmdW5jdGlvbihzaXplKSB7XG4gICAgICAgICRfXzAuX3NjcmVlbi53aWR0aCA9IHNpemUud2lkdGg7XG4gICAgICAgICRfXzAuX3NjcmVlbi5oZWlnaHQgPSBzaXplLmhlaWdodDtcbiAgICAgICAgJF9fMC5fc2NyZWVuLmxlZnQgPSBwYXJzZUZsb2F0KCRfXzAudGhyZWVEQ2FudmFzRWxlbWVudC5jc3MoJ2xlZnQnKSk7XG4gICAgICAgICRfXzAuX3NjcmVlbi50b3AgPSBwYXJzZUZsb2F0KCRfXzAudGhyZWVEQ2FudmFzRWxlbWVudC5jc3MoJ3RvcCcpKTtcbiAgICAgIH0pKTtcbiAgICAgICRfXzAuZ2V0TW91c2VPblNjcmVlbiA9IChmdW5jdGlvbihwYWdlWCwgcGFnZVkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKChwYWdlWCAtICRfXzAuX3NjcmVlbi5sZWZ0KSAvICRfXzAuX3NjcmVlbi53aWR0aCwgKHBhZ2VZIC0gJF9fMC5fc2NyZWVuLnRvcCkgLyAkX18wLl9zY3JlZW4uaGVpZ2h0KTtcbiAgICAgIH0pO1xuICAgICAgJF9fMC50aHJlZURDYW52YXNFbGVtZW50LmFzS2VmaXJTdHJlYW0oJ2NvbnRleHRtZW51Jykub25WYWx1ZSgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBkcmFnZ2luZyA9ICRfXzAudGhyZWVEQ2FudmFzRWxlbWVudC5tb3VzZURyYWcoe3RocmVzaG9sZDogJF9fMC5vcHRpb25zLmRyYWdUaHJlc2hvbGR9KS5maWx0ZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJF9fMC50aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQ7XG4gICAgICB9KSk7XG4gICAgICB2YXIga2V5ZG93biA9ICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlkb3duJykuZmlsdGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICRfXzAudGhyZWVETWFudWFsQ29udHJvbHNFbmFibGVkO1xuICAgICAgfSkpO1xuICAgICAgdmFyIGtleXVwID0gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXVwJyk7XG4gICAgICB2YXIgc2Nyb2xsaW5nID0gJF9fMC50aHJlZURDYW52YXNFbGVtZW50Lm1vdXNlV2hlZWwoKS5maWx0ZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJF9fMC50aHJlZURNYW51YWxDb250cm9sc0VuYWJsZWQ7XG4gICAgICB9KSk7XG4gICAgICB2YXIgYnV0dG9uID0gKGZ1bmN0aW9uKGIpIHtcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbigkX18xKSB7XG4gICAgICAgICAgdmFyIG1vdXNlRG93bkV2ZW50ID0gJF9fMS5tb3VzZURvd25FdmVudDtcbiAgICAgICAgICByZXR1cm4gKG1vdXNlRG93bkV2ZW50LndoaWNoID09PSBiKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHZhciBrZXkgPSAoZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHJldHVybiAoZXZlbnQud2hpY2ggPj0gZnJvbSAmJiBldmVudC53aGljaCA8PSAodG8gfHwgZnJvbSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgJF9fMC5fcm90YXRlU3RhcnQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgJF9fMC5fcm90YXRlRW5kID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgIHZhciBjYW52YXNPZmZzZXQgPSAkX18wLnRocmVlRENhbnZhc0VsZW1lbnQub2Zmc2V0KCk7XG4gICAgICBkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5MRUZUKSkub25WYWx1ZSgoZnVuY3Rpb24oJF9fMSkge1xuICAgICAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgICAgICBtb3VzZURvd25FdmVudCA9ICRfXzIubW91c2VEb3duRXZlbnQsXG4gICAgICAgICAgICBtb3VzZU1vdmVFdmVudCA9ICRfXzIubW91c2VNb3ZlRXZlbnQ7XG4gICAgICAgIHNvbWV0aGluZ0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICBpZiAoIW1vdXNlRG93bkV2ZW50Ll9wYXN0Rmlyc3QpIHtcbiAgICAgICAgICBtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAkX18wLl9yb3RhdGVTdGFydC5jb3B5KCRfXzAuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gY2FudmFzT2Zmc2V0LmxlZnQsIG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gY2FudmFzT2Zmc2V0LnRvcCkpO1xuICAgICAgICB9XG4gICAgICAgICRfXzAuX3JvdGF0ZUVuZC5jb3B5KCRfXzAuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKG1vdXNlTW92ZUV2ZW50LnBhZ2VYIC0gY2FudmFzT2Zmc2V0LmxlZnQsIG1vdXNlTW92ZUV2ZW50LnBhZ2VZIC0gY2FudmFzT2Zmc2V0LnRvcCkpO1xuICAgICAgfSkpO1xuICAgICAgJF9fMC5uZXdQcm9wZXJ0eSgnY3VycmVudEFycm93S2V5Jywge2luaXRpYWw6IGZhbHNlfSkucGx1ZyhrZXlkb3duLmZpbHRlcihrZXkoMzcsIDQwKSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oa2V5ZG93bkV2ZW50KSB7XG4gICAgICAgIHJldHVybiBLZWZpci5tZXJnZShbS2VmaXIub25jZShrZXlkb3duRXZlbnQpLCBrZXl1cC5maWx0ZXIoa2V5KGtleWRvd25FdmVudC53aGljaCkpLm1hcFRvKGZhbHNlKS50YWtlKDEpXSk7XG4gICAgICB9KSkpO1xuICAgICAgJF9fMC5vbignY3VycmVudEFycm93S2V5JykuY2hhbmdlcygpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgICBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0pKTtcbiAgICAgICRfXzAuX3pvb21TdGFydCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgICAkX18wLl96b29tRW5kID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICAgIGRyYWdnaW5nLmZpbHRlcihidXR0b24oTU9VU0VfQlVUVE9OLk1JRERMRSkpLm9uVmFsdWUoKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgICAgbW91c2VEb3duRXZlbnQgPSAkX18yLm1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgICAgbW91c2VNb3ZlRXZlbnQgPSAkX18yLm1vdXNlTW92ZUV2ZW50O1xuICAgICAgICBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG4gICAgICAgICAgJF9fMC5fem9vbVN0YXJ0LmNvcHkoJF9fMC5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlRG93bkV2ZW50LnBhZ2VYLCBtb3VzZURvd25FdmVudC5wYWdlWSkpO1xuICAgICAgICB9XG4gICAgICAgICRfXzAuX3pvb21FbmQuY29weSgkX18wLmdldE1vdXNlT25TY3JlZW4obW91c2VNb3ZlRXZlbnQucGFnZVgsIG1vdXNlTW92ZUV2ZW50LnBhZ2VZKSk7XG4gICAgICB9KSk7XG4gICAgICBzY3JvbGxpbmcub25WYWx1ZSgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc29tZXRoaW5nQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBldmVudCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgIHZhciBkaWZmID0gMDtcbiAgICAgICAgaWYgKGV2ZW50LndoZWVsRGVsdGEpIHtcbiAgICAgICAgICBkaWZmID0gZXZlbnQud2hlZWxEZWx0YSAvIDQwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmRldGFpbCkge1xuICAgICAgICAgIGRpZmYgPSAtZXZlbnQuZGV0YWlsIC8gMztcbiAgICAgICAgfVxuICAgICAgICAkX18wLl96b29tU3RhcnQueSArPSBkaWZmICogMC4wMTtcbiAgICAgIH0pKTtcbiAgICAgICRfXzAuX3BhblN0YXJ0ID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcbiAgICAgICRfXzAuX3BhbkVuZCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgICBkcmFnZ2luZy5maWx0ZXIoYnV0dG9uKE1PVVNFX0JVVFRPTi5SSUdIVCkpLm9uVmFsdWUoKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgICAgbW91c2VEb3duRXZlbnQgPSAkX18yLm1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgICAgbW91c2VNb3ZlRXZlbnQgPSAkX18yLm1vdXNlTW92ZUV2ZW50O1xuICAgICAgICBzb21ldGhpbmdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgaWYgKCFtb3VzZURvd25FdmVudC5fcGFzdEZpcnN0KSB7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQuX3Bhc3RGaXJzdCA9IHRydWU7XG4gICAgICAgICAgJF9fMC5fcGFuU3RhcnQuY29weSgkX18wLmdldE1vdXNlT25TY3JlZW4obW91c2VEb3duRXZlbnQucGFnZVgsIG1vdXNlRG93bkV2ZW50LnBhZ2VZKSk7XG4gICAgICAgIH1cbiAgICAgICAgJF9fMC5fcGFuRW5kLmNvcHkoJF9fMC5nZXRNb3VzZU9uU2NyZWVuKG1vdXNlTW92ZUV2ZW50LnBhZ2VYLCBtb3VzZU1vdmVFdmVudC5wYWdlWSkpO1xuICAgICAgfSkpO1xuICAgICAgJF9fMC5fZXllID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICAgICRfXzAuX3BhblNwZWVkID0gMS4wO1xuICAgICAgJF9fMC5fcm90YXRlU3BlZWQgPSAxLjA7XG4gICAgICAkX18wLnpvb21TcGVlZCA9IDEuMDtcbiAgICAgICRfXzAub24oJzNkLXJlbmRlcicpLnRha2VXaGlsZUJ5KCRfXzAucCgndGhyZWVETW9kZScpKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHNvbWV0aGluZ0NoYW5nZWQgfHwgJF9fMC5jdXJyZW50QXJyb3dLZXkpIHtcbiAgICAgICAgICBzb21ldGhpbmdDaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgICAgJF9fMC5ldmVudCgndGhyZWUtZC1tYW51YWwtY29udHJvbHMtdXNlZCcpLmVtaXQoKTtcbiAgICAgICAgICAkX18wLl9leWUuc3ViVmVjdG9ycygkX18wLmNhbWVyYTNELnBvc2l0aW9uLCAkX18wLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldCk7XG4gICAgICAgICAgKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBtb3VzZUNoYW5nZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG4gICAgICAgICAgICB2YXIgb2JqZWN0VXAgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgICAgICAgICAgdmFyIHBhbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgICAgICBtb3VzZUNoYW5nZS5jb3B5KCRfXzAuX3BhbkVuZCkuc3ViKCRfXzAuX3BhblN0YXJ0KTtcbiAgICAgICAgICAgIGlmIChtb3VzZUNoYW5nZS5sZW5ndGhTcSgpKSB7XG4gICAgICAgICAgICAgIG1vdXNlQ2hhbmdlLm11bHRpcGx5U2NhbGFyKCRfXzAuX2V5ZS5sZW5ndGgoKSAqICRfXzAuX3BhblNwZWVkKTtcbiAgICAgICAgICAgICAgcGFuLmNvcHkoJF9fMC5fZXllKTtcbiAgICAgICAgICAgICAgcGFuLmNyb3NzKCRfXzAuY2FtZXJhM0QudXApO1xuICAgICAgICAgICAgICBwYW4uc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLngpO1xuICAgICAgICAgICAgICBwYW4uYWRkKG9iamVjdFVwLmNvcHkoJF9fMC5jYW1lcmEzRC51cCkuc2V0TGVuZ3RoKG1vdXNlQ2hhbmdlLnkpKTtcbiAgICAgICAgICAgICAgJF9fMC5jYW1lcmEzRC5wb3NpdGlvbi5hZGQocGFuKTtcbiAgICAgICAgICAgICAgaWYgKCEkX18wLmNhbWVyYTNELnVzZXJEYXRhLnNlbWFudGljVGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgJF9fMC5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQuYWRkKHBhbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgJF9fMC5fcGFuU3RhcnQuY29weSgkX18wLl9wYW5FbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSgpO1xuICAgICAgICAgICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgICAgICB2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmFjb3MoJF9fMC5fcm90YXRlU3RhcnQuZG90KCRfXzAuX3JvdGF0ZUVuZCkgLyAkX18wLl9yb3RhdGVTdGFydC5sZW5ndGgoKSAvICRfXzAuX3JvdGF0ZUVuZC5sZW5ndGgoKSk7XG4gICAgICAgICAgICBpZiAoYW5nbGUpIHtcbiAgICAgICAgICAgICAgYXhpcy5jcm9zc1ZlY3RvcnMoJF9fMC5fcm90YXRlU3RhcnQsICRfXzAuX3JvdGF0ZUVuZCkubm9ybWFsaXplKCk7XG4gICAgICAgICAgICAgIGFuZ2xlICo9ICRfXzAuX3JvdGF0ZVNwZWVkO1xuICAgICAgICAgICAgICBxdWF0ZXJuaW9uLnNldEZyb21BeGlzQW5nbGUoYXhpcywgLWFuZ2xlKTtcbiAgICAgICAgICAgICAgJF9fMC5fZXllLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcbiAgICAgICAgICAgICAgJF9fMC5jYW1lcmEzRC51cC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG4gICAgICAgICAgICAgICRfXzAuX3JvdGF0ZUVuZC5hcHBseVF1YXRlcm5pb24ocXVhdGVybmlvbik7XG4gICAgICAgICAgICAgICRfXzAuX3JvdGF0ZVN0YXJ0LmNvcHkoJF9fMC5fcm90YXRlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkoKTtcbiAgICAgICAgICAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRfXzAuY3VycmVudEFycm93S2V5KSB7XG4gICAgICAgICAgICAgIHZhciAkX18xID0gJF9fMC5jdXJyZW50QXJyb3dLZXksXG4gICAgICAgICAgICAgICAgICB3aGljaCA9ICRfXzEud2hpY2gsXG4gICAgICAgICAgICAgICAgICBjdHJsS2V5ID0gJF9fMS5jdHJsS2V5O1xuICAgICAgICAgICAgICB2YXIgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgICAgICAgICAgIGlmICgod2hpY2ggPT09IDM4IHx8IHdoaWNoID09PSA0MCkgJiYgIWN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICBheGlzLnNldCgxLCAwLCAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgod2hpY2ggPT09IDM3IHx8IHdoaWNoID09PSAzOSkgJiYgIWN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICBheGlzLnNldCgwLCAxLCAwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgod2hpY2ggPT09IDM3IHx8IHdoaWNoID09PSAzOSkgJiYgY3RybEtleSkge1xuICAgICAgICAgICAgICAgIGF4aXMuc2V0KDAsIDAsIDEpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgYW5nbGUgPSAwLjAxNSAqIE1hdGguUEkgKiAkX18wLl9yb3RhdGVTcGVlZDtcbiAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSAzOSB8fCB3aGljaCA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICBhbmdsZSAqPSAtMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgcXVhdGVybmlvbiA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG4gICAgICAgICAgICAgIHF1YXRlcm5pb24uc2V0RnJvbUF4aXNBbmdsZShheGlzLCAtYW5nbGUpO1xuICAgICAgICAgICAgICAkX18wLl9leWUuYXBwbHlRdWF0ZXJuaW9uKHF1YXRlcm5pb24pO1xuICAgICAgICAgICAgICAkX18wLmNhbWVyYTNELnVwLmFwcGx5UXVhdGVybmlvbihxdWF0ZXJuaW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkoKTtcbiAgICAgICAgICAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCRfXzAuY3VycmVudEFycm93S2V5KSB7XG4gICAgICAgICAgICAgIHZhciAkX18xID0gJF9fMC5jdXJyZW50QXJyb3dLZXksXG4gICAgICAgICAgICAgICAgICB3aGljaCA9ICRfXzEud2hpY2gsXG4gICAgICAgICAgICAgICAgICBjdHJsS2V5ID0gJF9fMS5jdHJsS2V5O1xuICAgICAgICAgICAgICBpZiAod2hpY2ggPT09IDM4ICYmIGN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICAkX18wLl96b29tU3RhcnQueSArPSAwLjAyO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHdoaWNoID09PSA0MCAmJiBjdHJsS2V5KSB7XG4gICAgICAgICAgICAgICAgJF9fMC5fem9vbVN0YXJ0LnkgLT0gMC4wMjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKSgpO1xuICAgICAgICAgICgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZmFjdG9yID0gMS4wICsgKCRfXzAuX3pvb21FbmQueSAtICRfXzAuX3pvb21TdGFydC55KSAqICRfXzAuem9vbVNwZWVkO1xuICAgICAgICAgICAgaWYgKGZhY3RvciAhPT0gMS4wICYmIGZhY3RvciA+IDAuMCkge1xuICAgICAgICAgICAgICAkX18wLl9leWUubXVsdGlwbHlTY2FsYXIoZmFjdG9yKTtcbiAgICAgICAgICAgICAgJF9fMC5fem9vbVN0YXJ0LmNvcHkoJF9fMC5fem9vbUVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpKCk7XG4gICAgICAgICAgaWYgKCRfXzAub3B0aW9ucy5mb3JiaWRTdWJaZXJvWikge1xuICAgICAgICAgICAgdmFyIGV5ZUxlbmd0aCA9ICRfXzAuX2V5ZS5sZW5ndGgoKTtcbiAgICAgICAgICAgIGlmICgkX18wLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC56IDwgMCkge1xuICAgICAgICAgICAgICAkX18wLmNhbWVyYTNELnVzZXJEYXRhLnRhcmdldC56ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkX18wLl9leWUueiA8IDApIHtcbiAgICAgICAgICAgICAgJF9fMC5fZXllLnogPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJF9fMC5fZXllLnNldExlbmd0aChleWVMZW5ndGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkX18wLmNhbWVyYTNELnBvc2l0aW9uLmFkZFZlY3RvcnMoJF9fMC5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQsICRfXzAuX2V5ZSk7XG4gICAgICAgIH1cbiAgICAgICAgJF9fMC5jYW1lcmEzRC5sb29rQXQoJF9fMC5jYW1lcmEzRC51c2VyRGF0YS50YXJnZXQpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgfSk7XG4gIHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsJywgZnVuY3Rpb24gZ2V0TW91c2VQcm9qZWN0aW9uT25CYWxsKHBhZ2VYLCBwYWdlWSkge1xuICAgIHZhciB2ZWN0b3IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICAgIHZhciBvYmplY3RVcCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gICAgdmFyIG1vdXNlT25CYWxsID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgICBtb3VzZU9uQmFsbC5zZXQoKHBhZ2VYIC0gdGhpcy5fc2NyZWVuLndpZHRoICogMC41IC0gdGhpcy5fc2NyZWVuLmxlZnQpIC8gKHRoaXMuX3NjcmVlbi53aWR0aCAqIDAuNSksICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41ICsgdGhpcy5fc2NyZWVuLnRvcCAtIHBhZ2VZKSAvICh0aGlzLl9zY3JlZW4uaGVpZ2h0ICogMC41KSwgMC4wKTtcbiAgICB2YXIgbGVuZ3RoID0gbW91c2VPbkJhbGwubGVuZ3RoKCk7XG4gICAgaWYgKGxlbmd0aCA+IDEuMCkge1xuICAgICAgbW91c2VPbkJhbGwubm9ybWFsaXplKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1vdXNlT25CYWxsLnogPSBNYXRoLnNxcnQoMS4wIC0gbGVuZ3RoICogbGVuZ3RoKTtcbiAgICB9XG4gICAgdGhpcy5fZXllLmNvcHkodGhpcy5jYW1lcmEzRC5wb3NpdGlvbikuc3ViKHRoaXMuY2FtZXJhM0QudXNlckRhdGEudGFyZ2V0KTtcbiAgICB2ZWN0b3IuY29weSh0aGlzLmNhbWVyYTNELnVwKS5zZXRMZW5ndGgobW91c2VPbkJhbGwueSk7XG4gICAgdmVjdG9yLmFkZChvYmplY3RVcC5jb3B5KHRoaXMuY2FtZXJhM0QudXApLmNyb3NzKHRoaXMuX2V5ZSkuc2V0TGVuZ3RoKG1vdXNlT25CYWxsLngpKTtcbiAgICB2ZWN0b3IuYWRkKHRoaXMuX2V5ZS5zZXRMZW5ndGgobW91c2VPbkJhbGwueikpO1xuICAgIHJldHVybiB2ZWN0b3I7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGhyZWUtZC1tYW51YWwtY29udHJvbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIChmdW5jdGlvbihQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIFUgPSB7XG4gICAgbmV3Q2xhc3M6IGZ1bmN0aW9uKGNvbnN0cnVjdG9yKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG4gICAgICByZXR1cm4gY29uc3RydWN0b3I7XG4gICAgfSxcbiAgICBuZXdTdWJjbGFzczogZnVuY3Rpb24oc3VwZXJDbGFzcywgY29uc3RydWN0b3JNYWtlcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBjb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yTWFrZXIoc3VwZXJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IpO1xuICAgICAgY29uc3RydWN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzLnByb3RvdHlwZSk7XG4gICAgICBVLmV4dGVuZChjb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvdHlwZSk7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIGV4dGVuZDogZnVuY3Rpb24ob2JqMSkge1xuICAgICAgZm9yICh2YXIgcmVzdCA9IFtdLFxuICAgICAgICAgICRfXzEgPSAxOyAkX18xIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMSsrKVxuICAgICAgICByZXN0WyRfXzEgLSAxXSA9IGFyZ3VtZW50c1skX18xXTtcbiAgICAgIHJlc3QuZm9yRWFjaCgoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmoxLCBrZXksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBvYmoxO1xuICAgIH0sXG4gICAgZmllbGQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNhbGw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgJF9fMiA9IDE7ICRfXzIgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18yKyspXG4gICAgICAgIGFyZ3NbJF9fMiAtIDFdID0gYXJndW1lbnRzWyRfXzJdO1xuICAgICAgcmV0dXJuIGZuLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24odikge1xuICAgICAgcmV0dXJuIHY7XG4gICAgfSxcbiAgICBnZXREZWY6IGZ1bmN0aW9uKG9iaiwgbmFtZSwgdmFsdWUpIHtcbiAgICAgIGlmIChVLmlzVW5kZWZpbmVkKG9ialtuYW1lXSkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gdmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICBvYmpbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvYmpbbmFtZV07XG4gICAgfSxcbiAgICBvYmplY3Q6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwge30pO1xuICAgIH0sXG4gICAgYXJyYXk6IGZ1bmN0aW9uKG9iaiwgbmFtZSkge1xuICAgICAgcmV0dXJuIFUuZ2V0RGVmKG9iaiwgbmFtZSwgW10pO1xuICAgIH0sXG4gICAgcHVsbDogZnVuY3Rpb24oYXJyLCB2YWwpIHtcbiAgICAgIHZhciBpID0gYXJyLmluZGV4T2YodmFsKTtcbiAgICAgIGlmIChpICE9PSAtMSkge1xuICAgICAgICBhcnIuc3BsaWNlKGkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFrZUVtcHR5OiBmdW5jdGlvbihhcnIpIHtcbiAgICAgIHdoaWxlIChhcnIubGVuZ3RoID4gMCkge1xuICAgICAgICBhcnIucG9wKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBiaW5kQTogZnVuY3Rpb24oZm4sIGN0eCwgYXJncykge1xuICAgICAgcmV0dXJuIGZuLmJpbmQuYXBwbHkoZm4sIFtjdHhdLmNvbmNhdChhcmdzKSk7XG4gICAgfSxcbiAgICBiaW5kOiBmdW5jdGlvbihvYmosIG0pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18zID0gMjsgJF9fMyA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzMrKylcbiAgICAgICAgYXJnc1skX18zIC0gMl0gPSBhcmd1bWVudHNbJF9fM107XG4gICAgICByZXR1cm4gVS5iaW5kQShvYmpbbV0sIG9iaiwgYXJncyk7XG4gICAgfSxcbiAgICBhcHBseUNvbnN0cnVjdG9yOiBmdW5jdGlvbihDb25zdHJ1Y3RvckZuLCBhcmdzKSB7XG4gICAgICB2YXIgTmV3Q29uc3RydWN0b3JGbiA9IENvbnN0cnVjdG9yRm4uYmluZC5hcHBseShDb25zdHJ1Y3RvckZuLCBbbnVsbF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiBuZXcgTmV3Q29uc3RydWN0b3JGbigpO1xuICAgIH0sXG4gICAgYXNzZXJ0OiBmdW5jdGlvbihjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8IFwiQXNzZXJ0aW9uIGZhaWxlZFwiKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGlzVW5kZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzRGVmaW5lZDogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfSxcbiAgICBpc1BsYWluT2JqZWN0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdDtcbiAgICB9LFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcbiAgICBvYmpWYWx1ZXM6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubWFwKChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgbWFrZVBvc2l0aW9uZWQ6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgZWxlbWVudC5jc3MoJ3Bvc2l0aW9uJywgJ3JlbGF0aXZlJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZPcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciB2YWx1ZXMgPSBbXSxcbiAgICAgICAgICAkX180ID0gMDsgJF9fNCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzQrKylcbiAgICAgICAgdmFsdWVzWyRfXzRdID0gYXJndW1lbnRzWyRfXzRdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKFUuaXNEZWZpbmVkKHZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkZWJvdW5jZTogZnVuY3Rpb24oZnVuYywgd2FpdCwgY29udGV4dCkge1xuICAgICAgdmFyIHRpbWVvdXQ7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgICAgdmFyIGxhdGVyRm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0IHx8ICRfXzAsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlckZuLCB3YWl0KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBvbmNlUGVyU3RhY2s6IGZ1bmN0aW9uKGZ1bmMsIGNvbnRleHQpIHtcbiAgICAgIHZhciBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgdmFyIHJlc3VsdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICBpZiAobm90UnVuWWV0KSB7XG4gICAgICAgICAgbm90UnVuWWV0ID0gZmFsc2U7XG4gICAgICAgICAgc2V0VGltZW91dCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgICAgIH0pLCAwKTtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgdGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICByZXN1bHQuYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgbm90UnVuWWV0ID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuICAgIGNhY2hlZDogZnVuY3Rpb24oJF9fNikge1xuICAgICAgdmFyICRfXzcgPSAkX182LFxuICAgICAgICAgIHJldHJpZXZlID0gJF9fNy5yZXRyaWV2ZSxcbiAgICAgICAgICBpc0VxdWFsID0gJF9fNy5pc0VxdWFsO1xuICAgICAgaXNFcXVhbCA9IGlzRXF1YWwgfHwgKChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiAoYSA9PT0gYik7XG4gICAgICB9KSk7XG4gICAgICB2YXIgY2FjaGU7XG4gICAgICBmdW5jdGlvbiByZXRyaWV2ZVZhbHVlKCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSByZXRyaWV2ZSgpO1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSBjYWNoZTtcbiAgICAgICAgaWYgKCFpc0VxdWFsKG5ld1ZhbHVlLCBvbGRWYWx1ZSkpIHtcbiAgICAgICAgICBjYWNoZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIG9uQ2hhbmdlLmZvckVhY2goKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4obmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBvbmNlUGVyU3RhY2tTZXRWYWx1ZSA9IFUub25jZVBlclN0YWNrKHJldHJpZXZlVmFsdWUpO1xuICAgICAgdmFyIHJlc3VsdEZuID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgICByZXR1cm4gY2FjaGU7XG4gICAgICB9KTtcbiAgICAgIHZhciBvbkNoYW5nZSA9IFtdO1xuICAgICAgcmVzdWx0Rm4ub25DaGFuZ2UgPSAoZnVuY3Rpb24oY2IpIHtcbiAgICAgICAgb25DaGFuZ2UucHVzaChjYik7XG4gICAgICAgIHJldHVybiByZXN1bHRGbjtcbiAgICAgIH0pO1xuICAgICAgcmVzdWx0Rm4uYWxsb3dBZGRpdGlvbmFsQ2FsbCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgb25jZVBlclN0YWNrU2V0VmFsdWUuYWxsb3dBZGRpdGlvbmFsQ2FsbCgpO1xuICAgICAgfSk7XG4gICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZSgpO1xuICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgIH0sXG4gICAgcHJvbWlzaWZ5OiBmdW5jdGlvbihvYmosIG1ldGhvZCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICByZXR1cm4gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBvYmpbbWV0aG9kXS5hcHBseShvYmosIGFyZ3MuY29uY2F0KHJlc29sdmUpKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBmaW5kSW5kZXg6IGZ1bmN0aW9uKGFycmF5LCBwcmVkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChwcmVkKGFycmF5W2ldLCBpLCBhcnJheSkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgbWVtb2l6ZTogZnVuY3Rpb24oZm4pIHtcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICB2YXIgY2FjaGUgPSBbXTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyIGluZGV4ID0gVS5maW5kSW5kZXgoa2V5cywgKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgIHJldHVybiBrZXkuZXZlcnkoKGZ1bmN0aW9uKHYsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB2ID09PSBhcmdzW2ldO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHJldHVybiBjYWNoZVtpbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBrZXlzLnB1c2goYXJncyk7XG4gICAgICAgIGNhY2hlLnB1c2gocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH07XG4gICAgfVxuICB9O1xuICB2YXIgRVBTID0gMC4wMDAwMDE7XG4gIHZhciBzb3J0T2ZFcXVhbCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIChiIC0gRVBTIDwgYSAmJiBhIDwgYiArIEVQUyk7XG4gIH0pO1xuICBVLlBvc2l0aW9uID0gVS5uZXdDbGFzcyhmdW5jdGlvbih0b3AsIGxlZnQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9KTtcbiAgVS5Qb3NpdGlvbi5zdWJ0cmFjdCA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIG5ldyBVLlBvc2l0aW9uKGEudG9wIC0gYi50b3AsIGEubGVmdCAtIGIubGVmdCk7XG4gIH0pO1xuICBVLlBvc2l0aW9uLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEudG9wLCBiLnRvcCkgJiYgc29ydE9mRXF1YWwoYS5sZWZ0LCBiLmxlZnQpO1xuICB9KTtcbiAgVS5TaXplID0gVS5uZXdDbGFzcyhmdW5jdGlvbihoZWlnaHQsIHdpZHRoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICB9KTtcbiAgVS5TaXplLmVxdWFscyA9IChmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIFUuaXNEZWZpbmVkKGEpICYmIFUuaXNEZWZpbmVkKGIpICYmIHNvcnRPZkVxdWFsKGEuaGVpZ2h0LCBiLmhlaWdodCkgJiYgc29ydE9mRXF1YWwoYS53aWR0aCwgYi53aWR0aCk7XG4gIH0pO1xuICByZXR1cm4gVTtcbn0pKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9taXNjLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuZGVmaW5lKFsnanF1ZXJ5JywgJy4vbWlzYy5qcycsICdrZWZpcicsICd0d2VlbmpzJ10sIGZ1bmN0aW9uKCQsIFUsIEtlZmlyLCBUV0VFTikge1xuICBLZWZpckpRdWVyeS5pbml0KEtlZmlyLCAkKTtcbiAgS2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvYmoub24oZXZlbnROYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoKGZ1bmN0aW9uKGYpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICB9KSk7XG4gIEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCk7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbkZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsICRfXzEpIHtcbiAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgIGR1cmF0aW9uID0gJF9fMi5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSAkX18yLmRlbGF5LFxuICAgICAgICBlYXNpbmcgPSAkX18yLmVhc2luZztcbiAgICB2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgYWRkU3RyZWFtID0gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBjaGFpbmVkU3RyZWFtcyArPSAxO1xuICAgICAgICBidXMucGx1ZyhzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ub25FbmQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoYWluZWRTdHJlYW1zIC09IDE7XG4gICAgICAgICAgaWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7XG4gICAgICAgICAgICBidXMuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9KSkoKTtcbiAgICBhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgaWYgKGVhc2luZykge1xuICAgICAgICB0dy5lYXNpbmcoZWFzaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICB0dy5kZWxheShkZWxheSk7XG4gICAgICB9XG4gICAgICB0dy5vblVwZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcbiAgICB9KSkpO1xuICAgIGJ1cy50d2VlbiA9IHR3O1xuICAgIGJ1cy5zdGFydCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHR3LnN0YXJ0KCk7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIGJ1cy5jaGFpbiA9IChmdW5jdGlvbihvdGhlcikge1xuICAgICAgYWRkU3RyZWFtKG90aGVyKTtcbiAgICAgIHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1cztcbiAgfTtcbiAgS2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG4gICAgcmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcpIHtcbiAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBVLmNhbGw7XG4gICAgdmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBvcGVuID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGNsb3NlID0gS2VmaXIuYnVzKCk7XG4gICAgcGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgb3Blbi5lbWl0KCk7XG4gICAgICAgIHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgY2xvc2UuZW1pdCgpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgYnVmZmVyID0gKGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSkuYnVmZmVyO1xuICAgICAgd2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcbiAgICAgIHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IChmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICAgIHJldHVybiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuICAgIHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvVGhpcyA9ICRfXzAub25WYWx1ZSgoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgb2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1RoaXMoKTtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1BhY2luZygpO1xuICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSA9PT0gdmFsdWU7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIGRvTm90aGluZyA9IChmdW5jdGlvbigpIHt9KTtcbiAgICB0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vZmZWYWx1ZShkb05vdGhpbmcpO1xuICAgIH0pO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihldmVudCkge1xuICAgICAgcmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24oYnV0dG9uSWQpIHtcbiAgICB2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6ICgoZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIGIgPT09IGJ1dHRvbklkO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBwcmVkKGUud2hpY2gpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKS5tYXAoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgIG1vdXNlRG93bkV2ZW50OiBtb3VzZURvd25FdmVudCxcbiAgICAgICAgICBtb3VzZU1vdmVFdmVudDogbW91c2VNb3ZlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICB1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG4gIH07XG4gIHJldHVybiBLZWZpcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV82X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9XG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQtbWFudWFsLWNvbnRyb2xzLmpzIn0=