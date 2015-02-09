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
	    name: 'tile-visible-snapshot',
	    resolves: ['tile-hidden', 'snapshot']
	  });
	  plugin.insert('Snapshot.prototype.take', function() {
	    var $__0 = this;
	    if (this.options.tilesVisible) {
	      this.object.tilesVisible = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (tile.visible) {
	          $__0.object.tilesVisible[tile.model.id] = true;
	        }
	      }));
	    }
	    if (this.options.tilesHidden) {
	      this.object.tilesHidden = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (!tile.visible) {
	          $__0.object.tilesHidden[tile.model.id] = true;
	        }
	      }));
	    }
	  }).insert('Snapshot.prototype.restore', function() {
	    var $__0 = this;
	    if (this.options.tilesVisible) {
	      Object.keys(this.object.tilesVisible).filter((function(id) {
	        return $__0.object.tilesVisible[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.visible = true;
	        }));
	      }));
	    }
	    if (this.options.tilesHidden) {
	      Object.keys(this.object.tilesHidden).filter((function(id) {
	        return $__0.object.tilesHidden[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.visible = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiOTNmZDgyZTVlNmI2Mjc1MTM0OSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLXZpc2libGUtc25hcHNob3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVEsQ0FBRywwQ0FBVTtBQUM1QixjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLHdCQUFzQjtBQUM1QixZQUFPLENBQUcsRUFBQyxhQUFZLENBQUcsV0FBUyxDQUFDO0FBQUEsR0FDckMsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMseUJBQXdCLENBQUcsVUFBVTs7QUFLbEQsUUFBSSxJQUFHLFFBQVEsYUFBYSxDQUFHO0FBQzlCLFVBQUcsT0FBTyxhQUFhLEVBQUksR0FBQyxDQUFDO0FBQzdCLFVBQUcsYUFBYSx3QkFBeUIsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDM0QsWUFBSSxJQUFHLFFBQVEsQ0FBRztBQUNqQixxQkFBVSxhQUFhLENBQUUsSUFBRyxNQUFNLEdBQUcsQ0FBQyxFQUFJLEtBQUcsQ0FBQztTQUMvQztBQUFBLE9BQ0QsRUFBQyxDQUFDO0tBQ0g7QUFHQSxRQUFJLElBQUcsUUFBUSxZQUFZLENBQUc7QUFDN0IsVUFBRyxPQUFPLFlBQVksRUFBSSxHQUFDLENBQUM7QUFDNUIsVUFBRyxhQUFhLHdCQUF5QixDQUFDLE1BQUssR0FBRyxTQUFDLElBQUcsQ0FBTTtBQUMzRCxZQUFJLENBQUMsSUFBRyxRQUFRLENBQUc7QUFDbEIscUJBQVUsWUFBWSxDQUFFLElBQUcsTUFBTSxHQUFHLENBQUMsRUFBSSxLQUFHLENBQUM7U0FDOUM7QUFBQSxPQUNELEVBQUMsQ0FBQztLQUNIO0FBQUEsR0FFRCxDQUFDLE9BQVEsQ0FBQyw0QkFBMkIsQ0FBRyxVQUFVOztBQUdqRCxRQUFJLElBQUcsUUFBUSxhQUFhLENBQUc7QUFDOUIsWUFBSyxLQUFNLENBQUMsSUFBRyxPQUFPLGFBQWEsQ0FBQyxPQUFRLEVBQUMsU0FBQyxFQUFDO2NBQU0sWUFBVSxhQUFhLENBQUUsRUFBQyxDQUFDO09BQUEsRUFBQyxRQUFTLEVBQUMsU0FBQyxFQUFDO0FBQzVGLHlCQUFnQixLQUFNLENBQUMsRUFBQyxDQUFDLEtBQU0sRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUN6QyxjQUFHLFFBQVEsRUFBSSxLQUFHLENBQUM7U0FDcEIsRUFBQyxDQUFDO09BQ0gsRUFBQyxDQUFDO0tBQ0g7QUFHQSxRQUFJLElBQUcsUUFBUSxZQUFZLENBQUc7QUFDN0IsWUFBSyxLQUFNLENBQUMsSUFBRyxPQUFPLFlBQVksQ0FBQyxPQUFRLEVBQUMsU0FBQyxFQUFDO2NBQU0sWUFBVSxZQUFZLENBQUUsRUFBQyxDQUFDO09BQUEsRUFBQyxRQUFTLEVBQUMsU0FBQyxFQUFDO0FBQzFGLHlCQUFnQixLQUFNLENBQUMsRUFBQyxDQUFDLEtBQU0sRUFBQyxTQUFDLElBQUcsQ0FBTTtBQUN6QyxjQUFHLFFBQVEsRUFBSSxNQUFJLENBQUM7U0FDckIsRUFBQyxDQUFDO09BQ0gsRUFBQyxDQUFDO0tBQ0g7QUFBQSxHQUVELENBQUMsQ0FBQztBQUdILEVBQUMsK0lBQUM7QUFDRjs7Ozs7Ozs7QUMxREEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYjkzZmQ4MmU1ZTZiNjI3NTEzNDlcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknXSwgZnVuY3Rpb24gKCQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RpbGUtdmlzaWJsZS1zbmFwc2hvdCcsXG5cdFx0cmVzb2x2ZXM6IFsndGlsZS1oaWRkZW4nLCAnc25hcHNob3QnXVxuXHR9KTtcblxuXG5cdHBsdWdpbi5pbnNlcnQoJ1NuYXBzaG90LnByb3RvdHlwZS50YWtlJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0Ly8gVE9ETzogdGhpcyBzaG91bGQgcmVmZXIgdG8gdGlsZXMgYnkgYXJ0ZWZhY3QgaWQsIG5vdCBieSBtb2RlbCBpZCAoc29tZWhvdylcblxuXHRcdC8qIHJlbWVtYmVyIHRpbGVzIHRoYXQgYXJlIHZpc2libGUgKi9cblx0XHRpZiAodGhpcy5vcHRpb25zLnRpbGVzVmlzaWJsZSkge1xuXHRcdFx0dGhpcy5vYmplY3QudGlsZXNWaXNpYmxlID0ge307XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGlsZScsICh0aWxlKSA9PiB7XG5cdFx0XHRcdGlmICh0aWxlLnZpc2libGUpIHtcblx0XHRcdFx0XHR0aGlzLm9iamVjdC50aWxlc1Zpc2libGVbdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKiByZW1lbWJlciB0aWxlcyB0aGF0IGFyZSBoaWRkZW4gKi9cblx0XHRpZiAodGhpcy5vcHRpb25zLnRpbGVzSGlkZGVuKSB7XG5cdFx0XHR0aGlzLm9iamVjdC50aWxlc0hpZGRlbiA9IHt9O1xuXHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RpbGUnLCAodGlsZSkgPT4ge1xuXHRcdFx0XHRpZiAoIXRpbGUudmlzaWJsZSkge1xuXHRcdFx0XHRcdHRoaXMub2JqZWN0LnRpbGVzSGlkZGVuW3RpbGUubW9kZWwuaWRdID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdH0pLmluc2VydCgnU25hcHNob3QucHJvdG90eXBlLnJlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiByZXN0b3JlIHRpbGVzIHRoYXQgYXJlIHZpc2libGUgKi9cblx0XHRpZiAodGhpcy5vcHRpb25zLnRpbGVzVmlzaWJsZSkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNWaXNpYmxlKS5maWx0ZXIoKGlkKSA9PiB0aGlzLm9iamVjdC50aWxlc1Zpc2libGVbaWRdKS5mb3JFYWNoKChpZCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNpcmN1aXRib2FyZC50aWxlKGlkKS50aGVuKCh0aWxlKSA9PiB7XG5cdFx0XHRcdFx0dGlsZS52aXNpYmxlID0gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvKiByZXN0b3JlIHRpbGVzIHRoYXQgYXJlIGhpZGRlbiAqL1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGlsZXNIaWRkZW4pIHtcblx0XHRcdE9iamVjdC5rZXlzKHRoaXMub2JqZWN0LnRpbGVzSGlkZGVuKS5maWx0ZXIoKGlkKSA9PiB0aGlzLm9iamVjdC50aWxlc0hpZGRlbltpZF0pLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRpbGUoaWQpLnRoZW4oKHRpbGUpID0+IHtcblx0XHRcdFx0XHR0aWxlLnZpc2libGUgPSBmYWxzZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSk7XG5cblxufSk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wLXRpbGUtdmlzaWJsZS1zbmFwc2hvdC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS12aXNpYmxlLXNuYXBzaG90LmpzIn0=