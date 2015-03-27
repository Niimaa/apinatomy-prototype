(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("bluebird"), require("delta-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "kefir", "tweenjs", "kefir-jquery", "bluebird", "delta-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("kefir"), require("tweenjs"), require("kefir-jquery"), require("bluebird"), require("delta-js")) : factory(root["jQuery"], root["Kefir"], root["TWEEN"], root["KefirJQuery"], root["P"], root["DeltaJs"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_18__, __WEBPACK_EXTERNAL_MODULE_24__) {
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
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		switch(typeof modules[i]) {
		case "number":
			// Module is a copy of another module
			modules[i] = modules[modules[i]];
			break;
		case "object":
			// Module can be created from a template
			modules[i] = (function(_m) {
				var args = _m.slice(1), fn = modules[_m[0]];
				return function (a,b,c) {
					fn.apply(null, [a,b,c].concat(args));
				};
			}(modules[i]));
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, D3GroupP, D3VertexP, D3EdgeP, Kefir) {
	  'use strict';
	  var plugin = $.circuitboard.plugin.do('ppi', {requires: ['d3']});
	  plugin.append('Tile.prototype.construct', function() {
	    var $__0 = this;
	    var D3Group = D3GroupP.value();
	    var D3Vertex = D3VertexP.value();
	    var D3Edge = D3EdgeP.value();
	    var graphGroup = new D3Group({
	      parent: this,
	      gravityFactor: 1,
	      chargeFactor: 0.1,
	      linkDistanceFactor: 0.3
	    });
	    Kefir.merge([Kefir.once(), this.on('size').changes(), this.on('position').changes()]).onValue((function() {
	      var AREA_MARGIN = 5;
	      graphGroup.setRegion({
	        top: $__0.position.top + AREA_MARGIN,
	        left: $__0.position.left + AREA_MARGIN,
	        height: $__0.size.height - 2 * AREA_MARGIN,
	        width: $__0.size.width - 2 * AREA_MARGIN
	      });
	    }));
	    var constructExampleProteins = (function() {
	      graphGroup.addEdge(new D3Edge({
	        parent: graphGroup,
	        source: graphGroup.addVertex(new D3Vertex({
	          parent: graphGroup,
	          cssClass: 'example'
	        })),
	        target: graphGroup.addVertex(new D3Vertex({
	          parent: graphGroup,
	          cssClass: 'example'
	        })),
	        cssClass: 'example'
	      }));
	    });
	    this.on('open').not().and(this.on('visible')).onValue((function(showProteins) {
	      if (showProteins) {
	        constructExampleProteins();
	      } else {
	        graphGroup.removeAllEdgesAndVertices();
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, ArtefactP) {
	  'use strict';
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_D3Group)) {
	      return window._amy_D3Group;
	    }
	    window._amy_D3Group = Artefact.newSubclass('D3Group', function D3Group() {
	      var $__0 = this;
	      U.extend(this, {
	        vertices: {},
	        edges: {}
	      });
	      this.newEvent('vertex-added');
	      this.newEvent('vertex-removed');
	      this.newEvent('edge-added');
	      this.newEvent('edge-removed');
	      this.on('destroy').take(1).onValue((function() {
	        $__0.vertices.forEach((function(v) {
	          v.destroy();
	        }));
	      }));
	    }, {
	      get gravityFactor() {
	        return this.options.gravityFactor;
	      },
	      get chargeFactor() {
	        return this.options.chargeFactor;
	      },
	      get linkDistanceFactor() {
	        return this.options.linkDistanceFactor;
	      },
	      setRegion: function(region) {
	        this.region = region;
	        this.circuitboard.updateGraph();
	      },
	      addVertex: function(vertex) {
	        vertex.group = this;
	        this.vertices[vertex.id] = vertex;
	        vertex.graphId = vertex.id;
	        this.circuitboard._p_d3_vertices[vertex.graphId] = vertex;
	        this.trigger('vertex-added', vertex);
	        this.circuitboard.updateGraph();
	        return vertex;
	      },
	      removeVertex: function(vertex) {
	        if (vertex) {
	          if (typeof vertex === 'string') {
	            vertex = this.vertices[vertex];
	          }
	          vertex.destroy();
	          delete this.circuitboard._p_d3_vertices[vertex.graphId];
	          delete this.vertices[vertex];
	          this.trigger('vertex-removed', vertex);
	          this.circuitboard.updateGraph();
	        }
	      },
	      addEdge: function(edge) {
	        edge.group = this;
	        this.edges[edge.id] = edge;
	        edge.graphId = this.id + ':' + edge.id;
	        this.circuitboard._p_d3_edges[edge.graphId] = edge;
	        this.trigger('edge-added', edge);
	        this.circuitboard.updateGraph();
	        return edge;
	      },
	      removeEdge: function(edge) {
	        if (edge) {
	          if (typeof vertex === 'string') {
	            edge = this.edges[edge];
	          }
	          edge.destroy();
	          delete this.circuitboard._p_d3_edges[edge.graphId];
	          delete this.edges[edge.id];
	          this.trigger('edge-removed', edge);
	          this.circuitboard.updateGraph();
	        }
	      },
	      removeAllEdgesAndVertices: function() {
	        var $__0 = this;
	        Object.keys(this.edges).forEach((function(edgeId) {
	          if ($__0.edges[edgeId]) {
	            $__0.removeEdge($__0.edges[edgeId]);
	          }
	        }));
	        Object.keys(this.vertices).forEach((function(vertexId) {
	          if ($__0.vertices[vertexId]) {
	            $__0.removeVertex($__0.vertices[vertexId]);
	          }
	        }));
	        this.circuitboard.updateGraph();
	      }
	    }, {
	      gravityFactor: 1,
	      chargeFactor: 1,
	      linkDistanceFactor: 1,
	      region: {
	        top: 10,
	        left: 10,
	        get width() {
	          return this.circuitboard.size.width - 20;
	        },
	        get height() {
	          return this.circuitboard.size.height - 20;
	        }
	      }
	    });
	    return window._amy_D3Group;
	  })).tap((function(c) {
	    $.circuitboard.D3Group = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, ArtefactP) {
	  'use strict';
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_D3Vertex)) {
	      return window._amy_D3Vertex;
	    }
	    window._amy_D3Vertex = Artefact.newSubclass('D3Vertex', function D3Vertex($__1) {
	      var visible = $__1.visible;
	      var $__0 = this;
	      this.newProperty('x', {initial: 10});
	      this.newProperty('y', {initial: 10});
	      this.newProperty('visible', {initial: visible});
	      this.newProperty('hidden').plug(this.p('visible').not());
	      this.p('visible').plug(this.p('hidden').not());
	      this.p('hidden').merge(this.on('destroy').mapTo(true)).onValue((function(h) {
	        $__0.element.toggleClass('hidden', h).toggleClass('visible', !h);
	      }));
	    }, {
	      get element() {
	        if (!this._element) {
	          this._element = $(("\n\t\t\t\t\t\t<svg x=\"" + this.x + "\" y=\"" + this.y + "\" class=\"vertex " + this.options.cssClass + "\">\n\t\t\t\t\t\t\t<circle class=\"core\" r=\"" + this.options.radius + "\"></circle>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t"));
	        }
	        return this._element;
	      },
	      get graphZIndex() {
	        return this.options.graphZIndex;
	      }
	    }, {
	      graphZIndex: 200,
	      cssClass: '',
	      radius: 5,
	      visible: true
	    });
	    return window._amy_D3Vertex;
	  })).tap((function(c) {
	    $.circuitboard.D3Vertex = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(5), __webpack_require__(12), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, ArtefactP) {
	  'use strict';
	  return ArtefactP.then((function(Artefact) {
	    if (U.isDefined(window._amy_D3Edge)) {
	      return window._amy_D3Edge;
	    }
	    window._amy_D3Edge = Artefact.newSubclass('D3Edge', function D3Edge($__1) {
	      var $__2 = $__1,
	          source = $__2.source,
	          target = $__2.target;
	      var $__0 = this;
	      this._source = source;
	      this._target = target;
	      Kefir.merge([source.on('destroy'), target.on('destroy')]).take(1).onValue((function() {
	        $__0.destroy();
	      }));
	    }, {
	      get source() {
	        return this._source;
	      },
	      get target() {
	        return this._target;
	      },
	      get element() {
	        if (!this._element) {
	          this._element = $(("<svg><line class=\"edge " + this.options.cssClass + "\"></line></svg>")).children();
	        }
	        return this._element;
	      },
	      get graphZIndex() {
	        return this.options.graphZIndex;
	      }
	    }, {
	      graphZIndex: 100,
	      cssClass: ''
	    });
	    return window._amy_D3Edge;
	  })).tap((function(c) {
	    $.circuitboard.D3Edge = c;
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir, TWEEN, KefirJQuery) {
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(10);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-ppi.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/p-ppi.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	exports.push([module.id, ".circuitboard>svg.d3 .example.vertex>.core{pointer-events:visiblePainted;fill:#e600e6;stroke:purple;}.circuitboard>svg.d3 .example.edge{pointer-events:visiblePainted;cursor:pointer;stroke:purple;stroke-width:2px;stroke-linecap:round;}", ""]);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(18), __webpack_require__(11), __webpack_require__(20), __webpack_require__(21), __webpack_require__(22), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, P, U, KefirSignalHandler, uniqueID, deltaJs, defer) {
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/D3Vertex.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/D3Vertex.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	exports.push([module.id, "", ""]);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/D3Edge.scss", function() {
			var newContent = require("!!/home/mhelvens/Projects/apinatomy-core/node_modules/css-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/autoprefixer-loader/index.js!/home/mhelvens/Projects/apinatomy-core/node_modules/sass-loader/index.js!/home/mhelvens/Projects/apinatomy-core/src/D3Edge.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
14,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_18__;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
	  var list = [];
	  list.toString = function toString() {
	    var result = [];
	    for (var i = 0; i < this.length; i++) {
	      var item = this[i];
	      if (item[2]) {
	        result.push("@media " + item[2] + "{" + item[1] + "}");
	      } else {
	        result.push(item[1]);
	      }
	    }
	    return result.join("");
	  };
	  return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(11), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, U, Kefir) {
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  'use strict';
	  var _nextId = 0;
	  return function uniqueId(prefix) {
	    return ((prefix || "unique-id") + "-" + _nextId++);
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18), __webpack_require__(24), __webpack_require__(23)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P, DeltaJs, defer) {
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(18)], __WEBPACK_AMD_DEFINE_RESULT__ = function(P) {
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ }
/******/ ])))
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4NmI5ZDg1ZTQwNjEyNzg4NDg2NiIsIndlYnBhY2s6Ly8vLi9zcmMvcC1wcGkuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy9EM0dyb3VwLmpzIiwid2VicGFjazovLy8uL3NyYy9EM1ZlcnRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRDNFZGdlLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpclwiLFwiY29tbW9uanMyXCI6XCJrZWZpclwiLFwiY29tbW9uanNcIjpcImtlZmlyXCIsXCJhbWRcIjpcImtlZmlyXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJUV0VFTlwiLFwiY29tbW9uanMyXCI6XCJ0d2VlbmpzXCIsXCJjb21tb25qc1wiOlwidHdlZW5qc1wiLFwiYW1kXCI6XCJ0d2VlbmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy9wLXBwaS5zY3NzPzllOTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3AtcHBpLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvbWlzYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvQXJ0ZWZhY3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0QzVmVydGV4LnNjc3M/MTQ0ZCIsIndlYnBhY2s6Ly8vLi9zcmMvRDNWZXJ0ZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvRDNFZGdlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJQXCIsXCJjb21tb25qczJcIjpcImJsdWViaXJkXCIsXCJjb21tb25qc1wiOlwiYmx1ZWJpcmRcIixcImFtZFwiOlwiYmx1ZWJpcmRcIn0iLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlsL3VuaXF1ZS1pZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9tYWluLWRlbHRhanMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWwvZGVmZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhSnNcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0EsaURBQWdELGlCQUFpQjtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNILEVBQUM7Ozs7Ozs7QUM3Q0QsZ0Q7Ozs7OztpRUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNILEVBQUM7Ozs7Ozs7aUVDOUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixZQUFZO0FBQ3pDLDhCQUE2QixZQUFZO0FBQ3pDLG9DQUFtQyxpQkFBaUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNILEVBQUM7Ozs7Ozs7aUVDckNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHO0FBQ0g7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQ3hDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG1FQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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LFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEVBQUM7Ozs7Ozs7aUVDOVBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztB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RUNqQkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDZkQsaUQiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJrZWZpclwiKSwgcmVxdWlyZShcInR3ZWVuanNcIiksIHJlcXVpcmUoXCJrZWZpci1qcXVlcnlcIiksIHJlcXVpcmUoXCJibHVlYmlyZFwiKSwgcmVxdWlyZShcImRlbHRhLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcImtlZmlyXCIsIFwidHdlZW5qc1wiLCBcImtlZmlyLWpxdWVyeVwiLCBcImJsdWViaXJkXCIsIFwiZGVsdGEtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcImtlZmlyXCIpLCByZXF1aXJlKFwidHdlZW5qc1wiKSwgcmVxdWlyZShcImtlZmlyLWpxdWVyeVwiKSwgcmVxdWlyZShcImJsdWViaXJkXCIpLCByZXF1aXJlKFwiZGVsdGEtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiS2VmaXJcIl0sIHJvb3RbXCJUV0VFTlwiXSwgcm9vdFtcIktlZmlySlF1ZXJ5XCJdLCByb290W1wiUFwiXSwgcm9vdFtcIkRlbHRhSnNcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMThfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yNF9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODZiOWQ4NWU0MDYxMjc4ODQ4NjZcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi9EM0dyb3VwLmpzJywgJy4vRDNWZXJ0ZXguanMnLCAnLi9EM0VkZ2UuanMnLCAnLi91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzJywgJy4vcC1wcGkuc2NzcyddLCBmdW5jdGlvbigkLCBEM0dyb3VwUCwgRDNWZXJ0ZXhQLCBEM0VkZ2VQLCBLZWZpcikge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4uZG8oJ3BwaScsIHtyZXF1aXJlczogWydkMyddfSk7XG4gIHBsdWdpbi5hcHBlbmQoJ1RpbGUucHJvdG90eXBlLmNvbnN0cnVjdCcsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICB2YXIgRDNHcm91cCA9IEQzR3JvdXBQLnZhbHVlKCk7XG4gICAgdmFyIEQzVmVydGV4ID0gRDNWZXJ0ZXhQLnZhbHVlKCk7XG4gICAgdmFyIEQzRWRnZSA9IEQzRWRnZVAudmFsdWUoKTtcbiAgICB2YXIgZ3JhcGhHcm91cCA9IG5ldyBEM0dyb3VwKHtcbiAgICAgIHBhcmVudDogdGhpcyxcbiAgICAgIGdyYXZpdHlGYWN0b3I6IDEsXG4gICAgICBjaGFyZ2VGYWN0b3I6IDAuMSxcbiAgICAgIGxpbmtEaXN0YW5jZUZhY3RvcjogMC4zXG4gICAgfSk7XG4gICAgS2VmaXIubWVyZ2UoW0tlZmlyLm9uY2UoKSwgdGhpcy5vbignc2l6ZScpLmNoYW5nZXMoKSwgdGhpcy5vbigncG9zaXRpb24nKS5jaGFuZ2VzKCldKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBBUkVBX01BUkdJTiA9IDU7XG4gICAgICBncmFwaEdyb3VwLnNldFJlZ2lvbih7XG4gICAgICAgIHRvcDogJF9fMC5wb3NpdGlvbi50b3AgKyBBUkVBX01BUkdJTixcbiAgICAgICAgbGVmdDogJF9fMC5wb3NpdGlvbi5sZWZ0ICsgQVJFQV9NQVJHSU4sXG4gICAgICAgIGhlaWdodDogJF9fMC5zaXplLmhlaWdodCAtIDIgKiBBUkVBX01BUkdJTixcbiAgICAgICAgd2lkdGg6ICRfXzAuc2l6ZS53aWR0aCAtIDIgKiBBUkVBX01BUkdJTlxuICAgICAgfSk7XG4gICAgfSkpO1xuICAgIHZhciBjb25zdHJ1Y3RFeGFtcGxlUHJvdGVpbnMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICBncmFwaEdyb3VwLmFkZEVkZ2UobmV3IEQzRWRnZSh7XG4gICAgICAgIHBhcmVudDogZ3JhcGhHcm91cCxcbiAgICAgICAgc291cmNlOiBncmFwaEdyb3VwLmFkZFZlcnRleChuZXcgRDNWZXJ0ZXgoe1xuICAgICAgICAgIHBhcmVudDogZ3JhcGhHcm91cCxcbiAgICAgICAgICBjc3NDbGFzczogJ2V4YW1wbGUnXG4gICAgICAgIH0pKSxcbiAgICAgICAgdGFyZ2V0OiBncmFwaEdyb3VwLmFkZFZlcnRleChuZXcgRDNWZXJ0ZXgoe1xuICAgICAgICAgIHBhcmVudDogZ3JhcGhHcm91cCxcbiAgICAgICAgICBjc3NDbGFzczogJ2V4YW1wbGUnXG4gICAgICAgIH0pKSxcbiAgICAgICAgY3NzQ2xhc3M6ICdleGFtcGxlJ1xuICAgICAgfSkpO1xuICAgIH0pO1xuICAgIHRoaXMub24oJ29wZW4nKS5ub3QoKS5hbmQodGhpcy5vbigndmlzaWJsZScpKS5vblZhbHVlKChmdW5jdGlvbihzaG93UHJvdGVpbnMpIHtcbiAgICAgIGlmIChzaG93UHJvdGVpbnMpIHtcbiAgICAgICAgY29uc3RydWN0RXhhbXBsZVByb3RlaW5zKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmFwaEdyb3VwLnJlbW92ZUFsbEVkZ2VzQW5kVmVydGljZXMoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtcHBpLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vQXJ0ZWZhY3QuanMnXSwgZnVuY3Rpb24oJCwgVSwgQXJ0ZWZhY3RQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIEFydGVmYWN0UC50aGVuKChmdW5jdGlvbihBcnRlZmFjdCkge1xuICAgIGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9EM0dyb3VwKSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5fYW15X0QzR3JvdXA7XG4gICAgfVxuICAgIHdpbmRvdy5fYW15X0QzR3JvdXAgPSBBcnRlZmFjdC5uZXdTdWJjbGFzcygnRDNHcm91cCcsIGZ1bmN0aW9uIEQzR3JvdXAoKSB7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICBVLmV4dGVuZCh0aGlzLCB7XG4gICAgICAgIHZlcnRpY2VzOiB7fSxcbiAgICAgICAgZWRnZXM6IHt9XG4gICAgICB9KTtcbiAgICAgIHRoaXMubmV3RXZlbnQoJ3ZlcnRleC1hZGRlZCcpO1xuICAgICAgdGhpcy5uZXdFdmVudCgndmVydGV4LXJlbW92ZWQnKTtcbiAgICAgIHRoaXMubmV3RXZlbnQoJ2VkZ2UtYWRkZWQnKTtcbiAgICAgIHRoaXMubmV3RXZlbnQoJ2VkZ2UtcmVtb3ZlZCcpO1xuICAgICAgdGhpcy5vbignZGVzdHJveScpLnRha2UoMSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgICRfXzAudmVydGljZXMuZm9yRWFjaCgoZnVuY3Rpb24odikge1xuICAgICAgICAgIHYuZGVzdHJveSgpO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfSwge1xuICAgICAgZ2V0IGdyYXZpdHlGYWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZ3Jhdml0eUZhY3RvcjtcbiAgICAgIH0sXG4gICAgICBnZXQgY2hhcmdlRmFjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmNoYXJnZUZhY3RvcjtcbiAgICAgIH0sXG4gICAgICBnZXQgbGlua0Rpc3RhbmNlRmFjdG9yKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmxpbmtEaXN0YW5jZUZhY3RvcjtcbiAgICAgIH0sXG4gICAgICBzZXRSZWdpb246IGZ1bmN0aW9uKHJlZ2lvbikge1xuICAgICAgICB0aGlzLnJlZ2lvbiA9IHJlZ2lvbjtcbiAgICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcbiAgICAgIH0sXG4gICAgICBhZGRWZXJ0ZXg6IGZ1bmN0aW9uKHZlcnRleCkge1xuICAgICAgICB2ZXJ0ZXguZ3JvdXAgPSB0aGlzO1xuICAgICAgICB0aGlzLnZlcnRpY2VzW3ZlcnRleC5pZF0gPSB2ZXJ0ZXg7XG4gICAgICAgIHZlcnRleC5ncmFwaElkID0gdmVydGV4LmlkO1xuICAgICAgICB0aGlzLmNpcmN1aXRib2FyZC5fcF9kM192ZXJ0aWNlc1t2ZXJ0ZXguZ3JhcGhJZF0gPSB2ZXJ0ZXg7XG4gICAgICAgIHRoaXMudHJpZ2dlcigndmVydGV4LWFkZGVkJywgdmVydGV4KTtcbiAgICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcbiAgICAgICAgcmV0dXJuIHZlcnRleDtcbiAgICAgIH0sXG4gICAgICByZW1vdmVWZXJ0ZXg6IGZ1bmN0aW9uKHZlcnRleCkge1xuICAgICAgICBpZiAodmVydGV4KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2ZXJ0ZXggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB2ZXJ0ZXggPSB0aGlzLnZlcnRpY2VzW3ZlcnRleF07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZlcnRleC5kZXN0cm95KCk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuY2lyY3VpdGJvYXJkLl9wX2QzX3ZlcnRpY2VzW3ZlcnRleC5ncmFwaElkXTtcbiAgICAgICAgICBkZWxldGUgdGhpcy52ZXJ0aWNlc1t2ZXJ0ZXhdO1xuICAgICAgICAgIHRoaXMudHJpZ2dlcigndmVydGV4LXJlbW92ZWQnLCB2ZXJ0ZXgpO1xuICAgICAgICAgIHRoaXMuY2lyY3VpdGJvYXJkLnVwZGF0ZUdyYXBoKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBhZGRFZGdlOiBmdW5jdGlvbihlZGdlKSB7XG4gICAgICAgIGVkZ2UuZ3JvdXAgPSB0aGlzO1xuICAgICAgICB0aGlzLmVkZ2VzW2VkZ2UuaWRdID0gZWRnZTtcbiAgICAgICAgZWRnZS5ncmFwaElkID0gdGhpcy5pZCArICc6JyArIGVkZ2UuaWQ7XG4gICAgICAgIHRoaXMuY2lyY3VpdGJvYXJkLl9wX2QzX2VkZ2VzW2VkZ2UuZ3JhcGhJZF0gPSBlZGdlO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ2VkZ2UtYWRkZWQnLCBlZGdlKTtcbiAgICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcbiAgICAgICAgcmV0dXJuIGVkZ2U7XG4gICAgICB9LFxuICAgICAgcmVtb3ZlRWRnZTogZnVuY3Rpb24oZWRnZSkge1xuICAgICAgICBpZiAoZWRnZSkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdmVydGV4ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZWRnZSA9IHRoaXMuZWRnZXNbZWRnZV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVkZ2UuZGVzdHJveSgpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmNpcmN1aXRib2FyZC5fcF9kM19lZGdlc1tlZGdlLmdyYXBoSWRdO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmVkZ2VzW2VkZ2UuaWRdO1xuICAgICAgICAgIHRoaXMudHJpZ2dlcignZWRnZS1yZW1vdmVkJywgZWRnZSk7XG4gICAgICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudXBkYXRlR3JhcGgoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlbW92ZUFsbEVkZ2VzQW5kVmVydGljZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZWRnZXMpLmZvckVhY2goKGZ1bmN0aW9uKGVkZ2VJZCkge1xuICAgICAgICAgIGlmICgkX18wLmVkZ2VzW2VkZ2VJZF0pIHtcbiAgICAgICAgICAgICRfXzAucmVtb3ZlRWRnZSgkX18wLmVkZ2VzW2VkZ2VJZF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnZlcnRpY2VzKS5mb3JFYWNoKChmdW5jdGlvbih2ZXJ0ZXhJZCkge1xuICAgICAgICAgIGlmICgkX18wLnZlcnRpY2VzW3ZlcnRleElkXSkge1xuICAgICAgICAgICAgJF9fMC5yZW1vdmVWZXJ0ZXgoJF9fMC52ZXJ0aWNlc1t2ZXJ0ZXhJZF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICB0aGlzLmNpcmN1aXRib2FyZC51cGRhdGVHcmFwaCgpO1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGdyYXZpdHlGYWN0b3I6IDEsXG4gICAgICBjaGFyZ2VGYWN0b3I6IDEsXG4gICAgICBsaW5rRGlzdGFuY2VGYWN0b3I6IDEsXG4gICAgICByZWdpb246IHtcbiAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgbGVmdDogMTAsXG4gICAgICAgIGdldCB3aWR0aCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jaXJjdWl0Ym9hcmQuc2l6ZS53aWR0aCAtIDIwO1xuICAgICAgICB9LFxuICAgICAgICBnZXQgaGVpZ2h0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmNpcmN1aXRib2FyZC5zaXplLmhlaWdodCAtIDIwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHdpbmRvdy5fYW15X0QzR3JvdXA7XG4gIH0pKS50YXAoKGZ1bmN0aW9uKGMpIHtcbiAgICAkLmNpcmN1aXRib2FyZC5EM0dyb3VwID0gYztcbiAgfSkpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0QzR3JvdXAuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAnLi91dGlsL21pc2MuanMnLCAnLi9BcnRlZmFjdC5qcycsICcuL0QzVmVydGV4LnNjc3MnXSwgZnVuY3Rpb24oJCwgVSwgQXJ0ZWZhY3RQKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIEFydGVmYWN0UC50aGVuKChmdW5jdGlvbihBcnRlZmFjdCkge1xuICAgIGlmIChVLmlzRGVmaW5lZCh3aW5kb3cuX2FteV9EM1ZlcnRleCkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuX2FteV9EM1ZlcnRleDtcbiAgICB9XG4gICAgd2luZG93Ll9hbXlfRDNWZXJ0ZXggPSBBcnRlZmFjdC5uZXdTdWJjbGFzcygnRDNWZXJ0ZXgnLCBmdW5jdGlvbiBEM1ZlcnRleCgkX18xKSB7XG4gICAgICB2YXIgdmlzaWJsZSA9ICRfXzEudmlzaWJsZTtcbiAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ3gnLCB7aW5pdGlhbDogMTB9KTtcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ3knLCB7aW5pdGlhbDogMTB9KTtcbiAgICAgIHRoaXMubmV3UHJvcGVydHkoJ3Zpc2libGUnLCB7aW5pdGlhbDogdmlzaWJsZX0pO1xuICAgICAgdGhpcy5uZXdQcm9wZXJ0eSgnaGlkZGVuJykucGx1Zyh0aGlzLnAoJ3Zpc2libGUnKS5ub3QoKSk7XG4gICAgICB0aGlzLnAoJ3Zpc2libGUnKS5wbHVnKHRoaXMucCgnaGlkZGVuJykubm90KCkpO1xuICAgICAgdGhpcy5wKCdoaWRkZW4nKS5tZXJnZSh0aGlzLm9uKCdkZXN0cm95JykubWFwVG8odHJ1ZSkpLm9uVmFsdWUoKGZ1bmN0aW9uKGgpIHtcbiAgICAgICAgJF9fMC5lbGVtZW50LnRvZ2dsZUNsYXNzKCdoaWRkZW4nLCBoKS50b2dnbGVDbGFzcygndmlzaWJsZScsICFoKTtcbiAgICAgIH0pKTtcbiAgICB9LCB7XG4gICAgICBnZXQgZWxlbWVudCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50KSB7XG4gICAgICAgICAgdGhpcy5fZWxlbWVudCA9ICQoKFwiXFxuXFx0XFx0XFx0XFx0XFx0XFx0PHN2ZyB4PVxcXCJcIiArIHRoaXMueCArIFwiXFxcIiB5PVxcXCJcIiArIHRoaXMueSArIFwiXFxcIiBjbGFzcz1cXFwidmVydGV4IFwiICsgdGhpcy5vcHRpb25zLmNzc0NsYXNzICsgXCJcXFwiPlxcblxcdFxcdFxcdFxcdFxcdFxcdFxcdDxjaXJjbGUgY2xhc3M9XFxcImNvcmVcXFwiIHI9XFxcIlwiICsgdGhpcy5vcHRpb25zLnJhZGl1cyArIFwiXFxcIj48L2NpcmNsZT5cXG5cXHRcXHRcXHRcXHRcXHRcXHQ8L3N2Zz5cXG5cXHRcXHRcXHRcXHRcXHRcIikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50O1xuICAgICAgfSxcbiAgICAgIGdldCBncmFwaFpJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ncmFwaFpJbmRleDtcbiAgICAgIH1cbiAgICB9LCB7XG4gICAgICBncmFwaFpJbmRleDogMjAwLFxuICAgICAgY3NzQ2xhc3M6ICcnLFxuICAgICAgcmFkaXVzOiA1LFxuICAgICAgdmlzaWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiB3aW5kb3cuX2FteV9EM1ZlcnRleDtcbiAgfSkpLnRhcCgoZnVuY3Rpb24oYykge1xuICAgICQuY2lyY3VpdGJvYXJkLkQzVmVydGV4ID0gYztcbiAgfSkpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0QzVmVydGV4LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJy4vdXRpbC9taXNjLmpzJywgJy4vdXRpbC9rZWZpci1hbmQtZWdncy5qcycsICcuL0FydGVmYWN0LmpzJywgJy4vRDNFZGdlLnNjc3MnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIEFydGVmYWN0UCkge1xuICAndXNlIHN0cmljdCc7XG4gIHJldHVybiBBcnRlZmFjdFAudGhlbigoZnVuY3Rpb24oQXJ0ZWZhY3QpIHtcbiAgICBpZiAoVS5pc0RlZmluZWQod2luZG93Ll9hbXlfRDNFZGdlKSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5fYW15X0QzRWRnZTtcbiAgICB9XG4gICAgd2luZG93Ll9hbXlfRDNFZGdlID0gQXJ0ZWZhY3QubmV3U3ViY2xhc3MoJ0QzRWRnZScsIGZ1bmN0aW9uIEQzRWRnZSgkX18xKSB7XG4gICAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgICAgc291cmNlID0gJF9fMi5zb3VyY2UsXG4gICAgICAgICAgdGFyZ2V0ID0gJF9fMi50YXJnZXQ7XG4gICAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICBLZWZpci5tZXJnZShbc291cmNlLm9uKCdkZXN0cm95JyksIHRhcmdldC5vbignZGVzdHJveScpXSkudGFrZSgxKS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgJF9fMC5kZXN0cm95KCk7XG4gICAgICB9KSk7XG4gICAgfSwge1xuICAgICAgZ2V0IHNvdXJjZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgICAgIH0sXG4gICAgICBnZXQgdGFyZ2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgfSxcbiAgICAgIGdldCBlbGVtZW50KCkge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50ID0gJCgoXCI8c3ZnPjxsaW5lIGNsYXNzPVxcXCJlZGdlIFwiICsgdGhpcy5vcHRpb25zLmNzc0NsYXNzICsgXCJcXFwiPjwvbGluZT48L3N2Zz5cIikpLmNoaWxkcmVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQ7XG4gICAgICB9LFxuICAgICAgZ2V0IGdyYXBoWkluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmdyYXBoWkluZGV4O1xuICAgICAgfVxuICAgIH0sIHtcbiAgICAgIGdyYXBoWkluZGV4OiAxMDAsXG4gICAgICBjc3NDbGFzczogJydcbiAgICB9KTtcbiAgICByZXR1cm4gd2luZG93Ll9hbXlfRDNFZGdlO1xuICB9KSkudGFwKChmdW5jdGlvbihjKSB7XG4gICAgJC5jaXJjdWl0Ym9hcmQuRDNFZGdlID0gYztcbiAgfSkpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0QzRWRnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbmRlZmluZShbJ2pxdWVyeScsICcuL21pc2MuanMnLCAna2VmaXInLCAndHdlZW5qcycsICdrZWZpci1qcXVlcnknXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIsIFRXRUVOLCBLZWZpckpRdWVyeSkge1xuICBLZWZpckpRdWVyeS5pbml0KEtlZmlyLCAkKTtcbiAgS2VmaXIuZnJvbU9uTnVsbCA9IFUubWVtb2l6ZShmdW5jdGlvbiBmcm9tT25OdWxsKG9iaiwgZXZlbnROYW1lKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIG9iai5vbihldmVudE5hbWUsIGVtaXR0ZXIuZW1pdCk7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvYmoub24oZXZlbnROYW1lLCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0pKTtcbiAgfSk7XG4gIHZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZSB8fCAoKGZ1bmN0aW9uKGYpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChmLCAxMDAwIC8gNjApO1xuICB9KSk7XG4gIEtlZmlyLmFuaW1hdGlvbkZyYW1lcyA9IGZ1bmN0aW9uIGFuaW1hdGlvbkZyYW1lcygpIHtcbiAgICByZXR1cm4gS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgdmFyIHN1YnNjcmliZWQgPSB0cnVlO1xuICAgICAgKGZ1bmN0aW9uIGl0ZXJhdGlvbkZuKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWVGbigoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KCk7XG4gICAgICAgICAgaWYgKHN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIGl0ZXJhdGlvbkZuKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci50d2VlbiA9IGZ1bmN0aW9uIHR3ZWVuKG9ialN0YXJ0LCBvYmpFbmQsICRfXzEpIHtcbiAgICB2YXIgJF9fMiA9ICRfXzEsXG4gICAgICAgIGR1cmF0aW9uID0gJF9fMi5kdXJhdGlvbixcbiAgICAgICAgZGVsYXkgPSAkX18yLmRlbGF5LFxuICAgICAgICBlYXNpbmcgPSAkX18yLmVhc2luZztcbiAgICB2YXIgdHcgPSBuZXcgVFdFRU4uVHdlZW4ob2JqU3RhcnQpLnRvKG9iakVuZCwgZHVyYXRpb24pO1xuICAgIHZhciBidXMgPSBLZWZpci5idXMoKTtcbiAgICB2YXIgYWRkU3RyZWFtID0gKChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjaGFpbmVkU3RyZWFtcyA9IDA7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICBjaGFpbmVkU3RyZWFtcyArPSAxO1xuICAgICAgICBidXMucGx1ZyhzdHJlYW0pO1xuICAgICAgICBzdHJlYW0ub25FbmQoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNoYWluZWRTdHJlYW1zIC09IDE7XG4gICAgICAgICAgaWYgKGNoYWluZWRTdHJlYW1zID09PSAwKSB7XG4gICAgICAgICAgICBidXMuZW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICB9KTtcbiAgICB9KSkoKTtcbiAgICBhZGRTdHJlYW0oS2VmaXIuZnJvbUJpbmRlcigoZnVuY3Rpb24oZW1pdHRlcikge1xuICAgICAgaWYgKGVhc2luZykge1xuICAgICAgICB0dy5lYXNpbmcoZWFzaW5nKTtcbiAgICAgIH1cbiAgICAgIGlmIChkZWxheSkge1xuICAgICAgICB0dy5kZWxheShkZWxheSk7XG4gICAgICB9XG4gICAgICB0dy5vblVwZGF0ZShmdW5jdGlvbigpIHtcbiAgICAgICAgZW1pdHRlci5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG4gICAgICB0dy5vbkNvbXBsZXRlKGVtaXR0ZXIuZW5kKTtcbiAgICB9KSkpO1xuICAgIGJ1cy50d2VlbiA9IHR3O1xuICAgIGJ1cy5zdGFydCA9IChmdW5jdGlvbigpIHtcbiAgICAgIHR3LnN0YXJ0KCk7XG4gICAgICByZXR1cm4gYnVzO1xuICAgIH0pO1xuICAgIGJ1cy5jaGFpbiA9IChmdW5jdGlvbihvdGhlcikge1xuICAgICAgYWRkU3RyZWFtKG90aGVyKTtcbiAgICAgIHR3LmNoYWluKG90aGVyLnR3ZWVuKTtcbiAgICAgIHJldHVybiBidXM7XG4gICAgfSk7XG4gICAgcmV0dXJuIGJ1cztcbiAgfTtcbiAgS2VmaXIua2V5UHJlc3MgPSBmdW5jdGlvbiBrZXlQcmVzcyhrZXlDb2RlKSB7XG4gICAgcmV0dXJuICQod2luZG93KS5hc0tlZmlyU3RyZWFtKCdrZXlwcmVzcycpLmZpbHRlcigoZnVuY3Rpb24oZSkge1xuICAgICAgcmV0dXJuIGUua2V5Q29kZSA9PT0ga2V5Q29kZTtcbiAgICB9KSk7XG4gIH07XG4gIEtlZmlyLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHZhbHVlKSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGVtaXR0ZXIuZW1pdCh2YWx1ZSk7XG4gICAgICBlbWl0dGVyLmVuZCgpO1xuICAgIH0pKTtcbiAgfTtcbiAgS2VmaXIuZnJvbUFycmF5ID0gZnVuY3Rpb24gZnJvbUFycmF5KGFycmF5KSB7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIGFycmF5LmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgIGVtaXR0ZXIuZW5kKCk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5saW1pdGVyID0gZnVuY3Rpb24gbGltaXRlcihwYWNpbmcpIHtcbiAgICB2YXIgaGFuZGxlciA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiBVLmNhbGw7XG4gICAgdmFyIHdhbnRlZEJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgIHZhciBvcGVuID0gS2VmaXIuYnVzKCk7XG4gICAgdmFyIGNsb3NlID0gS2VmaXIuYnVzKCk7XG4gICAgcGFjaW5nLmZpbHRlckJ5KHdhbnRlZEJ1cy50b1Byb3BlcnR5KGZhbHNlKSkub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICBoYW5kbGVyKChmdW5jdGlvbigpIHtcbiAgICAgICAgb3Blbi5lbWl0KCk7XG4gICAgICAgIHdhbnRlZEJ1cy5lbWl0KGZhbHNlKTtcbiAgICAgICAgY2xvc2UuZW1pdCgpO1xuICAgICAgfSkpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICB2YXIgYnVmZmVyID0gKGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSkuYnVmZmVyO1xuICAgICAgd2FudGVkQnVzLnBsdWcoc3RyZWFtLm1hcFRvKHRydWUpKTtcbiAgICAgIHJldHVybiBLZWZpci5jb25zdGFudCh0cnVlKS50YWtlKDEpLmNvbmNhdChjbG9zZSkuZmxhdE1hcExhdGVzdCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY2N1bXVsYXRvciA9IChmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgICAgIHJldHVybiAoYnVmZmVyID8gYXJyLmNvbmNhdChbdmFsXSkgOiBbdmFsXSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3RyZWFtLnRha2VVbnRpbEJ5KG9wZW4pLnJlZHVjZShhY2N1bXVsYXRvciwgW10pLmZsYXRNYXAoS2VmaXIuZnJvbUFycmF5KTtcbiAgICAgIH0pKTtcbiAgICB9O1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5saW1pdGVkQnkgPSBmdW5jdGlvbiBsaW1pdGVkQnkod3JhcHBlciwgb3B0aW9ucykge1xuICAgIHJldHVybiB3cmFwcGVyKHRoaXMsIG9wdGlvbnMpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLmhvbGRVbnRpbCA9IGZ1bmN0aW9uIGhvbGRVbnRpbChwYWNpbmcpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgcmV0dXJuIEtlZmlyLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGVtaXR0ZXIpIHtcbiAgICAgIHZhciBidWZmZXIgPSBbXTtcbiAgICAgIHZhciB1bnN1YnNjcmliZVRvVGhpcyA9ICRfXzAub25WYWx1ZSgoZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgYnVmZmVyLnB1c2godmFsdWUpO1xuICAgICAgfSkpO1xuICAgICAgdmFyIHVuc3Vic2NyaWJlVG9QYWNpbmcgPSBwYWNpbmcub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhciBvbGRCdWZmZXIgPSBidWZmZXI7XG4gICAgICAgICAgYnVmZmVyID0gW107XG4gICAgICAgICAgb2xkQnVmZmVyLmZvckVhY2goZW1pdHRlci5lbWl0KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1RoaXMoKTtcbiAgICAgICAgdW5zdWJzY3JpYmVUb1BhY2luZygpO1xuICAgICAgICBidWZmZXIgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS52YWx1ZSA9IGZ1bmN0aW9uKHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgY29tcGFyYXRvciA9IGNvbXBhcmF0b3IgfHwgKChmdW5jdGlvbihlKSB7XG4gICAgICByZXR1cm4gZSA9PT0gdmFsdWU7XG4gICAgfSkpO1xuICAgIHJldHVybiB0aGlzLnNraXBEdXBsaWNhdGVzKCkuZmlsdGVyKGNvbXBhcmF0b3IpO1xuICB9O1xuICBLZWZpci5PYnNlcnZhYmxlLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgdmFyIGRvTm90aGluZyA9IChmdW5jdGlvbigpIHt9KTtcbiAgICB0aGlzLm9uVmFsdWUoZG9Ob3RoaW5nKTtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgJF9fMC5vZmZWYWx1ZShkb05vdGhpbmcpO1xuICAgIH0pO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLnNraXBQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uKGxhYmVsKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyKChmdW5jdGlvbihldmVudCkge1xuICAgICAgcmV0dXJuICFVLmFycmF5KGV2ZW50Lm9yaWdpbmFsRXZlbnQsICdfb25seU9uY2VGb3InKVtsYWJlbF07XG4gICAgfSkpLm1hcCgoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIFUuYXJyYXkoZXZlbnQub3JpZ2luYWxFdmVudCwgJ19vbmx5T25jZUZvcicpW2xhYmVsXSA9IHRydWU7XG4gICAgfSkpO1xuICB9O1xuICBLZWZpci5TdHJlYW0ucHJvdG90eXBlLndoaWNoID0gZnVuY3Rpb24oYnV0dG9uSWQpIHtcbiAgICB2YXIgcHJlZCA9ICh0eXBlb2YgYnV0dG9uSWQgPT09ICdmdW5jdGlvbicpID8gKGJ1dHRvbklkKSA6ICgoZnVuY3Rpb24oYikge1xuICAgICAgcmV0dXJuIGIgPT09IGJ1dHRvbklkO1xuICAgIH0pKTtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXIoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHJldHVybiBwcmVkKGUud2hpY2gpO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZURyYWcgPSBmdW5jdGlvbiBtb3VzZURyYWcoKSB7XG4gICAgdmFyIHRocmVzaG9sZCA9IChhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge30pLnRocmVzaG9sZDtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZWRvd24nKS5mbGF0TWFwKChmdW5jdGlvbihtb3VzZURvd25FdmVudCkge1xuICAgICAgdmFyIHN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICBzdHJlYW0gPSBzdHJlYW0uZmlsdGVyKChmdW5jdGlvbihtb3VzZU1vdmVFdmVudCkge1xuICAgICAgICAgIGlmIChjcm9zc2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGR4ID0gbW91c2VEb3duRXZlbnQucGFnZVggLSBtb3VzZU1vdmVFdmVudC5wYWdlWDtcbiAgICAgICAgICB2YXIgZHkgPSBtb3VzZURvd25FdmVudC5wYWdlWSAtIG1vdXNlTW92ZUV2ZW50LnBhZ2VZO1xuICAgICAgICAgIGlmIChkeCAqIGR4ICsgZHkgKiBkeSA+IHRocmVzaG9sZCAqIHRocmVzaG9sZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyb3NzZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJlYW0udGFrZVVudGlsQnkoJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpKS5tYXAoKGZ1bmN0aW9uKG1vdXNlTW92ZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiAoe1xuICAgICAgICAgIG1vdXNlRG93bkV2ZW50OiBtb3VzZURvd25FdmVudCxcbiAgICAgICAgICBtb3VzZU1vdmVFdmVudDogbW91c2VNb3ZlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICB9KSk7XG4gICAgfSkpO1xuICB9O1xuICAkLmZuLm1vdXNlQ2xpY2sgPSBmdW5jdGlvbiBtb3VzZUNsaWNrKCkge1xuICAgIHZhciB0aHJlc2hvbGQgPSAoYXJndW1lbnRzWzBdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1swXSA6IHt9KS50aHJlc2hvbGQ7XG4gICAgcmV0dXJuICQodGhpcykuYXNLZWZpclN0cmVhbSgnbW91c2Vkb3duJykuZmxhdE1hcCgoZnVuY3Rpb24obW91c2VEb3duRXZlbnQpIHtcbiAgICAgIHZhciB1bnRpbFN0cmVhbSA9ICQoZG9jdW1lbnQpLmFzS2VmaXJTdHJlYW0oJ21vdXNlbW92ZScpO1xuICAgICAgaWYgKHRocmVzaG9sZCkge1xuICAgICAgICB2YXIgY3Jvc3NlZCA9IGZhbHNlO1xuICAgICAgICB1bnRpbFN0cmVhbSA9IHVudGlsU3RyZWFtLmZpbHRlcigoZnVuY3Rpb24obW91c2VNb3ZlRXZlbnQpIHtcbiAgICAgICAgICBpZiAoY3Jvc3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBkeCA9IG1vdXNlRG93bkV2ZW50LnBhZ2VYIC0gbW91c2VNb3ZlRXZlbnQucGFnZVg7XG4gICAgICAgICAgdmFyIGR5ID0gbW91c2VEb3duRXZlbnQucGFnZVkgLSBtb3VzZU1vdmVFdmVudC5wYWdlWTtcbiAgICAgICAgICBpZiAoZHggKiBkeCArIGR5ICogZHkgPiB0aHJlc2hvbGQgKiB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBjcm9zc2VkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJChkb2N1bWVudCkuYXNLZWZpclN0cmVhbSgnbW91c2V1cCcpLnRha2UoMSkudGFrZVVudGlsQnkodW50aWxTdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcbiAgJC5mbi5tb3VzZVdoZWVsID0gZnVuY3Rpb24gbW91c2VXaGVlbCgpIHtcbiAgICByZXR1cm4gJCh0aGlzKS5hc0tlZmlyU3RyZWFtKCdtb3VzZXdoZWVsIERPTU1vdXNlU2Nyb2xsJyk7XG4gIH07XG4gIHJldHVybiBLZWZpcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLWFuZC1lZ2dzLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIktlZmlyXCIsXCJjb21tb25qczJcIjpcImtlZmlyXCIsXCJjb21tb25qc1wiOlwia2VmaXJcIixcImFtZFwiOlwia2VmaXJcIn1cbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVFdFRU5cIixcImNvbW1vbmpzMlwiOlwidHdlZW5qc1wiLFwiY29tbW9uanNcIjpcInR3ZWVuanNcIixcImFtZFwiOlwidHdlZW5qc1wifVxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJLZWZpckpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJrZWZpci1qcXVlcnlcIixcImNvbW1vbmpzXCI6XCJrZWZpci1qcXVlcnlcIixcImFtZFwiOlwia2VmaXItanF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9zcmMvcC1wcGkuc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9wLXBwaS5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9wLXBwaS5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXBwaS5zY3NzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY2lyY3VpdGJvYXJkPnN2Zy5kMyAuZXhhbXBsZS52ZXJ0ZXg+LmNvcmV7cG9pbnRlci1ldmVudHM6dmlzaWJsZVBhaW50ZWQ7ZmlsbDojZTYwMGU2O3N0cm9rZTpwdXJwbGU7fS5jaXJjdWl0Ym9hcmQ+c3ZnLmQzIC5leGFtcGxlLmVkZ2V7cG9pbnRlci1ldmVudHM6dmlzaWJsZVBhaW50ZWQ7Y3Vyc29yOnBvaW50ZXI7c3Ryb2tlOnB1cnBsZTtzdHJva2Utd2lkdGg6MnB4O3N0cm9rZS1saW5lY2FwOnJvdW5kO31cIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3JjL3AtcHBpLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnYmx1ZWJpcmQnXSwgKGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgVSA9IHtcbiAgICBuZXdDbGFzczogZnVuY3Rpb24oY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMV0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBwcm90b3R5cGU7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3RvcjtcbiAgICAgIHJldHVybiBjb25zdHJ1Y3RvcjtcbiAgICB9LFxuICAgIG5ld1N1YmNsYXNzOiBmdW5jdGlvbihzdXBlckNsYXNzLCBjb25zdHJ1Y3Rvck1ha2VyKSB7XG4gICAgICB2YXIgcHJvdG90eXBlID0gYXJndW1lbnRzWzJdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1syXSA6IHt9O1xuICAgICAgdmFyIGNvbnN0cnVjdG9yID0gY29uc3RydWN0b3JNYWtlcihzdXBlckNsYXNzLnByb3RvdHlwZS5jb25zdHJ1Y3Rvcik7XG4gICAgICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MucHJvdG90eXBlKTtcbiAgICAgIFUuZXh0ZW5kKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG90eXBlKTtcbiAgICAgIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICAgICAgcmV0dXJuIGNvbnN0cnVjdG9yO1xuICAgIH0sXG4gICAgZXh0ZW5kOiBmdW5jdGlvbihvYmoxKSB7XG4gICAgICBmb3IgKHZhciByZXN0ID0gW10sXG4gICAgICAgICAgJF9fMSA9IDE7ICRfXzEgPCBhcmd1bWVudHMubGVuZ3RoOyAkX18xKyspXG4gICAgICAgIHJlc3RbJF9fMSAtIDFdID0gYXJndW1lbnRzWyRfXzFdO1xuICAgICAgcmVzdC5mb3JFYWNoKChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iajEsIGtleSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIG9iajE7XG4gICAgfSxcbiAgICBmaWVsZDogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIChmdW5jdGlvbihvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY2FsbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18yID0gMTsgJF9fMiA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzIrKylcbiAgICAgICAgYXJnc1skX18yIC0gMV0gPSBhcmd1bWVudHNbJF9fMl07XG4gICAgICByZXR1cm4gZm4uYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9LFxuICAgIGlkOiBmdW5jdGlvbih2KSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9LFxuICAgIGdldERlZjogZnVuY3Rpb24ob2JqLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgaWYgKFUuaXNVbmRlZmluZWQob2JqW25hbWVdKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIG9ialtuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialtuYW1lXTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCB7fSk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24ob2JqLCBuYW1lKSB7XG4gICAgICByZXR1cm4gVS5nZXREZWYob2JqLCBuYW1lLCBbXSk7XG4gICAgfSxcbiAgICBwdWxsOiBmdW5jdGlvbihhcnIsIHZhbCkge1xuICAgICAgdmFyIGkgPSBhcnIuaW5kZXhPZih2YWwpO1xuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIGFyci5zcGxpY2UoaSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWtlRW1wdHk6IGZ1bmN0aW9uKGFycikge1xuICAgICAgd2hpbGUgKGFyci5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyci5wb3AoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJpbmRBOiBmdW5jdGlvbihmbiwgY3R4LCBhcmdzKSB7XG4gICAgICByZXR1cm4gZm4uYmluZC5hcHBseShmbiwgW2N0eF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9LFxuICAgIGJpbmQ6IGZ1bmN0aW9uKG9iaiwgbSkge1xuICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICRfXzMgPSAyOyAkX18zIDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fMysrKVxuICAgICAgICBhcmdzWyRfXzMgLSAyXSA9IGFyZ3VtZW50c1skX18zXTtcbiAgICAgIHJldHVybiBVLmJpbmRBKG9ialttXSwgb2JqLCBhcmdzKTtcbiAgICB9LFxuICAgIGFwcGx5Q29uc3RydWN0b3I6IGZ1bmN0aW9uKENvbnN0cnVjdG9yRm4sIGFyZ3MpIHtcbiAgICAgIHZhciBOZXdDb25zdHJ1Y3RvckZuID0gQ29uc3RydWN0b3JGbi5iaW5kLmFwcGx5KENvbnN0cnVjdG9yRm4sIFtudWxsXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIG5ldyBOZXdDb25zdHJ1Y3RvckZuKCk7XG4gICAgfSxcbiAgICBhc3NlcnQ6IGZ1bmN0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UgfHwgXCJBc3NlcnRpb24gZmFpbGVkXCIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXNVbmRlZmluZWQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xuICAgIH0sXG4gICAgaXNEZWZpbmVkOiBmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJztcbiAgICB9LFxuICAgIGlzUGxhaW5PYmplY3Q6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xuICAgIH0sXG4gICAgaXNGdW5jdGlvbjogZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuICAgIG9ialZhbHVlczogZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5tYXAoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgICB9KSk7XG4gICAgfSxcbiAgICBtYWtlUG9zaXRpb25lZDogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgICAgICBlbGVtZW50LmNzcygncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlZk9yOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIHZhbHVlcyA9IFtdLFxuICAgICAgICAgICRfXzQgPSAwOyAkX180IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNCsrKVxuICAgICAgICB2YWx1ZXNbJF9fNF0gPSBhcmd1bWVudHNbJF9fNF07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoVS5pc0RlZmluZWQodmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGRlYm91bmNlOiBmdW5jdGlvbihmdW5jLCB3YWl0LCBjb250ZXh0KSB7XG4gICAgICB2YXIgdGltZW91dDtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAgICAgJF9fNSA9IDA7ICRfXzUgPCBhcmd1bWVudHMubGVuZ3RoOyAkX181KyspXG4gICAgICAgICAgYXJnc1skX181XSA9IGFyZ3VtZW50c1skX181XTtcbiAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICB2YXIgbGF0ZXJGbiA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQgfHwgJF9fMCwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyRm4sIHdhaXQpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG9uY2VQZXJTdGFjazogZnVuY3Rpb24oZnVuYywgY29udGV4dCkge1xuICAgICAgdmFyIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICB2YXIgcmVzdWx0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIGlmIChub3RSdW5ZZXQpIHtcbiAgICAgICAgICBub3RSdW5ZZXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRUaW1lb3V0KChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vdFJ1bllldCA9IHRydWU7XG4gICAgICAgICAgfSksIDApO1xuICAgICAgICAgIGZ1bmMuYXBwbHkoY29udGV4dCB8fCB0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlc3VsdC5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBub3RSdW5ZZXQgPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbigkX182KSB7XG4gICAgICB2YXIgJF9fNyA9ICRfXzYsXG4gICAgICAgICAgcmV0cmlldmUgPSAkX183LnJldHJpZXZlLFxuICAgICAgICAgIGlzRXF1YWwgPSAkX183LmlzRXF1YWw7XG4gICAgICBpc0VxdWFsID0gaXNFcXVhbCB8fCAoKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhID09PSBiKTtcbiAgICAgIH0pKTtcbiAgICAgIHZhciBjYWNoZTtcbiAgICAgIGZ1bmN0aW9uIHJldHJpZXZlVmFsdWUoKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHJldHJpZXZlKCk7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IGNhY2hlO1xuICAgICAgICBpZiAoIWlzRXF1YWwobmV3VmFsdWUsIG9sZFZhbHVlKSkge1xuICAgICAgICAgIGNhY2hlID0gbmV3VmFsdWU7XG4gICAgICAgICAgb25DaGFuZ2UuZm9yRWFjaCgoZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG9uY2VQZXJTdGFja1NldFZhbHVlID0gVS5vbmNlUGVyU3RhY2socmV0cmlldmVWYWx1ZSk7XG4gICAgICB2YXIgcmVzdWx0Rm4gPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBjYWNoZTtcbiAgICAgIH0pO1xuICAgICAgdmFyIG9uQ2hhbmdlID0gW107XG4gICAgICByZXN1bHRGbi5vbkNoYW5nZSA9IChmdW5jdGlvbihjYikge1xuICAgICAgICBvbkNoYW5nZS5wdXNoKGNiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdEZuO1xuICAgICAgfSk7XG4gICAgICByZXN1bHRGbi5hbGxvd0FkZGl0aW9uYWxDYWxsID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBvbmNlUGVyU3RhY2tTZXRWYWx1ZS5hbGxvd0FkZGl0aW9uYWxDYWxsKCk7XG4gICAgICB9KTtcbiAgICAgIG9uY2VQZXJTdGFja1NldFZhbHVlKCk7XG4gICAgICByZXR1cm4gcmVzdWx0Rm47XG4gICAgfSxcbiAgICBwcm9taXNpZnk6IGZ1bmN0aW9uKG9iaiwgbWV0aG9kKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAgICRfXzUgPSAwOyAkX181IDwgYXJndW1lbnRzLmxlbmd0aDsgJF9fNSsrKVxuICAgICAgICAgIGFyZ3NbJF9fNV0gPSBhcmd1bWVudHNbJF9fNV07XG4gICAgICAgIHJldHVybiBuZXcgUCgoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG9ialttZXRob2RdLmFwcGx5KG9iaiwgYXJncy5jb25jYXQocmVzb2x2ZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZpbmRJbmRleDogZnVuY3Rpb24oYXJyYXksIHByZWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHByZWQoYXJyYXlbaV0sIGksIGFycmF5KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfSxcbiAgICBtZW1vaXplOiBmdW5jdGlvbihmbikge1xuICAgICAgdmFyIGtleXMgPSBbXTtcbiAgICAgIHZhciBjYWNoZSA9IFtdO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBhcmdzID0gW10sXG4gICAgICAgICAgICAkX181ID0gMDsgJF9fNSA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzUrKylcbiAgICAgICAgICBhcmdzWyRfXzVdID0gYXJndW1lbnRzWyRfXzVdO1xuICAgICAgICB2YXIgaW5kZXggPSBVLmZpbmRJbmRleChrZXlzLCAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGtleS5ldmVyeSgoZnVuY3Rpb24odiwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHYgPT09IGFyZ3NbaV07XG4gICAgICAgICAgfSkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNhY2hlW2luZGV4XTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGtleXMucHVzaChhcmdzKTtcbiAgICAgICAgY2FjaGUucHVzaChyZXN1bHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfTtcbiAgICB9XG4gIH07XG4gIHZhciBFUFMgPSAwLjAwMDAwMTtcbiAgdmFyIHNvcnRPZkVxdWFsID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gKGIgLSBFUFMgPCBhICYmIGEgPCBiICsgRVBTKTtcbiAgfSk7XG4gIFUuUG9zaXRpb24gPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH0pO1xuICBVLlBvc2l0aW9uLnN1YnRyYWN0ID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gbmV3IFUuUG9zaXRpb24oYS50b3AgLSBiLnRvcCwgYS5sZWZ0IC0gYi5sZWZ0KTtcbiAgfSk7XG4gIFUuUG9zaXRpb24uZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS50b3AsIGIudG9wKSAmJiBzb3J0T2ZFcXVhbChhLmxlZnQsIGIubGVmdCk7XG4gIH0pO1xuICBVLlNpemUgPSBVLm5ld0NsYXNzKGZ1bmN0aW9uKGhlaWdodCwgd2lkdGgpIHtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gIH0pO1xuICBVLlNpemUuZXF1YWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gVS5pc0RlZmluZWQoYSkgJiYgVS5pc0RlZmluZWQoYikgJiYgc29ydE9mRXF1YWwoYS5oZWlnaHQsIGIuaGVpZ2h0KSAmJiBzb3J0T2ZFcXVhbChhLndpZHRoLCBiLndpZHRoKTtcbiAgfSk7XG4gIHJldHVybiBVO1xufSkpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL21pc2MuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ2JsdWViaXJkJywgJy4vdXRpbC9taXNjLmpzJywgJy4vdXRpbC9rZWZpci1zaWduYWwtaGFuZGxlci5qcycsICcuL3V0aWwvdW5pcXVlLWlkLmpzJywgJy4vdXRpbC9tYWluLWRlbHRhanMuanMnLCAnLi91dGlsL2RlZmVyLmpzJ10sIGZ1bmN0aW9uKCQsIFAsIFUsIEtlZmlyU2lnbmFsSGFuZGxlciwgdW5pcXVlSUQsIGRlbHRhSnMsIGRlZmVyKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgcmV0dXJuIGRlbHRhSnMuc2VsZWN0ZWQudGhlbigoZnVuY3Rpb24oKSB7XG4gICAgaWYgKFUuaXNEZWZpbmVkKHdpbmRvdy5fYW15X0FydGVmYWN0KSkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5fYW15X0FydGVmYWN0O1xuICAgIH1cbiAgICB3aW5kb3cuX2FteV9BcnRlZmFjdCA9IGRlbHRhSnMudnAoJ0FydGVmYWN0JywgVS5uZXdTdWJjbGFzcyhLZWZpclNpZ25hbEhhbmRsZXIsIChmdW5jdGlvbihzdXBlckZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gQXJ0ZWZhY3Qob3B0aW9ucykge1xuICAgICAgICBzdXBlckZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB2YXIgJF9fMSA9IG9wdGlvbnMsXG4gICAgICAgICAgICBpZCA9ICRfXzEuaWQsXG4gICAgICAgICAgICB0eXBlID0gJF9fMS50eXBlLFxuICAgICAgICAgICAgcGFyZW50ID0gJF9fMS5wYXJlbnQsXG4gICAgICAgICAgICBiZWZvcmVDb25zdHJ1Y3Rpb24gPSAkX18xLmJlZm9yZUNvbnN0cnVjdGlvbjtcbiAgICAgICAgdGhpcy5faWQgPSBpZCB8fCB1bmlxdWVJRCh0eXBlKTtcbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIFUuYXJyYXkocGFyZW50LCAnX2NoaWxkcmVuJykucHVzaCh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5ld0V2ZW50KCdkZXN0cm95Jyk7XG4gICAgICAgIHRoaXMuYmVmb3JlQ29uc3RydWN0aW9uKGJlZm9yZUNvbnN0cnVjdGlvbik7XG4gICAgICAgIGlmICh0aGlzLnJvb3QgPT09IHRoaXMpIHtcbiAgICAgICAgICB0aGlzLl9hcnRlZmFjdHNCeUlEID0ge307XG4gICAgICAgICAgdGhpcy5fcmVnaXN0ZXJBcnRlZmFjdCA9IGZ1bmN0aW9uKGFydGVmYWN0KSB7XG4gICAgICAgICAgICBVLmdldERlZih0aGlzLl9hcnRlZmFjdHNCeUlELCBhcnRlZmFjdC5pZCwgZGVmZXIpLnJlc29sdmUoYXJ0ZWZhY3QpO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSksIHtcbiAgICAgIGJlZm9yZUNvbnN0cnVjdGlvbjogZnVuY3Rpb24ocG9zc2libGVQcm9taXNlKSB7XG4gICAgICAgIGlmICghcG9zc2libGVQcm9taXNlIHx8ICEkLmlzRnVuY3Rpb24ocG9zc2libGVQcm9taXNlLnRoZW4pKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5jb25zdHJ1Y3RlZCkge1xuICAgICAgICAgIHRoaXMuY29uc3RydWN0ZWQgPSBQLnJlc29sdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb25zdHJ1Y3RlZCA9IHRoaXMuY29uc3RydWN0ZWQudGFwKChmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gUC5yZXNvbHZlKHBvc3NpYmxlUHJvbWlzZSk7XG4gICAgICAgIH0pKTtcbiAgICAgIH0sXG4gICAgICBnZXQgb3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29wdGlvbnM7XG4gICAgICB9LFxuICAgICAgZ2V0IGlkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faWQ7XG4gICAgICB9LFxuICAgICAgZ2V0IHR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xuICAgICAgfSxcbiAgICAgIGdldCBwYXJlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICB9LFxuICAgICAgZ2V0IGNoaWxkcmVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW47XG4gICAgICB9LFxuICAgICAgZ2V0IHJvb3QoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcm9vdCkge1xuICAgICAgICAgIHRoaXMuX3Jvb3QgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnJvb3QgOiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yb290O1xuICAgICAgfSxcbiAgICAgIGFydGVmYWN0QnlJZDogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuIFUuZ2V0RGVmKHRoaXMucm9vdC5fYXJ0ZWZhY3RzQnlJRCwgaWQsIGRlZmVyKS5wcm9taXNlO1xuICAgICAgfSxcbiAgICAgIHRyYXZlcnNlQXJ0ZWZhY3RzOiBmdW5jdGlvbihmbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICAgICAgdmFyIG9yZGVyID0gb3B0aW9ucy5vcmRlcjtcbiAgICAgICAgaWYgKCFvcmRlcikge1xuICAgICAgICAgIG9yZGVyID0gJ3ByZWZpeCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyID09PSAncHJlZml4Jykge1xuICAgICAgICAgIGZuKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBjaGlsZC50cmF2ZXJzZUFydGVmYWN0cyhmbiwgb3B0aW9ucyk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaWYgKG9yZGVyID09PSAncG9zdGZpeCcpIHtcbiAgICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlOiBmdW5jdGlvbih0eXBlLCBmbikge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50c1syXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgICAgdmFyIG9yZGVyID0gb3B0aW9ucy5vcmRlcjtcbiAgICAgICAgaWYgKCFvcmRlcikge1xuICAgICAgICAgIG9yZGVyID0gJ3ByZWZpeCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyID09PSAncHJlZml4JyAmJiB0aGlzLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgICBmbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5iZWZvcmVHb2luZ0luKSB7XG4gICAgICAgICAgb3B0aW9ucy5iZWZvcmVHb2luZ0luKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2xvc2VzdERlc2NlbmRhbnRzQnlUeXBlKHR5cGUpLmZvckVhY2goKGZ1bmN0aW9uKGRlc2NlbmRlbnQpIHtcbiAgICAgICAgICBkZXNjZW5kZW50LnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKHR5cGUsIGZuLCBvcHRpb25zKTtcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAob3B0aW9ucy5iZWZvcmVHb2luZ091dCkge1xuICAgICAgICAgIG9wdGlvbnMuYmVmb3JlR29pbmdPdXQodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9yZGVyID09PSAncG9zdGZpeCcgJiYgdGhpcy50eXBlID09PSB0eXBlKSB7XG4gICAgICAgICAgZm4odGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjbG9zZXN0QW5jZXN0b3JCeVR5cGU6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICByZXN1bHQgPSByZXN1bHQucGFyZW50O1xuICAgICAgICB9IHdoaWxlIChyZXN1bHQgJiYgcmVzdWx0LnR5cGUgJiYgcmVzdWx0LnR5cGUgIT09IHR5cGUpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfSxcbiAgICAgIGNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZTogZnVuY3Rpb24odHlwZSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaCgoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2hpbGQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkLmNsb3Nlc3REZXNjZW5kYW50c0J5VHlwZSh0eXBlKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcignZGVzdHJveScpO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgY2hpbGQuZGVzdHJveSgpO1xuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSkpO1xuICAgIHdpbmRvdy5fYW15X0FydGVmYWN0Lm5ld1N1YmNsYXNzID0gZnVuY3Rpb24gbmV3U3ViQ2xhc3MobmFtZSwgY29uc3RydWN0b3IpIHtcbiAgICAgIHZhciBwcm90b3R5cGUgPSBhcmd1bWVudHNbMl0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgICB2YXIgb3B0aW9uRGVmYXVsdHMgPSBhcmd1bWVudHNbM10gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzNdIDoge307XG4gICAgICByZXR1cm4gZGVsdGFKcy52cChuYW1lLCBVLm5ld1N1YmNsYXNzKHdpbmRvdy5fYW15X0FydGVmYWN0LCAoZnVuY3Rpb24oc3VwZXJGbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMF0gIT09ICh2b2lkIDApID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICAgICAgdmFyICRfXzAgPSB0aGlzO1xuICAgICAgICAgIHZhciBwcm9jZXNzZWRPcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgICBPYmplY3Qua2V5cyhvcHRpb25EZWZhdWx0cykuZm9yRWFjaCgoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBpZiAoVS5pc1VuZGVmaW5lZChwcm9jZXNzZWRPcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnNba2V5XSA9IG9wdGlvbkRlZmF1bHRzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkpO1xuICAgICAgICAgIHByb2Nlc3NlZE9wdGlvbnMudHlwZSA9IG5hbWU7XG4gICAgICAgICAgc3VwZXJGbi5jYWxsKHRoaXMsIFUuZXh0ZW5kKG9wdGlvbnMsIHByb2Nlc3NlZE9wdGlvbnMpKTtcbiAgICAgICAgICBjb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIHByb2Nlc3NlZE9wdGlvbnMpO1xuICAgICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdGVkID0gdGhpcy5jb25zdHJ1Y3RlZC50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKCQuaXNGdW5jdGlvbigkX18wLmNvbnN0cnVjdCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUC5yZXNvbHZlKCRfXzAuY29uc3RydWN0KG9wdGlvbnMpKS5yZXR1cm4oJF9fMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICRfXzA7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgfSBlbHNlIGlmICgkLmlzRnVuY3Rpb24odGhpcy5jb25zdHJ1Y3QpKSB7XG4gICAgICAgICAgICB0aGlzLmJlZm9yZUNvbnN0cnVjdGlvbih0aGlzLmNvbnN0cnVjdChvcHRpb25zKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICh0aGlzLmNvbnN0cnVjdGVkIHx8IFAucmVzb2x2ZSgpKS50aGVuKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRfXzAucm9vdC5fcmVnaXN0ZXJBcnRlZmFjdCgkX18wKTtcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH07XG4gICAgICB9KSwgVS5leHRlbmQoe30sIHByb3RvdHlwZSwge2dldCBjaXJjdWl0Ym9hcmQoKSB7XG4gICAgICAgICAgaWYgKCF0aGlzLl9jaXJjdWl0Ym9hcmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NpcmN1aXRib2FyZCA9IHRoaXMuY2xvc2VzdEFuY2VzdG9yQnlUeXBlKCdDaXJjdWl0Ym9hcmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NpcmN1aXRib2FyZDtcbiAgICAgICAgfX0pKSk7XG4gICAgfTtcbiAgICByZXR1cm4gd2luZG93Ll9hbXlfQXJ0ZWZhY3Q7XG4gIH0pKS50YXAoKGZ1bmN0aW9uKGMpIHtcbiAgICAkLmNpcmN1aXRib2FyZC5BcnRlZmFjdCA9IGM7XG4gIH0pKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9BcnRlZmFjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL2F1dG9wcmVmaXhlci1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL3NyYy9EM1ZlcnRleC5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvc3JjL0QzVmVydGV4LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvc3JjL0QzVmVydGV4LnNjc3NcIik7XG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL0QzVmVydGV4LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Nzc1RvU3RyaW5nLmpzXCIpKCk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJcIiwgXCJcIl0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L2F1dG9wcmVmaXhlci1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3JjL0QzVmVydGV4LnNjc3NcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9zcmMvRDNFZGdlLnNjc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9hdXRvcHJlZml4ZXItbG9hZGVyL2luZGV4LmpzIS9ob21lL21oZWx2ZW5zL1Byb2plY3RzL2FwaW5hdG9teS1jb3JlL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9zcmMvRDNFZGdlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvYXV0b3ByZWZpeGVyLWxvYWRlci9pbmRleC5qcyEvaG9tZS9taGVsdmVucy9Qcm9qZWN0cy9hcGluYXRvbXktY29yZS9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhL2hvbWUvbWhlbHZlbnMvUHJvamVjdHMvYXBpbmF0b215LWNvcmUvc3JjL0QzRWRnZS5zY3NzXCIpO1xuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9EM0VkZ2Uuc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNJRTkgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIDlcXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNJRTkoKTtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudCgpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KCkpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudCgpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlcGxhY2VUZXh0KHNvdXJjZSwgaWQsIHJlcGxhY2VtZW50KSB7XHJcblx0dmFyIGJvdW5kYXJpZXMgPSBbXCIvKiogPj5cIiArIGlkICsgXCIgKiovXCIsIFwiLyoqIFwiICsgaWQgKyBcIjw8ICoqL1wiXTtcclxuXHR2YXIgc3RhcnQgPSBzb3VyY2UubGFzdEluZGV4T2YoYm91bmRhcmllc1swXSk7XHJcblx0dmFyIHdyYXBwZWRSZXBsYWNlbWVudCA9IHJlcGxhY2VtZW50XHJcblx0XHQ/IChib3VuZGFyaWVzWzBdICsgcmVwbGFjZW1lbnQgKyBib3VuZGFyaWVzWzFdKVxyXG5cdFx0OiBcIlwiO1xyXG5cdGlmIChzb3VyY2UubGFzdEluZGV4T2YoYm91bmRhcmllc1swXSkgPj0gMCkge1xyXG5cdFx0dmFyIGVuZCA9IHNvdXJjZS5sYXN0SW5kZXhPZihib3VuZGFyaWVzWzFdKSArIGJvdW5kYXJpZXNbMV0ubGVuZ3RoO1xyXG5cdFx0cmV0dXJuIHNvdXJjZS5zbGljZSgwLCBzdGFydCkgKyB3cmFwcGVkUmVwbGFjZW1lbnQgKyBzb3VyY2Uuc2xpY2UoZW5kKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0cmV0dXJuIHNvdXJjZSArIHdyYXBwZWRSZXBsYWNlbWVudDtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCwgaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkgKyBcIiAqL1wiO1xyXG5cdFx0XHRjc3MgPSBcIkBpbXBvcnQgdXJsKFxcXCJkYXRhOnRleHQvY3NzO2Jhc2U2NCxcIiArIGJ0b2EoY3NzKSArIFwiXFxcIilcIjtcclxuXHRcdH0gY2F0Y2goZSkge31cclxuXHR9XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMThfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlBcIixcImNvbW1vbmpzMlwiOlwiYmx1ZWJpcmRcIixcImNvbW1vbmpzXCI6XCJibHVlYmlyZFwiLFwiYW1kXCI6XCJibHVlYmlyZFwifVxuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGlzdCA9IFtdO1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSB0aGlzW2ldO1xuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgcmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbVsxXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9jc3NUb1N0cmluZy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5kZWZpbmUoWydqcXVlcnknLCAnLi9taXNjLmpzJywgJy4va2VmaXItYW5kLWVnZ3MuanMnXSwgZnVuY3Rpb24oJCwgVSwgS2VmaXIpIHtcbiAgdmFyIEtlZmlyU2lnbmFsSGFuZGxlciA9IFUubmV3Q2xhc3MoZnVuY3Rpb24gS2VmaXJTaWduYWxIYW5kbGVyKCkge1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHRoaXMuX3Byb3BlcnRpZXMgPSB7fTtcbiAgICB0aGlzLl9wcm9wZXJ0eUJ1c3NlcyA9IHt9O1xuICB9LCB7XG4gICAgbmV3RXZlbnQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHZhciBzb3VyY2UgPSAoYXJndW1lbnRzWzFdICE9PSAodm9pZCAwKSA/IGFyZ3VtZW50c1sxXSA6IHt9KS5zb3VyY2U7XG4gICAgICBVLmFzc2VydCghdGhpcy5fZXZlbnRzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGFuIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIFUuYXNzZXJ0KCF0aGlzLl9wcm9wZXJ0aWVzW25hbWVdLCAoXCJUaGVyZSBpcyBhbHJlYWR5IGEgcHJvcGVydHkgJ1wiICsgbmFtZSArIFwiJyBvbiB0aGlzIG9iamVjdC5cIikpO1xuICAgICAgdmFyIGJ1cyA9IEtlZmlyLmJ1cygpO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBidXMucGx1Zyhzb3VyY2UpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50c1tuYW1lXSA9IGJ1cztcbiAgICB9LFxuICAgIGV2ZW50OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHJldHVybiB0aGlzLl9ldmVudHNbbmFtZV07XG4gICAgfSxcbiAgICBwcm9wZXJ0eTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXNbbmFtZV07XG4gICAgfSxcbiAgICBwOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICB9LFxuICAgIG5ld1Byb3BlcnR5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB2YXIgJF9fMSA9IGFyZ3VtZW50c1sxXSAhPT0gKHZvaWQgMCkgPyBhcmd1bWVudHNbMV0gOiB7fSxcbiAgICAgICAgICBzZXR0YWJsZSA9ICRfXzEuc2V0dGFibGUsXG4gICAgICAgICAgaW5pdGlhbCA9ICRfXzEuaW5pdGlhbCxcbiAgICAgICAgICBpc0VxdWFsID0gJF9fMS5pc0VxdWFsO1xuICAgICAgVS5hc3NlcnQoIXRoaXMuX2V2ZW50c1tuYW1lXSwgKFwiVGhlcmUgaXMgYWxyZWFkeSBhbiBldmVudCAnXCIgKyBuYW1lICsgXCInIG9uIHRoaXMgb2JqZWN0LlwiKSk7XG4gICAgICBVLmFzc2VydCghdGhpcy5fcHJvcGVydGllc1tuYW1lXSwgKFwiVGhlcmUgaXMgYWxyZWFkeSBhIHByb3BlcnR5ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIGlmIChVLmlzVW5kZWZpbmVkKHNldHRhYmxlKSkge1xuICAgICAgICBzZXR0YWJsZSA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgYnVzID0gS2VmaXIuYnVzKCk7XG4gICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLl9wcm9wZXJ0aWVzW25hbWVdID0gYnVzLnRvUHJvcGVydHkoaW5pdGlhbCkuc2tpcER1cGxpY2F0ZXMoaXNFcXVhbCk7XG4gICAgICBwcm9wZXJ0eS5wbHVnID0gKGZ1bmN0aW9uKG9ic2VydmFibGUpIHtcbiAgICAgICAgYnVzLnBsdWcob2JzZXJ2YWJsZSk7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICAgIH0pO1xuICAgICAgcHJvcGVydHkudW5wbHVnID0gKGZ1bmN0aW9uKG9ic2VydmFibGUpIHtcbiAgICAgICAgYnVzLnVucGx1ZyhvYnNlcnZhYmxlKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgICAgfSk7XG4gICAgICBwcm9wZXJ0eS5nZXQgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0eS5fY3VycmVudDtcbiAgICAgIH0pO1xuICAgICAgaWYgKHNldHRhYmxlKSB7XG4gICAgICAgIHByb3BlcnR5LnNldCA9IChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGJ1cy5lbWl0KHZhbHVlKTtcbiAgICAgICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIHtcbiAgICAgICAgZ2V0OiBwcm9wZXJ0eS5nZXQsXG4gICAgICAgIHNldDogc2V0dGFibGUgPyBwcm9wZXJ0eS5zZXQgOiB1bmRlZmluZWRcbiAgICAgIH0pO1xuICAgICAgcHJvcGVydHkucnVuKCk7XG4gICAgICB0aGlzLmV2ZW50KCdkZXN0cm95Jykub25WYWx1ZSgoZnVuY3Rpb24oKSB7XG4gICAgICAgIGJ1cy5lbmQoKTtcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9LFxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgICBVLmFzc2VydCh0aGlzLl9ldmVudHNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHRoaXMuX2V2ZW50c1tuYW1lXS5lbWl0KHZhbHVlKTtcbiAgICB9LFxuICAgIG9uOiBmdW5jdGlvbihuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgdmFyIGFyZ3NPYmogPSB0aGlzLl9nYXRoZXJPbkFyZ3VtZW50cyhuYW1lLCBleHBlY3RlZFZhbHVlLCBvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcy5fb24oYXJnc09iaik7XG4gICAgfSxcbiAgICBfb246IGZ1bmN0aW9uKCRfXzEpIHtcbiAgICAgIHZhciAkX18yID0gJF9fMSxcbiAgICAgICAgICBuYW1lID0gJF9fMi5uYW1lLFxuICAgICAgICAgIGV4cGVjdGVkVmFsdWUgPSAkX18yLmV4cGVjdGVkVmFsdWUsXG4gICAgICAgICAgY2FsbGJhY2sgPSAkX18yLmNhbGxiYWNrO1xuICAgICAgVS5hc3NlcnQodGhpcy5fZXZlbnRzW25hbWVdIHx8IHRoaXMuX3Byb3BlcnRpZXNbbmFtZV0sIChcIlRoZXJlIGlzIG5vIGV2ZW50IG9yIHByb3BlcnR5ICdcIiArIG5hbWUgKyBcIicgb24gdGhpcyBvYmplY3QuXCIpKTtcbiAgICAgIHZhciByZXN1bHQgPSB0aGlzLl9ldmVudHNbbmFtZV0gfHwgdGhpcy5fcHJvcGVydGllc1tuYW1lXTtcbiAgICAgIGlmIChVLmlzRGVmaW5lZChleHBlY3RlZFZhbHVlKSkge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQuZmlsdGVyKChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIHYgPT09IGV4cGVjdGVkVmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICByZXN1bHQgPSByZXN1bHQub25WYWx1ZShjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0sXG4gICAgX2dhdGhlck9uQXJndW1lbnRzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGFyZ3MgPSBbXSxcbiAgICAgICAgICAkX18wID0gMDsgJF9fMCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzArKylcbiAgICAgICAgYXJnc1skX18wXSA9IGFyZ3VtZW50c1skX18wXTtcbiAgICAgIHZhciByZXN1bHQgPSB7bmFtZTogYXJncy5zaGlmdCgpfTtcbiAgICAgIGlmIChVLmlzRGVmaW5lZChhcmdzWzBdKSAmJiAhVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pICYmICFVLmlzUGxhaW5PYmplY3QoYXJnc1swXSkpIHtcbiAgICAgICAgcmVzdWx0LmV4cGVjdGVkVmFsdWUgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICB9XG4gICAgICBpZiAoVS5pc0RlZmluZWQoYXJnc1swXSkgJiYgVS5pc0Z1bmN0aW9uKGFyZ3NbMF0pKSB7XG4gICAgICAgIHJlc3VsdC5jYWxsYmFjayA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIEtlZmlyU2lnbmFsSGFuZGxlcjtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL2tlZmlyLXNpZ25hbC1oYW5kbGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIF9uZXh0SWQgPSAwO1xuICByZXR1cm4gZnVuY3Rpb24gdW5pcXVlSWQocHJlZml4KSB7XG4gICAgcmV0dXJuICgocHJlZml4IHx8IFwidW5pcXVlLWlkXCIpICsgXCItXCIgKyBfbmV4dElkKyspO1xuICB9O1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvdW5pcXVlLWlkLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJywgJ2RlbHRhLWpzJywgJy4vZGVmZXIuanMnXSwgZnVuY3Rpb24oUCwgRGVsdGFKcywgZGVmZXIpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAod2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFqcykge1xuICAgIHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YWpzO1xuICB9XG4gIHZhciBkZWx0YUpzID0gd2luZG93Ll9fYXBpbmF0b215X2NvcmVfZGVsdGFqcyA9IG5ldyBEZWx0YUpzKCk7XG4gIHZhciBkZWZlcnJlZCA9IGRlZmVyKCk7XG4gIGRlbHRhSnMuc2VsZWN0ZWQgPSBkZWZlcnJlZC5wcm9taXNlO1xuICB2YXIgb2xkU2VsZWN0ID0gZGVsdGFKcy5zZWxlY3Q7XG4gIGRlbHRhSnMuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgYXJncyA9IFtdLFxuICAgICAgICAkX18wID0gMDsgJF9fMCA8IGFyZ3VtZW50cy5sZW5ndGg7ICRfXzArKylcbiAgICAgIGFyZ3NbJF9fMF0gPSBhcmd1bWVudHNbJF9fMF07XG4gICAgb2xkU2VsZWN0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIGRlZmVycmVkLnJlc29sdmUoYXJncyk7XG4gIH07XG4gIHJldHVybiB3aW5kb3cuX19hcGluYXRvbXlfY29yZV9kZWx0YWpzO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvbWFpbi1kZWx0YWpzLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ2JsdWViaXJkJ10sIGZ1bmN0aW9uKFApIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICByZXR1cm4gZnVuY3Rpb24gZGVmZXIoKSB7XG4gICAgdmFyIHJlc29sdmUsXG4gICAgICAgIHJlamVjdDtcbiAgICB2YXIgcHJvbWlzZSA9IG5ldyBQKGZ1bmN0aW9uKCkge1xuICAgICAgcmVzb2x2ZSA9IGFyZ3VtZW50c1swXTtcbiAgICAgIHJlamVjdCA9IGFyZ3VtZW50c1sxXTtcbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICAgIHJlamVjdDogcmVqZWN0LFxuICAgICAgcHJvbWlzZTogcHJvbWlzZVxuICAgIH07XG4gIH07XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9kZWZlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMjRfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIkRlbHRhSnNcIixcImNvbW1vbmpzMlwiOlwiZGVsdGEtanNcIixcImNvbW1vbmpzXCI6XCJkZWx0YS1qc1wiLFwiYW1kXCI6XCJkZWx0YS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXBwaS5qcyJ9