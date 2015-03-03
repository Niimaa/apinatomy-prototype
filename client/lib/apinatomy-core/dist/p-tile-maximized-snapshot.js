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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5ODZjZDY2OGRjZjc0YzY3MDcwYyIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLW1heGltaXplZC1zbmFwc2hvdC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7Ozs7OztBQzdDRCxnRCIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5ODZjZDY2OGRjZjc0YzY3MDcwY1xuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbigkKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG4gICAgbmFtZTogJ3RpbGUtbWF4aW1pemVkLXNuYXBzaG90JyxcbiAgICByZXNvbHZlczogWyd0aWxlLW1heGltaXplZCcsICdzbmFwc2hvdCddXG4gIH0pO1xuICBwbHVnaW4uaW5zZXJ0KCdTbmFwc2hvdC5wcm90b3R5cGUudGFrZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzTWF4aW1pemVkKSB7XG4gICAgICB0aGlzLm9iamVjdC50aWxlc01heGltaXplZCA9IHt9O1xuICAgICAgdGhpcy5jaXJjdWl0Ym9hcmQudHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RpbGUnLCAoZnVuY3Rpb24odGlsZSkge1xuICAgICAgICBpZiAodGlsZS5tYXhpbWl6ZWQpIHtcbiAgICAgICAgICAkX18wLm9iamVjdC50aWxlc01heGltaXplZFt0aWxlLm1vZGVsLmlkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc05vdE1heGltaXplZCkge1xuICAgICAgdGhpcy5vYmplY3QudGlsZXNOb3RNYXhpbWl6ZWQgPSB7fTtcbiAgICAgIHRoaXMuY2lyY3VpdGJvYXJkLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaWxlJywgKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgaWYgKCF0aWxlLm1heGltaXplZCkge1xuICAgICAgICAgICRfXzAub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkW3RpbGUubW9kZWwuaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfSkuaW5zZXJ0KCdTbmFwc2hvdC5wcm90b3R5cGUucmVzdG9yZScsIGZ1bmN0aW9uKCkge1xuICAgIHZhciAkX18wID0gdGhpcztcbiAgICBpZiAodGhpcy5vcHRpb25zLnRpbGVzTWF4aW1pemVkKSB7XG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm9iamVjdC50aWxlc01heGltaXplZCkuZmlsdGVyKChmdW5jdGlvbihpZCkge1xuICAgICAgICByZXR1cm4gJF9fMC5vYmplY3QudGlsZXNNYXhpbWl6ZWRbaWRdO1xuICAgICAgfSkpLmZvckVhY2goKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICRfXzAuY2lyY3VpdGJvYXJkLnRpbGUoaWQpLnRoZW4oKGZ1bmN0aW9uKHRpbGUpIHtcbiAgICAgICAgICB0aWxlLm1heGltaXplZCA9IHRydWU7XG4gICAgICAgIH0pKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3B0aW9ucy50aWxlc05vdE1heGltaXplZCkge1xuICAgICAgT2JqZWN0LmtleXModGhpcy5vYmplY3QudGlsZXNOb3RNYXhpbWl6ZWQpLmZpbHRlcigoZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgcmV0dXJuICRfXzAub2JqZWN0LnRpbGVzTm90TWF4aW1pemVkW2lkXTtcbiAgICAgIH0pKS5mb3JFYWNoKChmdW5jdGlvbihpZCkge1xuICAgICAgICAkX18wLmNpcmN1aXRib2FyZC50aWxlKGlkKS50aGVuKChmdW5jdGlvbih0aWxlKSB7XG4gICAgICAgICAgdGlsZS5tYXhpbWl6ZWQgPSBmYWxzZTtcbiAgICAgICAgfSkpO1xuICAgICAgfSkpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcC10aWxlLW1heGltaXplZC1zbmFwc2hvdC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGlsZS1tYXhpbWl6ZWQtc25hcHNob3QuanMifQ==