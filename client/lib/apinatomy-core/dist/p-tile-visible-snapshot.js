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
	  var plugin = $.circuitboard.plugin.do('tile-visible-snapshot', {resolves: ['tile-hidden', 'snapshot']});
	  plugin.append('Snapshot.prototype.take', function() {
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
	  }).append('Snapshot.prototype.restore', function() {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmYjUxYWRkYTU3YzI3ZjE4Mjc0MSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLXZpc2libGUtc25hcHNob3QuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztpRUN0Q0E7QUFDQTtBQUNBLG1FQUFrRSxzQ0FBc0M7QUFDeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLElBQUc7QUFDSCxFQUFDOzs7Ozs7O0FDMUNELGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGZiNTFhZGRhNTdjMjdmMTgyNzQxXG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5J10sIGZ1bmN0aW9uKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luLmRvKCd0aWxlLXZpc2libGUtc25hcHNob3QnLCB7cmVzb2x2ZXM6IFsndGlsZS1oaWRkZW4nLCAnc25hcHNob3QnXX0pO1xuICBwbHVnaW4uYXBwZW5kKCdTbmFwc2hvdC5wcm90b3R5cGUudGFrZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzVmlzaWJsZSkge1xuICAgICAgdGhpcy5vYmplY3QudGlsZXNWaXNpYmxlID0ge307XG4gICAgICB0aGlzLmNpcmN1aXRib2FyZC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGlsZScsIChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIGlmICh0aWxlLnZpc2libGUpIHtcbiAgICAgICAgICAkX18wLm9iamVjdC50aWxlc1Zpc2libGVbdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXNIaWRkZW4pIHtcbiAgICAgIHRoaXMub2JqZWN0LnRpbGVzSGlkZGVuID0ge307XG4gICAgICB0aGlzLmNpcmN1aXRib2FyZC50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGlsZScsIChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgIGlmICghdGlsZS52aXNpYmxlKSB7XG4gICAgICAgICAgJF9fMC5vYmplY3QudGlsZXNIaWRkZW5bdGlsZS5tb2RlbC5pZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfVxuICB9KS5hcHBlbmQoJ1NuYXBzaG90LnByb3RvdHlwZS5yZXN0b3JlJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyICRfXzAgPSB0aGlzO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGlsZXNWaXNpYmxlKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9iamVjdC50aWxlc1Zpc2libGUpLmZpbHRlcigoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRfXzAub2JqZWN0LnRpbGVzVmlzaWJsZVtpZF07XG4gICAgICB9KSkuZm9yRWFjaCgoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgJF9fMC5jaXJjdWl0Ym9hcmQudGlsZShpZCkudGhlbigoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICAgIHRpbGUudmlzaWJsZSA9IHRydWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc0hpZGRlbikge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNIaWRkZW4pLmZpbHRlcigoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRfXzAub2JqZWN0LnRpbGVzSGlkZGVuW2lkXTtcbiAgICAgIH0pKS5mb3JFYWNoKChmdW5jdGlvbihpZCkge1xuICAgICAgICAkX18wLmNpcmN1aXRib2FyZC50aWxlKGlkKS50aGVuKChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgdGlsZS52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGlsZS12aXNpYmxlLXNuYXBzaG90LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLXZpc2libGUtc25hcHNob3QuanMifQ==