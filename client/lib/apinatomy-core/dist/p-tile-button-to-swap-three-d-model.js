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
	    name: 'tile-button-to-swap-three-d-model',
	    requires: ['tile-buttons', 'three-d-geometric-models']
	  });
	  plugin.append('Tile.prototype.construct', function() {
	    var models = [null].concat(this.children.filter((function(child) {
	      return child.type === 'ThreeDModel';
	    })));
	    if (models.length > 1) {
	      this.addButton({
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
	  });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	//# sourceMappingURL=<compileOutput>


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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmOWNkNWQxMmUxNjM2ZjBiMTI0YSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9Iiwid2VicGFjazovLy8uL3NyYy91dGlsL2ljb25zLzNkLXdoaXRlLnBuZyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7aUVDdENBLGlDQUFRLHVCQUFRLENBQUcsMENBQVU7QUFDNUIsY0FBVyxDQUFDO0FBR1IsWUFBSyxFQUFJLGVBQWEsT0FBUSxDQUFDO0FBQ2xDLFFBQUcsQ0FBRyxvQ0FBa0M7QUFDeEMsWUFBTyxDQUFHLEVBQUMsY0FBYSxDQUFHLDJCQUF5QixDQUFDO0FBQUEsR0FDdEQsQ0FBQyxDQUFDO0FBR0YsUUFBSyxPQUFRLENBQUMsMEJBQXlCLENBQUcsVUFBVTtBQUcvQyxjQUFLLEVBQUksRUFBQyxJQUFHLENBQUMsT0FBUSxDQUFDLElBQUcsU0FBUyxPQUFRLEVBQUMsU0FBQyxLQUFJO1lBQU0sTUFBSSxLQUFLLElBQU0sY0FBWTtLQUFBLEVBQUMsQ0FBQyxDQUFDO0FBRXpGLFFBQUksTUFBSyxPQUFPLEVBQUksR0FBRztBQUN0QixVQUFHLFVBQVcsQ0FBQztBQUFFLFlBQUcsQ0FBRyxjQUFZO0FBQUcsWUFBRyxDQUFHLHFCQUFRLEVBQStCO0FBQUEsT0FBRSxDQUFDLFFBQVMsRUFBQyxTQUFDO0FBSTVGLGNBQUM7QUFDTCxhQUFLLEdBQUksR0FBRyxJQUFJLE9BQUssT0FBTyxDQUFHLEdBQUUsRUFBRztBQUNuQyxjQUFJLE1BQUssQ0FBRSxFQUFDLFFBQVEsQ0FBRztBQUN0QixrQkFBSyxDQUFFLEVBQUMsUUFBUSxFQUFJLE1BQUksQ0FBQztBQUN6QixrQkFBSztXQUNOO0FBQUEsU0FDRDtBQUNBLFdBQUksRUFBQyxHQUFFLEdBQUMsRUFBSSxPQUFLLE9BQU8sQ0FBQztBQUN6QixZQUFJLE1BQUssQ0FBRSxFQUFDLENBQUc7QUFHZCxnQkFBSyxDQUFFLEVBQUMsd0JBQXlCLENBQUMsYUFBWSxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQUUsaUJBQUksUUFBUSxFQUFJLEtBQUc7V0FBRSxFQUFDLENBQUM7QUFHakYseUJBQVUsRUFBSSxNQUFJLENBQUM7QUFDbkIsNEJBQWEsRUFBSSxzQ0FBb0MsQ0FBQztBQUMxRCxnQkFBSyxDQUFFLEVBQUMsd0JBQXlCLENBQUMsYUFBWSxHQUFHLFNBQUMsS0FBSSxDQUFNO0FBQzNELDBCQUFhLEdBQUssWUFBVSxFQUFJLE1BQUksR0FBRyxFQUFJLEtBQUcsQ0FBQztXQUNoRCxFQUFHO0FBQ0YseUJBQVksQ0FBWixVQUFjLENBQUU7QUFBRSx5QkFBVSxHQUFLLE1BQUk7YUFBRTtBQUN2QywwQkFBYSxDQUFiLFVBQWUsQ0FBRTtBQUFFLHlCQUFVLEVBQUksWUFBVSxNQUFPLENBQUMsRUFBQzthQUFFO0FBQUEsV0FDdkQsQ0FBQyxDQUFDO0FBQ0YsaUJBQU0sSUFBSyxDQUFDLGNBQWEsQ0FBQyxDQUFDO1NBRTVCO0FBQUEsT0FFRCxFQUFDLENBQUM7S0FDSDtBQUFBLEdBRUQsQ0FBQyxDQUFDO0FBR0gsRUFBQywrSUFBQztBQUNGOzs7Ozs7OztBQ3JEQSxnRDs7Ozs7O0FDQUEsa0NBQWlDLHdvRSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmOWNkNWQxMmUxNjM2ZjBiMTI0YVxuICoqLyIsImRlZmluZShbJ2pxdWVyeSddLCBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblxuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsJyxcblx0XHRyZXF1aXJlczogWyd0aWxlLWJ1dHRvbnMnLCAndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzJ11cblx0fSk7XG5cblxuXHRwbHVnaW4uYXBwZW5kKCdUaWxlLnByb3RvdHlwZS5jb25zdHJ1Y3QnLCBmdW5jdGlvbiAoKSB7XG5cblx0XHQvKiBhbiBhcnJheSBjb250YWluaW5nIG51bGwsIGFuZCBlYWNoIDNEIG1vZGVsIGFydGVmYWN0ICovXG5cdFx0dmFyIG1vZGVscyA9IFtudWxsXS5jb25jYXQodGhpcy5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50eXBlID09PSAnVGhyZWVETW9kZWwnKSk7XG5cblx0XHRpZiAobW9kZWxzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHRoaXMuYWRkQnV0dG9uKHsgbmFtZTogJ3N3YXAzZE1vZGVsJywgaWNvbjogcmVxdWlyZSgndXJsIS4vdXRpbC9pY29ucy8zZC13aGl0ZS5wbmcnKSB9KS5vblZhbHVlKCgpID0+IHtcblxuXHRcdFx0XHQvLyB0aGUgYnV0dG9uIHN3aXRjaGVzIGJldHdlZW4gdGhlIGF2YWlsYWJsZSAzRCBtb2RlbHMgb24gdGhlIHRvcCBsZXZlbCBvZiB0aGUgdGlsZVxuXG5cdFx0XHRcdHZhciBpO1xuXHRcdFx0XHRmb3IgKGkgPSAxOyBpIDwgbW9kZWxzLmxlbmd0aDsgKytpKSB7XG5cdFx0XHRcdFx0aWYgKG1vZGVsc1tpXS52aXNpYmxlKSB7XG5cdFx0XHRcdFx0XHRtb2RlbHNbaV0udmlzaWJsZSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGkgPSAoaSsxKSAlIG1vZGVscy5sZW5ndGg7XG5cdFx0XHRcdGlmIChtb2RlbHNbaV0pIHtcblxuXHRcdFx0XHRcdC8qIG1ha2UgdGhlIGNvcnJlc3BvbmRpbmcgbW9kZWwgdmlzaWJsZSwgYXMgd2VsbCBhcyBhbGwgaXRzIGNoaWxkcmVuICovXG5cdFx0XHRcdFx0bW9kZWxzW2ldLnRyYXZlcnNlQXJ0ZWZhY3RzQnlUeXBlKCdUaHJlZURNb2RlbCcsIChtb2RlbCkgPT4geyBtb2RlbC52aXNpYmxlID0gdHJ1ZSB9KTtcblxuXHRcdFx0XHRcdC8qIHRlbXBvcmFyeSBpbmZvcm1hdGlvbiBpbiB0aGUgY29uc29sZSBmb3IgQmVybmFyZCAqLy8vIFRPRE86IHJlbW92ZSB3aGVuIHRoZSBjb3JyZXNwb25kaW5nIGRlbW8gaXMgb3ZlclxuXHRcdFx0XHRcdHZhciBpbmRlbnRhdGlvbiA9IFwiLS0gXCI7XG5cdFx0XHRcdFx0dmFyIG1vZGVsSGllcmFyY2h5ID0gXCJBdmFpbGFibGUgcGFydHMgb2YgdGhpcyAzRCBtb2RlbDpcXG5cIjtcblx0XHRcdFx0XHRtb2RlbHNbaV0udHJhdmVyc2VBcnRlZmFjdHNCeVR5cGUoJ1RocmVlRE1vZGVsJywgKG1vZGVsKSA9PiB7XG5cdFx0XHRcdFx0XHRtb2RlbEhpZXJhcmNoeSArPSBpbmRlbnRhdGlvbiArIG1vZGVsLmlkICsgJ1xcbic7XG5cdFx0XHRcdFx0fSwge1xuXHRcdFx0XHRcdFx0YmVmb3JlR29pbmdJbigpIHsgaW5kZW50YXRpb24gKz0gXCItLSBcIiB9LFxuXHRcdFx0XHRcdFx0YmVmb3JlR29pbmdPdXQoKSB7IGluZGVudGF0aW9uID0gaW5kZW50YXRpb24uc2xpY2UoMykgfVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKG1vZGVsSGllcmFyY2h5KTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXHR9KTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGlsZS1idXR0b24tdG8tc3dhcC10aHJlZS1kLW1vZGVsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBSUFBQUFDQUNBWUFBQUREUG1ITEFBQUdKa2xFUVZSNDJ1MmRUMnNrVlJURnowMTNwek1pZ2poUm1Xd0NNaUk0THNRd0VnWkVWQ0tJb0xpWDFDSWZ3VVZVY09FbkdHYzJJbG0wdUhBbC9oa1ltRmxsMDRoTVppRkJaNkdDQ0xNeElDaU9JUjNDZGRHM3pKdXlVMTNkZWRYMXF0NDVNSFNsNW5WM3ZmcWR1dSsrVzFWZEFFVlJGRVZSRkVWUkZFVlJGRVZSRk5Wd1NjZ2JwNnJ6b1c5ajVRQkZEaHBwQUZWZEJMQU1ZSjZZeCtxV2lBd2FZd0JWWFFKd0RzQWJBSmJJTjFkM0Fmd0U0THFJN0UzNjVuYkFSLzR6Qmo4aDQxejE3SFZaVmYrY05CTE1CUWovU1lQL1BPRVhVbUlIeWxUNVVydEc4SHRrZlI5MEwyb0hEcitYNmV4VzVPQ2ZCWERSNXdlMkE0ZWZWUWZBdHcwRzNBVnc0RTd4TENFK0QrQ0N3WC9iL3Zzelo3bWVCaGdEZnd2QWh1OTViK0E2T0NFaGZnckFjdzd3bXdDT2FoMEJDc0NQZXV3ZnMzOXVteUhxYVlCeDhFV2tiKzJ5UjMrZjhMRmxRMkU5RFZDZ2N6dXhBWjlpLzZ6V01na3MwamwzakZmVlN6RkZnS0w3SnhzWmEyR0FTZUNyYWhmQVNqWUpWTldPaUd6SEROL1dlVHMvTWhmaWtUK2k2Skh3eUM5bjlqUFg1TTRSZnNVR0lQenc5ODhjNGNjTHZ6UURFSDU5OWsrN0JwM3JFWDVORE9DcmM5YW0zN1JLWUlpUnNSMXk1NXBVK0FsMVdHeUgzTG1tVkFKRHpvbmFJWGF1U1pYQTBCUGlkZzA2bDlRMUdiVDk4elNHNS9PRG5BMjFUOUc1SlJ4ZnZjdXBYZzNoVDIwQTY5dzU1Sit2WGozRldhc0hBTHdHWU0xWnR3Ymduczh6WVROUVdmQUhsUm5BYnRkYXh2Rk5HOWtRdmVGaHUxb0FIZ093NzZ6YngvRGF1UFVhR1NESjFET0NpNHdURzBCRUJtYUM3RTBiU2NuYitvVDlxNk9DSFJhbkxRVjNRTlVldnM5Q2tPOE12V1d2UnlQV0g5VUVmRktIamZSWkN2WjUwMFlhWVE1SHJEK3N3WDdkcUlsSnZSckE1MDBiNlEwUzJZc2Zmd0R3VitEN2RCVTFrdGVUUWI3R09KdnFyWXpJK0Q4TnZSSllzMmxxV0hjSDU0eWxDYWhvRFVEUkFCUU5RTkVBVk9DemdKTFVJNmJJRE9CY0U5akpyTjhtc29naUFJRkhiZ0JWZlpHR2lOQUF6aldCNjVuMU5FR0VzNEFFckFSeUdralJBQlFOUU5FQVZEelRRRk9QbUNJekFDdUJqQUFFVGdPd0VoaXRBVmdKNUN6QVZRSldBamtOcEdnQWlnYWdhQUFxbm1tZ3FVZE1rUm1BbFVCR0FBS25BVmdKak5ZQXJBUnlGdUFxQVN1Qm5BWlNOQUJGQTFBMEFCWFBOTkRVSTZiSURNQktJQ01BZ2RNQXJBUkdhNENpbFVCcmx6ZU16THdkZ0xNNC9xbGIySElIUU5mOURjRVN2cmV4U1dDU2t3eXU1THl2WDFHN3gzSC83eGt2QXJoZ3k0Y2xmbTlqRGVCcVBZMENOanlzNTBTUlRoWHRBTnpPL0gwZXdPc0FMcnJHc0g3MDdjRllHem5mVzZoZE5sbzAwUURKQ1ZFZ0tUaDFyS3JkcU9jYytQN2VxUlZjSVNnZC81djB6RUFtZ2NYaHYycUxmOXRya1orZzd4WDgrS3JhL1FMZ1p3Qy9JLzlaQjVOK3I1c2I5VEhsYzRUYWdjRi96K0IvYkg5dkkvTjBrblFXWU9QeDJCckNyTnZaTE1EVkdUUEFkUUQvT0ovWFQxK3pCYStNZHB6WE4rM3pzL0IvQlBCOWJRMmdxcThBMkFUd01JQVhBQ3dBdUd4SnpmWnBDMFd6YkpldFhRQzRDZUJ6NUR3eVpzem5MYXBxK216R2srRHZpTWhVRVdBdUVQanZBM2pFT3JuTGtma1lQazUrTU9lcDRZZVNCTFlzTktidzl3QjhKQ0xYQ0w5YytKVU9BWGJrdDBUa2hqMkdiZ0dBQUxnaUl0OFFmaTc4T3o3Z1YyWUFWVjJ6TVg5ZlZlZEY1SnFxRGdETTg4Z3ZCUCtXRC9pVkdNQ0JmOVk2dWFDcUF4RzV3VEYvdHZCbm5nT282c3NaK0duQ04wLzRzNGRmUlJMWXh2QVp3RzdDZDRWaHZ4cjRNeHNDVlBVbEFKMU13Z2VEL3pYaFZ3Ti9KZ2F3c1A4dWdJTk13dGRsdGw4dC9OSU40TUIvbEFsZmVQQkx6UUdzSkxycHdOKzFlZjRDNFljQnYrd2tzSXZoR2FvVS9oOEFybkxNRHdkK0tVT0FIZm5kVE1MWHNvVHZTOElQQjc1dkF4eGF0cjlweTI3Q2QwWkV2b284OGo4VUd2d3lJc0E3R0Y0VXlZVHYvd29Pdm04RGZJamhGYkRwbU44QzhDQzUvNmZnNEplUkJLYnc1d0Y4SWlKZmtIdTQ4SDFIZ012TzhnZVc5Rnh5MW5VaU5rQ1E4SDBiNEMwQXY5bnlCZy82KytUQy95NFUrRDROa0pCeFlmaTdvY0F2cFE1QWpWUlFZZCtIQWU0QnVBditlRU5SOVRHOGJQdE9TUENCWVcxK1lsbEZheG04a0tPb0JnQitGWkc5MERaTXBuMmpsWG1GYkhOMnJzaUIzZXFtb1IzNUZFVlJGRVZSRkVWUkZFVlJGRVZSRkVYRm9YOEJpMFNvbFRveENWQUFBQUFBU1VWT1JLNUNZSUk9XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi91cmwtbG9hZGVyIS4vc3JjL3V0aWwvaWNvbnMvM2Qtd2hpdGUucG5nXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aWxlLWJ1dHRvbi10by1zd2FwLXRocmVlLWQtbW9kZWwuanMifQ==