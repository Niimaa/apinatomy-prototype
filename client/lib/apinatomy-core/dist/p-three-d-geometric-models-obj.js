(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"), require("three-js"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery", "three-js"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery"), require("three-js")) : factory(root["jQuery"], root["THREE"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function($, THREE) {
	  'use strict';
	  var plugin = $.circuitboard.plugin({
	    name: 'three-d-geometric-models-obj',
	    requires: ['three-d-geometric-models']
	  });
	  plugin.add('Circuitboard.threeJsLoaders.obj', THREE.OBJLoader);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function(THREE) {
	  THREE.OBJLoader = function(manager) {
	    this.manager = (manager !== undefined) ? manager : THREE.DefaultLoadingManager;
	  };
	  THREE.OBJLoader.prototype = {
	    constructor: THREE.OBJLoader,
	    load: function(url, onLoad, onProgress, onError) {
	      var scope = this;
	      var loader = new THREE.XHRLoader(scope.manager);
	      loader.setCrossOrigin(this.crossOrigin);
	      loader.load(url, function(text) {
	        onLoad(scope.parse(text));
	      });
	    },
	    parse: function(text) {
	      function vector(x, y, z) {
	        return new THREE.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
	      }
	      function uv(u, v) {
	        return new THREE.Vector2(parseFloat(u), parseFloat(v));
	      }
	      function face3(a, b, c, normals) {
	        return new THREE.Face3(a, b, c, normals);
	      }
	      var object = new THREE.Object3D();
	      var geometry,
	          material,
	          mesh;
	      function parseVertexIndex(index) {
	        index = parseInt(index);
	        return index >= 0 ? index - 1 : index + vertices.length;
	      }
	      function parseNormalIndex(index) {
	        index = parseInt(index);
	        return index >= 0 ? index - 1 : index + normals.length;
	      }
	      function parseUVIndex(index) {
	        index = parseInt(index);
	        return index >= 0 ? index - 1 : index + uvs.length;
	      }
	      function add_face(a, b, c, normals_inds) {
	        if (normals_inds === undefined) {
	          geometry.faces.push(face3(vertices[parseVertexIndex(a)] - 1, vertices[parseVertexIndex(b)] - 1, vertices[parseVertexIndex(c)] - 1));
	        } else {
	          geometry.faces.push(face3(vertices[parseVertexIndex(a)] - 1, vertices[parseVertexIndex(b)] - 1, vertices[parseVertexIndex(c)] - 1, [normals[parseNormalIndex(normals_inds[0])].clone(), normals[parseNormalIndex(normals_inds[1])].clone(), normals[parseNormalIndex(normals_inds[2])].clone()]));
	        }
	      }
	      function add_uvs(a, b, c) {
	        geometry.faceVertexUvs[0].push([uvs[parseUVIndex(a)].clone(), uvs[parseUVIndex(b)].clone(), uvs[parseUVIndex(c)].clone()]);
	      }
	      function handle_face_line(faces, uvs, normals_inds) {
	        if (faces[3] === undefined) {
	          add_face(faces[0], faces[1], faces[2], normals_inds);
	          if (uvs !== undefined && uvs.length > 0) {
	            add_uvs(uvs[0], uvs[1], uvs[2]);
	          }
	        } else {
	          if (normals_inds !== undefined && normals_inds.length > 0) {
	            add_face(faces[0], faces[1], faces[3], [normals_inds[0], normals_inds[1], normals_inds[3]]);
	            add_face(faces[1], faces[2], faces[3], [normals_inds[1], normals_inds[2], normals_inds[3]]);
	          } else {
	            add_face(faces[0], faces[1], faces[3]);
	            add_face(faces[1], faces[2], faces[3]);
	          }
	          if (uvs !== undefined && uvs.length > 0) {
	            add_uvs(uvs[0], uvs[1], uvs[3]);
	            add_uvs(uvs[1], uvs[2], uvs[3]);
	          }
	        }
	      }
	      if (/^o /gm.test(text) === false) {
	        geometry = new THREE.Geometry();
	        material = new THREE.MeshLambertMaterial();
	        mesh = new THREE.Mesh(geometry, material);
	        object.add(mesh);
	      }
	      var vertices = [];
	      var normals = [];
	      var uvs = [];
	      var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;
	      var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;
	      var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;
	      var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;
	      var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;
	      var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;
	      var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/;
	      var lines = text.split('\n');
	      for (var i = 0; i < lines.length; i++) {
	        var line = lines[i];
	        line = line.trim();
	        var result;
	        if (line.length === 0 || line.charAt(0) === '#') {
	          continue;
	        } else if ((result = vertex_pattern.exec(line)) !== null) {
	          vertices.push(geometry.vertices.push(vector(result[1], result[2], result[3])));
	        } else if ((result = normal_pattern.exec(line)) !== null) {
	          normals.push(vector(result[1], result[2], result[3]));
	        } else if ((result = uv_pattern.exec(line)) !== null) {
	          uvs.push(uv(result[1], result[2]));
	        } else if ((result = face_pattern1.exec(line)) !== null) {
	          handle_face_line([result[1], result[2], result[3], result[4]]);
	        } else if ((result = face_pattern2.exec(line)) !== null) {
	          handle_face_line([result[2], result[5], result[8], result[11]], [result[3], result[6], result[9], result[12]]);
	        } else if ((result = face_pattern3.exec(line)) !== null) {
	          handle_face_line([result[2], result[6], result[10], result[14]], [result[3], result[7], result[11], result[15]], [result[4], result[8], result[12], result[16]]);
	        } else if ((result = face_pattern4.exec(line)) !== null) {
	          handle_face_line([result[2], result[5], result[8], result[11]], [], [result[3], result[6], result[9], result[12]]);
	        } else if (/^o /.test(line)) {
	          geometry = new THREE.Geometry();
	          material = new THREE.MeshLambertMaterial();
	          mesh = new THREE.Mesh(geometry, material);
	          mesh.name = line.substring(2).trim();
	          object.add(mesh);
	        } else if (/^g /.test(line)) {} else if (/^usemtl /.test(line)) {
	          material.name = line.substring(7).trim();
	        } else if (/^mtllib /.test(line)) {} else if (/^s /.test(line)) {} else {}
	      }
	      var children = object.children;
	      for (var i = 0,
	          l = children.length; i < l; i++) {
	        var geometry = children[i].geometry;
	        geometry.computeFaceNormals();
	        geometry.computeBoundingSphere();
	      }
	      return object;
	    }
	  };
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjNDA5NWUyY2I4MDg2NjFjZmE3ZCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtb2JqLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9PQkpMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsRUFBQzs7Ozs7OztBQ1BELGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsa0JBQWtCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVMsOEJBQThCO0FBQ3ZDO0FBQ0EsVUFBUyxtQ0FBbUMsOEJBQThCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLCtCQUE4QixPQUFPO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjNDA5NWUyY2I4MDg2NjFjZmE3ZFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICcuL3V0aWwvT0JKTG9hZGVyLmpzJ10sIGZ1bmN0aW9uKCQsIFRIUkVFKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG4gICAgbmFtZTogJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1vYmonLFxuICAgIHJlcXVpcmVzOiBbJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscyddXG4gIH0pO1xuICBwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMub2JqJywgVEhSRUUuT0JKTG9hZGVyKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1vYmouanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uKFRIUkVFKSB7XG4gIFRIUkVFLk9CSkxvYWRlciA9IGZ1bmN0aW9uKG1hbmFnZXIpIHtcbiAgICB0aGlzLm1hbmFnZXIgPSAobWFuYWdlciAhPT0gdW5kZWZpbmVkKSA/IG1hbmFnZXIgOiBUSFJFRS5EZWZhdWx0TG9hZGluZ01hbmFnZXI7XG4gIH07XG4gIFRIUkVFLk9CSkxvYWRlci5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IFRIUkVFLk9CSkxvYWRlcixcbiAgICBsb2FkOiBmdW5jdGlvbih1cmwsIG9uTG9hZCwgb25Qcm9ncmVzcywgb25FcnJvcikge1xuICAgICAgdmFyIHNjb3BlID0gdGhpcztcbiAgICAgIHZhciBsb2FkZXIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKHNjb3BlLm1hbmFnZXIpO1xuICAgICAgbG9hZGVyLnNldENyb3NzT3JpZ2luKHRoaXMuY3Jvc3NPcmlnaW4pO1xuICAgICAgbG9hZGVyLmxvYWQodXJsLCBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIG9uTG9hZChzY29wZS5wYXJzZSh0ZXh0KSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICBmdW5jdGlvbiB2ZWN0b3IoeCwgeSwgeikge1xuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMocGFyc2VGbG9hdCh4KSwgcGFyc2VGbG9hdCh5KSwgcGFyc2VGbG9hdCh6KSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB1dih1LCB2KSB7XG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMihwYXJzZUZsb2F0KHUpLCBwYXJzZUZsb2F0KHYpKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGZhY2UzKGEsIGIsIGMsIG5vcm1hbHMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5GYWNlMyhhLCBiLCBjLCBub3JtYWxzKTtcbiAgICAgIH1cbiAgICAgIHZhciBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcbiAgICAgIHZhciBnZW9tZXRyeSxcbiAgICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgICBtZXNoO1xuICAgICAgZnVuY3Rpb24gcGFyc2VWZXJ0ZXhJbmRleChpbmRleCkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIHZlcnRpY2VzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHBhcnNlTm9ybWFsSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleCk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyBub3JtYWxzLmxlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHBhcnNlVVZJbmRleChpbmRleCkge1xuICAgICAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4KTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIHV2cy5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBhZGRfZmFjZShhLCBiLCBjLCBub3JtYWxzX2luZHMpIHtcbiAgICAgICAgaWYgKG5vcm1hbHNfaW5kcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZ2VvbWV0cnkuZmFjZXMucHVzaChmYWNlMyh2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGEpXSAtIDEsIHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYildIC0gMSwgdmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChjKV0gLSAxKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ2VvbWV0cnkuZmFjZXMucHVzaChmYWNlMyh2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGEpXSAtIDEsIHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYildIC0gMSwgdmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChjKV0gLSAxLCBbbm9ybWFsc1twYXJzZU5vcm1hbEluZGV4KG5vcm1hbHNfaW5kc1swXSldLmNsb25lKCksIG5vcm1hbHNbcGFyc2VOb3JtYWxJbmRleChub3JtYWxzX2luZHNbMV0pXS5jbG9uZSgpLCBub3JtYWxzW3BhcnNlTm9ybWFsSW5kZXgobm9ybWFsc19pbmRzWzJdKV0uY2xvbmUoKV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYWRkX3V2cyhhLCBiLCBjKSB7XG4gICAgICAgIGdlb21ldHJ5LmZhY2VWZXJ0ZXhVdnNbMF0ucHVzaChbdXZzW3BhcnNlVVZJbmRleChhKV0uY2xvbmUoKSwgdXZzW3BhcnNlVVZJbmRleChiKV0uY2xvbmUoKSwgdXZzW3BhcnNlVVZJbmRleChjKV0uY2xvbmUoKV0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gaGFuZGxlX2ZhY2VfbGluZShmYWNlcywgdXZzLCBub3JtYWxzX2luZHMpIHtcbiAgICAgICAgaWYgKGZhY2VzWzNdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBhZGRfZmFjZShmYWNlc1swXSwgZmFjZXNbMV0sIGZhY2VzWzJdLCBub3JtYWxzX2luZHMpO1xuICAgICAgICAgIGlmICh1dnMgIT09IHVuZGVmaW5lZCAmJiB1dnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWRkX3V2cyh1dnNbMF0sIHV2c1sxXSwgdXZzWzJdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG5vcm1hbHNfaW5kcyAhPT0gdW5kZWZpbmVkICYmIG5vcm1hbHNfaW5kcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhZGRfZmFjZShmYWNlc1swXSwgZmFjZXNbMV0sIGZhY2VzWzNdLCBbbm9ybWFsc19pbmRzWzBdLCBub3JtYWxzX2luZHNbMV0sIG5vcm1hbHNfaW5kc1szXV0pO1xuICAgICAgICAgICAgYWRkX2ZhY2UoZmFjZXNbMV0sIGZhY2VzWzJdLCBmYWNlc1szXSwgW25vcm1hbHNfaW5kc1sxXSwgbm9ybWFsc19pbmRzWzJdLCBub3JtYWxzX2luZHNbM11dKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkX2ZhY2UoZmFjZXNbMF0sIGZhY2VzWzFdLCBmYWNlc1szXSk7XG4gICAgICAgICAgICBhZGRfZmFjZShmYWNlc1sxXSwgZmFjZXNbMl0sIGZhY2VzWzNdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHV2cyAhPT0gdW5kZWZpbmVkICYmIHV2cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBhZGRfdXZzKHV2c1swXSwgdXZzWzFdLCB1dnNbM10pO1xuICAgICAgICAgICAgYWRkX3V2cyh1dnNbMV0sIHV2c1syXSwgdXZzWzNdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgvXm8gL2dtLnRlc3QodGV4dCkgPT09IGZhbHNlKSB7XG4gICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKTtcbiAgICAgICAgbWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgICAgIG9iamVjdC5hZGQobWVzaCk7XG4gICAgICB9XG4gICAgICB2YXIgdmVydGljZXMgPSBbXTtcbiAgICAgIHZhciBub3JtYWxzID0gW107XG4gICAgICB2YXIgdXZzID0gW107XG4gICAgICB2YXIgdmVydGV4X3BhdHRlcm4gPSAvdiggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKS87XG4gICAgICB2YXIgbm9ybWFsX3BhdHRlcm4gPSAvdm4oICtbXFxkfFxcLnxcXCt8XFwtfGVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykvO1xuICAgICAgdmFyIHV2X3BhdHRlcm4gPSAvdnQoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykvO1xuICAgICAgdmFyIGZhY2VfcGF0dGVybjEgPSAvZiggKy0/XFxkKykoICstP1xcZCspKCArLT9cXGQrKSggKy0/XFxkKyk/LztcbiAgICAgIHZhciBmYWNlX3BhdHRlcm4yID0gL2YoICsoLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspKT8vO1xuICAgICAgdmFyIGZhY2VfcGF0dGVybjMgPSAvZiggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSk/LztcbiAgICAgIHZhciBmYWNlX3BhdHRlcm40ID0gL2YoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKSggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKT8vO1xuICAgICAgdmFyIGxpbmVzID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIGxpbmUgPSBsaW5lLnRyaW0oKTtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID09PSAwIHx8IGxpbmUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gdmVydGV4X3BhdHRlcm4uZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcbiAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKGdlb21ldHJ5LnZlcnRpY2VzLnB1c2godmVjdG9yKHJlc3VsdFsxXSwgcmVzdWx0WzJdLCByZXN1bHRbM10pKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IG5vcm1hbF9wYXR0ZXJuLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgbm9ybWFscy5wdXNoKHZlY3RvcihyZXN1bHRbMV0sIHJlc3VsdFsyXSwgcmVzdWx0WzNdKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IHV2X3BhdHRlcm4uZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcbiAgICAgICAgICB1dnMucHVzaCh1dihyZXN1bHRbMV0sIHJlc3VsdFsyXSkpO1xuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBmYWNlX3BhdHRlcm4xLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgaGFuZGxlX2ZhY2VfbGluZShbcmVzdWx0WzFdLCByZXN1bHRbMl0sIHJlc3VsdFszXSwgcmVzdWx0WzRdXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IGZhY2VfcGF0dGVybjIuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBoYW5kbGVfZmFjZV9saW5lKFtyZXN1bHRbMl0sIHJlc3VsdFs1XSwgcmVzdWx0WzhdLCByZXN1bHRbMTFdXSwgW3Jlc3VsdFszXSwgcmVzdWx0WzZdLCByZXN1bHRbOV0sIHJlc3VsdFsxMl1dKTtcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gZmFjZV9wYXR0ZXJuMy5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIGhhbmRsZV9mYWNlX2xpbmUoW3Jlc3VsdFsyXSwgcmVzdWx0WzZdLCByZXN1bHRbMTBdLCByZXN1bHRbMTRdXSwgW3Jlc3VsdFszXSwgcmVzdWx0WzddLCByZXN1bHRbMTFdLCByZXN1bHRbMTVdXSwgW3Jlc3VsdFs0XSwgcmVzdWx0WzhdLCByZXN1bHRbMTJdLCByZXN1bHRbMTZdXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IGZhY2VfcGF0dGVybjQuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBoYW5kbGVfZmFjZV9saW5lKFtyZXN1bHRbMl0sIHJlc3VsdFs1XSwgcmVzdWx0WzhdLCByZXN1bHRbMTFdXSwgW10sIFtyZXN1bHRbM10sIHJlc3VsdFs2XSwgcmVzdWx0WzldLCByZXN1bHRbMTJdXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15vIC8udGVzdChsaW5lKSkge1xuICAgICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaExhbWJlcnRNYXRlcmlhbCgpO1xuICAgICAgICAgIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICAgIG1lc2gubmFtZSA9IGxpbmUuc3Vic3RyaW5nKDIpLnRyaW0oKTtcbiAgICAgICAgICBvYmplY3QuYWRkKG1lc2gpO1xuICAgICAgICB9IGVsc2UgaWYgKC9eZyAvLnRlc3QobGluZSkpIHt9IGVsc2UgaWYgKC9edXNlbXRsIC8udGVzdChsaW5lKSkge1xuICAgICAgICAgIG1hdGVyaWFsLm5hbWUgPSBsaW5lLnN1YnN0cmluZyg3KS50cmltKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoL15tdGxsaWIgLy50ZXN0KGxpbmUpKSB7fSBlbHNlIGlmICgvXnMgLy50ZXN0KGxpbmUpKSB7fSBlbHNlIHt9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW4gPSBvYmplY3QuY2hpbGRyZW47XG4gICAgICBmb3IgKHZhciBpID0gMCxcbiAgICAgICAgICBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBnZW9tZXRyeSA9IGNoaWxkcmVuW2ldLmdlb21ldHJ5O1xuICAgICAgICBnZW9tZXRyeS5jb21wdXRlRmFjZU5vcm1hbHMoKTtcbiAgICAgICAgZ2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2JqZWN0O1xuICAgIH1cbiAgfTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL09CSkxvYWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLW9iai5qcyJ9