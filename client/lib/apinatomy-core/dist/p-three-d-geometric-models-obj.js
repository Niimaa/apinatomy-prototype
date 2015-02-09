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
	
	//# sourceMappingURL=<compileOutput>


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
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxODExNGNkNzllMjRjN2E3M2M4ZSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtb2JqLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9PQkpMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHO0FBQ3RCLGNBQVcsQ0FBQztBQUlSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsK0JBQTZCO0FBQ25DLFlBQU8sQ0FBRyxFQUFDLDBCQUF5QixDQUFDO0FBQUEsR0FDdEMsQ0FBQyxDQUFDO0FBSUYsUUFBSyxJQUFLLENBQUMsaUNBQWdDLENBQUcsTUFBSSxVQUFVLENBQUMsQ0FBQztBQUcvRCxFQUFDLCtJQUFDO0FBQ0Y7Ozs7Ozs7O0FDcEJBLGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ09BLGlDQUFRLHVCQUFVLENBQUcsMENBQVUsS0FBSSxDQUFHO0FBR3JDLE9BQUksVUFBVSxFQUFJLFVBQVUsT0FBTSxDQUFHO0FBRXBDLFFBQUcsUUFBUSxFQUFJLEVBQUUsT0FBTSxJQUFNLFVBQVEsQ0FBRSxFQUFJLFFBQU0sRUFBSSxNQUFJLHNCQUFzQixDQUFDO0dBRWpGLENBQUM7QUFFRCxPQUFJLFVBQVUsVUFBVSxFQUFJO0FBRTNCLGVBQVUsQ0FBRyxNQUFJLFVBQVU7QUFFM0IsUUFBRyxDQUFHLFVBQVUsR0FBRSxDQUFHLE9BQUssQ0FBRyxXQUFTLENBQUcsUUFBTSxDQUFHO0FBRTdDLGVBQUksRUFBSSxLQUFHLENBQUM7QUFFWixnQkFBSyxFQUFJLElBQUksTUFBSSxVQUFXLENBQUMsS0FBSSxRQUFRLENBQUMsQ0FBQztBQUMvQyxZQUFLLGVBQWdCLENBQUMsSUFBRyxZQUFZLENBQUMsQ0FBQztBQUN2QyxZQUFLLEtBQU0sQ0FBQyxHQUFFLENBQUcsVUFBVSxJQUFHLENBQUc7QUFFaEMsY0FBTSxDQUFDLEtBQUksTUFBTyxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUM7T0FFMUIsQ0FBQyxDQUFDO0tBRUg7QUFFQSxTQUFJLENBQUcsVUFBVSxJQUFHLENBQUc7QUFFdEIsY0FBUyxPQUFLLENBQUUsRUFBRyxHQUFHLEdBQUc7QUFFeEIsY0FBTyxJQUFJLE1BQUksUUFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUcsV0FBVSxDQUFDLEVBQUMsQ0FBRyxXQUFVLENBQUMsRUFBQyxDQUFDLENBQUM7T0FFdEU7QUFFQSxjQUFTLEdBQUMsQ0FBRSxFQUFHLEdBQUc7QUFFakIsY0FBTyxJQUFJLE1BQUksUUFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFDLENBQUcsV0FBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDO09BRXZEO0FBRUEsY0FBUyxNQUFJLENBQUUsRUFBRyxHQUFHLEdBQUcsUUFBTSxDQUFHO0FBRWhDLGNBQU8sSUFBSSxNQUFJLE1BQU8sQ0FBQyxFQUFHLEdBQUcsR0FBRyxRQUFNLENBQUMsQ0FBQztPQUV6QztBQUVJLGdCQUFLLEVBQUksSUFBSSxNQUFJLFNBQVUsRUFBQyxDQUFDO0FBQzdCLGtCQUFPO0FBQUcsa0JBQU87QUFBRyxjQUFHLENBQUM7QUFFNUIsY0FBUyxpQkFBZSxDQUFFLEtBQUksQ0FBRztBQUVoQyxhQUFJLEVBQUksU0FBUSxDQUFDLEtBQUksQ0FBQyxDQUFDO0FBRXZCLGNBQU8sTUFBSSxHQUFLLElBQUksTUFBSSxFQUFJLElBQUksTUFBSSxFQUFJLFNBQU8sT0FBTyxDQUFDO09BRXhEO0FBRUEsY0FBUyxpQkFBZSxDQUFFLEtBQUksQ0FBRztBQUVoQyxhQUFJLEVBQUksU0FBUSxDQUFDLEtBQUksQ0FBQyxDQUFDO0FBRXZCLGNBQU8sTUFBSSxHQUFLLElBQUksTUFBSSxFQUFJLElBQUksTUFBSSxFQUFJLFFBQU0sT0FBTyxDQUFDO09BRXZEO0FBRUEsY0FBUyxhQUFXLENBQUUsS0FBSSxDQUFHO0FBRTVCLGFBQUksRUFBSSxTQUFRLENBQUMsS0FBSSxDQUFDLENBQUM7QUFFdkIsY0FBTyxNQUFJLEdBQUssSUFBSSxNQUFJLEVBQUksSUFBSSxNQUFJLEVBQUksSUFBRSxPQUFPLENBQUM7T0FFbkQ7QUFFQSxjQUFTLFNBQU8sQ0FBRSxFQUFHLEdBQUcsR0FBRyxhQUFXLENBQUc7QUFFeEMsWUFBSSxZQUFXLElBQU0sVUFBUSxDQUFHO0FBRS9CLGtCQUFPLE1BQU0sS0FBTSxDQUFDLEtBQUssQ0FDdkIsUUFBTyxDQUFFLGdCQUFnQixDQUFDLEVBQUMsQ0FBQyxFQUFJLEdBQ2hDLFNBQU8sQ0FBRSxnQkFBZ0IsQ0FBQyxFQUFDLENBQUMsRUFBSSxHQUNoQyxTQUFPLENBQUUsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLEVBQUksR0FDbEMsQ0FBQyxDQUFDO1NBRUgsS0FBTztBQUVOLGtCQUFPLE1BQU0sS0FBTSxDQUFDLEtBQUssQ0FDdkIsUUFBTyxDQUFFLGdCQUFnQixDQUFDLEVBQUMsQ0FBQyxFQUFJLEdBQ2hDLFNBQU8sQ0FBRSxnQkFBZ0IsQ0FBQyxFQUFDLENBQUMsRUFBSSxHQUNoQyxTQUFPLENBQUUsZ0JBQWdCLENBQUMsRUFBQyxDQUFDLEVBQUksR0FDaEMsRUFDQyxPQUFNLENBQUUsZ0JBQWdCLENBQUMsWUFBVyxDQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU8sRUFBQyxDQUNqRCxRQUFNLENBQUUsZ0JBQWdCLENBQUMsWUFBVyxDQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU8sRUFBQyxDQUNqRCxRQUFNLENBQUUsZ0JBQWdCLENBQUMsWUFBVyxDQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU8sRUFBQyxDQUNsRCxDQUNGLENBQUMsQ0FBQztTQUVIO0FBQUEsT0FFRDtBQUVBLGNBQVMsUUFBTSxDQUFFLEVBQUcsR0FBRyxHQUFHO0FBRXpCLGdCQUFPLGNBQWMsQ0FBRSxFQUFDLEtBQU0sQ0FBQyxDQUM5QixHQUFFLENBQUUsWUFBWSxDQUFDLEVBQUMsQ0FBQyxNQUFPLEVBQUMsQ0FDM0IsSUFBRSxDQUFFLFlBQVksQ0FBQyxFQUFDLENBQUMsTUFBTyxFQUFDLENBQzNCLElBQUUsQ0FBRSxZQUFZLENBQUMsRUFBQyxDQUFDLE1BQU8sRUFBQyxDQUM1QixDQUFDLENBQUM7T0FFSDtBQUVBLGNBQVMsaUJBQWUsQ0FBRSxLQUFJLENBQUcsSUFBRSxDQUFHLGFBQVcsQ0FBRztBQUVuRCxZQUFJLEtBQUksQ0FBRSxFQUFDLElBQU0sVUFBUSxDQUFHO0FBRTNCLGtCQUFRLENBQUMsS0FBSSxDQUFFLEVBQUMsQ0FBRyxNQUFJLENBQUUsRUFBQyxDQUFHLE1BQUksQ0FBRSxFQUFDLENBQUcsYUFBVyxDQUFDLENBQUM7QUFFcEQsY0FBSSxHQUFFLElBQU0sVUFBUSxHQUFLLElBQUUsT0FBTyxFQUFJLEdBQUc7QUFFeEMsbUJBQU8sQ0FBQyxHQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRSxFQUFDLENBQUcsSUFBRSxDQUFFLEVBQUMsQ0FBQyxDQUFDO1dBRWhDO0FBQUEsU0FFRCxLQUFPO0FBRU4sY0FBSSxZQUFXLElBQU0sVUFBUSxHQUFLLGFBQVcsT0FBTyxFQUFJLEdBQUc7QUFFMUQsb0JBQVEsQ0FBQyxLQUFJLENBQUUsRUFBQyxDQUFHLE1BQUksQ0FBRSxFQUFDLENBQUcsTUFBSSxDQUFFLEVBQUMsQ0FBRyxFQUFDLFlBQVcsQ0FBRSxFQUFDLENBQUcsYUFBVyxDQUFFLEVBQUMsQ0FBRyxhQUFXLENBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUMzRixvQkFBUSxDQUFDLEtBQUksQ0FBRSxFQUFDLENBQUcsTUFBSSxDQUFFLEVBQUMsQ0FBRyxNQUFJLENBQUUsRUFBQyxDQUFHLEVBQUMsWUFBVyxDQUFFLEVBQUMsQ0FBRyxhQUFXLENBQUUsRUFBQyxDQUFHLGFBQVcsQ0FBRSxFQUFDLENBQUMsQ0FBQyxDQUFDO1dBRTVGLEtBQU87QUFFTixvQkFBUSxDQUFDLEtBQUksQ0FBRSxFQUFDLENBQUcsTUFBSSxDQUFFLEVBQUMsQ0FBRyxNQUFJLENBQUUsRUFBQyxDQUFDLENBQUM7QUFDdEMsb0JBQVEsQ0FBQyxLQUFJLENBQUUsRUFBQyxDQUFHLE1BQUksQ0FBRSxFQUFDLENBQUcsTUFBSSxDQUFFLEVBQUMsQ0FBQyxDQUFDO1dBRXZDO0FBRUEsY0FBSSxHQUFFLElBQU0sVUFBUSxHQUFLLElBQUUsT0FBTyxFQUFJLEdBQUc7QUFFeEMsbUJBQU8sQ0FBQyxHQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRSxFQUFDLENBQUcsSUFBRSxDQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQy9CLG1CQUFPLENBQUMsR0FBRSxDQUFFLEVBQUMsQ0FBRyxJQUFFLENBQUUsRUFBQyxDQUFHLElBQUUsQ0FBRSxFQUFDLENBQUMsQ0FBQztXQUVoQztBQUFBLFNBRUQ7QUFBQSxPQUVEO0FBSUEsVUFBSSxPQUFNLEtBQU0sQ0FBQyxJQUFHLENBQUMsSUFBTSxNQUFJLENBQUc7QUFFakMsZ0JBQU8sRUFBSSxJQUFJLE1BQUksU0FBVSxFQUFDLENBQUM7QUFDL0IsZ0JBQU8sRUFBSSxJQUFJLE1BQUksb0JBQXFCLEVBQUMsQ0FBQztBQUMxQyxZQUFHLEVBQUksSUFBSSxNQUFJLEtBQU0sQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLENBQUM7QUFDekMsY0FBSyxJQUFLLENBQUMsSUFBRyxDQUFDLENBQUM7T0FFakI7QUFFSSxrQkFBTyxFQUFJLEdBQUMsQ0FBQztBQUNiLGlCQUFNLEVBQUksR0FBQyxDQUFDO0FBQ1osYUFBRSxFQUFJLEdBQUMsQ0FBQztBQUlSLHdCQUFhLEVBQUksZ0VBQThELENBQUM7QUFJaEYsd0JBQWEsRUFBSSxpRUFBK0QsQ0FBQztBQUlqRixvQkFBUyxFQUFJLDZDQUEyQyxDQUFDO0FBSXpELHVCQUFZLEVBQUkseUNBQXVDLENBQUM7QUFJeEQsdUJBQVksRUFBSSxxRkFBbUYsQ0FBQztBQUlwRyx1QkFBWSxFQUFJLHlIQUF1SCxDQUFDO0FBSXhJLHVCQUFZLEVBQUksNkZBQTJGO0FBSTNHLGVBQUksRUFBSSxLQUFHLE1BQU8sQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUU1QixXQUFTLE9BQUksR0FBRyxJQUFJLE1BQUksT0FBTyxDQUFHLElBQUUsQ0FBRztBQUVsQyxnQkFBRyxFQUFJLE1BQUksQ0FBRSxFQUFDLENBQUM7QUFDbkIsWUFBRyxFQUFJLEtBQUcsS0FBTSxFQUFDLENBQUM7QUFFZCxrQkFBSyxDQUFDO0FBRVYsWUFBSSxJQUFHLE9BQU8sSUFBTSxLQUFLLEtBQUcsT0FBUSxDQUFDLEVBQUMsSUFBTSxJQUFFLENBQUc7QUFFaEQsbUJBQVE7U0FFVCxLQUFPLEtBQUksQ0FBRSxNQUFLLEVBQUksZUFBYSxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUUsSUFBTSxLQUFHLENBQUc7QUFJM0Qsa0JBQU8sS0FBTSxDQUNYLFFBQU8sU0FBUyxLQUFNLENBQ3BCLE1BQU0sQ0FDSixNQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FDaEMsQ0FDRixDQUNGLENBQUM7U0FFRixLQUFPLEtBQUksQ0FBRSxNQUFLLEVBQUksZUFBYSxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUUsSUFBTSxLQUFHLENBQUc7QUFJM0QsaUJBQU0sS0FBTSxDQUNWLE1BQU0sQ0FDSixNQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FDaEMsQ0FDRixDQUFDO1NBRUYsS0FBTyxLQUFJLENBQUUsTUFBSyxFQUFJLFdBQVMsS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFFLElBQU0sS0FBRyxDQUFHO0FBSXZELGFBQUUsS0FBTSxDQUNOLEVBQUUsQ0FDQSxNQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQ3JCLENBQ0YsQ0FBQztTQUVGLEtBQU8sS0FBSSxDQUFFLE1BQUssRUFBSSxjQUFZLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBRSxJQUFNLEtBQUcsQ0FBRztBQUkxRCwwQkFBZ0IsQ0FDZCxDQUFDLE1BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUMsQ0FDN0MsQ0FBQztTQUVGLEtBQU8sS0FBSSxDQUFFLE1BQUssRUFBSSxjQUFZLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBRSxJQUFNLEtBQUcsQ0FBRztBQUkxRCwwQkFBZ0IsQ0FDZCxDQUFDLE1BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUMsQ0FBQyxDQUM1QyxFQUFDLE1BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUMsQ0FBQyxDQUM5QyxDQUFDO1NBRUYsS0FBTyxLQUFJLENBQUUsTUFBSyxFQUFJLGNBQVksS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFFLElBQU0sS0FBRyxDQUFHO0FBSTFELDBCQUFnQixDQUNkLENBQUMsTUFBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFDLENBQUMsQ0FDN0MsRUFBQyxNQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUMsQ0FBQyxDQUM3QyxFQUFDLE1BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBQyxDQUFDLENBQy9DLENBQUM7U0FFRixLQUFPLEtBQUksQ0FBRSxNQUFLLEVBQUksY0FBWSxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUUsSUFBTSxLQUFHLENBQUc7QUFJMUQsMEJBQWdCLENBQ2QsQ0FBQyxNQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFDLENBQUMsQ0FDNUMsR0FBQyxDQUNELEVBQUMsTUFBSyxDQUFFLEVBQUMsQ0FBRyxPQUFLLENBQUUsRUFBQyxDQUFHLE9BQUssQ0FBRSxFQUFDLENBQUcsT0FBSyxDQUFFLEVBQUMsQ0FBQyxDQUFDLENBQzlDLENBQUM7U0FFRixLQUFPLEtBQUksS0FBSSxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUc7QUFFNUIsa0JBQU8sRUFBSSxJQUFJLE1BQUksU0FBVSxFQUFDLENBQUM7QUFDL0Isa0JBQU8sRUFBSSxJQUFJLE1BQUksb0JBQXFCLEVBQUMsQ0FBQztBQUUxQyxjQUFHLEVBQUksSUFBSSxNQUFJLEtBQU0sQ0FBQyxRQUFPLENBQUcsU0FBTyxDQUFDLENBQUM7QUFDekMsY0FBRyxLQUFLLEVBQUksS0FBRyxVQUFXLENBQUMsRUFBQyxLQUFNLEVBQUMsQ0FBQztBQUNwQyxnQkFBSyxJQUFLLENBQUMsSUFBRyxDQUFDLENBQUM7U0FFakIsS0FBTyxLQUFJLEtBQUksS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFHLEdBSTdCLEtBQU8sS0FBSSxVQUFTLEtBQU0sQ0FBQyxJQUFHLENBQUMsQ0FBRztBQUlqQyxrQkFBTyxLQUFLLEVBQUksS0FBRyxVQUFXLENBQUMsRUFBQyxLQUFNLEVBQUMsQ0FBQztTQUV6QyxLQUFPLEtBQUksVUFBUyxLQUFNLENBQUMsSUFBRyxDQUFDLENBQUcsR0FJbEMsS0FBTyxLQUFJLEtBQUksS0FBTSxDQUFDLElBQUcsQ0FBQyxDQUFHLEdBSTdCLEtBQU8sR0FJUDtBQUFBLE9BRUQ7QUFFSSxrQkFBTyxFQUFJLE9BQUssU0FBUyxDQUFDO0FBRTlCLFdBQVMsT0FBSTtBQUFHLGFBQUksU0FBTyxPQUFPLENBQUcsSUFBSSxHQUFHLElBQUUsQ0FBRztBQUU1QyxvQkFBTyxFQUFJLFNBQU8sQ0FBRSxFQUFDLFNBQVMsQ0FBQztBQUVuQyxnQkFBTyxtQkFBb0IsRUFBQyxDQUFDO0FBQzdCLGdCQUFPLHNCQUF1QixFQUFDLENBQUM7T0FFakM7QUFFQSxZQUFPLE9BQUssQ0FBQztLQUVkO0FBQUEsR0FFRCxDQUFDO0FBR0YsRUFBQywrSUFBQztBQUdGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDE4MTE0Y2Q3OWUyNGM3YTczYzhlXG4gKiovIiwiZGVmaW5lKFtcblx0J2pxdWVyeScsXG5cdCd0aHJlZS1qcycsXG5cdCcuL3V0aWwvT0JKTG9hZGVyLmpzJ1xuXSwgZnVuY3Rpb24gKCQsIFRIUkVFKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXG5cdC8qIHRoZSBwbHVnaW4gKi9cblx0dmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbih7XG5cdFx0bmFtZTogJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1vYmonLFxuXHRcdHJlcXVpcmVzOiBbJ3RocmVlLWQtZ2VvbWV0cmljLW1vZGVscyddXG5cdH0pO1xuXG5cblx0LyogdGhlIGxvYWRlciAqL1xuXHRwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMub2JqJywgVEhSRUUuT0JKTG9hZGVyKTtcblxuXG59KTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3AtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLW9iai5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLyoqXG4gKiBAYXV0aG9yIG1yZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cblxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5kZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblxuXG5cdFRIUkVFLk9CSkxvYWRlciA9IGZ1bmN0aW9uIChtYW5hZ2VyKSB7XG5cblx0XHR0aGlzLm1hbmFnZXIgPSAoIG1hbmFnZXIgIT09IHVuZGVmaW5lZCApID8gbWFuYWdlciA6IFRIUkVFLkRlZmF1bHRMb2FkaW5nTWFuYWdlcjtcblxuXHR9O1xuXG5cdFRIUkVFLk9CSkxvYWRlci5wcm90b3R5cGUgPSB7XG5cblx0XHRjb25zdHJ1Y3RvcjogVEhSRUUuT0JKTG9hZGVyLFxuXG5cdFx0bG9hZDogZnVuY3Rpb24gKHVybCwgb25Mb2FkLCBvblByb2dyZXNzLCBvbkVycm9yKSB7XG5cblx0XHRcdHZhciBzY29wZSA9IHRoaXM7XG5cblx0XHRcdHZhciBsb2FkZXIgPSBuZXcgVEhSRUUuWEhSTG9hZGVyKHNjb3BlLm1hbmFnZXIpO1xuXHRcdFx0bG9hZGVyLnNldENyb3NzT3JpZ2luKHRoaXMuY3Jvc3NPcmlnaW4pO1xuXHRcdFx0bG9hZGVyLmxvYWQodXJsLCBmdW5jdGlvbiAodGV4dCkge1xuXG5cdFx0XHRcdG9uTG9hZChzY29wZS5wYXJzZSh0ZXh0KSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSxcblxuXHRcdHBhcnNlOiBmdW5jdGlvbiAodGV4dCkge1xuXG5cdFx0XHRmdW5jdGlvbiB2ZWN0b3IoeCwgeSwgeikge1xuXG5cdFx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMyhwYXJzZUZsb2F0KHgpLCBwYXJzZUZsb2F0KHkpLCBwYXJzZUZsb2F0KHopKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiB1dih1LCB2KSB7XG5cblx0XHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKHBhcnNlRmxvYXQodSksIHBhcnNlRmxvYXQodikpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGZhY2UzKGEsIGIsIGMsIG5vcm1hbHMpIHtcblxuXHRcdFx0XHRyZXR1cm4gbmV3IFRIUkVFLkZhY2UzKGEsIGIsIGMsIG5vcm1hbHMpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhciBvYmplY3QgPSBuZXcgVEhSRUUuT2JqZWN0M0QoKTtcblx0XHRcdHZhciBnZW9tZXRyeSwgbWF0ZXJpYWwsIG1lc2g7XG5cblx0XHRcdGZ1bmN0aW9uIHBhcnNlVmVydGV4SW5kZXgoaW5kZXgpIHtcblxuXHRcdFx0XHRpbmRleCA9IHBhcnNlSW50KGluZGV4KTtcblxuXHRcdFx0XHRyZXR1cm4gaW5kZXggPj0gMCA/IGluZGV4IC0gMSA6IGluZGV4ICsgdmVydGljZXMubGVuZ3RoO1xuXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHBhcnNlTm9ybWFsSW5kZXgoaW5kZXgpIHtcblxuXHRcdFx0XHRpbmRleCA9IHBhcnNlSW50KGluZGV4KTtcblxuXHRcdFx0XHRyZXR1cm4gaW5kZXggPj0gMCA/IGluZGV4IC0gMSA6IGluZGV4ICsgbm9ybWFscy5sZW5ndGg7XG5cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gcGFyc2VVVkluZGV4KGluZGV4KSB7XG5cblx0XHRcdFx0aW5kZXggPSBwYXJzZUludChpbmRleCk7XG5cblx0XHRcdFx0cmV0dXJuIGluZGV4ID49IDAgPyBpbmRleCAtIDEgOiBpbmRleCArIHV2cy5sZW5ndGg7XG5cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gYWRkX2ZhY2UoYSwgYiwgYywgbm9ybWFsc19pbmRzKSB7XG5cblx0XHRcdFx0aWYgKG5vcm1hbHNfaW5kcyA9PT0gdW5kZWZpbmVkKSB7XG5cblx0XHRcdFx0XHRnZW9tZXRyeS5mYWNlcy5wdXNoKGZhY2UzKFxuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGEpXSAtIDEsXG5cdFx0XHRcdFx0XHRcdHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYildIC0gMSxcblx0XHRcdFx0XHRcdFx0dmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChjKV0gLSAxXG5cdFx0XHRcdFx0KSk7XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdGdlb21ldHJ5LmZhY2VzLnB1c2goZmFjZTMoXG5cdFx0XHRcdFx0XHRcdHZlcnRpY2VzW3BhcnNlVmVydGV4SW5kZXgoYSldIC0gMSxcblx0XHRcdFx0XHRcdFx0dmVydGljZXNbcGFyc2VWZXJ0ZXhJbmRleChiKV0gLSAxLFxuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNlc1twYXJzZVZlcnRleEluZGV4KGMpXSAtIDEsXG5cdFx0XHRcdFx0XHRcdFtcblx0XHRcdFx0XHRcdFx0XHRub3JtYWxzW3BhcnNlTm9ybWFsSW5kZXgobm9ybWFsc19pbmRzWzBdKV0uY2xvbmUoKSxcblx0XHRcdFx0XHRcdFx0XHRub3JtYWxzW3BhcnNlTm9ybWFsSW5kZXgobm9ybWFsc19pbmRzWzFdKV0uY2xvbmUoKSxcblx0XHRcdFx0XHRcdFx0XHRub3JtYWxzW3BhcnNlTm9ybWFsSW5kZXgobm9ybWFsc19pbmRzWzJdKV0uY2xvbmUoKVxuXHRcdFx0XHRcdFx0XHRdXG5cdFx0XHRcdFx0KSk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGFkZF91dnMoYSwgYiwgYykge1xuXG5cdFx0XHRcdGdlb21ldHJ5LmZhY2VWZXJ0ZXhVdnNbMF0ucHVzaChbXG5cdFx0XHRcdFx0dXZzW3BhcnNlVVZJbmRleChhKV0uY2xvbmUoKSxcblx0XHRcdFx0XHR1dnNbcGFyc2VVVkluZGV4KGIpXS5jbG9uZSgpLFxuXHRcdFx0XHRcdHV2c1twYXJzZVVWSW5kZXgoYyldLmNsb25lKClcblx0XHRcdFx0XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gaGFuZGxlX2ZhY2VfbGluZShmYWNlcywgdXZzLCBub3JtYWxzX2luZHMpIHtcblxuXHRcdFx0XHRpZiAoZmFjZXNbM10gPT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdFx0YWRkX2ZhY2UoZmFjZXNbMF0sIGZhY2VzWzFdLCBmYWNlc1syXSwgbm9ybWFsc19pbmRzKTtcblxuXHRcdFx0XHRcdGlmICh1dnMgIT09IHVuZGVmaW5lZCAmJiB1dnMubGVuZ3RoID4gMCkge1xuXG5cdFx0XHRcdFx0XHRhZGRfdXZzKHV2c1swXSwgdXZzWzFdLCB1dnNbMl0pO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRpZiAobm9ybWFsc19pbmRzICE9PSB1bmRlZmluZWQgJiYgbm9ybWFsc19pbmRzLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0XHRcdFx0YWRkX2ZhY2UoZmFjZXNbMF0sIGZhY2VzWzFdLCBmYWNlc1szXSwgW25vcm1hbHNfaW5kc1swXSwgbm9ybWFsc19pbmRzWzFdLCBub3JtYWxzX2luZHNbM11dKTtcblx0XHRcdFx0XHRcdGFkZF9mYWNlKGZhY2VzWzFdLCBmYWNlc1syXSwgZmFjZXNbM10sIFtub3JtYWxzX2luZHNbMV0sIG5vcm1hbHNfaW5kc1syXSwgbm9ybWFsc19pbmRzWzNdXSk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0XHRhZGRfZmFjZShmYWNlc1swXSwgZmFjZXNbMV0sIGZhY2VzWzNdKTtcblx0XHRcdFx0XHRcdGFkZF9mYWNlKGZhY2VzWzFdLCBmYWNlc1syXSwgZmFjZXNbM10pO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHV2cyAhPT0gdW5kZWZpbmVkICYmIHV2cy5sZW5ndGggPiAwKSB7XG5cblx0XHRcdFx0XHRcdGFkZF91dnModXZzWzBdLCB1dnNbMV0sIHV2c1szXSk7XG5cdFx0XHRcdFx0XHRhZGRfdXZzKHV2c1sxXSwgdXZzWzJdLCB1dnNbM10pO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBjcmVhdGUgbWVzaCBpZiBubyBvYmplY3RzIGluIHRleHRcblxuXHRcdFx0aWYgKC9ebyAvZ20udGVzdCh0ZXh0KSA9PT0gZmFsc2UpIHtcblxuXHRcdFx0XHRnZW9tZXRyeSA9IG5ldyBUSFJFRS5HZW9tZXRyeSgpO1xuXHRcdFx0XHRtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKCk7XG5cdFx0XHRcdG1lc2ggPSBuZXcgVEhSRUUuTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuXHRcdFx0XHRvYmplY3QuYWRkKG1lc2gpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhciB2ZXJ0aWNlcyA9IFtdO1xuXHRcdFx0dmFyIG5vcm1hbHMgPSBbXTtcblx0XHRcdHZhciB1dnMgPSBbXTtcblxuXHRcdFx0Ly8gdiBmbG9hdCBmbG9hdCBmbG9hdFxuXG5cdFx0XHR2YXIgdmVydGV4X3BhdHRlcm4gPSAvdiggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKS87XG5cblx0XHRcdC8vIHZuIGZsb2F0IGZsb2F0IGZsb2F0XG5cblx0XHRcdHZhciBub3JtYWxfcGF0dGVybiA9IC92biggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKSggK1tcXGR8XFwufFxcK3xcXC18ZV0rKS87XG5cblx0XHRcdC8vIHZ0IGZsb2F0IGZsb2F0XG5cblx0XHRcdHZhciB1dl9wYXR0ZXJuID0gL3Z0KCArW1xcZHxcXC58XFwrfFxcLXxlXSspKCArW1xcZHxcXC58XFwrfFxcLXxlXSspLztcblxuXHRcdFx0Ly8gZiB2ZXJ0ZXggdmVydGV4IHZlcnRleCAuLi5cblxuXHRcdFx0dmFyIGZhY2VfcGF0dGVybjEgPSAvZiggKy0/XFxkKykoICstP1xcZCspKCArLT9cXGQrKSggKy0/XFxkKyk/LztcblxuXHRcdFx0Ly8gZiB2ZXJ0ZXgvdXYgdmVydGV4L3V2IHZlcnRleC91diAuLi5cblxuXHRcdFx0dmFyIGZhY2VfcGF0dGVybjIgPSAvZiggKygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKykpPy87XG5cblx0XHRcdC8vIGYgdmVydGV4L3V2L25vcm1hbCB2ZXJ0ZXgvdXYvbm9ybWFsIHZlcnRleC91di9ub3JtYWwgLi4uXG5cblx0XHRcdHZhciBmYWNlX3BhdHRlcm4zID0gL2YoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC8oLT9cXGQrKVxcLygtP1xcZCspKSggKygtP1xcZCspXFwvKC0/XFxkKylcXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcLygtP1xcZCspXFwvKC0/XFxkKykpPy87XG5cblx0XHRcdC8vIGYgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWwgdmVydGV4Ly9ub3JtYWwgLi4uXG5cblx0XHRcdHZhciBmYWNlX3BhdHRlcm40ID0gL2YoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKSggKygtP1xcZCspXFwvXFwvKC0/XFxkKykpKCArKC0/XFxkKylcXC9cXC8oLT9cXGQrKSkoICsoLT9cXGQrKVxcL1xcLygtP1xcZCspKT8vXG5cblx0XHRcdC8vXG5cblx0XHRcdHZhciBsaW5lcyA9IHRleHQuc3BsaXQoJ1xcbicpO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIGxpbmUgPSBsaW5lc1tpXTtcblx0XHRcdFx0bGluZSA9IGxpbmUudHJpbSgpO1xuXG5cdFx0XHRcdHZhciByZXN1bHQ7XG5cblx0XHRcdFx0aWYgKGxpbmUubGVuZ3RoID09PSAwIHx8IGxpbmUuY2hhckF0KDApID09PSAnIycpIHtcblxuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoKCByZXN1bHQgPSB2ZXJ0ZXhfcGF0dGVybi5leGVjKGxpbmUpICkgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdC8vIFtcInYgMS4wIDIuMCAzLjBcIiwgXCIxLjBcIiwgXCIyLjBcIiwgXCIzLjBcIl1cblxuXHRcdFx0XHRcdHZlcnRpY2VzLnB1c2goXG5cdFx0XHRcdFx0XHRcdGdlb21ldHJ5LnZlcnRpY2VzLnB1c2goXG5cdFx0XHRcdFx0XHRcdFx0XHR2ZWN0b3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0WzFdLCByZXN1bHRbMl0sIHJlc3VsdFszXVxuXHRcdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCggcmVzdWx0ID0gbm9ybWFsX3BhdHRlcm4uZXhlYyhsaW5lKSApICE9PSBudWxsKSB7XG5cblx0XHRcdFx0XHQvLyBbXCJ2biAxLjAgMi4wIDMuMFwiLCBcIjEuMFwiLCBcIjIuMFwiLCBcIjMuMFwiXVxuXG5cdFx0XHRcdFx0bm9ybWFscy5wdXNoKFxuXHRcdFx0XHRcdFx0XHR2ZWN0b3IoXG5cdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHRbMV0sIHJlc3VsdFsyXSwgcmVzdWx0WzNdXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoKCByZXN1bHQgPSB1dl9wYXR0ZXJuLmV4ZWMobGluZSkgKSAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0Ly8gW1widnQgMC4xIDAuMlwiLCBcIjAuMVwiLCBcIjAuMlwiXVxuXG5cdFx0XHRcdFx0dXZzLnB1c2goXG5cdFx0XHRcdFx0XHRcdHV2KFxuXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0WzFdLCByZXN1bHRbMl1cblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0fSBlbHNlIGlmICgoIHJlc3VsdCA9IGZhY2VfcGF0dGVybjEuZXhlYyhsaW5lKSApICE9PSBudWxsKSB7XG5cblx0XHRcdFx0XHQvLyBbXCJmIDEgMiAzXCIsIFwiMVwiLCBcIjJcIiwgXCIzXCIsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdGhhbmRsZV9mYWNlX2xpbmUoXG5cdFx0XHRcdFx0XHRcdFtyZXN1bHRbMV0sIHJlc3VsdFsyXSwgcmVzdWx0WzNdLCByZXN1bHRbNF1dXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuMi5leGVjKGxpbmUpICkgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdC8vIFtcImYgMS8xIDIvMiAzLzNcIiwgXCIgMS8xXCIsIFwiMVwiLCBcIjFcIiwgXCIgMi8yXCIsIFwiMlwiLCBcIjJcIiwgXCIgMy8zXCIsIFwiM1wiLCBcIjNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdGhhbmRsZV9mYWNlX2xpbmUoXG5cdFx0XHRcdFx0XHRcdFtyZXN1bHRbMl0sIHJlc3VsdFs1XSwgcmVzdWx0WzhdLCByZXN1bHRbMTFdXSwgLy9mYWNlc1xuXHRcdFx0XHRcdFx0XHRbcmVzdWx0WzNdLCByZXN1bHRbNl0sIHJlc3VsdFs5XSwgcmVzdWx0WzEyXV0gLy91dlxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0fSBlbHNlIGlmICgoIHJlc3VsdCA9IGZhY2VfcGF0dGVybjMuZXhlYyhsaW5lKSApICE9PSBudWxsKSB7XG5cblx0XHRcdFx0XHQvLyBbXCJmIDEvMS8xIDIvMi8yIDMvMy8zXCIsIFwiIDEvMS8xXCIsIFwiMVwiLCBcIjFcIiwgXCIxXCIsIFwiIDIvMi8yXCIsIFwiMlwiLCBcIjJcIiwgXCIyXCIsIFwiIDMvMy8zXCIsIFwiM1wiLCBcIjNcIiwgXCIzXCIsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdGhhbmRsZV9mYWNlX2xpbmUoXG5cdFx0XHRcdFx0XHRcdFtyZXN1bHRbMl0sIHJlc3VsdFs2XSwgcmVzdWx0WzEwXSwgcmVzdWx0WzE0XV0sIC8vZmFjZXNcblx0XHRcdFx0XHRcdFx0W3Jlc3VsdFszXSwgcmVzdWx0WzddLCByZXN1bHRbMTFdLCByZXN1bHRbMTVdXSwgLy91dlxuXHRcdFx0XHRcdFx0XHRbcmVzdWx0WzRdLCByZXN1bHRbOF0sIHJlc3VsdFsxMl0sIHJlc3VsdFsxNl1dIC8vbm9ybWFsXG5cdFx0XHRcdFx0KTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCggcmVzdWx0ID0gZmFjZV9wYXR0ZXJuNC5leGVjKGxpbmUpICkgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdC8vIFtcImYgMS8vMSAyLy8yIDMvLzNcIiwgXCIgMS8vMVwiLCBcIjFcIiwgXCIxXCIsIFwiIDIvLzJcIiwgXCIyXCIsIFwiMlwiLCBcIiAzLy8zXCIsIFwiM1wiLCBcIjNcIiwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cblxuXHRcdFx0XHRcdGhhbmRsZV9mYWNlX2xpbmUoXG5cdFx0XHRcdFx0XHRcdFtyZXN1bHRbMl0sIHJlc3VsdFs1XSwgcmVzdWx0WzhdLCByZXN1bHRbMTFdXSwgLy9mYWNlc1xuXHRcdFx0XHRcdFx0XHRbXSwgLy91dlxuXHRcdFx0XHRcdFx0XHRbcmVzdWx0WzNdLCByZXN1bHRbNl0sIHJlc3VsdFs5XSwgcmVzdWx0WzEyXV0gLy9ub3JtYWxcblx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoL15vIC8udGVzdChsaW5lKSkge1xuXG5cdFx0XHRcdFx0Z2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcblx0XHRcdFx0XHRtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoTGFtYmVydE1hdGVyaWFsKCk7XG5cblx0XHRcdFx0XHRtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcblx0XHRcdFx0XHRtZXNoLm5hbWUgPSBsaW5lLnN1YnN0cmluZygyKS50cmltKCk7XG5cdFx0XHRcdFx0b2JqZWN0LmFkZChtZXNoKTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKC9eZyAvLnRlc3QobGluZSkpIHtcblxuXHRcdFx0XHRcdC8vIGdyb3VwXG5cblx0XHRcdFx0fSBlbHNlIGlmICgvXnVzZW10bCAvLnRlc3QobGluZSkpIHtcblxuXHRcdFx0XHRcdC8vIG1hdGVyaWFsXG5cblx0XHRcdFx0XHRtYXRlcmlhbC5uYW1lID0gbGluZS5zdWJzdHJpbmcoNykudHJpbSgpO1xuXG5cdFx0XHRcdH0gZWxzZSBpZiAoL15tdGxsaWIgLy50ZXN0KGxpbmUpKSB7XG5cblx0XHRcdFx0XHQvLyBtdGwgZmlsZVxuXG5cdFx0XHRcdH0gZWxzZSBpZiAoL15zIC8udGVzdChsaW5lKSkge1xuXG5cdFx0XHRcdFx0Ly8gc21vb3RoIHNoYWRpbmdcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coIFwiVEhSRUUuT0JKTG9hZGVyOiBVbmhhbmRsZWQgbGluZSBcIiArIGxpbmUgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyIGNoaWxkcmVuID0gb2JqZWN0LmNoaWxkcmVuO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXG5cdFx0XHRcdHZhciBnZW9tZXRyeSA9IGNoaWxkcmVuW2ldLmdlb21ldHJ5O1xuXG5cdFx0XHRcdGdlb21ldHJ5LmNvbXB1dGVGYWNlTm9ybWFscygpO1xuXHRcdFx0XHRnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gb2JqZWN0O1xuXG5cdFx0fVxuXG5cdH07XG5cblxufSk7XG5cbi8qIGpzaGludCBpZ25vcmU6ZW5kICovXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy91dGlsL09CSkxvYWRlci5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLW9iai5qcyJ9