(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js", "bluebird", "kefir", "tweenjs", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js"), require("bluebird"), require("kefir"), require("tweenjs"), require("delta-js")) : factory(root["jQuery"], root["THREE"], root["P"], root["Kefir"], root["TWEEN"], root["DeltaModel"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_16__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, ThreeDModelP) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-button-to-swap-three-d-model',
	    requires: ['tile-buttons', 'three-d-geometric-models']
	  });
	  plugin.append('Tile.prototype.construct', function() {
	    var $__0 = this;
	    ThreeDModelP.then((function() {
	      var models = [null].concat($__0.children.filter((function(child) {
	        return child.type === 'ThreeDModel';
	      })));
	      if (models.length > 1) {
	        $__0.addButton({
	          name: 'swap3dModel',
	          icon: __webpack_require__(3)
	        }).onValue((function() {
	          var i;
	          for (i = 1; i < models.length; ++i) {
	            if (models[i].visible) {
	              models[i].visible = false;
	              break;
	            }
	          }
	          i = (i + 1) % models.length;
	          if (models[i]) {
	            models[i].traverseArtefactsByType('ThreeDModel', (function(model) {
	              model.visible = true;
	            }));
	            var indentation = "-- ";
	            var modelHierarchy = "Available parts of this 3D model:\n";
	            models[i].traverseArtefactsByType('ThreeDModel', (function(model) {
	              modelHierarchy += indentation + model.id + '\n';
	            }), {
	              beforeGoingIn: function() {
	                indentation += "-- ";
	              },
	              beforeGoingOut: function() {
	                indentation = indentation.slice(3);
	              }
	            });
	            console.log(modelHierarchy);
	          }
	        }));
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(6), __webpack_require__(5), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE, U, P, Kefir, ArtefactP) {
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6), __webpack_require__(9), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN) {
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(6), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13), __webpack_require__(14), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, dm, plugin, defer) {
	  'use strict';
	  return plugin.selected.then((function() {
	    if (U.isDefined(window._amy_Artefact)) {
	      return window._amy_Artefact;
	    }
	    window._amy_Artefact = dm.vp('Artefact', U.newSubclass(KefirSignalHandler, (function(superFn) {
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
	      return dm.vp(name, U.newSubclass(window._amy_Artefact, (function(superFn) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(6), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DM) {
	  'use strict';
	  if (window.__apinatomy_core_delta_model) {
	    return window.__apinatomy_core_delta_model;
	  }
	  DM.registerPromiseResolver(P.resolve);
	  window.__apinatomy_core_delta_model = new DM();
	  return window.__apinatomy_core_delta_model;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(5), __webpack_require__(6), __webpack_require__(11), __webpack_require__(15), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, SignalHandler, defer, dm) {
	  'use strict';
	  if (!window._amyPlugin) {
	    window._amyPlugin = function(pluginOrSelection) {
	      if ($.isPlainObject(pluginOrSelection)) {
	        return new dm.Delta(pluginOrSelection.name, pluginOrSelection);
	      } else {
	        U.assert(!_selectedDeferred.done, "ApiNATOMY plugins can only be selected once, after which they are fixed.");
	        _selectedDeferred.done = true;
	        dm.select.apply(dm, pluginOrSelection);
	        _selectedDeferred.resolve(this);
	        return window._amyPlugin.selected;
	      }
	    };
	    var _selectedDeferred = defer();
	    window._amyPlugin.selected = _selectedDeferred.promise;
	    window._amyPlugin.graph = (function() {
	      return dm.graph();
	    });
	    window._amyPlugin.dm = dm;
	  }
	  return window._amyPlugin;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_16__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YWE2NjRkYTdkMzExYzhkZTg0NyIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy9UaHJlZURNb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9pY29ucy8zZC13aGl0ZS5wbmciLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9taXNjLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy8uL3NyYy9BcnRlZmFjdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiS2VmaXJcIixcImNvbW1vbmpzMlwiOlwia2VmaXJcIixcImNvbW1vbmpzXCI6XCJrZWZpclwiLFwiYW1kXCI6XCJrZWZpclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC91bmlxdWUtaWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9wbHVnaW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhTW9kZWxcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLHNCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMLElBQUc7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQSxrRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxtRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDMU5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxRQUFPLGNBQWMsY0FBYztBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNILEVBQUM7Ozs7Ozs7QUMzS0QsZ0Q7Ozs7OztBQ0FBLGlEOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxrRUFBaUU7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLCtEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxvQkFBbUIseUJBQXlCO0FBQzVDO0FBQ0EscUJBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxFQUFDOzs7Ozs7O2lFQzFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O2lFQ05EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O2lFQ1JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDdEJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7Ozs7OztBQ2ZELGlEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCIsIFwiYmx1ZWJpcmRcIiwgXCJrZWZpclwiLCBcInR3ZWVuanNcIiwgXCJkZWx0YS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdLCByb290W1wiUFwiXSwgcm9vdFtcIktlZmlyXCJdLCByb290W1wiVFdFRU5cIl0sIHJvb3RbXCJEZWx0YU1vZGVsXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDdhYTY2NGRhN2QzMTFjOGRlODQ3XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vVGhyZWVETW9kZWwuanMnXSwgZnVuY3Rpb24oJCwgVGhyZWVETW9kZWxQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG4gICAgbmFtZTogJ3RpbGUtYnV0dG9uLXRvLXN3YXAtdGhyZWUtZC1tb2RlbCcsXG4gICAgcmVxdWlyZXM6IFsndGlsZS1idXR0b25zJywgJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscyddXG4gIH0pO1xuICBwbHVnaW4uYXBwZW5kKCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgVGhyZWVETW9kZWxQLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIG1vZGVscyA9IFtudWxsXS5jb25jYXQoJF9fMC5jaGlsZHJlbi5maWx0ZXIoKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgIHJldHVybiBjaGlsZC50eXBlID09PSAnVGhyZWVETW9kZWwnO1xuICAgICAgfSkpKTtcbiAgICAgIGlmIChtb2RlbHMubGVuZ3RoID4gMSkge1xuICAgICAgICAkX18wLmFkZEJ1dHRvbih7XG4gICAgICAgICAgbmFtZTogJ3N3YXAzZE1vZGVsJyxcbiAgICAgICAgICBpY29uOiByZXF1aXJlKCd1cmwhLi91dGlsL2ljb25zLzNkLXdoaXRlLnBuZycpXG4gICAgICAgIH0pLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAoaSA9IDE7IGkgPCBtb2RlbHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChtb2RlbHNbaV0udmlzaWJsZSkge1xuICAgICAgICAgICAgICBtb2RlbHNbaV0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaSA9IChpICsgMSkgJSBtb2RlbHMubGVuZ3RoO1xuICAgICAgICAgIGlmIChtb2RlbHNbaV0pIHtcbiAgICAgICAgICAgIG1vZGVsc1tpXS50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGhyZWVETW9kZWwnLCAoZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgICAgICAgICAgbW9kZWwudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSBcIi0tIFwiO1xuICAgICAgICAgICAgdmFyIG1vZGVsSGllcmFyY2h5ID0gXCJBdmFpbGFibGUgcGFydHMgb2YgdGhpcyAzRCBtb2RlbDpcXG5cIjtcbiAgICAgICAgICAgIG1vZGVsc1tpXS50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGhyZWVETW9kZWwnLCAoZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgICAgICAgICAgbW9kZWxIaWVyYXJjaHkgKz0gaW5kZW50YXRpb24gKyBtb2RlbC5pZCArICdcXG4nO1xuICAgICAgICAgICAgfSksIHtcbiAgICAgICAgICAgICAgYmVmb3JlR29pbmdJbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50YXRpb24gKz0gXCItLSBcIjtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgYmVmb3JlR29pbmdPdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGluZGVudGF0aW9uID0gaW5kZW50YXRpb24uc2xpY2UoMyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWxIaWVyYXJjaHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnLi91dGlsL21pc2MuanMnLCAnYmx1ZWJpcmQnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJywgJy4vQXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24oJCwgVEhSRUUsIFUsIFAsIEtlZmlyLCBBcnRlZmFjdFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBmdW5jdGlvbiBpc0dlb21ldHJ5KHYpIHtcbiAgICByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLkdlb21ldHJ5IHx8IHYgaW5zdGFuY2VvZiBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgfVxuICBmdW5jdGlvbiBpc09iamVjdDNEKHYpIHtcbiAgICByZXR1cm4gdiBpbnN0YW5jZW9mIFRIUkVFLk9iamVjdDNEO1xuICB9XG4gIGZ1bmN0aW9uIGVuZHNXaXRoKHN0ciwgc3VmZml4KSB7XG4gICAgcmV0dXJuIHN0ci5pbmRleE9mKHN1ZmZpeCwgc3RyLmxlbmd0aCAtIHN1ZmZpeC5sZW5ndGgpICE9PSAtMTtcbiAgfVxuICByZXR1cm4gQXJ0ZWZhY3RQLnRoZW4oKGZ1bmN0aW9uKEFydGVmYWN0KSB7XG4gICAgaWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X1RocmVlRE1vZGVsKSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5fYW15X1RocmVlRE1vZGVsO1xuICAgIH1cbiAgICB2YXIgVGhyZWVETW9kZWwgPSB3aW5kb3cuX2FteV9UaHJlZURNb2RlbCA9IEFydGVmYWN0Lm5ld1N1YmNsYXNzKCdUaHJlZURNb2RlbCcsIGZ1bmN0aW9uIFRocmVlRE1vZGVsKCRfXzEpIHtcbiAgICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgICByb290VGhyZWVETW9kZWwgPSAkX18yLnJvb3RUaHJlZURNb2RlbCxcbiAgICAgICAgICB2aXNpYmxlID0gJF9fMi52aXNpYmxlLFxuICAgICAgICAgIGZpbGUgPSAkX18yLmZpbGUsXG4gICAgICAgICAgcGFydHMgPSAkX18yLnBhcnRzO1xuICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQocm9vdFRocmVlRE1vZGVsKSkge1xuICAgICAgICByb290VGhyZWVETW9kZWwgPSB0aGlzO1xuICAgICAgfVxuICAgICAgdGhpcy5yb290VGhyZWVETW9kZWwgPSByb290VGhyZWVETW9kZWw7XG4gICAgICB0aGlzLm5ld1Byb3BlcnR5KCd2aXNpYmxlJywge2luaXRpYWw6IHZpc2libGV9KTtcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ2hpZGRlbicpLnBsdWcodGhpcy5wKCd2aXNpYmxlJykubm90KCkpO1xuICAgICAgdGhpcy5wKCd2aXNpYmxlJykucGx1Zyh0aGlzLnAoJ2hpZGRlbicpLm5vdCgpKTtcbiAgICAgIE9iamVjdC5rZXlzKHBhcnRzIHx8IHt9KS5tYXAoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHZhciBuZXdDaGlsZE9wdGlvbnMgPSBVLmV4dGVuZCh7fSwgcGFydHNbaWRdLCB7XG4gICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgIHBhcmVudDogJF9fMCxcbiAgICAgICAgICB2aXNpYmxlOiB2aXNpYmxlLFxuICAgICAgICAgIHJvb3RUaHJlZURNb2RlbDogJF9fMC5yb290VGhyZWVETW9kZWxcbiAgICAgICAgfSk7XG4gICAgICAgIFsnY29sb3InLCAnYW5pbWF0aW9uJywgJ2Nsb2NrJ10uZm9yRWFjaCgoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgIGlmIChVLmlzVW5kZWZpbmVkKG5ld0NoaWxkT3B0aW9uc1twcm9wXSkpIHtcbiAgICAgICAgICAgIG5ld0NoaWxkT3B0aW9uc1twcm9wXSA9ICRfXzAub3B0aW9uc1twcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgbmV3IHdpbmRvdy5fYW15X1RocmVlRE1vZGVsKG5ld0NoaWxkT3B0aW9ucyk7XG4gICAgICB9KSk7XG4gICAgICB0aGlzLm9iamVjdDNELnRoZW4oKGZ1bmN0aW9uKG9iamVjdDNEKSB7XG4gICAgICAgICRfXzAucCgndmlzaWJsZScpLm1lcmdlKCRfXzAub24oJ2Rlc3Ryb3knKS5tYXBUbyhmYWxzZSkpLm9uVmFsdWUoKGZ1bmN0aW9uKHZpc2libGUpIHtcbiAgICAgICAgICBvYmplY3QzRC52aXNpYmxlID0gdmlzaWJsZTtcbiAgICAgICAgfSkpO1xuICAgICAgfSkpO1xuICAgIH0sIHtcbiAgICAgIGdldCBnZW9tZXRyeTNEKCkge1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fZ2VvbWV0cnkzRCkge1xuICAgICAgICAgIHRoaXMuX2dlb21ldHJ5M0QgPSBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBpZiAoVS5pc0RlZmluZWQoJF9fMC5vcHRpb25zLmZpbGUpKSB7XG4gICAgICAgICAgICAgICRfXzAucm9vdFRocmVlRE1vZGVsLnAoJ3Zpc2libGUnKS52YWx1ZSh0cnVlKS50YWtlKDEpLm9uVmFsdWUoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICRfXzAuX2xvYWRHZW9tZXRyeUZyb21GaWxlKCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZ2VvbWV0cnkzRDtcbiAgICAgIH0sXG4gICAgICBnZXQgb3JpZ2luYWxCb3VuZGluZ0JveCgpIHtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuX29yaWdpbmFsQm91bmRpbmdCb3gpIHtcbiAgICAgICAgICB0aGlzLl9vcmlnaW5hbEJvdW5kaW5nQm94ID0gbmV3IFAoKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKFUuaXNEZWZpbmVkKCRfXzAub3B0aW9ucy5maWxlKSkge1xuICAgICAgICAgICAgICAkX18wLmdlb21ldHJ5M0QudGhlbigoZnVuY3Rpb24oZ2VvbWV0cnkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYm94RnJvbUZpbGUgPSBuZXcgVEhSRUUuQm94MygpO1xuICAgICAgICAgICAgICAgIGlmIChnZW9tZXRyeSBpbnN0YW5jZW9mIFRIUkVFLkJ1ZmZlckdlb21ldHJ5KSB7XG4gICAgICAgICAgICAgICAgICBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgICAgICAgIGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQoZ2VvbWV0cnkuYm91bmRpbmdCb3gubWluKTtcbiAgICAgICAgICAgICAgICAgIGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQoZ2VvbWV0cnkuYm91bmRpbmdCb3gubWF4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKGdlb21ldHJ5Lm1vcnBoVGFyZ2V0cyB8fCBbXSkuY29uY2F0KFtnZW9tZXRyeV0pLmZvckVhY2goKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB2ZXJ0aWNlcyA9ICRfXzEudmVydGljZXM7XG4gICAgICAgICAgICAgICAgICAodmVydGljZXMgfHwgW10pLmZvckVhY2goKGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJveEZyb21GaWxlLmV4cGFuZEJ5UG9pbnQocG9pbnQpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm94RnJvbUZpbGU7XG4gICAgICAgICAgICAgIH0pKS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKFUuaXNEZWZpbmVkKCRfXzAub3B0aW9ucy5wYXJ0cykpIHtcbiAgICAgICAgICAgICAgUC5hbGwoJF9fMC5jaGlsZHJlbikubWFwKChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnQub3JpZ2luYWxCb3VuZGluZ0JveDtcbiAgICAgICAgICAgICAgfSkpLnJlZHVjZSgoZnVuY3Rpb24ocmVzdWx0LCBiYm94KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5leHBhbmRCeVBvaW50KGJib3gubWluKS5leHBhbmRCeVBvaW50KGJib3gubWF4KTtcbiAgICAgICAgICAgICAgfSksIG5ldyBUSFJFRS5Cb3gzKCkpLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsQm91bmRpbmdCb3g7XG4gICAgICB9LFxuICAgICAgZ2V0IG9iamVjdDNEKCkge1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5fb2JqZWN0M0QpIHtcbiAgICAgICAgICB0aGlzLl9vYmplY3QzRCA9IHRoaXMuZ2VvbWV0cnkzRC50aGVuKChmdW5jdGlvbihnZW9tZXRyeTNEKSB7XG4gICAgICAgICAgICBpZiAoZ2VvbWV0cnkzRCkge1xuICAgICAgICAgICAgICByZXR1cm4gJF9fMC5yb290VGhyZWVETW9kZWwub3JpZ2luYWxCb3VuZGluZ0JveC50aGVuKChmdW5jdGlvbihvcmlnaW5hbEJvdW5kaW5nQm94KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvcnJlY3Rpb24gPSBvcmlnaW5hbEJvdW5kaW5nQm94LmNlbnRlcigpLm5lZ2F0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBjb3JyZWN0aW9uTWF0cml4ID0gbmV3IFRIUkVFLk1hdHJpeDQoKS5zZXRQb3NpdGlvbihjb3JyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAoZ2VvbWV0cnkzRC5tb3JwaFRhcmdldHMgfHwgW10pLmZvckVhY2goKGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB2ZXJ0aWNlcyA9ICRfXzEudmVydGljZXM7XG4gICAgICAgICAgICAgICAgICB2ZXJ0aWNlcy5mb3JFYWNoKChmdW5jdGlvbihwb2ludCkge1xuICAgICAgICAgICAgICAgICAgICBwb2ludC5hcHBseU1hdHJpeDQoY29ycmVjdGlvbk1hdHJpeCk7XG4gICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGdlb21ldHJ5M0QuYXBwbHlNYXRyaXgoY29ycmVjdGlvbk1hdHJpeCk7XG4gICAgICAgICAgICAgICAgdmFyICRfXzEgPSAkX18wLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbiA9ICRfXzEuYW5pbWF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBjb2xvciA9ICRfXzEuY29sb3I7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoe2NvbG9yOiBjb2xvciB8fCAnd2hpdGUnfSk7XG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwuc2lkZSA9IFRIUkVFLkRvdWJsZVNpZGU7XG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdDtcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVEhSRUUuTW9ycGhBbmltTWVzaChnZW9tZXRyeTNELCBtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgICBvYmplY3QuZHVyYXRpb24gPSBhbmltYXRpb24uZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICBtYXRlcmlhbC5tb3JwaFRhcmdldHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkzRC5jb21wdXRlTW9ycGhOb3JtYWxzKCk7XG4gICAgICAgICAgICAgICAgICB2YXIgY2xvY2sgPSAkX18wLm9wdGlvbnMuY2xvY2s7XG4gICAgICAgICAgICAgICAgICB2YXIgbGFzdFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgICAgY2xvY2sudGFrZVVudGlsQnkoJF9fMC5ldmVudCgnZGVzdHJveScpKS5vblZhbHVlKChmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIG9iamVjdC51cGRhdGVBbmltYXRpb24oMTAwMCAqICh0aW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRpbWUgPSB0aW1lO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBvYmplY3QgPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeTNELCBtYXRlcmlhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgICAgICAgICAgJF9fMC5jaGlsZHJlbi5tYXAoKGZ1bmN0aW9uKHBhcnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFydC5vYmplY3QzRDtcbiAgICAgICAgICAgICAgfSkpLmZvckVhY2goKGZ1bmN0aW9uKHBhcnRPYmplY3RQKSB7XG4gICAgICAgICAgICAgICAgcGFydE9iamVjdFAudGhlbigoZnVuY3Rpb24ocGFydE9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgb2JqZWN0LmFkZChwYXJ0T2JqZWN0KTtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgcmV0dXJuIFAuYWxsKCRfXzAuY2hpbGRyZW4ubWFwKChmdW5jdGlvbihwYXJ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnQub2JqZWN0M0Q7XG4gICAgICAgICAgICAgIH0pKSkuZWFjaCgoZnVuY3Rpb24oc3ViT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb2JqZWN0LmFkZChzdWJPYmplY3QpO1xuICAgICAgICAgICAgICB9KSkucmV0dXJuKG9iamVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vYmplY3QzRDtcbiAgICAgIH0sXG4gICAgICBhZGFwdFRvU3VyZmFjZUFyZWE6IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICBVLmFzc2VydCh0aGlzLnJvb3RUaHJlZURNb2RlbCA9PT0gdGhpcywgXCJUaGUgJ2FkYXB0VG9TdXJmYWNlQXJlYScgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbiBhIHJvb3QgVGhyZWVETW9kZWwuXCIpO1xuICAgICAgICBQLmFsbChbdGhpcy5vYmplY3QzRCwgdGhpcy5vcmlnaW5hbEJvdW5kaW5nQm94XSkuc3ByZWFkKChmdW5jdGlvbihvYmosIGJvdW5kaW5nQm94KSB7XG4gICAgICAgICAgdmFyICRfXzE7XG4gICAgICAgICAgdmFyIG9ialdpZHRoID0gYm91bmRpbmdCb3guc2l6ZSgpLng7XG4gICAgICAgICAgdmFyIG9iakhlaWdodCA9IGJvdW5kaW5nQm94LnNpemUoKS55O1xuICAgICAgICAgIGlmICgoc2l6ZS53aWR0aCA8IHNpemUuaGVpZ2h0KSAhPT0gKG9ialdpZHRoIDwgb2JqSGVpZ2h0KSkge1xuICAgICAgICAgICAgb2JqLnJvdGF0aW9uLnogPSAwLjUgKiBNYXRoLlBJO1xuICAgICAgICAgICAgKCRfXzEgPSBbb2JqSGVpZ2h0LCBvYmpXaWR0aF0sIG9ialdpZHRoID0gJF9fMVswXSwgb2JqSGVpZ2h0ID0gJF9fMVsxXSwgJF9fMSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iai5yb3RhdGlvbi56ID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHJhdGlvID0gMC44ICogTWF0aC5taW4oc2l6ZS53aWR0aCAvIG9ialdpZHRoLCBzaXplLmhlaWdodCAvIG9iakhlaWdodCk7XG4gICAgICAgICAgb2JqLnNjYWxlLnNldChyYXRpbywgcmF0aW8sIHJhdGlvKTtcbiAgICAgICAgICB2YXIgZWxldmF0aW9uID0gVS5kZWZPcigkX18wLm9wdGlvbnMuZWxldmF0aW9uLCBNYXRoLm1pbihzaXplLndpZHRoLCBzaXplLmhlaWdodCkgLyA0KTtcbiAgICAgICAgICBvYmoucG9zaXRpb24ueiA9IDAuNSAqIHJhdGlvICogYm91bmRpbmdCb3guc2l6ZSgpLnogKyBlbGV2YXRpb247XG4gICAgICAgIH0pKTtcbiAgICAgIH0sXG4gICAgICBfbG9hZEdlb21ldHJ5RnJvbUZpbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsZSA9IHRoaXMub3B0aW9ucy5maWxlO1xuICAgICAgICB2YXIgZXh0ID0gJyc7XG4gICAgICAgIE9iamVjdC5rZXlzKCQuY2lyY3VpdGJvYXJkLkNpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycykuZm9yRWFjaCgoZnVuY3Rpb24oZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgaWYgKGV4dGVuc2lvbi5sZW5ndGggPiBleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZW5kc1dpdGgoZmlsZSwgKFwiLlwiICsgZXh0ZW5zaW9uKSkpIHtcbiAgICAgICAgICAgICAgZXh0ID0gZXh0ZW5zaW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBVLmFzc2VydChleHQubGVuZ3RoID4gMCwgKFwiVGhlIGZpbGUgJ1wiICsgZmlsZSArIFwiJyBpcyBub3QgcmVjb2duaXplZCBhcyBhIDNEIG1vZGVsLlwiKSk7XG4gICAgICAgIHZhciBMb2FkZXIgPSAkLmNpcmN1aXRib2FyZC5DaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnNbZXh0XTtcbiAgICAgICAgVS5hc3NlcnQoVS5pc0RlZmluZWQoTG9hZGVyKSwgXCJTb21ldGhpbmcgd2VudCB3cm9uZyByZXRyaWV2aW5nIHRoZSAzRCBtb2RlbCBsb2FkZXIuXCIpO1xuICAgICAgICByZXR1cm4gVS5wcm9taXNpZnkobmV3IExvYWRlcigpLCAnbG9hZCcpKGZpbGUpLnRoZW4oKGZ1bmN0aW9uKGdlb21ldHJ5KSB7XG4gICAgICAgICAgVS5hc3NlcnQoaXNHZW9tZXRyeShnZW9tZXRyeSkgfHwgaXNPYmplY3QzRChnZW9tZXRyeSksIChcIlRoZSAzRCBtb2RlbCBsb2FkZXIgZm9yIHRoZSAnXCIgKyBleHQgKyBcIicgZXh0ZW5zaW9uIHJldHVybmVkIGFuIHVuc3VwcG9ydGVkIHZhbHVlLlwiKSk7XG4gICAgICAgICAgaWYgKCFpc0dlb21ldHJ5KGdlb21ldHJ5KSkge1xuICAgICAgICAgICAgZ2VvbWV0cnkgPSBnZW9tZXRyeS5nZW9tZXRyeSB8fCBnZW9tZXRyeS5jaGlsZHJlblswXS5nZW9tZXRyeTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGdlb21ldHJ5O1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSwge3Zpc2libGU6IGZhbHNlfSk7XG4gICAgd2luZG93Ll9hbXlfVGhyZWVETW9kZWwubG9hZGVycyA9IHt9O1xuICAgIHJldHVybiB3aW5kb3cuX2FteV9UaHJlZURNb2RlbDtcbiAgfSkpLnRhcCgoZnVuY3Rpb24oYykge1xuICAgICQuY2lyY3VpdGJvYXJkLlRocmVlRE1vZGVsID0gYztcbiAgfSkpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL1RocmVlRE1vZGVsLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUdKa2xFUVZSNDJ1MmRUMnNrVlJURnowMTNwek1pZ2poUm1Xd0NNaUk0THNRd0VnWkVWQ0tJb0xpWDFDSWZ3VVZVY09FbkdHYzJJbG0wdUhBbC9oa1ltRmxsMDRoTVppRkJaNkdDQ0xNeElDaU9JUjNDZGRHM3pKdXlVMTNkZWRYMXF0NDVNSFNsNW5WM3ZmcWR1dSsrVzFWZEFFVlJGRVZSRkVWUkZFVlJGRVZSRk5Wd1NjZ2JwNnJ6b1c5ajVRQkZEaHBwQUZWZEJMQU1ZSjZZeCtxV2lBd2FZd0JWWFFKd0RzQWJBSmJJTjFkM0Fmd0U0THFJN0UzNjVuYkFSLzR6Qmo4aDQxejE3SFZaVmYrY05CTE1CUWovU1lQL1BPRVhVbUlIeWxUNVVydEc4SHRrZlI5MEwyb0hEcitYNmV4VzVPQ2ZCWERSNXdlMkE0ZWZWUWZBdHcwRzNBVnc0RTd4TENFK0QrQ0N3WC9iL3Zzelo3bWVCaGdEZnd2QWh1OTViK0E2T0NFaGZnckFjdzd3bXdDT2FoMEJDc0NQZXV3ZnMzOXVteUhxYVlCeDhFV2tiKzJ5UjMrZjhMRmxRMkU5RFZDZ2N6dXhBWjlpLzZ6V01na3MwamwzakZmVlN6RkZnS0w3SnhzWmEyR0FTZUNyYWhmQVNqWUpWTldPaUd6SEROL1dlVHMvTWhmaWtUK2k2Skh3eUM5bjlqUFg1TTRSZnNVR0lQenc5ODhjNGNjTHZ6UURFSDU5OWsrN0JwM3JFWDVORE9DcmM5YW0zN1JLWUlpUnNSMXk1NXBVK0FsMVdHeUgzTG1tVkFKRHpvbmFJWGF1U1pYQTBCUGlkZzA2bDlRMUdiVDk4elNHNS9PRG5BMjFUOUc1SlJ4ZnZjdXBYZzNoVDIwQTY5dzU1Sit2WGozRldhc0hBTHdHWU0xWnR3Ymduczh6WVROUVdmQUhsUm5BYnRkYXh2Rk5HOWtRdmVGaHUxb0FIZ093NzZ6YngvRGF1UFVhR1NESjFET0NpNHdURzBCRUJtYUM3RTBiU2NuYitvVDlxNk9DSFJhbkxRVjNRTlVldnM5Q2tPOE12V1d2UnlQV0g5VUVmRktIamZSWkN2WjUwMFlhWVE1SHJEK3N3WDdkcUlsSnZSckE1MDBiNlEwUzJZc2Zmd0R3VitEN2RCVTFrdGVUUWI3R09KdnFyWXpJK0Q4TnZSSllzMmxxV0hjSDU0eWxDYWhvRFVEUkFCUU5RTkVBVk9DemdKTFVJNmJJRE9CY0U5akpyTjhtc29naUFJRkhiZ0JWZlpHR2lOQUF6aldCNjVuMU5FR0VzNEFFckFSeUdralJBQlFOUU5FQVZEelRRRk9QbUNJekFDdUJqQUFFVGdPd0VoaXRBVmdKNUN6QVZRSldBamtOcEdnQWlnYWdhQUFxbm1tZ3FVZE1rUm1BbFVCR0FBS25BVmdKak5ZQXJBUnlGdUFxQVN1Qm5BWlNOQUJGQTFBMEFCWFBOTkRVSTZiSURNQktJQ01BZ2RNQXJBUkdhNENpbFVCcmx6ZU16THdkZ0xNNC9xbGIySElIUU5mOURjRVN2cmV4U1dDU2t3eXU1THl2WDFHN3gzSC83eGt2QXJoZ3k0Y2xmbTlqRGVCcVBZMENOanlzNTBTUlRoWHRBTnpPL0gwZXdPc0FMcnJHc0g3MDdjRllHem5mVzZoZE5sbzAwUURKQ1ZFZ0tUaDFyS3JkcU9jYytQN2VxUlZjSVNnZC81djB6RUFtZ2NYaHYycUxmOXRya1orZzd4WDgrS3JhL1FMZ1p3Qy9JLzlaQjVOK3I1c2I5VEhsYzRUYWdjRi96K0IvYkg5dkkvTjBrblFXWU9QeDJCckNyTnZaTE1EVkdUUEFkUUQvT0ovWFQxK3pCYStNZHB6WE4rM3pzL0IvQlBCOWJRMmdxcThBMkFUd01JQVhBQ3dBdUd4SnpmWnBDMFd6YkpldFhRQzRDZUJ6NUR3eVpzem5MYXBxK216R2srRHZpTWhVRVdBdUVQanZBM2pFT3JuTGtma1lQazUrTU9lcDRZZVNCTFlzTktidzl3QjhKQ0xYQ0w5YytKVU9BWGJrdDBUa2hqMkdiZ0dBQUxnaUl0OFFmaTc4T3o3Z1YyWUFWVjJ6TVg5ZlZlZEY1SnFxRGdETTg4Z3ZCUCtXRC9pVkdNQ0JmOVk2dWFDcUF4RzV3VEYvdHZCbm5nT282c3NaK0duQ04wLzRzNGRmUlJMWXh2QVp3RzdDZDRWaHZ4cjRNeHNDVlBVbEFKMU13Z2VEL3pYaFZ3Ti9KZ2F3c1A4dWdJTk13dGRsdGw4dC9OSU40TUIvbEFsZmVQQkx6UUdzSkxycHdOKzFlZjRDNFljQnYrd2tzSXZoR2FvVS9oOEFybkxNRHdkK0tVT0FIZm5kVE1MWHNvVHZTOElQQjc1dkF4eGF0cjlweTI3Q2QwWkV2b284OGo4VUd2d3lJc0E3R0Y0VXlZVHYvd29Pdm04RGZJamhGYkRwbU44QzhDQzUvNmZnNEplUkJLYnc1d0Y4SWlKZmtIdTQ4SDFIZ012TzhnZVc5Rnh5MW5VaU5rQ1E4SDBiNEMwQXY5bnlCZy82KytUQy95NFUrRDROa0pCeFlmaTdvY0F2cFE1QWpWUlFZZCtIQWU0QnVBditlRU5SOVRHOGJQdE9TUENCWVcxK1lsbEZheG04a0tPb0JnQitGWkc5MERaTXBuMmpsWG1GYkhOMnJzaUIzZXFtb1IzNUZFVlJGRVZSRkVWUkZFVlJGRVZSRkVYRm9YOEJpMFNvbFRveENWQUFBQUFBU1VWT1JLNUNZSUk9XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvM2Qtd2hpdGUucG5nXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiUFwiLFwiY29tbW9uanMyXCI6XCJibHVlYmlyZFwiLFwiY29tbW9uanNcIjpcImJsdWViaXJkXCIsXCJhbWRcIjpcImJsdWViaXJkXCJ9XG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgVSA9IHtcbiAgICBuZXdDbGFzczogZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIG5ld1N1YmNsYXNzOiBmdW5jdGlvbihzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvYmoxKSB7XG4gICAgICBmb3IgKHZhciByZXN0ID0gW10sXG4gICAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICAgIHJlc3RbJF9fMSAtIDFdID0gYXJndW1lbnRzWyRfXzFdO1xuICAgICAgcmVzdC5mb3JFYWNoKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIG9iajE7XG4gICAgfSxcbiAgICBmaWVsZDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18yID0gMTsgJF9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzIrKylcbiAgICAgICAgYXJnc1skX18yIC0gMV0gPSBhcmd1bWVudHNbJF9fMl07XG4gICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIGdldERlZjogZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSk7XG4gICAgfSxcbiAgICBwdWxsOiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgdmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWtlRW1wdHk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgd2hpbGUgKGFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRBOiBmdW5jdGlvbihmbiwgY3R4LCBhcmdzKSB7XG4gICAgICByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKG9iaiwgbSkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzMgPSAyOyAkX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMysrKVxuICAgICAgICBhcmdzWyRfXzMgLSAyXSA9IGFyZ3VtZW50c1skX18zXTtcbiAgICAgIHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKTtcbiAgICB9LFxuICAgIGFwcGx5Q29uc3RydWN0b3I6IGZ1bmN0aW9uKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcbiAgICAgIHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG4gICAgfSxcbiAgICBhc3NlcnQ6IGZ1bmN0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuICAgIG9ialZhbHVlczogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBtYWtlUG9zaXRpb25lZDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZk9yOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlcyA9IFtdLFxuICAgICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgICB2YWx1ZXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZW91dDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICB2YXIgbGF0ZXJGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgJF9fMCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2VQZXJTdGFjazogZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgICAgdmFyIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIGlmIChub3RSdW5ZZXQpIHtcbiAgICAgICAgICBub3RSdW5ZZXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICAgICAgfSksIDApO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbigkX182KSB7XG4gICAgICB2YXIgJF9fNyA9ICRfXzYsXG4gICAgICAgICAgcmV0cmlldmUgPSAkX183LnJldHJpZXZlLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX183LmlzRXF1YWw7XG4gICAgICBpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhID09PSBiKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBjYWNoZTtcbiAgICAgIGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlID0gbmV3VmFsdWU7XG4gICAgICAgICAgb25DaGFuZ2UuZm9yRWFjaCgoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG4gICAgICB2YXIgcmVzdWx0Rm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9uQ2hhbmdlID0gW107XG4gICAgICByZXN1bHRGbi5vbkNoYW5nZSA9IChmdW5jdGlvbihjYikge1xuICAgICAgICBvbkNoYW5nZS5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgICAgfSk7XG4gICAgICByZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG4gICAgICB9KTtcbiAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgfSxcbiAgICBwcm9taXNpZnk6IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHJldHVybiBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24oYXJyYXksIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBtZW1vaXplOiBmdW5jdGlvbihmbikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleS5ldmVyeSgoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGFyZ3NbaV07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGtleXMucHVzaChhcmdzKTtcbiAgICAgICAgY2FjaGUucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIHZhciBFUFMgPSAwLjAwMDAwMTtcbiAgdmFyIHNvcnRPZkVxdWFsID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcbiAgfSk7XG4gIFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH0pO1xuICBVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcbiAgfSk7XG4gIFUuUG9zaXRpb24uZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG4gIH0pO1xuICBVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKGhlaWdodCwgd2lkdGgpIHtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH0pO1xuICBVLlNpemUuZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcbiAgfSk7XG4gIHJldHVybiBVO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJ2tlZmlyJywgJ3R3ZWVuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIFRXRUVOKSB7XG4gIEtlZmlySlF1ZXJ5LmluaXQoS2VmaXIsICQpO1xuICBLZWZpci5mcm9tT25OdWxsID0gVS5tZW1vaXplKGZ1bmN0aW9uIGZyb21Pbk51bGwob2JqLCBldmVudE5hbWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgb2JqLm9uKGV2ZW50TmFtZSwgZW1pdHRlci5lbWl0KTtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9iai5vbihldmVudE5hbWUsIG51bGwpO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9KTtcbiAgdmFyIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8ICgoZnVuY3Rpb24oZikge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGYsIDEwMDAgLyA2MCk7XG4gIH0pKTtcbiAgS2VmaXIuYW5pbWF0aW9uRnJhbWVzID0gZnVuY3Rpb24gYW5pbWF0aW9uRnJhbWVzKCkge1xuICAgIHJldHVybiBLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICB2YXIgc3Vic2NyaWJlZCA9IHRydWU7XG4gICAgICAoZnVuY3Rpb24gaXRlcmF0aW9uRm4oKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZUZuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoKTtcbiAgICAgICAgICBpZiAoc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgaXRlcmF0aW9uRm4oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBzdWJzY3JpYmVkID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLnR3ZWVuID0gZnVuY3Rpb24gdHdlZW4ob2JqU3RhcnQsIG9iakVuZCwgJF9fMSkge1xuICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgZHVyYXRpb24gPSAkX18yLmR1cmF0aW9uLFxuICAgICAgICBkZWxheSA9ICRfXzIuZGVsYXksXG4gICAgICAgIGVhc2luZyA9ICRfXzIuZWFzaW5nO1xuICAgIHZhciB0dyA9IG5ldyBUV0VFTi5Ud2VlbihvYmpTdGFydCkudG8ob2JqRW5kLCBkdXJhdGlvbik7XG4gICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBhZGRTdHJlYW0gPSAoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNoYWluZWRTdHJlYW1zID0gMDtcbiAgICAgIHJldHVybiAoZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgIGNoYWluZWRTdHJlYW1zICs9IDE7XG4gICAgICAgIGJ1cy5wbHVnKHN0cmVhbSk7XG4gICAgICAgIHN0cmVhbS5vbkVuZCgoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2hhaW5lZFN0cmVhbXMgLT0gMTtcbiAgICAgICAgICBpZiAoY2hhaW5lZFN0cmVhbXMgPT09IDApIHtcbiAgICAgICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgIH0pKSgpO1xuICAgIGFkZFN0cmVhbShLZWZpci5mcm9tQmluZGVyKChmdW5jdGlvbihlbWl0dGVyKSB7XG4gICAgICBpZiAoZWFzaW5nKSB7XG4gICAgICAgIHR3LmVhc2luZyhlYXNpbmcpO1xuICAgICAgfVxuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIHR3LmRlbGF5KGRlbGF5KTtcbiAgICAgIH1cbiAgICAgIHR3Lm9uVXBkYXRlKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0dGVyLmVtaXQodGhpcyk7XG4gICAgICB9KTtcbiAgICAgIHR3Lm9uQ29tcGxldGUoZW1pdHRlci5lbmQpO1xuICAgIH0pKSk7XG4gICAgYnVzLnR3ZWVuID0gdHc7XG4gICAgYnVzLnN0YXJ0ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdHcuc3RhcnQoKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgYnVzLmNoYWluID0gKGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgICBhZGRTdHJlYW0ob3RoZXIpO1xuICAgICAgdHcuY2hhaW4ob3RoZXIudHdlZW4pO1xuICAgICAgcmV0dXJuIGJ1cztcbiAgICB9KTtcbiAgICByZXR1cm4gYnVzO1xuICB9O1xuICBLZWZpci5rZXlQcmVzcyA9IGZ1bmN0aW9uIGtleVByZXNzKGtleUNvZGUpIHtcbiAgICByZXR1cm4gJCh3aW5kb3cpLmFzS2VmaXJTdHJlYW0oJ2tleXByZXNzJykuZmlsdGVyKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZS5rZXlDb2RlID09PSBrZXlDb2RlO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIub25jZSA9IGZ1bmN0aW9uIG9uY2UodmFsdWUpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgZW1pdHRlci5lbWl0KHZhbHVlKTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5mcm9tQXJyYXkgPSBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgYXJyYXkuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgZW1pdHRlci5lbmQoKTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLmxpbWl0ZXIgPSBmdW5jdGlvbiBsaW1pdGVyKHBhY2luZykge1xuICAgIHZhciBoYW5kbGVyID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IFUuY2FsbDtcbiAgICB2YXIgd2FudGVkQnVzID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIG9wZW4gPSBLZWZpci5idXMoKTtcbiAgICB2YXIgY2xvc2UgPSBLZWZpci5idXMoKTtcbiAgICBwYWNpbmcuZmlsdGVyQnkod2FudGVkQnVzLnRvUHJvcGVydHkoZmFsc2UpKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIGhhbmRsZXIoKGZ1bmN0aW9uKCkge1xuICAgICAgICBvcGVuLmVtaXQoKTtcbiAgICAgICAgd2FudGVkQnVzLmVtaXQoZmFsc2UpO1xuICAgICAgICBjbG9zZS5lbWl0KCk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICAgIHJldHVybiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgIHZhciBidWZmZXIgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5idWZmZXI7XG4gICAgICB3YW50ZWRCdXMucGx1ZyhzdHJlYW0ubWFwVG8odHJ1ZSkpO1xuICAgICAgcmV0dXJuIEtlZmlyLmNvbnN0YW50KHRydWUpLnRha2UoMSkuY29uY2F0KGNsb3NlKS5mbGF0TWFwTGF0ZXN0KChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFjY3VtdWxhdG9yID0gKGZ1bmN0aW9uKGFyciwgdmFsKSB7XG4gICAgICAgICAgcmV0dXJuIChidWZmZXIgPyBhcnIuY29uY2F0KFt2YWxdKSA6IFt2YWxdKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkob3BlbikucmVkdWNlKGFjY3VtdWxhdG9yLCBbXSkuZmxhdE1hcChLZWZpci5mcm9tQXJyYXkpO1xuICAgICAgfSkpO1xuICAgIH07XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLmxpbWl0ZWRCeSA9IGZ1bmN0aW9uIGxpbWl0ZWRCeSh3cmFwcGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHdyYXBwZXIodGhpcywgb3B0aW9ucyk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuaG9sZFVudGlsID0gZnVuY3Rpb24gaG9sZFVudGlsKHBhY2luZykge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIGJ1ZmZlciA9IFtdO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9UaGlzID0gJF9fMC5vblZhbHVlKChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBidWZmZXIucHVzaCh2YWx1ZSk7XG4gICAgICB9KSk7XG4gICAgICB2YXIgdW5zdWJzY3JpYmVUb1BhY2luZyA9IHBhY2luZy5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIG9sZEJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgICBidWZmZXIgPSBbXTtcbiAgICAgICAgICBvbGRCdWZmZXIuZm9yRWFjaChlbWl0dGVyLmVtaXQpO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YnNjcmliZVRvVGhpcygpO1xuICAgICAgICB1bnN1YnNjcmliZVRvUGFjaW5nKCk7XG4gICAgICAgIGJ1ZmZlciA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24odmFsdWUsIGNvbXBhcmF0b3IpIHtcbiAgICBjb21wYXJhdG9yID0gY29tcGFyYXRvciB8fCAoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBlID09PSB2YWx1ZTtcbiAgICB9KSk7XG4gICAgcmV0dXJuIHRoaXMuc2tpcER1cGxpY2F0ZXMoKS5maWx0ZXIoY29tcGFyYXRvcik7XG4gIH07XG4gIEtlZmlyLk9ic2VydmFibGUucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB2YXIgZG9Ob3RoaW5nID0gKGZ1bmN0aW9uKCkge30pO1xuICAgIHRoaXMub25WYWx1ZShkb05vdGhpbmcpO1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICAkX18wLm9mZlZhbHVlKGRvTm90aGluZyk7XG4gICAgfSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUuc2tpcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24obGFiZWwpIHtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICByZXR1cm4gIVUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXTtcbiAgICB9KSkubWFwKChmdW5jdGlvbihldmVudCkge1xuICAgICAgVS5hcnJheShldmVudC5vcmlnaW5hbEV2ZW50LCAnX29ubHlPbmNlRm9yJylbbGFiZWxdID0gdHJ1ZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLlN0cmVhbS5wcm90b3R5cGUud2hpY2ggPSBmdW5jdGlvbihidXR0b25JZCkge1xuICAgIHZhciBwcmVkID0gKHR5cGVvZiBidXR0b25JZCA9PT0gJ2Z1bmN0aW9uJykgPyAoYnV0dG9uSWQpIDogKChmdW5jdGlvbihiKSB7XG4gICAgICByZXR1cm4gYiA9PT0gYnV0dG9uSWQ7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIHByZWQoZS53aGljaCk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlRHJhZyA9IGZ1bmN0aW9uIG1vdXNlRHJhZygpIHtcbiAgICB2YXIgdGhyZXNob2xkID0gKGFyZ3VtZW50c1swXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMF0gOiB7fSkudGhyZXNob2xkO1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNlZG93bicpLmZsYXRNYXAoKGZ1bmN0aW9uKG1vdXNlRG93bkV2ZW50KSB7XG4gICAgICB2YXIgc3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHN0cmVhbSA9IHN0cmVhbS5maWx0ZXIoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgICAgaWYgKGNyb3NzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZHggPSBtb3VzZURvd25FdmVudC5wYWdlWCAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VYO1xuICAgICAgICAgIHZhciBkeSA9IG1vdXNlRG93bkV2ZW50LnBhZ2VZIC0gbW91c2VNb3ZlRXZlbnQucGFnZVk7XG4gICAgICAgICAgaWYgKGR4ICogZHggKyBkeSAqIGR5ID4gdGhyZXNob2xkICogdGhyZXNob2xkKSB7XG4gICAgICAgICAgICByZXR1cm4gY3Jvc3NlZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmVhbS50YWtlVW50aWxCeSgkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykpLm1hcCgoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgcmV0dXJuICh7XG4gICAgICAgICAgbW91c2VEb3duRXZlbnQ6IG1vdXNlRG93bkV2ZW50LFxuICAgICAgICAgIG1vdXNlTW92ZUV2ZW50OiBtb3VzZU1vdmVFdmVudFxuICAgICAgICB9KTtcbiAgICAgIH0pKTtcbiAgICB9KSk7XG4gIH07XG4gICQuZm4ubW91c2VDbGljayA9IGZ1bmN0aW9uIG1vdXNlQ2xpY2soKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHVudGlsU3RyZWFtID0gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2Vtb3ZlJyk7XG4gICAgICBpZiAodGhyZXNob2xkKSB7XG4gICAgICAgIHZhciBjcm9zc2VkID0gZmFsc2U7XG4gICAgICAgIHVudGlsU3RyZWFtID0gdW50aWxTdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAkKGRvY3VtZW50KS5hc0tlZmlyU3RyZWFtKCdtb3VzZXVwJykudGFrZSgxKS50YWtlVW50aWxCeSh1bnRpbFN0cmVhbSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlV2hlZWwgPSBmdW5jdGlvbiBtb3VzZVdoZWVsKCkge1xuICAgIHJldHVybiAkKHRoaXMpLmFzS2VmaXJTdHJlYW0oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnKTtcbiAgfTtcbiAgcmV0dXJuIEtlZmlyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItYW5kLWVnZ3MuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi91dGlsL21pc2MuanMnLCAnLi91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzJywgJy4vdXRpbC91bmlxdWUtaWQuanMnLCAnLi91dGlsL21haW4tZGVsdGEtbW9kZWwuanMnLCAnLi91dGlsL3BsdWdpbi5qcycsICcuL3V0aWwvZGVmZXIuanMnXSwgZnVuY3Rpb24oJCwgUCwgVSwgS2VmaXJTaWduYWxIYW5kbGVyLCB1bmlxdWVJRCwgZG0sIHBsdWdpbiwgZGVmZXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gcGx1Z2luLnNlbGVjdGVkLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgIGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9BcnRlZmFjdCkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuX2FteV9BcnRlZmFjdDtcbiAgICB9XG4gICAgd2luZG93Ll9hbXlfQXJ0ZWZhY3QgPSBkbS52cCgnQXJ0ZWZhY3QnLCBVLm5ld1N1YmNsYXNzKEtlZmlyU2lnbmFsSGFuZGxlciwgKGZ1bmN0aW9uKHN1cGVyRm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBBcnRlZmFjdChvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHZhciAkX18xID0gb3B0aW9ucyxcbiAgICAgICAgICAgIGlkID0gJF9fMS5pZCxcbiAgICAgICAgICAgIHR5cGUgPSAkX18xLnR5cGUsXG4gICAgICAgICAgICBwYXJlbnQgPSAkX18xLnBhcmVudCxcbiAgICAgICAgICAgIGJlZm9yZUNvbnN0cnVjdGlvbiA9ICRfXzEuYmVmb3JlQ29uc3RydWN0aW9uO1xuICAgICAgICB0aGlzLl9pZCA9IGlkIHx8IHVuaXF1ZUlEKHR5cGUpO1xuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgVS5hcnJheShwYXJlbnQsICdfY2hpbGRyZW4nKS5wdXNoKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubmV3RXZlbnQoJ2Rlc3Ryb3knKTtcbiAgICAgICAgdGhpcy5iZWZvcmVDb25zdHJ1Y3Rpb24oYmVmb3JlQ29uc3RydWN0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMucm9vdCA9PT0gdGhpcykge1xuICAgICAgICAgIHRoaXMuX2FydGVmYWN0c0J5SUQgPSB7fTtcbiAgICAgICAgICB0aGlzLl9yZWdpc3RlckFydGVmYWN0ID0gZnVuY3Rpb24oYXJ0ZWZhY3QpIHtcbiAgICAgICAgICAgIFUuZ2V0RGVmKHRoaXMuX2FydGVmYWN0c0J5SUQsIGFydGVmYWN0LmlkLCBkZWZlcikucmVzb2x2ZShhcnRlZmFjdCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9KSwge1xuICAgICAgYmVmb3JlQ29uc3RydWN0aW9uOiBmdW5jdGlvbihwb3NzaWJsZVByb21pc2UpIHtcbiAgICAgICAgaWYgKCFwb3NzaWJsZVByb21pc2UgfHwgISQuaXNGdW5jdGlvbihwb3NzaWJsZVByb21pc2UudGhlbikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgdGhpcy5jb25zdHJ1Y3RlZCA9IFAucmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50YXAoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBQLnJlc29sdmUocG9zc2libGVQcm9taXNlKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSxcbiAgICAgIGdldCBvcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3B0aW9ucztcbiAgICAgIH0sXG4gICAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICAgIH0sXG4gICAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgICB9LFxuICAgICAgZ2V0IHBhcmVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgIH0sXG4gICAgICBnZXQgY2hpbGRyZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaGlsZHJlbjtcbiAgICAgIH0sXG4gICAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9yb290KSB7XG4gICAgICAgICAgdGhpcy5fcm9vdCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQucm9vdCA6IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jvb3Q7XG4gICAgICB9LFxuICAgICAgYXJ0ZWZhY3RCeUlkOiBmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gVS5nZXREZWYodGhpcy5yb290Ll9hcnRlZmFjdHNCeUlELCBpZCwgZGVmZXIpLnByb21pc2U7XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHM6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnKSB7XG4gICAgICAgICAgZm4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGNoaWxkLnRyYXZlcnNlQXJ0ZWZhY3RzKGZuLCBvcHRpb25zKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4Jykge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhdmVyc2VBcnRlZmFjdHNCeVR5cGU6IGZ1bmN0aW9uKHR5cGUsIGZuKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgICB2YXIgb3JkZXIgPSBvcHRpb25zLm9yZGVyO1xuICAgICAgICBpZiAoIW9yZGVyKSB7XG4gICAgICAgICAgb3JkZXIgPSAncHJlZml4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwcmVmaXgnICYmIHRoaXMudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nSW4pIHtcbiAgICAgICAgICBvcHRpb25zLmJlZm9yZUdvaW5nSW4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jbG9zZXN0RGVzY2VuZGFudHNCeVR5cGUodHlwZSkuZm9yRWFjaCgoZnVuY3Rpb24oZGVzY2VuZGVudCkge1xuICAgICAgICAgIGRlc2NlbmRlbnQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUodHlwZSwgZm4sIG9wdGlvbnMpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChvcHRpb25zLmJlZm9yZUdvaW5nT3V0KSB7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVHb2luZ091dCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3JkZXIgPT09ICdwb3N0Zml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNsb3Nlc3RBbmNlc3RvckJ5VHlwZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgZG8ge1xuICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5wYXJlbnQ7XG4gICAgICAgIH0gd2hpbGUgKHJlc3VsdCAmJiByZXN1bHQudHlwZSAmJiByZXN1bHQudHlwZSAhPT0gdHlwZSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlOiBmdW5jdGlvbih0eXBlKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChmdW5jdGlvbihjaGlsZCkge1xuICAgICAgICAgIGlmIChjaGlsZC50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGQuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC5kZXN0cm95KCk7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gICAgd2luZG93Ll9hbXlfQXJ0ZWZhY3QubmV3U3ViY2xhc3MgPSBmdW5jdGlvbiBuZXdTdWJDbGFzcyhuYW1lLCBjb25zdHJ1Y3Rvcikge1xuICAgICAgdmFyIHByb3RvdHlwZSA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIHZhciBvcHRpb25EZWZhdWx0cyA9IGFyZ3VtZW50c1szXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbM10gOiB7fTtcbiAgICAgIHJldHVybiBkbS52cChuYW1lLCBVLm5ld1N1YmNsYXNzKHdpbmRvdy5fYW15X0FydGVmYWN0LCAoZnVuY3Rpb24oc3VwZXJGbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICAgIHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG4gICAgICAgICAgc3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcbiAgICAgICAgICBjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbigkX18wLmNvbnN0cnVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUC5yZXNvbHZlKCRfXzAuY29uc3RydWN0KG9wdGlvbnMpKS5yZXR1cm4oJF9fMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRfXzA7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICh0aGlzLmNvbnN0cnVjdGVkIHx8IFAucmVzb2x2ZSgpKS50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRfXzAucm9vdC5fcmVnaXN0ZXJBcnRlZmFjdCgkX18wKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICB9KSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge2dldCBjaXJjdWl0Ym9hcmQoKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NpcmN1aXRib2FyZCA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcbiAgICAgICAgfX0pKSk7XG4gICAgfTtcbiAgICByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG4gIH0pKS50YXAoKGZ1bmN0aW9uKGMpIHtcbiAgICAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGM7XG4gIH0pKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9XG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzEwX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAnLi9rZWZpci1hbmQtZWdncy5qcyddLCBmdW5jdGlvbigkLCBVLCBLZWZpcikge1xuICB2YXIgS2VmaXJTaWduYWxIYW5kbGVyID0gVS5uZXdDbGFzcyhmdW5jdGlvbiBLZWZpclNpZ25hbEhhbmRsZXIoKSB7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgdGhpcy5fcHJvcGVydGllcyA9IHt9O1xuICAgIHRoaXMuX3Byb3BlcnR5QnVzc2VzID0ge307XG4gIH0sIHtcbiAgICBuZXdFdmVudDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgdmFyIHNvdXJjZSA9IChhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge30pLnNvdXJjZTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIGFscmVhZHkgYW4gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgVS5hc3NlcnQoIXRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sIChcIlRoZXJlIGlzIGFscmVhZHkgYSBwcm9wZXJ0eSAnXCIgKyBuYW1lICsgXCInIG9uIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICB2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGJ1cy5wbHVnKHNvdXJjZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzW25hbWVdID0gYnVzO1xuICAgIH0sXG4gICAgZXZlbnQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXTtcbiAgICB9LFxuICAgIHByb3BlcnR5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICB9LFxuICAgIHA6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuICAgIH0sXG4gICAgbmV3UHJvcGVydHk6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciAkX18xID0gYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9LFxuICAgICAgICAgIHNldHRhYmxlID0gJF9fMS5zZXR0YWJsZSxcbiAgICAgICAgICBpbml0aWFsID0gJF9fMS5pbml0aWFsLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX18xLmlzRXF1YWw7XG4gICAgICBVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQoc2V0dGFibGUpKSB7XG4gICAgICAgIHNldHRhYmxlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0gPSBidXMudG9Qcm9wZXJ0eShpbml0aWFsKS5za2lwRHVwbGljYXRlcyhpc0VxdWFsKTtcbiAgICAgIHByb3BlcnR5LnBsdWcgPSAoZnVuY3Rpb24ob2JzZXJ2YWJsZSkge1xuICAgICAgICBidXMucGx1ZyhvYnNlcnZhYmxlKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS51bnBsdWcgPSAoZnVuY3Rpb24ob2JzZXJ2YWJsZSkge1xuICAgICAgICBidXMudW5wbHVnKG9ic2VydmFibGUpO1xuICAgICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgICB9KTtcbiAgICAgIHByb3BlcnR5LmdldCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5Ll9jdXJyZW50O1xuICAgICAgfSk7XG4gICAgICBpZiAoc2V0dGFibGUpIHtcbiAgICAgICAgcHJvcGVydHkuc2V0ID0gKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgYnVzLmVtaXQodmFsdWUpO1xuICAgICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwge1xuICAgICAgICBnZXQ6IHByb3BlcnR5LmdldCxcbiAgICAgICAgc2V0OiBzZXR0YWJsZSA/IHByb3BlcnR5LnNldCA6IHVuZGVmaW5lZFxuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS5ydW4oKTtcbiAgICAgIHRoaXMuZXZlbnQoJ2Rlc3Ryb3knKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgYnVzLmVuZCgpO1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgIH0sXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgIFUuYXNzZXJ0KHRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdGhpcy5fZXZlbnRzW25hbWVdLmVtaXQodmFsdWUpO1xuICAgIH0sXG4gICAgb246IGZ1bmN0aW9uKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgYXJnc09iaiA9IHRoaXMuX2dhdGhlck9uQXJndW1lbnRzKG5hbWUsIGV4cGVjdGVkVmFsdWUsIG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIHJldHVybiB0aGlzLl9vbihhcmdzT2JqKTtcbiAgICB9LFxuICAgIF9vbjogZnVuY3Rpb24oJF9fMSkge1xuICAgICAgdmFyICRfXzIgPSAkX18xLFxuICAgICAgICAgIG5hbWUgPSAkX18yLm5hbWUsXG4gICAgICAgICAgZXhwZWN0ZWRWYWx1ZSA9ICRfXzIuZXhwZWN0ZWRWYWx1ZSxcbiAgICAgICAgICBjYWxsYmFjayA9ICRfXzIuY2FsbGJhY2s7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXSwgKFwiVGhlcmUgaXMgbm8gZXZlbnQgb3IgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuX2V2ZW50c1tuYW1lXSB8fCB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdO1xuICAgICAgaWYgKFUuaXNEZWZpbmVkKGV4cGVjdGVkVmFsdWUpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5maWx0ZXIoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICByZXR1cm4gdiA9PT0gZXhwZWN0ZWRWYWx1ZTtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5vblZhbHVlKGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSxcbiAgICBfZ2F0aGVyT25Bcmd1bWVudHM6IGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzAgPSAwOyAkX18wIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMCsrKVxuICAgICAgICBhcmdzWyRfXzBdID0gYXJndW1lbnRzWyRfXzBdO1xuICAgICAgdmFyIHJlc3VsdCA9IHtuYW1lOiBhcmdzLnNoaWZ0KCl9O1xuICAgICAgaWYgKFUuaXNEZWZpbmVkKGFyZ3NbMF0pICYmICFVLmlzRnVuY3Rpb24oYXJnc1swXSkgJiYgIVUuaXNQbGFpbk9iamVjdChhcmdzWzBdKSkge1xuICAgICAgICByZXN1bHQuZXhwZWN0ZWRWYWx1ZSA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiBVLmlzRnVuY3Rpb24oYXJnc1swXSkpIHtcbiAgICAgICAgcmVzdWx0LmNhbGxiYWNrID0gYXJncy5zaGlmdCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gS2VmaXJTaWduYWxIYW5kbGVyO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwva2VmaXItc2lnbmFsLWhhbmRsZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgX25leHRJZCA9IDA7XG4gIHJldHVybiBmdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgICByZXR1cm4gKChwcmVmaXggfHwgXCJ1bmlxdWUtaWRcIikgKyBcIi1cIiArIF9uZXh0SWQrKyk7XG4gIH07XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC91bmlxdWUtaWQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnLCAnZGVsdGEtanMnXSwgZnVuY3Rpb24oUCwgRE0pIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwpIHtcbiAgICByZXR1cm4gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWw7XG4gIH1cbiAgRE0ucmVnaXN0ZXJQcm9taXNlUmVzb2x2ZXIoUC5yZXNvbHZlKTtcbiAgd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFfbW9kZWwgPSBuZXcgRE0oKTtcbiAgcmV0dXJuIHdpbmRvdy5fX2FwaW5hdG9teV9jb3JlX2RlbHRhX21vZGVsO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvbWFpbi1kZWx0YS1tb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnYmx1ZWJpcmQnLCAnLi9taXNjLmpzJywgJy4va2VmaXItc2lnbmFsLWhhbmRsZXIuanMnLCAnLi9kZWZlci5qcycsICcuL21haW4tZGVsdGEtbW9kZWwuanMnXSwgZnVuY3Rpb24oJCwgUCwgVSwgU2lnbmFsSGFuZGxlciwgZGVmZXIsIGRtKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKCF3aW5kb3cuX2FteVBsdWdpbikge1xuICAgIHdpbmRvdy5fYW15UGx1Z2luID0gZnVuY3Rpb24ocGx1Z2luT3JTZWxlY3Rpb24pIHtcbiAgICAgIGlmICgkLmlzUGxhaW5PYmplY3QocGx1Z2luT3JTZWxlY3Rpb24pKSB7XG4gICAgICAgIHJldHVybiBuZXcgZG0uRGVsdGEocGx1Z2luT3JTZWxlY3Rpb24ubmFtZSwgcGx1Z2luT3JTZWxlY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVS5hc3NlcnQoIV9zZWxlY3RlZERlZmVycmVkLmRvbmUsIFwiQXBpTkFUT01ZIHBsdWdpbnMgY2FuIG9ubHkgYmUgc2VsZWN0ZWQgb25jZSwgYWZ0ZXIgd2hpY2ggdGhleSBhcmUgZml4ZWQuXCIpO1xuICAgICAgICBfc2VsZWN0ZWREZWZlcnJlZC5kb25lID0gdHJ1ZTtcbiAgICAgICAgZG0uc2VsZWN0LmFwcGx5KGRtLCBwbHVnaW5PclNlbGVjdGlvbik7XG4gICAgICAgIF9zZWxlY3RlZERlZmVycmVkLnJlc29sdmUodGhpcyk7XG4gICAgICAgIHJldHVybiB3aW5kb3cuX2FteVBsdWdpbi5zZWxlY3RlZDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBfc2VsZWN0ZWREZWZlcnJlZCA9IGRlZmVyKCk7XG4gICAgd2luZG93Ll9hbXlQbHVnaW4uc2VsZWN0ZWQgPSBfc2VsZWN0ZWREZWZlcnJlZC5wcm9taXNlO1xuICAgIHdpbmRvdy5fYW15UGx1Z2luLmdyYXBoID0gKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGRtLmdyYXBoKCk7XG4gICAgfSk7XG4gICAgd2luZG93Ll9hbXlQbHVnaW4uZG0gPSBkbTtcbiAgfVxuICByZXR1cm4gd2luZG93Ll9hbXlQbHVnaW47XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9wbHVnaW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgZnVuY3Rpb24oUCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBmdW5jdGlvbiBkZWZlcigpIHtcbiAgICB2YXIgcmVzb2x2ZSxcbiAgICAgICAgcmVqZWN0O1xuICAgIHZhciBwcm9taXNlID0gbmV3IFAoZnVuY3Rpb24oKSB7XG4gICAgICByZXNvbHZlID0gYXJndW1lbnRzWzBdO1xuICAgICAgcmVqZWN0ID0gYXJndW1lbnRzWzFdO1xuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICByZXNvbHZlOiByZXNvbHZlLFxuICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICBwcm9taXNlOiBwcm9taXNlXG4gICAgfTtcbiAgfTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2RlZmVyLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiRGVsdGFNb2RlbFwiLFwiY29tbW9uanMyXCI6XCJkZWx0YS1qc1wiLFwiY29tbW9uanNcIjpcImRlbHRhLWpzXCIsXCJhbWRcIjpcImRlbHRhLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsLmpzIn0=