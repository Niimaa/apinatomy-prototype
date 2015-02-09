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
	  var plugin = $.circuitboard.plugin({
	    name: 'tile-maximized-snapshot',
	    resolves: ['tile-maximized', 'snapshot']
	  });
	  plugin.insert('Snapshot.prototype.take', function() {
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
	  }).insert('Snapshot.prototype.restore', function() {
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
	
	//# sourceMappingURL=<compileOutput>


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ZDYyODMzMWYwMWIxMTNhNDMwOSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLW1heGltaXplZC1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FBUSx1QkFBUSxDQUFHLDBDQUFVO0FBQzVCLGNBQVcsQ0FBQztBQUdSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsMEJBQXdCO0FBQzlCLFlBQU8sQ0FBRyxFQUFDLGdCQUFlLENBQUcsV0FBUyxDQUFDO0FBQUEsR0FDeEMsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMseUJBQXdCLENBQUcsVUFBVTs7QUFLbEQsUUFBSSxJQUFHLFFBQVEsZUFBZSxDQUFHO0FBQ2hDLFVBQUcsT0FBTyxlQUFlLEVBQUksR0FBQyxDQUFDO0FBQy9CLFVBQUcsYUFBYSx3QkFBeUIsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDM0QsWUFBSSxJQUFHLFVBQVUsQ0FBRztBQUNuQixxQkFBVSxlQUFlLENBQUUsSUFBRyxNQUFNLEdBQUcsQ0FBQyxFQUFJLEtBQUcsQ0FBQztTQUNqRDtBQUFBLE9BQ0QsRUFBQyxDQUFDO0tBQ0g7QUFHQSxRQUFJLElBQUcsUUFBUSxrQkFBa0IsQ0FBRztBQUNuQyxVQUFHLE9BQU8sa0JBQWtCLEVBQUksR0FBQyxDQUFDO0FBQ2xDLFVBQUcsYUFBYSx3QkFBeUIsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDM0QsWUFBSSxDQUFDLElBQUcsVUFBVSxDQUFHO0FBQ3BCLHFCQUFVLGtCQUFrQixDQUFFLElBQUcsTUFBTSxHQUFHLENBQUMsRUFBSSxLQUFHLENBQUM7U0FDcEQ7QUFBQSxPQUNELEVBQUMsQ0FBQztLQUNIO0FBQUEsR0FFRCxDQUFDLE9BQVEsQ0FBQyw0QkFBMkIsQ0FBRyxVQUFVOztBQUdqRCxRQUFJLElBQUcsUUFBUSxlQUFlLENBQUc7QUFDaEMsWUFBSyxLQUFNLENBQUMsSUFBRyxPQUFPLGVBQWUsQ0FBQyxPQUFRLEVBQUMsU0FBQyxFQUFDO2NBQU0sWUFBVSxlQUFlLENBQUUsRUFBQyxDQUFDO09BQUEsRUFBQyxRQUFTLEVBQUMsU0FBQyxFQUFDO0FBQ2hHLHlCQUFnQixLQUFNLENBQUMsRUFBQyxDQUFDLEtBQU0sRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUN6QyxjQUFHLFVBQVUsRUFBSSxLQUFHLENBQUM7U0FDdEIsRUFBQyxDQUFDO09BQ0gsRUFBQyxDQUFDO0tBQ0g7QUFHQSxRQUFJLElBQUcsUUFBUSxrQkFBa0IsQ0FBRztBQUNuQyxZQUFLLEtBQU0sQ0FBQyxJQUFHLE9BQU8sa0JBQWtCLENBQUMsT0FBUSxFQUFDLFNBQUMsRUFBQztjQUFNLFlBQVUsa0JBQWtCLENBQUUsRUFBQyxDQUFDO09BQUEsRUFBQyxRQUFTLEVBQUMsU0FBQyxFQUFDO0FBQ3RHLHlCQUFnQixLQUFNLENBQUMsRUFBQyxDQUFDLEtBQU0sRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUN6QyxjQUFHLFVBQVUsRUFBSSxNQUFJLENBQUM7U0FDdkIsRUFBQyxDQUFDO09BQ0gsRUFBQyxDQUFDO0tBQ0g7QUFBQSxHQUVELENBQUMsQ0FBQztBQUdILEVBQUMsK0lBQUM7QUFDRjs7Ozs7Ozs7QUMxREEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOWQ2MjgzMzFmMDFiMTEzYTQzMDlcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtbWF4aW1pemVkLXNuYXBzaG90Jyxcblx0XHRyZXNvbHZlczogWyd0aWxlLW1heGltaXplZCcsICdzbmFwc2hvdCddXG5cdH0pO1xuXG5cblx0cGx1Z2luLmluc2VydCgnU25hcHNob3QucHJvdG90eXBlLnRha2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBUT0RPOiB0aGlzIHNob3VsZCByZWZlciB0byB0aWxlcyBieSBhcnRlZmFjdCBpZCwgbm90IGJ5IG1vZGVsIGlkIChzb21laG93KVxuXG5cdFx0LyogcmVtZW1iZXIgdGlsZXMgdGhhdCBhcmUgbWF4aW1pemVkICovXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aWxlc01heGltaXplZCkge1xuXHRcdFx0dGhpcy5vYmplY3QudGlsZXNNYXhpbWl6ZWQgPSB7fTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaWxlJywgKHRpbGUpID0+IHtcblx0XHRcdFx0aWYgKHRpbGUubWF4aW1pemVkKSB7XG5cdFx0XHRcdFx0dGhpcy5vYmplY3QudGlsZXNNYXhpbWl6ZWRbdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKiByZW1lbWJlciB0aWxlcyB0aGF0IGFyZSBub3QgbWF4aW1pemVkICovXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aWxlc05vdE1heGltaXplZCkge1xuXHRcdFx0dGhpcy5vYmplY3QudGlsZXNOb3RNYXhpbWl6ZWQgPSB7fTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaWxlJywgKHRpbGUpID0+IHtcblx0XHRcdFx0aWYgKCF0aWxlLm1heGltaXplZCkge1xuXHRcdFx0XHRcdHRoaXMub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkW3RpbGUubW9kZWwuaWRdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pLmluc2VydCgnU25hcHNob3QucHJvdG90eXBlLnJlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiByZXN0b3JlIHRpbGVzIHRoYXQgYXJlIG1heGltaXplZCAqL1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGlsZXNNYXhpbWl6ZWQpIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMub2JqZWN0LnRpbGVzTWF4aW1pemVkKS5maWx0ZXIoKGlkKSA9PiB0aGlzLm9iamVjdC50aWxlc01heGltaXplZFtpZF0pLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRpbGUoaWQpLnRoZW4oKHRpbGUpID0+IHtcblx0XHRcdFx0XHR0aWxlLm1heGltaXplZCA9IHRydWU7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0LyogcmVzdG9yZSB0aWxlcyB0aGF0IGFyZSBub3QgbWF4aW1pemVkICovXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aWxlc05vdE1heGltaXplZCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNOb3RNYXhpbWl6ZWQpLmZpbHRlcigoaWQpID0+IHRoaXMub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkW2lkXSkuZm9yRWFjaCgoaWQpID0+IHtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudGlsZShpZCkudGhlbigodGlsZSkgPT4ge1xuXHRcdFx0XHRcdHRpbGUubWF4aW1pemVkID0gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcC10aWxlLW1heGltaXplZC1zbmFwc2hvdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1tYXhpbWl6ZWQtc25hcHNob3QuanMifQ==