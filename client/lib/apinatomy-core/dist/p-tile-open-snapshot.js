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
	    name: 'tile-open-snapshot',
	    resolves: ['tile-open', 'snapshot']
	  });
	  plugin.insert('Snapshot.prototype.take', function() {
	    var $__0 = this;
	    if (this.options.tilesOpen) {
	      this.object.tilesOpen = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (tile.open) {
	          $__0.object.tilesOpen[tile.model.id] = true;
	        }
	      }));
	    }
	    if (this.options.tilesClosed) {
	      this.object.tilesClosed = {};
	      this.circuitboard.traverseArtefactsByType('Tile', (function(tile) {
	        if (!tile.open) {
	          $__0.object.tilesClosed[tile.model.id] = true;
	        }
	      }));
	    }
	  }).insert('Snapshot.prototype.restore', function() {
	    var $__0 = this;
	    if (this.options.tilesOpen) {
	      Object.keys(this.object.tilesOpen).filter((function(id) {
	        return $__0.object.tilesOpen[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.open = true;
	        }));
	      }));
	    }
	    if (this.options.tilesClosed) {
	      Object.keys(this.object.tilesClosed).filter((function(id) {
	        return $__0.object.tilesClosed[id];
	      })).forEach((function(id) {
	        $__0.circuitboard.tile(id).then((function(tile) {
	          tile.open = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0NDgzZmY4NGE3MmNlOTExZGMzZCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLW9wZW4tc25hcHNob3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0EsaUNBQVEsdUJBQVEsQ0FBRywwQ0FBVTtBQUM1QixjQUFXLENBQUM7QUFHUixZQUFLLEVBQUksZUFBYSxPQUFRLENBQUM7QUFDbEMsUUFBRyxDQUFHLHFCQUFtQjtBQUN6QixZQUFPLENBQUcsRUFBQyxXQUFVLENBQUcsV0FBUyxDQUFDO0FBQUEsR0FDbkMsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMseUJBQXdCLENBQUcsVUFBVTs7QUFLbEQsUUFBSSxJQUFHLFFBQVEsVUFBVSxDQUFHO0FBQzNCLFVBQUcsT0FBTyxVQUFVLEVBQUksR0FBQyxDQUFDO0FBQzFCLFVBQUcsYUFBYSx3QkFBeUIsQ0FBQyxNQUFLLEdBQUcsU0FBQyxJQUFHLENBQU07QUFDM0QsWUFBSSxJQUFHLEtBQUssQ0FBRztBQUNkLHFCQUFVLFVBQVUsQ0FBRSxJQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUksS0FBRyxDQUFDO1NBQzVDO0FBQUEsT0FDRCxFQUFDLENBQUM7S0FDSDtBQUdBLFFBQUksSUFBRyxRQUFRLFlBQVksQ0FBRztBQUM3QixVQUFHLE9BQU8sWUFBWSxFQUFJLEdBQUMsQ0FBQztBQUM1QixVQUFHLGFBQWEsd0JBQXlCLENBQUMsTUFBSyxHQUFHLFNBQUMsSUFBRyxDQUFNO0FBQzNELFlBQUksQ0FBQyxJQUFHLEtBQUssQ0FBRztBQUNmLHFCQUFVLFlBQVksQ0FBRSxJQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUksS0FBRyxDQUFDO1NBQzlDO0FBQUEsT0FDRCxFQUFDLENBQUM7S0FDSDtBQUFBLEdBRUQsQ0FBQyxPQUFRLENBQUMsNEJBQTJCLENBQUcsVUFBVTs7QUFHakQsUUFBSSxJQUFHLFFBQVEsVUFBVSxDQUFHO0FBQzNCLFlBQUssS0FBTSxDQUFDLElBQUcsT0FBTyxVQUFVLENBQUMsT0FBUSxFQUFDLFNBQUMsRUFBQztjQUFNLFlBQVUsVUFBVSxDQUFFLEVBQUMsQ0FBQztPQUFBLEVBQUMsUUFBUyxFQUFDLFNBQUMsRUFBQztBQUN0Rix5QkFBZ0IsS0FBTSxDQUFDLEVBQUMsQ0FBQyxLQUFNLEVBQUMsU0FBQyxJQUFHLENBQU07QUFDekMsY0FBRyxLQUFLLEVBQUksS0FBRyxDQUFDO1NBQ2pCLEVBQUMsQ0FBQztPQUNILEVBQUMsQ0FBQztLQUNIO0FBR0EsUUFBSSxJQUFHLFFBQVEsWUFBWSxDQUFHO0FBQzdCLFlBQUssS0FBTSxDQUFDLElBQUcsT0FBTyxZQUFZLENBQUMsT0FBUSxFQUFDLFNBQUMsRUFBQztjQUFNLFlBQVUsWUFBWSxDQUFFLEVBQUMsQ0FBQztPQUFBLEVBQUMsUUFBUyxFQUFDLFNBQUMsRUFBQztBQUMxRix5QkFBZ0IsS0FBTSxDQUFDLEVBQUMsQ0FBQyxLQUFNLEVBQUMsU0FBQyxJQUFHLENBQU07QUFDekMsY0FBRyxLQUFLLEVBQUksTUFBSSxDQUFDO1NBQ2xCLEVBQUMsQ0FBQztPQUNILEVBQUMsQ0FBQztLQUNIO0FBQUEsR0FFRCxDQUFDLENBQUM7QUFHSCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FDMURBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ0ODNmZjg0YTcyY2U5MTFkYzNkXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4oe1xuXHRcdG5hbWU6ICd0aWxlLW9wZW4tc25hcHNob3QnLFxuXHRcdHJlc29sdmVzOiBbJ3RpbGUtb3BlbicsICdzbmFwc2hvdCddXG5cdH0pO1xuXG5cblx0cGx1Z2luLmluc2VydCgnU25hcHNob3QucHJvdG90eXBlLnRha2UnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvLyBUT0RPOiB0aGlzIHNob3VsZCByZWZlciB0byB0aWxlcyBieSBhcnRlZmFjdCBpZCwgbm90IGJ5IG1vZGVsIGlkIChzb21laG93KVxuXG5cdFx0LyogcmVtZW1iZXIgdGlsZXMgdGhhdCBhcmUgb3BlbiAqL1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGlsZXNPcGVuKSB7XG5cdFx0XHR0aGlzLm9iamVjdC50aWxlc09wZW4gPSB7fTtcblx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaWxlJywgKHRpbGUpID0+IHtcblx0XHRcdFx0aWYgKHRpbGUub3Blbikge1xuXHRcdFx0XHRcdHRoaXMub2JqZWN0LnRpbGVzT3Blblt0aWxlLm1vZGVsLmlkXSA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qIHJlbWVtYmVyIHRpbGVzIHRoYXQgYXJlIGNsb3NlZCAqL1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGlsZXNDbG9zZWQpIHtcblx0XHRcdHRoaXMub2JqZWN0LnRpbGVzQ2xvc2VkID0ge307XG5cdFx0XHR0aGlzLmNpcmN1aXRib2FyZC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGlsZScsICh0aWxlKSA9PiB7XG5cdFx0XHRcdGlmICghdGlsZS5vcGVuKSB7XG5cdFx0XHRcdFx0dGhpcy5vYmplY3QudGlsZXNDbG9zZWRbdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0fSkuaW5zZXJ0KCdTbmFwc2hvdC5wcm90b3R5cGUucmVzdG9yZScsIGZ1bmN0aW9uICgpIHtcblxuXHRcdC8qIHJlc3RvcmUgdGlsZXMgdGhhdCBhcmUgb3BlbiAqL1xuXHRcdGlmICh0aGlzLm9wdGlvbnMudGlsZXNPcGVuKSB7XG5cdFx0XHRPYmplY3Qua2V5cyh0aGlzLm9iamVjdC50aWxlc09wZW4pLmZpbHRlcigoaWQpID0+IHRoaXMub2JqZWN0LnRpbGVzT3BlbltpZF0pLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHRcdHRoaXMuY2lyY3VpdGJvYXJkLnRpbGUoaWQpLnRoZW4oKHRpbGUpID0+IHtcblx0XHRcdFx0XHR0aWxlLm9wZW4gPSB0cnVlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdC8qIHJlc3RvcmUgdGlsZXMgdGhhdCBhcmUgY2xvc2VkICovXG5cdFx0aWYgKHRoaXMub3B0aW9ucy50aWxlc0Nsb3NlZCkge1xuXHRcdFx0T2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNDbG9zZWQpLmZpbHRlcigoaWQpID0+IHRoaXMub2JqZWN0LnRpbGVzQ2xvc2VkW2lkXSkuZm9yRWFjaCgoaWQpID0+IHtcblx0XHRcdFx0dGhpcy5jaXJjdWl0Ym9hcmQudGlsZShpZCkudGhlbigodGlsZSkgPT4ge1xuXHRcdFx0XHRcdHRpbGUub3BlbiA9IGZhbHNlO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1vcGVuLXNuYXBzaG90LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLW9wZW4tc25hcHNob3QuanMifQ==