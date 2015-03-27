(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["jQuery"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function($) {
	  'use strict';
	  var plugin = $.circuitboard.plugin.do('tile-maximized-snapshot', {resolves: ['tile-maximized', 'snapshot']});
	  plugin.append('Snapshot.prototype.take', function() {
	    var $__0 = this;
	    if (this.options.tilesMaximized) {
	      this.object.tilesMaximized = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (tile.maximized) {
	          $__0.object.tilesMaximized[tile.model.id] = true;
	        }
	      }));
	    }
	    if (this.options.tilesNotMaximized) {
	      this.object.tilesNotMaximized = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (!tile.maximized) {
	          $__0.object.tilesNotMaximized[tile.model.id] = true;
	        }
	      }));
	    }
	  }).append('Snapshot.prototype.restore', function() {
	    var $__0 = this;
	    if (this.options.tilesMaximized) {
	      Object.keys(this.object.tilesMaximized).filter((function(id) {
	        return $__0.object.tilesMaximized[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.maximized = true;
	        }));
	      }));
	    }
	    if (this.options.tilesNotMaximized) {
	      Object.keys(this.object.tilesNotMaximized).filter((function(id) {
	        return $__0.object.tilesNotMaximized[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.maximized = false;
	        }));
	      }));
	    }
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxYmIyMDBmYTA5Yzg0M2ZjZDVkYiIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLW1heGltaXplZC1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0EscUVBQW9FLHlDQUF5QztBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0EsSUFBRztBQUNILEVBQUM7Ozs7Ozs7QUMxQ0QsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMWJiMjAwZmEwOWM4NDNmY2Q1ZGJcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24oJCkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4uZG8oJ3RpbGUtbWF4aW1pemVkLXNuYXBzaG90Jywge3Jlc29sdmVzOiBbJ3RpbGUtbWF4aW1pemVkJywgJ3NuYXBzaG90J119KTtcbiAgcGx1Z2luLmFwcGVuZCgnU25hcHNob3QucHJvdG90eXBlLnRha2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc01heGltaXplZCkge1xuICAgICAgdGhpcy5vYmplY3QudGlsZXNNYXhpbWl6ZWQgPSB7fTtcbiAgICAgIHRoaXMuY2lyY3VpdGJvYXJkLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaWxlJywgKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgaWYgKHRpbGUubWF4aW1pemVkKSB7XG4gICAgICAgICAgJF9fMC5vYmplY3QudGlsZXNNYXhpbWl6ZWRbdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXNOb3RNYXhpbWl6ZWQpIHtcbiAgICAgIHRoaXMub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkID0ge307XG4gICAgICB0aGlzLmNpcmN1aXRib2FyZC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGlsZScsIChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIGlmICghdGlsZS5tYXhpbWl6ZWQpIHtcbiAgICAgICAgICAkX18wLm9iamVjdC50aWxlc05vdE1heGltaXplZFt0aWxlLm1vZGVsLmlkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pLmFwcGVuZCgnU25hcHNob3QucHJvdG90eXBlLnJlc3RvcmUnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc01heGltaXplZCkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNNYXhpbWl6ZWQpLmZpbHRlcigoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRfXzAub2JqZWN0LnRpbGVzTWF4aW1pemVkW2lkXTtcbiAgICAgIH0pKS5mb3JFYWNoKChmdW5jdGlvbihpZCkge1xuICAgICAgICAkX18wLmNpcmN1aXRib2FyZC50aWxlKGlkKS50aGVuKChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgdGlsZS5tYXhpbWl6ZWQgPSB0cnVlO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXNOb3RNYXhpbWl6ZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkKS5maWx0ZXIoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAkX18wLm9iamVjdC50aWxlc05vdE1heGltaXplZFtpZF07XG4gICAgICB9KSkuZm9yRWFjaCgoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgJF9fMC5jaXJjdWl0Ym9hcmQudGlsZShpZCkudGhlbigoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgIHRpbGUubWF4aW1pemVkID0gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGlsZS1tYXhpbWl6ZWQtc25hcHNob3QuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRpbGUtbWF4aW1pemVkLXNuYXBzaG90LmpzIn0=