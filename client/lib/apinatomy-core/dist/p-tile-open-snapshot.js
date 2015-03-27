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
	  var plugin = $.circuitboard.plugin.do('tile-open-snapshot', {resolves: ['tile-open', 'snapshot']});
	  plugin.append('Snapshot.prototype.take', function() {
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
	  }).append('Snapshot.prototype.restore', function() {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxNTYyOGM5NzhkZjI2YWZiOTBkNCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLW9wZW4tc25hcHNob3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0E7QUFDQTtBQUNBLGdFQUErRCxvQ0FBb0M7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSCxFQUFDOzs7Ozs7O0FDMUNELGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE1NjI4Yzk3OGRmMjZhZmI5MGQ0XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luLmRvKCd0aWxlLW9wZW4tc25hcHNob3QnLCB7cmVzb2x2ZXM6IFsndGlsZS1vcGVuJywgJ3NuYXBzaG90J119KTtcbiAgcGx1Z2luLmFwcGVuZCgnU25hcHNob3QucHJvdG90eXBlLnRha2UnLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgJF9fMCA9IHRoaXM7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc09wZW4pIHtcbiAgICAgIHRoaXMub2JqZWN0LnRpbGVzT3BlbiA9IHt9O1xuICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RpbGUnLCAoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICBpZiAodGlsZS5vcGVuKSB7XG4gICAgICAgICAgJF9fMC5vYmplY3QudGlsZXNPcGVuW3RpbGUubW9kZWwuaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzQ2xvc2VkKSB7XG4gICAgICB0aGlzLm9iamVjdC50aWxlc0Nsb3NlZCA9IHt9O1xuICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RpbGUnLCAoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICBpZiAoIXRpbGUub3Blbikge1xuICAgICAgICAgICRfXzAub2JqZWN0LnRpbGVzQ2xvc2VkW3RpbGUubW9kZWwuaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSkuYXBwZW5kKCdTbmFwc2hvdC5wcm90b3R5cGUucmVzdG9yZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzT3Blbikge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNPcGVuKS5maWx0ZXIoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAkX18wLm9iamVjdC50aWxlc09wZW5baWRdO1xuICAgICAgfSkpLmZvckVhY2goKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICRfXzAuY2lyY3VpdGJvYXJkLnRpbGUoaWQpLnRoZW4oKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICB0aWxlLm9wZW4gPSB0cnVlO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXNDbG9zZWQpIHtcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMub2JqZWN0LnRpbGVzQ2xvc2VkKS5maWx0ZXIoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgIHJldHVybiAkX18wLm9iamVjdC50aWxlc0Nsb3NlZFtpZF07XG4gICAgICB9KSkuZm9yRWFjaCgoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgJF9fMC5jaXJjdWl0Ym9hcmQudGlsZShpZCkudGhlbigoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgIHRpbGUub3BlbiA9IGZhbHNlO1xuICAgICAgICB9KSk7XG4gICAgICB9KSk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRpbGUtb3Blbi1zbmFwc2hvdC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1vcGVuLXNuYXBzaG90LmpzIn0=