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
	  var plugin = $.circuitboard.plugin.do('tile-button-to-swap-three-d-model', {requires: ['tile-buttons', 'three-d-geometric-models']});
	  plugin.update('Tile.prototype.loadThreeDModels', (function(old) {
	    return function() {
	      var $__0 = this;
	      old.call(this).then((function() {
	        var models = [null].concat($__0.children.filter((function(child) {
	          return child.type === 'ThreeDModel';
	        })));
	        if (models.length > 1) {
	          $__0.addButton({
	            name: 'swap3dModel',
	            icon: __webpack_require__(2)
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
	    };
	  }));
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,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"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MGE4YTc5Mjg3MzI1MmNjY2FkZCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zLzNkLXdoaXRlLnBuZyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBO0FBQ0E7QUFDQSwrRUFBOEUsdURBQXVEO0FBQ3JJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLHdCQUF1QixtQkFBbUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQzlDRCxnRDs7Ozs7O0FDQUEsa0NBQWlDLHdvRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0MGE4YTc5Mjg3MzI1MmNjY2FkZFxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbigkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbi5kbygndGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsJywge3JlcXVpcmVzOiBbJ3RpbGUtYnV0dG9ucycsICd0aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMnXX0pO1xuICBwbHVnaW4udXBkYXRlKCdUaWxlLnByb3RvdHlwZS5sb2FkVGhyZWVETW9kZWxzJywgKGZ1bmN0aW9uKG9sZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkX18wID0gdGhpcztcbiAgICAgIG9sZC5jYWxsKHRoaXMpLnRoZW4oKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbW9kZWxzID0gW251bGxdLmNvbmNhdCgkX18wLmNoaWxkcmVuLmZpbHRlcigoZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQudHlwZSA9PT0gJ1RocmVlRE1vZGVsJztcbiAgICAgICAgfSkpKTtcbiAgICAgICAgaWYgKG1vZGVscy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgJF9fMC5hZGRCdXR0b24oe1xuICAgICAgICAgICAgbmFtZTogJ3N3YXAzZE1vZGVsJyxcbiAgICAgICAgICAgIGljb246IHJlcXVpcmUoJ3VybCEuL3V0aWwvaWNvbnMvM2Qtd2hpdGUucG5nJylcbiAgICAgICAgICB9KS5vblZhbHVlKChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgZm9yIChpID0gMTsgaSA8IG1vZGVscy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICBpZiAobW9kZWxzW2ldLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBtb2RlbHNbaV0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpID0gKGkgKyAxKSAlIG1vZGVscy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobW9kZWxzW2ldKSB7XG4gICAgICAgICAgICAgIG1vZGVsc1tpXS50cmF2ZXJzZUFydGVmYWN0c0J5VHlwZSgnVGhyZWVETW9kZWwnLCAoZnVuY3Rpb24obW9kZWwpIHtcbiAgICAgICAgICAgICAgICBtb2RlbC52aXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSBcIi0tIFwiO1xuICAgICAgICAgICAgICB2YXIgbW9kZWxIaWVyYXJjaHkgPSBcIkF2YWlsYWJsZSBwYXJ0cyBvZiB0aGlzIDNEIG1vZGVsOlxcblwiO1xuICAgICAgICAgICAgICBtb2RlbHNbaV0udHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RocmVlRE1vZGVsJywgKGZ1bmN0aW9uKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgbW9kZWxIaWVyYXJjaHkgKz0gaW5kZW50YXRpb24gKyBtb2RlbC5pZCArICdcXG4nO1xuICAgICAgICAgICAgICB9KSwge1xuICAgICAgICAgICAgICAgIGJlZm9yZUdvaW5nSW46IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgaW5kZW50YXRpb24gKz0gXCItLSBcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJlZm9yZUdvaW5nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgIGluZGVudGF0aW9uID0gaW5kZW50YXRpb24uc2xpY2UoMyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2cobW9kZWxIaWVyYXJjaHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH07XG4gIH0pKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRpbGUtYnV0dG9uLXRvLXN3YXAtdGhyZWUtZC1tb2RlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlBQUFBQ0FDQVlBQUFERFBtSExBQUFHSmtsRVFWUjQydTJkVDJza1ZSVEZ6MDEzcHpNaWdqaFJtV3dDTWlJNExzUXdFZ1pFVkNLSW9MaVgxQ0lmd1VWVWNPRW5HR2MySWxtMHVIQWwvaGtZbUZsbDA0aE1aaUZCWjZHQ0NMTXhJQ2lPSVIzQ2RkRzN6SnV5VTEzZGVkWDFxdDQ1TUhTbDVuVjN2ZnFkdXUrK1cxVmRBRVZSRkVWUkZFVlJGRVZSRkVWUkZOVndTY2dicDZyem9XOWo1UUJGRGhwcEFGVmRCTEFNWUo2WXgrcVdpQXdhWXdCVlhRSndEc0FiQUpiSU4xZDNBZndFNExxSTdFMzY1bmJBUi80ekJqOGg0MXoxN0hWWlZmK2NOQkxNQlFqL1NZUC9QT0VYVW1JSHlsVDVVcnRHOEh0a2ZSOTBMMm9IRHIrWDZleFc1T0NmQlhEUjV3ZTJBNGVmVlFmQXR3MEczQVZ3NEU3eExDRStEK0NDd1gvYi92c3paN21lQmhnRGZ3dkFodTk1YitBNk9DRWhmZ3JBY3c3d213Q09haDBCQ3NDUGV1d2ZzMzl1bXlIcWFZQng4RVdrYisyeVIzK2Y4TEZsUTJFOURWQ2djenV4QVo5aS82eldNZ2tzMGpsM2pGZlZTekZGZ0tMN0p4c1phMkdBU2VDcmFoZkFTallKVk5XT2lHekhETi9XZVRzL01oZmlrVCtpNkpId3lDOW45alBYNU00UmZzVUdJUHp3OTg4YzRjY0x2elFERUg1OTlrKzdCcDNyRVg1TkRPQ3JjOWFtMzdSS1lJaVJzUjF5NTVwVStBbDFXR3lIM0xtbVZBSkR6b25hSVhhdVNaWEEwQlBpZGcwNmw5UTFHYlQ5OHpTRzUvT0RuQTIxVDlHNUpSeGZ2Y3VwWGczaFQyMEE2OXc1NUordlhqM0ZXYXNIQUx3R1lNMVp0d2JnbnM4ellUTlFXZkFIbFJuQWJ0ZGF4dkZORzlrUXZlRmh1MW9BSGdPdzc2emJ4L0RhdVBVYUdTREoxRE9DaTR3VEcwQkVCbWFDN0UwYlNjbmIrb1Q5cTZPQ0hSYW5MUVYzUU5VZXZzOUNrTzhNdldXdlJ5UFdIOVVFZkZLSGpmUlpDdlo1MDBZYVlRNUhyRCtzd1g3ZHFJbEp2UnJBNTAwYjZRMFMyWXNmZndEd1YrRDdkQlUxa3RlVFFiN0dPSnZxcll6SStEOE52UkpZczJscVdIY0g1NHlsQ2Fob0RVRFJBQlFOUU5FQVZPQ3pnSkxVSTZiSURPQmNFOWpKck44bXNvZ2lBSUZIYmdCVmZaR0dpTkFBempXQjY1bjFORUdFczRBRXJBUnlHa2pSQUJRTlFORUFWRHpUUUZPUG1DSXpBQ3VCakFBRVRnT3dFaGl0QVZnSjVDekFWUUpXQWprTnBHZ0FpZ2FnYUFBcW5tbWdxVWRNa1JtQWxVQkdBQUtuQVZnSmpOWUFyQVJ5RnVBcUFTdUJuQVpTTkFCRkExQTBBQlhQTk5EVUk2YklETUJLSUNNQWdkTUFyQVJHYTRDaWxVQnJsemVNekx3ZGdMTTQvcWxiMkhJSFFOZjlEY0VTdnJleFNXQ1Nrd3l1NUx5dlgxRzd4M0gvN3hrdkFyaGd5NGNsZm05akRlQnFQWTBDTmp5czUwU1JUaFh0QU56Ty9IMGV3T3NBTHJyR3NINzA3Y0ZZR3puZlc2aGRObG8wMFFESkNWRWdLVGgxcktyZHFPY2MrUDdlcVJWY0lTZ2QvNXYwekVBbWdjWGh2MnFMZjl0cmtaK2c3eFg4K0tyYS9RTGdad0MvSS85WkI1TityNXNiOVRIbGM0VGFnY0YveitCL2JIOXZJL04wa25RV1lPUHgyQnJDck52WkxNRFZHVFBBZFFEL09KL1hUMSt6QmErTWRwelhOKzN6cy9CL0JQQjliUTJncXE4QTJBVHdNSUFYQUN3QXVHeEp6ZlpwQzBXemJKZXRYUUM0Q2VCejVEd3lac3puTGFwcSttekdrK0R2aU1oVUVXQXVFUGp2QTNqRU9ybkxrZmtZUGs1K01PZXA0WWVTQkxZc05LYnc5d0I4SkNMWENMOWMrSlVPQVhia3QwVGtoajJHYmdHQUFMZ2lJdDhRZmk3OE96N2dWMllBVlYyek1YOWZWZWRGNUpxcURnRE04OGd2QlArV0QvaVZHTUNCZjlZNnVhQ3FBeEc1d1RGL3R2Qm5uZ09vNnNzWitHbkNOMC80czRkZlJSTFl4dkFad0c3Q2Q0Vmh2eHI0TXhzQ1ZQVWxBSjFNd2dlRC96WGhWd04vSmdhd3NQOHVnSU5Nd3RkbHRsOHQvTklONE1CL2xBbGZlUEJMelFHc0pMcnB3TisxZWY0QzRZY0J2K3drc0l2aEdhb1UvaDhBcm5MTUR3ZCtLVU9BSGZuZFRNTFhzb1R2UzhJUEI3NXZBeHhhdHI5cHkyN0NkMFpFdm9vODhqOFVHdnd5SXNBN0dGNFV5WVR2L3dvT3ZtOERmSWpoRmJEcG1OOEM4Q0M1LzZmZzRKZVJCS2J3NXdGOElpSmZrSHU0OEgxSGdNdk84Z2VXOUZ4eTFuVWlOa0NROEgwYjRDMEF2OW55QmcvNisrVEMveTRVK0Q0TmtKQnhZZmk3b2NBdnBRNUFqVlJRWWQrSEFlNEJ1QXYrZUVOUjlURzhiUHRPU1BDQllXMStZbGxGYXhtOGtLT29CZ0IrRlpHOTBEWk1wbjJqbFhtRmJITjJyc2lCM2VxbW9SMzVGRVZSRkVWUkZFVlJGRVZSRkVWUkZFWEZvWDhCaTBTb2xUb3hDVkFBQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdXJsLWxvYWRlciEuL3NyYy91dGlsL2ljb25zLzNkLXdoaXRlLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsLmpzIn0=