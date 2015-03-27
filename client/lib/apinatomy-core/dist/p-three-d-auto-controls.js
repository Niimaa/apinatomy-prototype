(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("bluebird"), require("three-js"), require("tweenjs"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "bluebird", "three-js", "tweenjs"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("bluebird"), require("three-js"), require("tweenjs")) : factory(root["jQuery"], root["P"], root["THREE"], root["TWEEN"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, P, THREE, TWEEN) {
	  'use strict';
	  var plugin = $.circuitboard.plugin.do('three-d-auto-controls', {requires: ['three-d']});
	  plugin.append('Circuitboard.prototype.construct', function() {
	    var $__0 = this;
	    this.p('threeDMode').value(true).take(1).onValue((function() {
	      $__0.on('3d-render').onValue((function() {
	        TWEEN.update();
	      }));
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

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
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


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyODI5NWMzY2Y0ZjgzYjc2NzYxZSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWF1dG8tY29udHJvbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRXRUVOXCIsXCJjb21tb25qczJcIjpcInR3ZWVuanNcIixcImNvbW1vbmpzXCI6XCJ0d2VlbmpzXCIsXCJhbWRcIjpcInR3ZWVuanNcIn0iLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Es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Q0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwiYmx1ZWJpcmRcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSwgcmVxdWlyZShcInR3ZWVuanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwiYmx1ZWJpcmRcIiwgXCJ0aHJlZS1qc1wiLCBcInR3ZWVuanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJ0d2VlbmpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlBcIl0sIHJvb3RbXCJUSFJFRVwiXSwgcm9vdFtcIlRXRUVOXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjgyOTVjM2NmNGY4M2I3Njc2MWVcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnLCAnYmx1ZWJpcmQnLCAndGhyZWUtanMnLCAndHdlZW5qcyddLCBmdW5jdGlvbigkLCBVLCBQLCBUSFJFRSwgVFdFRU4pIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luLmRvKCd0aHJlZS1kLWF1dG8tY29udHJvbHMnLCB7cmVxdWlyZXM6IFsndGhyZWUtZCddfSk7XG4gIHBsdWdpbi5hcHBlbmQoJ0NpcmN1aXRib2FyZC5wcm90b3R5cGUuY29uc3RydWN0JywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIHRoaXMucCgndGhyZWVETW9kZScpLnZhbHVlKHRydWUpLnRha2UoMSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLm9uKCczZC1yZW5kZXInKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgVFdFRU4udXBkYXRlKCk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9KTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRocmVlLWQtYXV0by1jb250cm9scy5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgVSA9IHtcbiAgICBuZXdDbGFzczogZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIG5ld1N1YmNsYXNzOiBmdW5jdGlvbihzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvYmoxKSB7XG4gICAgICBmb3IgKHZhciByZXN0ID0gW10sXG4gICAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICAgIHJlc3RbJF9fMSAtIDFdID0gYXJndW1lbnRzWyRfXzFdO1xuICAgICAgcmVzdC5mb3JFYWNoKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIG9iajE7XG4gICAgfSxcbiAgICBmaWVsZDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18yID0gMTsgJF9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzIrKylcbiAgICAgICAgYXJnc1skX18yIC0gMV0gPSBhcmd1bWVudHNbJF9fMl07XG4gICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIGdldERlZjogZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSk7XG4gICAgfSxcbiAgICBwdWxsOiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgdmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWtlRW1wdHk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgd2hpbGUgKGFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRBOiBmdW5jdGlvbihmbiwgY3R4LCBhcmdzKSB7XG4gICAgICByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKG9iaiwgbSkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzMgPSAyOyAkX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMysrKVxuICAgICAgICBhcmdzWyRfXzMgLSAyXSA9IGFyZ3VtZW50c1skX18zXTtcbiAgICAgIHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKTtcbiAgICB9LFxuICAgIGFwcGx5Q29uc3RydWN0b3I6IGZ1bmN0aW9uKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcbiAgICAgIHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG4gICAgfSxcbiAgICBhc3NlcnQ6IGZ1bmN0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuICAgIG9ialZhbHVlczogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBtYWtlUG9zaXRpb25lZDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZk9yOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlcyA9IFtdLFxuICAgICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgICB2YWx1ZXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZW91dDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICB2YXIgbGF0ZXJGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgJF9fMCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2VQZXJTdGFjazogZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgICAgdmFyIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIGlmIChub3RSdW5ZZXQpIHtcbiAgICAgICAgICBub3RSdW5ZZXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICAgICAgfSksIDApO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbigkX182KSB7XG4gICAgICB2YXIgJF9fNyA9ICRfXzYsXG4gICAgICAgICAgcmV0cmlldmUgPSAkX183LnJldHJpZXZlLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX183LmlzRXF1YWw7XG4gICAgICBpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhID09PSBiKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBjYWNoZTtcbiAgICAgIGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlID0gbmV3VmFsdWU7XG4gICAgICAgICAgb25DaGFuZ2UuZm9yRWFjaCgoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG4gICAgICB2YXIgcmVzdWx0Rm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9uQ2hhbmdlID0gW107XG4gICAgICByZXN1bHRGbi5vbkNoYW5nZSA9IChmdW5jdGlvbihjYikge1xuICAgICAgICBvbkNoYW5nZS5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgICAgfSk7XG4gICAgICByZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG4gICAgICB9KTtcbiAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgfSxcbiAgICBwcm9taXNpZnk6IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHJldHVybiBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24oYXJyYXksIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBtZW1vaXplOiBmdW5jdGlvbihmbikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleS5ldmVyeSgoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGFyZ3NbaV07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGtleXMucHVzaChhcmdzKTtcbiAgICAgICAgY2FjaGUucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIHZhciBFUFMgPSAwLjAwMDAwMTtcbiAgdmFyIHNvcnRPZkVxdWFsID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcbiAgfSk7XG4gIFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH0pO1xuICBVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcbiAgfSk7XG4gIFUuUG9zaXRpb24uZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG4gIH0pO1xuICBVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKGhlaWdodCwgd2lkdGgpIHtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH0pO1xuICBVLlNpemUuZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcbiAgfSk7XG4gIHJldHVybiBVO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQtYXV0by1jb250cm9scy5qcyJ9