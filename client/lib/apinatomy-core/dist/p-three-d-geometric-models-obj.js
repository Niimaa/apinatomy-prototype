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
	  var plugin = $.circuitboard.plugin.do('three-d-geometric-models-obj', {requires: ['three-d-geometric-models']});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYTc1ZjZjZTBhMTM5MzI4MWU0NSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtb2JqLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9PQkpMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0EsMEVBQXlFLHVDQUF1QztBQUNoSDtBQUNBLEVBQUM7Ozs7Ozs7QUNKRCxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztpRUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLGtCQUFrQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTLDhCQUE4QjtBQUN2QztBQUNBLFVBQVMsbUNBQW1DLDhCQUE4QjtBQUMxRTtBQUNBO0FBQ0E7QUFDQSwrQkFBOEIsT0FBTztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgY2E3NWY2Y2UwYTEzOTMyODFlNDVcbiAqKi8iLCJkZWZpbmUoWydqcXVlcnknLCAndGhyZWUtanMnLCAnLi91dGlsL09CSkxvYWRlci5qcyddLCBmdW5jdGlvbigkLCBUSFJFRSkge1xuICAndXNlIHN0cmljdCc7XG4gIHZhciBwbHVnaW4gPSAkLmNpcmN1aXRib2FyZC5wbHVnaW4uZG8oJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1vYmonLCB7cmVxdWlyZXM6IFsndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzJ119KTtcbiAgcGx1Z2luLmFkZCgnQ2lyY3VpdGJvYXJkLnRocmVlSnNMb2FkZXJzLm9iaicsIFRIUkVFLk9CSkxvYWRlcik7XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtb2JqLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJkZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbihUSFJFRSkge1xuICBUSFJFRS5PQkpMb2FkZXIgPSBmdW5jdGlvbihtYW5hZ2VyKSB7XG4gICAgdGhpcy5tYW5hZ2VyID0gKG1hbmFnZXIgIT09IHVuZGVmaW5lZCkgPyBtYW5hZ2VyIDogVEhSRUUuRGVmYXVsdExvYWRpbmdNYW5hZ2VyO1xuICB9O1xuICBUSFJFRS5PQkpMb2FkZXIucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBUSFJFRS5PQkpMb2FkZXIsXG4gICAgbG9hZDogZnVuY3Rpb24odXJsLCBvbkxvYWQsIG9uUHJvZ3Jlc3MsIG9uRXJyb3IpIHtcbiAgICAgIHZhciBzY29wZSA9IHRoaXM7XG4gICAgICB2YXIgbG9hZGVyID0gbmV3IFRIUkVFLlhIUkxvYWRlcihzY29wZS5tYW5hZ2VyKTtcbiAgICAgIGxvYWRlci5zZXRDcm9zc09yaWdpbih0aGlzLmNyb3NzT3JpZ2luKTtcbiAgICAgIGxvYWRlci5sb2FkKHVybCwgZnVuY3Rpb24odGV4dCkge1xuICAgICAgICBvbkxvYWQoc2NvcGUucGFyc2UodGV4dCkpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24odGV4dCkge1xuICAgICAgZnVuY3Rpb24gdmVjdG9yKHgsIHksIHopIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKHBhcnNlRmxvYXQoeCksIHBhcnNlRmxvYXQoeSksIHBhcnNlRmxvYXQoeikpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gdXYodSwgdikge1xuICAgICAgICByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIocGFyc2VGbG9hdCh1KSwgcGFyc2VGbG9hdCh2KSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmYWNlMyhhLCBiLCBjLCBub3JtYWxzKSB7XG4gICAgICAgIHJldHVybiBuZXcgVEhSRUUuRmFjZTMoYSwgYiwgYywgbm9ybWFscyk7XG4gICAgICB9XG4gICAgICB2YXIgb2JqZWN0ID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG4gICAgICB2YXIgZ2VvbWV0cnksXG4gICAgICAgICAgbWF0ZXJpYWwsXG4gICAgICAgICAgbWVzaDtcbiAgICAgIGZ1bmN0aW9uIHBhcnNlVmVydGV4SW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleCk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyB2ZXJ0aWNlcy5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwYXJzZU5vcm1hbEluZGV4KGluZGV4KSB7XG4gICAgICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgpO1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IGluZGV4IC0gMSA6IGluZGV4ICsgbm9ybWFscy5sZW5ndGg7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBwYXJzZVVWSW5kZXgoaW5kZXgpIHtcbiAgICAgICAgaW5kZXggPSBwYXJzZUludChpbmRleCk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gaW5kZXggLSAxIDogaW5kZXggKyB1dnMubGVuZ3RoO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gYWRkX2ZhY2UoYSwgYiwgYywgbm9ybWFsc19pbmRzKSB7XG4gICAgICAgIGlmIChub3JtYWxzX2luZHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGdlb21ldHJ5LmZhY2VzLnB1c2goZmFjZTModmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChhKV0gLSAxLCB2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGIpXSAtIDEsIHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYyldIC0gMSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdlb21ldHJ5LmZhY2VzLnB1c2goZmFjZTModmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChhKV0gLSAxLCB2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGIpXSAtIDEsIHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYyldIC0gMSwgW25vcm1hbHNbcGFyc2VOb3JtYWxJbmRleChub3JtYWxzX2luZHNbMF0pXS5jbG9uZSgpLCBub3JtYWxzW3BhcnNlTm9ybWFsSW5kZXgobm9ybWFsc19pbmRzWzFdKV0uY2xvbmUoKSwgbm9ybWFsc1twYXJzZU5vcm1hbEluZGV4KG5vcm1hbHNfaW5kc1syXSldLmNsb25lKCldKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGFkZF91dnMoYSwgYiwgYykge1xuICAgICAgICBnZW9tZXRyeS5mYWNlVmVydGV4VXZzWzBdLnB1c2goW3V2c1twYXJzZVVWSW5kZXgoYSldLmNsb25lKCksIHV2c1twYXJzZVVWSW5kZXgoYildLmNsb25lKCksIHV2c1twYXJzZVVWSW5kZXgoYyldLmNsb25lKCldKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGhhbmRsZV9mYWNlX2xpbmUoZmFjZXMsIHV2cywgbm9ybWFsc19pbmRzKSB7XG4gICAgICAgIGlmIChmYWNlc1szXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYWRkX2ZhY2UoZmFjZXNbMF0sIGZhY2VzWzFdLCBmYWNlc1syXSwgbm9ybWFsc19pbmRzKTtcbiAgICAgICAgICBpZiAodXZzICE9PSB1bmRlZmluZWQgJiYgdXZzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGFkZF91dnModXZzWzBdLCB1dnNbMV0sIHV2c1syXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChub3JtYWxzX2luZHMgIT09IHVuZGVmaW5lZCAmJiBub3JtYWxzX2luZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWRkX2ZhY2UoZmFjZXNbMF0sIGZhY2VzWzFdLCBmYWNlc1szXSwgW25vcm1hbHNfaW5kc1swXSwgbm9ybWFsc19pbmRzWzFdLCBub3JtYWxzX2luZHNbM11dKTtcbiAgICAgICAgICAgIGFkZF9mYWNlKGZhY2VzWzFdLCBmYWNlc1syXSwgZmFjZXNbM10sIFtub3JtYWxzX2luZHNbMV0sIG5vcm1hbHNfaW5kc1syXSwgbm9ybWFsc19pbmRzWzNdXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZF9mYWNlKGZhY2VzWzBdLCBmYWNlc1sxXSwgZmFjZXNbM10pO1xuICAgICAgICAgICAgYWRkX2ZhY2UoZmFjZXNbMV0sIGZhY2VzWzJdLCBmYWNlc1szXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh1dnMgIT09IHVuZGVmaW5lZCAmJiB1dnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgYWRkX3V2cyh1dnNbMF0sIHV2c1sxXSwgdXZzWzNdKTtcbiAgICAgICAgICAgIGFkZF91dnModXZzWzFdLCB1dnNbMl0sIHV2c1szXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoL15vIC9nbS50ZXN0KHRleHQpID09PSBmYWxzZSkge1xuICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xuICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKCk7XG4gICAgICAgIG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgICAgICBvYmplY3QuYWRkKG1lc2gpO1xuICAgICAgfVxuICAgICAgdmFyIHZlcnRpY2VzID0gW107XG4gICAgICB2YXIgbm9ybWFscyA9IFtdO1xuICAgICAgdmFyIHV2cyA9IFtdO1xuICAgICAgdmFyIHZlcnRleF9wYXR0ZXJuID0gL3YoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykoICtbXFxkfFxcLnxcXCt8XFwtfGVdKykvO1xuICAgICAgdmFyIG5vcm1hbF9wYXR0ZXJuID0gL3ZuKCArW1xcZHxcXC58XFwrfFxcLXxlXSspKCArW1xcZHxcXC58XFwrfFxcLXxlXSspKCArW1xcZHxcXC58XFwrfFxcLXxlXSspLztcbiAgICAgIHZhciB1dl9wYXR0ZXJuID0gL3Z0KCArW1xcZHxcXC58XFwrfFxcLXxlXSspKCArW1xcZHxcXC58XFwrfFxcLXxlXSspLztcbiAgICAgIHZhciBmYWNlX3BhdHRlcm4xID0gL2YoICstP1xcZCspKCArLT9cXGQrKSggKy0/XFxkKykoICstP1xcZCspPy87XG4gICAgICB2YXIgZmFjZV9wYXR0ZXJuMiA9IC9mKCArKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKSk/LztcbiAgICAgIHZhciBmYWNlX3BhdHRlcm4zID0gL2YoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpPy87XG4gICAgICB2YXIgZmFjZV9wYXR0ZXJuNCA9IC9mKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKSggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSk/LztcbiAgICAgIHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICBsaW5lID0gbGluZS50cmltKCk7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA9PT0gMCB8fCBsaW5lLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IHZlcnRleF9wYXR0ZXJuLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgdmVydGljZXMucHVzaChnZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKHZlY3RvcihyZXN1bHRbMV0sIHJlc3VsdFsyXSwgcmVzdWx0WzNdKSkpO1xuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBub3JtYWxfcGF0dGVybi5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIG5vcm1hbHMucHVzaCh2ZWN0b3IocmVzdWx0WzFdLCByZXN1bHRbMl0sIHJlc3VsdFszXSkpO1xuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSB1dl9wYXR0ZXJuLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgdXZzLnB1c2godXYocmVzdWx0WzFdLCByZXN1bHRbMl0pKTtcbiAgICAgICAgfSBlbHNlIGlmICgocmVzdWx0ID0gZmFjZV9wYXR0ZXJuMS5leGVjKGxpbmUpKSAhPT0gbnVsbCkge1xuICAgICAgICAgIGhhbmRsZV9mYWNlX2xpbmUoW3Jlc3VsdFsxXSwgcmVzdWx0WzJdLCByZXN1bHRbM10sIHJlc3VsdFs0XV0pO1xuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBmYWNlX3BhdHRlcm4yLmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgaGFuZGxlX2ZhY2VfbGluZShbcmVzdWx0WzJdLCByZXN1bHRbNV0sIHJlc3VsdFs4XSwgcmVzdWx0WzExXV0sIFtyZXN1bHRbM10sIHJlc3VsdFs2XSwgcmVzdWx0WzldLCByZXN1bHRbMTJdXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoKHJlc3VsdCA9IGZhY2VfcGF0dGVybjMuZXhlYyhsaW5lKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBoYW5kbGVfZmFjZV9saW5lKFtyZXN1bHRbMl0sIHJlc3VsdFs2XSwgcmVzdWx0WzEwXSwgcmVzdWx0WzE0XV0sIFtyZXN1bHRbM10sIHJlc3VsdFs3XSwgcmVzdWx0WzExXSwgcmVzdWx0WzE1XV0sIFtyZXN1bHRbNF0sIHJlc3VsdFs4XSwgcmVzdWx0WzEyXSwgcmVzdWx0WzE2XV0pO1xuICAgICAgICB9IGVsc2UgaWYgKChyZXN1bHQgPSBmYWNlX3BhdHRlcm40LmV4ZWMobGluZSkpICE9PSBudWxsKSB7XG4gICAgICAgICAgaGFuZGxlX2ZhY2VfbGluZShbcmVzdWx0WzJdLCByZXN1bHRbNV0sIHJlc3VsdFs4XSwgcmVzdWx0WzExXV0sIFtdLCBbcmVzdWx0WzNdLCByZXN1bHRbNl0sIHJlc3VsdFs5XSwgcmVzdWx0WzEyXV0pO1xuICAgICAgICB9IGVsc2UgaWYgKC9ebyAvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xuICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hMYW1iZXJ0TWF0ZXJpYWwoKTtcbiAgICAgICAgICBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgICBtZXNoLm5hbWUgPSBsaW5lLnN1YnN0cmluZygyKS50cmltKCk7XG4gICAgICAgICAgb2JqZWN0LmFkZChtZXNoKTtcbiAgICAgICAgfSBlbHNlIGlmICgvXmcgLy50ZXN0KGxpbmUpKSB7fSBlbHNlIGlmICgvXnVzZW10bCAvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICBtYXRlcmlhbC5uYW1lID0gbGluZS5zdWJzdHJpbmcoNykudHJpbSgpO1xuICAgICAgICB9IGVsc2UgaWYgKC9ebXRsbGliIC8udGVzdChsaW5lKSkge30gZWxzZSBpZiAoL15zIC8udGVzdChsaW5lKSkge30gZWxzZSB7fVxuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuID0gb2JqZWN0LmNoaWxkcmVuO1xuICAgICAgZm9yICh2YXIgaSA9IDAsXG4gICAgICAgICAgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgZ2VvbWV0cnkgPSBjaGlsZHJlbltpXS5nZW9tZXRyeTtcbiAgICAgICAgZ2VvbWV0cnkuY29tcHV0ZUZhY2VOb3JtYWxzKCk7XG4gICAgICAgIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdDtcbiAgICB9XG4gIH07XG59KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdXRpbC9PQkpMb2FkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJwLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1vYmouanMifQ==