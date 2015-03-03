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
	    name: 'three-d-geometric-models-stl',
	    requires: ['three-d-geometric-models']
	  });
	  plugin.add('Circuitboard.threeJsLoaders.stl', THREE.STLLoader);
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
	  THREE.STLLoader = function() {};
	  THREE.STLLoader.prototype = {constructor: THREE.STLLoader};
	  THREE.STLLoader.prototype.load = function(url, callback) {
	    var scope = this;
	    var xhr = new XMLHttpRequest();
	    function onloaded(event) {
	      if (event.target.status === 200 || event.target.status === 0) {
	        var geometry = scope.parse(event.target.response || event.target.responseText);
	        scope.dispatchEvent({
	          type: 'load',
	          content: geometry
	        });
	        if (callback)
	          callback(geometry);
	      } else {
	        scope.dispatchEvent({
	          type: 'error',
	          message: 'Couldn\'t load URL [' + url + ']',
	          response: event.target.statusText
	        });
	      }
	    }
	    xhr.addEventListener('load', onloaded, false);
	    xhr.addEventListener('progress', function(event) {
	      scope.dispatchEvent({
	        type: 'progress',
	        loaded: event.loaded,
	        total: event.total
	      });
	    }, false);
	    xhr.addEventListener('error', function() {
	      scope.dispatchEvent({
	        type: 'error',
	        message: 'Couldn\'t load URL [' + url + ']'
	      });
	    }, false);
	    if (xhr.overrideMimeType)
	      xhr.overrideMimeType('text/plain; charset=x-user-defined');
	    xhr.open('GET', url, true);
	    xhr.responseType = 'arraybuffer';
	    xhr.send(null);
	  };
	  THREE.STLLoader.prototype.parse = function(data) {
	    var isBinary = function() {
	      var expect,
	          face_size,
	          n_faces,
	          reader;
	      reader = new DataView(binData);
	      face_size = (32 / 8 * 3) + ((32 / 8 * 3) * 3) + (16 / 8);
	      n_faces = reader.getUint32(80, true);
	      expect = 80 + (32 / 8) + (n_faces * face_size);
	      return expect === reader.byteLength;
	    };
	    var binData = this.ensureBinary(data);
	    return isBinary() ? this.parseBinary(binData) : this.parseASCII(this.ensureString(data));
	  };
	  THREE.STLLoader.prototype.parseBinary = function(data) {
	    var reader = new DataView(data);
	    var faces = reader.getUint32(80, true);
	    var r,
	        g,
	        b,
	        hasColors = false,
	        colors;
	    var defaultR,
	        defaultG,
	        defaultB,
	        alpha;
	    for (var index = 0; index < 80 - 10; index++) {
	      if ((reader.getUint32(index, false) == 0x434F4C4F) && (reader.getUint8(index + 4) == 0x52) && (reader.getUint8(index + 5) == 0x3D)) {
	        hasColors = true;
	        colors = new Float32Array(faces * 3 * 3);
	        defaultR = reader.getUint8(index + 6) / 255;
	        defaultG = reader.getUint8(index + 7) / 255;
	        defaultB = reader.getUint8(index + 8) / 255;
	        alpha = reader.getUint8(index + 9) / 255;
	      }
	    }
	    var dataOffset = 84;
	    var faceLength = 12 * 4 + 2;
	    var offset = 0;
	    var geometry = new THREE.BufferGeometry();
	    var vertices = new Float32Array(faces * 3 * 3);
	    var normals = new Float32Array(faces * 3 * 3);
	    for (var face = 0; face < faces; face++) {
	      var start = dataOffset + face * faceLength;
	      var normalX = reader.getFloat32(start, true);
	      var normalY = reader.getFloat32(start + 4, true);
	      var normalZ = reader.getFloat32(start + 8, true);
	      if (hasColors) {
	        var packedColor = reader.getUint16(start + 48, true);
	        if ((packedColor & 0x8000) === 0) {
	          r = (packedColor & 0x1F) / 31;
	          g = ((packedColor >> 5) & 0x1F) / 31;
	          b = ((packedColor >> 10) & 0x1F) / 31;
	        } else {
	          r = defaultR;
	          g = defaultG;
	          b = defaultB;
	        }
	      }
	      for (var i = 1; i <= 3; i++) {
	        var vertexstart = start + i * 12;
	        vertices[offset] = reader.getFloat32(vertexstart, true);
	        vertices[offset + 1] = reader.getFloat32(vertexstart + 4, true);
	        vertices[offset + 2] = reader.getFloat32(vertexstart + 8, true);
	        normals[offset] = normalX;
	        normals[offset + 1] = normalY;
	        normals[offset + 2] = normalZ;
	        if (hasColors) {
	          colors[offset] = r;
	          colors[offset + 1] = g;
	          colors[offset + 2] = b;
	        }
	        offset += 3;
	      }
	    }
	    geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
	    geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
	    if (hasColors) {
	      geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
	      geometry.hasColors = true;
	      geometry.alpha = alpha;
	    }
	    return geometry;
	  };
	  THREE.STLLoader.prototype.parseASCII = function(data) {
	    var geometry,
	        length,
	        normal,
	        patternFace,
	        patternNormal,
	        patternVertex,
	        result,
	        text;
	    geometry = new THREE.Geometry();
	    patternFace = /facet([\s\S]*?)endfacet/g;
	    while ((result = patternFace.exec(data)) !== null) {
	      text = result[0];
	      patternNormal = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
	      while ((result = patternNormal.exec(text)) !== null) {
	        normal = new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5]));
	      }
	      patternVertex = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g;
	      while ((result = patternVertex.exec(text)) !== null) {
	        geometry.vertices.push(new THREE.Vector3(parseFloat(result[1]), parseFloat(result[3]), parseFloat(result[5])));
	      }
	      length = geometry.vertices.length;
	      geometry.faces.push(new THREE.Face3(length - 3, length - 2, length - 1, normal));
	    }
	    geometry.computeBoundingBox();
	    geometry.computeBoundingSphere();
	    return geometry;
	  };
	  THREE.STLLoader.prototype.ensureString = function(buf) {
	    if (typeof buf !== "string") {
	      var array_buffer = new Uint8Array(buf);
	      var str = '';
	      for (var i = 0; i < buf.byteLength; i++) {
	        str += String.fromCharCode(array_buffer[i]);
	      }
	      return str;
	    } else {
	      return buf;
	    }
	  };
	  THREE.STLLoader.prototype.ensureBinary = function(buf) {
	    if (typeof buf === "string") {
	      var array_buffer = new Uint8Array(buf.length);
	      for (var i = 0; i < buf.length; i++) {
	        array_buffer[i] = buf.charCodeAt(i) & 0xff;
	      }
	      return array_buffer.buffer || array_buffer;
	    } else {
	      return buf;
	    }
	  };
	  THREE.EventDispatcher.prototype.apply(THREE.STLLoader.prototype);
	  if (typeof DataView === 'undefined') {
	    DataView = function(buffer, byteOffset, byteLength) {
	      this.buffer = buffer;
	      this.byteOffset = byteOffset || 0;
	      this.byteLength = byteLength || buffer.byteLength || buffer.length;
	      this._isString = typeof buffer === "string";
	    };
	    DataView.prototype = {
	      _getCharCodes: function(buffer, start, length) {
	        start = start || 0;
	        length = length || buffer.length;
	        var end = start + length;
	        var codes = [];
	        for (var i = start; i < end; i++) {
	          codes.push(buffer.charCodeAt(i) & 0xff);
	        }
	        return codes;
	      },
	      _getBytes: function(length, byteOffset, littleEndian) {
	        var result;
	        if (littleEndian === undefined) {
	          littleEndian = this._littleEndian;
	        }
	        if (byteOffset === undefined) {
	          byteOffset = this.byteOffset;
	        } else {
	          byteOffset = this.byteOffset + byteOffset;
	        }
	        if (length === undefined) {
	          length = this.byteLength - byteOffset;
	        }
	        if (typeof byteOffset !== 'number') {
	          throw new TypeError('DataView byteOffset is not a number');
	        }
	        if (length < 0 || byteOffset + length > this.byteLength) {
	          throw new Error('DataView length or (byteOffset+length) value is out of bounds');
	        }
	        if (this.isString) {
	          result = this._getCharCodes(this.buffer, byteOffset, byteOffset + length);
	        } else {
	          result = this.buffer.slice(byteOffset, byteOffset + length);
	        }
	        if (!littleEndian && length > 1) {
	          if (!(result instanceof Array)) {
	            result = Array.prototype.slice.call(result);
	          }
	          result.reverse();
	        }
	        return result;
	      },
	      getFloat64: function(byteOffset, littleEndian) {
	        var b = this._getBytes(8, byteOffset, littleEndian),
	            sign = 1 - (2 * (b[7] >> 7)),
	            exponent = ((((b[7] << 1) & 0xff) << 3) | (b[6] >> 4)) - ((1 << 10) - 1),
	            mantissa = ((b[6] & 0x0f) * Math.pow(2, 48)) + (b[5] * Math.pow(2, 40)) + (b[4] * Math.pow(2, 32)) + (b[3] * Math.pow(2, 24)) + (b[2] * Math.pow(2, 16)) + (b[1] * Math.pow(2, 8)) + b[0];
	        if (exponent === 1024) {
	          if (mantissa !== 0) {
	            return NaN;
	          } else {
	            return sign * Infinity;
	          }
	        }
	        if (exponent === -1023) {
	          return sign * mantissa * Math.pow(2, -1022 - 52);
	        }
	        return sign * (1 + mantissa * Math.pow(2, -52)) * Math.pow(2, exponent);
	      },
	      getFloat32: function(byteOffset, littleEndian) {
	        var b = this._getBytes(4, byteOffset, littleEndian),
	            sign = 1 - (2 * (b[3] >> 7)),
	            exponent = (((b[3] << 1) & 0xff) | (b[2] >> 7)) - 127,
	            mantissa = ((b[2] & 0x7f) << 16) | (b[1] << 8) | b[0];
	        if (exponent === 128) {
	          if (mantissa !== 0) {
	            return NaN;
	          } else {
	            return sign * Infinity;
	          }
	        }
	        if (exponent === -127) {
	          return sign * mantissa * Math.pow(2, -126 - 23);
	        }
	        return sign * (1 + mantissa * Math.pow(2, -23)) * Math.pow(2, exponent);
	      },
	      getInt32: function(byteOffset, littleEndian) {
	        var b = this._getBytes(4, byteOffset, littleEndian);
	        return (b[3] << 24) | (b[2] << 16) | (b[1] << 8) | b[0];
	      },
	      getUint32: function(byteOffset, littleEndian) {
	        return this.getInt32(byteOffset, littleEndian) >>> 0;
	      },
	      getInt16: function(byteOffset, littleEndian) {
	        return (this.getUint16(byteOffset, littleEndian) << 16) >> 16;
	      },
	      getUint16: function(byteOffset, littleEndian) {
	        var b = this._getBytes(2, byteOffset, littleEndian);
	        return (b[1] << 8) | b[0];
	      },
	      getInt8: function(byteOffset) {
	        return (this.getUint8(byteOffset) << 24) >> 24;
	      },
	      getUint8: function(byteOffset) {
	        return this._getBytes(1, byteOffset)[0];
	      }
	    };
	  }
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2NDQ5MTgxZjFkNmU5Njk0YzIyNSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9TVExMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsRUFBQzs7Ozs7OztBQ1BELGdEOzs7Ozs7QUNBQSxnRDs7Ozs7O2lFQ0FBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0Esd0NBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wianF1ZXJ5XCIsIFwidGhyZWUtanNcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIHtcblx0XHR2YXIgYSA9IHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKSA6IGZhY3Rvcnkocm9vdFtcImpRdWVyeVwiXSwgcm9vdFtcIlRIUkVFXCJdKTtcblx0XHRmb3IodmFyIGkgaW4gYSkgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyA/IGV4cG9ydHMgOiByb290KVtpXSA9IGFbaV07XG5cdH1cbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDY0NDkxODFmMWQ2ZTk2OTRjMjI1XG4gKiovIiwiZGVmaW5lKFsnanF1ZXJ5JywgJ3RocmVlLWpzJywgJy4vdXRpbC9TVExMb2FkZXIuanMnXSwgZnVuY3Rpb24oJCwgVEhSRUUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcbiAgICBuYW1lOiAndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLXN0bCcsXG4gICAgcmVxdWlyZXM6IFsndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzJ11cbiAgfSk7XG4gIHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycy5zdGwnLCBUSFJFRS5TVExMb2FkZXIpO1xufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3AtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLXN0bC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJUSFJFRVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZS1qc1wiLFwiY29tbW9uanNcIjpcInRocmVlLWpzXCIsXCJhbWRcIjpcInRocmVlLWpzXCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZGVmaW5lKFsndGhyZWUtanMnXSwgZnVuY3Rpb24oVEhSRUUpIHtcbiAgVEhSRUUuU1RMTG9hZGVyID0gZnVuY3Rpb24oKSB7fTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZSA9IHtjb25zdHJ1Y3RvcjogVEhSRUUuU1RMTG9hZGVyfTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24odXJsLCBjYWxsYmFjaykge1xuICAgIHZhciBzY29wZSA9IHRoaXM7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGZ1bmN0aW9uIG9ubG9hZGVkKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LnN0YXR1cyA9PT0gMjAwIHx8IGV2ZW50LnRhcmdldC5zdGF0dXMgPT09IDApIHtcbiAgICAgICAgdmFyIGdlb21ldHJ5ID0gc2NvcGUucGFyc2UoZXZlbnQudGFyZ2V0LnJlc3BvbnNlIHx8IGV2ZW50LnRhcmdldC5yZXNwb25zZVRleHQpO1xuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICB0eXBlOiAnbG9hZCcsXG4gICAgICAgICAgY29udGVudDogZ2VvbWV0cnlcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjYWxsYmFjaylcbiAgICAgICAgICBjYWxsYmFjayhnZW9tZXRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICAgIG1lc3NhZ2U6ICdDb3VsZG5cXCd0IGxvYWQgVVJMIFsnICsgdXJsICsgJ10nLFxuICAgICAgICAgIHJlc3BvbnNlOiBldmVudC50YXJnZXQuc3RhdHVzVGV4dFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRlZCwgZmFsc2UpO1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBzY29wZS5kaXNwYXRjaEV2ZW50KHtcbiAgICAgICAgdHlwZTogJ3Byb2dyZXNzJyxcbiAgICAgICAgbG9hZGVkOiBldmVudC5sb2FkZWQsXG4gICAgICAgIHRvdGFsOiBldmVudC50b3RhbFxuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdDb3VsZG5cXCd0IGxvYWQgVVJMIFsnICsgdXJsICsgJ10nXG4gICAgICB9KTtcbiAgICB9LCBmYWxzZSk7XG4gICAgaWYgKHhoci5vdmVycmlkZU1pbWVUeXBlKVxuICAgICAgeGhyLm92ZXJyaWRlTWltZVR5cGUoJ3RleHQvcGxhaW47IGNoYXJzZXQ9eC11c2VyLWRlZmluZWQnKTtcbiAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICB4aHIuc2VuZChudWxsKTtcbiAgfTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgaXNCaW5hcnkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBleHBlY3QsXG4gICAgICAgICAgZmFjZV9zaXplLFxuICAgICAgICAgIG5fZmFjZXMsXG4gICAgICAgICAgcmVhZGVyO1xuICAgICAgcmVhZGVyID0gbmV3IERhdGFWaWV3KGJpbkRhdGEpO1xuICAgICAgZmFjZV9zaXplID0gKDMyIC8gOCAqIDMpICsgKCgzMiAvIDggKiAzKSAqIDMpICsgKDE2IC8gOCk7XG4gICAgICBuX2ZhY2VzID0gcmVhZGVyLmdldFVpbnQzMig4MCwgdHJ1ZSk7XG4gICAgICBleHBlY3QgPSA4MCArICgzMiAvIDgpICsgKG5fZmFjZXMgKiBmYWNlX3NpemUpO1xuICAgICAgcmV0dXJuIGV4cGVjdCA9PT0gcmVhZGVyLmJ5dGVMZW5ndGg7XG4gICAgfTtcbiAgICB2YXIgYmluRGF0YSA9IHRoaXMuZW5zdXJlQmluYXJ5KGRhdGEpO1xuICAgIHJldHVybiBpc0JpbmFyeSgpID8gdGhpcy5wYXJzZUJpbmFyeShiaW5EYXRhKSA6IHRoaXMucGFyc2VBU0NJSSh0aGlzLmVuc3VyZVN0cmluZyhkYXRhKSk7XG4gIH07XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUucGFyc2VCaW5hcnkgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBEYXRhVmlldyhkYXRhKTtcbiAgICB2YXIgZmFjZXMgPSByZWFkZXIuZ2V0VWludDMyKDgwLCB0cnVlKTtcbiAgICB2YXIgcixcbiAgICAgICAgZyxcbiAgICAgICAgYixcbiAgICAgICAgaGFzQ29sb3JzID0gZmFsc2UsXG4gICAgICAgIGNvbG9ycztcbiAgICB2YXIgZGVmYXVsdFIsXG4gICAgICAgIGRlZmF1bHRHLFxuICAgICAgICBkZWZhdWx0QixcbiAgICAgICAgYWxwaGE7XG4gICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IDgwIC0gMTA7IGluZGV4KyspIHtcbiAgICAgIGlmICgocmVhZGVyLmdldFVpbnQzMihpbmRleCwgZmFsc2UpID09IDB4NDM0RjRDNEYpICYmIChyZWFkZXIuZ2V0VWludDgoaW5kZXggKyA0KSA9PSAweDUyKSAmJiAocmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNSkgPT0gMHgzRCkpIHtcbiAgICAgICAgaGFzQ29sb3JzID0gdHJ1ZTtcbiAgICAgICAgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcbiAgICAgICAgZGVmYXVsdFIgPSByZWFkZXIuZ2V0VWludDgoaW5kZXggKyA2KSAvIDI1NTtcbiAgICAgICAgZGVmYXVsdEcgPSByZWFkZXIuZ2V0VWludDgoaW5kZXggKyA3KSAvIDI1NTtcbiAgICAgICAgZGVmYXVsdEIgPSByZWFkZXIuZ2V0VWludDgoaW5kZXggKyA4KSAvIDI1NTtcbiAgICAgICAgYWxwaGEgPSByZWFkZXIuZ2V0VWludDgoaW5kZXggKyA5KSAvIDI1NTtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRhdGFPZmZzZXQgPSA4NDtcbiAgICB2YXIgZmFjZUxlbmd0aCA9IDEyICogNCArIDI7XG4gICAgdmFyIG9mZnNldCA9IDA7XG4gICAgdmFyIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgdmFyIHZlcnRpY2VzID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcbiAgICB2YXIgbm9ybWFscyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XG4gICAgZm9yICh2YXIgZmFjZSA9IDA7IGZhY2UgPCBmYWNlczsgZmFjZSsrKSB7XG4gICAgICB2YXIgc3RhcnQgPSBkYXRhT2Zmc2V0ICsgZmFjZSAqIGZhY2VMZW5ndGg7XG4gICAgICB2YXIgbm9ybWFsWCA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0LCB0cnVlKTtcbiAgICAgIHZhciBub3JtYWxZID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQgKyA0LCB0cnVlKTtcbiAgICAgIHZhciBub3JtYWxaID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQgKyA4LCB0cnVlKTtcbiAgICAgIGlmIChoYXNDb2xvcnMpIHtcbiAgICAgICAgdmFyIHBhY2tlZENvbG9yID0gcmVhZGVyLmdldFVpbnQxNihzdGFydCArIDQ4LCB0cnVlKTtcbiAgICAgICAgaWYgKChwYWNrZWRDb2xvciAmIDB4ODAwMCkgPT09IDApIHtcbiAgICAgICAgICByID0gKHBhY2tlZENvbG9yICYgMHgxRikgLyAzMTtcbiAgICAgICAgICBnID0gKChwYWNrZWRDb2xvciA+PiA1KSAmIDB4MUYpIC8gMzE7XG4gICAgICAgICAgYiA9ICgocGFja2VkQ29sb3IgPj4gMTApICYgMHgxRikgLyAzMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByID0gZGVmYXVsdFI7XG4gICAgICAgICAgZyA9IGRlZmF1bHRHO1xuICAgICAgICAgIGIgPSBkZWZhdWx0QjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgIHZhciB2ZXJ0ZXhzdGFydCA9IHN0YXJ0ICsgaSAqIDEyO1xuICAgICAgICB2ZXJ0aWNlc1tvZmZzZXRdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQsIHRydWUpO1xuICAgICAgICB2ZXJ0aWNlc1tvZmZzZXQgKyAxXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgNCwgdHJ1ZSk7XG4gICAgICAgIHZlcnRpY2VzW29mZnNldCArIDJdID0gcmVhZGVyLmdldEZsb2F0MzIodmVydGV4c3RhcnQgKyA4LCB0cnVlKTtcbiAgICAgICAgbm9ybWFsc1tvZmZzZXRdID0gbm9ybWFsWDtcbiAgICAgICAgbm9ybWFsc1tvZmZzZXQgKyAxXSA9IG5vcm1hbFk7XG4gICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMl0gPSBub3JtYWxaO1xuICAgICAgICBpZiAoaGFzQ29sb3JzKSB7XG4gICAgICAgICAgY29sb3JzW29mZnNldF0gPSByO1xuICAgICAgICAgIGNvbG9yc1tvZmZzZXQgKyAxXSA9IGc7XG4gICAgICAgICAgY29sb3JzW29mZnNldCArIDJdID0gYjtcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgKz0gMztcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUodmVydGljZXMsIDMpKTtcbiAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ25vcm1hbCcsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUobm9ybWFscywgMykpO1xuICAgIGlmIChoYXNDb2xvcnMpIHtcbiAgICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuICAgICAgZ2VvbWV0cnkuaGFzQ29sb3JzID0gdHJ1ZTtcbiAgICAgIGdlb21ldHJ5LmFscGhhID0gYWxwaGE7XG4gICAgfVxuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZUFTQ0lJID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBnZW9tZXRyeSxcbiAgICAgICAgbGVuZ3RoLFxuICAgICAgICBub3JtYWwsXG4gICAgICAgIHBhdHRlcm5GYWNlLFxuICAgICAgICBwYXR0ZXJuTm9ybWFsLFxuICAgICAgICBwYXR0ZXJuVmVydGV4LFxuICAgICAgICByZXN1bHQsXG4gICAgICAgIHRleHQ7XG4gICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcbiAgICBwYXR0ZXJuRmFjZSA9IC9mYWNldChbXFxzXFxTXSo/KWVuZGZhY2V0L2c7XG4gICAgd2hpbGUgKChyZXN1bHQgPSBwYXR0ZXJuRmFjZS5leGVjKGRhdGEpKSAhPT0gbnVsbCkge1xuICAgICAgdGV4dCA9IHJlc3VsdFswXTtcbiAgICAgIHBhdHRlcm5Ob3JtYWwgPSAvbm9ybWFsW1xcc10rKFtcXC0rXT9bMC05XStcXC4/WzAtOV0qKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KStbXFxzXSsoW1xcLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPykrL2c7XG4gICAgICB3aGlsZSAoKHJlc3VsdCA9IHBhdHRlcm5Ob3JtYWwuZXhlYyh0ZXh0KSkgIT09IG51bGwpIHtcbiAgICAgICAgbm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSksIHBhcnNlRmxvYXQocmVzdWx0WzVdKSk7XG4gICAgICB9XG4gICAgICBwYXR0ZXJuVmVydGV4ID0gL3ZlcnRleFtcXHNdKyhbXFwtK10/WzAtOV0rXFwuP1swLTldKihbZUVdW1xcLStdP1swLTldKyk/KStbXFxzXSsoW1xcLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPykrW1xcc10rKFtcXC0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8pKy9nO1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSBwYXR0ZXJuVmVydGV4LmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgICAgIGdlb21ldHJ5LnZlcnRpY2VzLnB1c2gobmV3IFRIUkVFLlZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSksIHBhcnNlRmxvYXQocmVzdWx0WzVdKSkpO1xuICAgICAgfVxuICAgICAgbGVuZ3RoID0gZ2VvbWV0cnkudmVydGljZXMubGVuZ3RoO1xuICAgICAgZ2VvbWV0cnkuZmFjZXMucHVzaChuZXcgVEhSRUUuRmFjZTMobGVuZ3RoIC0gMywgbGVuZ3RoIC0gMiwgbGVuZ3RoIC0gMSwgbm9ybWFsKSk7XG4gICAgfVxuICAgIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ0JveCgpO1xuICAgIGdlb21ldHJ5LmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgIHJldHVybiBnZW9tZXRyeTtcbiAgfTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5lbnN1cmVTdHJpbmcgPSBmdW5jdGlvbihidWYpIHtcbiAgICBpZiAodHlwZW9mIGJ1ZiAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIGFycmF5X2J1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICB2YXIgc3RyID0gJyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5ieXRlTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc3RyICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYXJyYXlfYnVmZmVyW2ldKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICB9O1xuICBUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmVuc3VyZUJpbmFyeSA9IGZ1bmN0aW9uKGJ1Zikge1xuICAgIGlmICh0eXBlb2YgYnVmID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB2YXIgYXJyYXlfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheV9idWZmZXJbaV0gPSBidWYuY2hhckNvZGVBdChpKSAmIDB4ZmY7XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyYXlfYnVmZmVyLmJ1ZmZlciB8fCBhcnJheV9idWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuICB9O1xuICBUSFJFRS5FdmVudERpc3BhdGNoZXIucHJvdG90eXBlLmFwcGx5KFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUpO1xuICBpZiAodHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJykge1xuICAgIERhdGFWaWV3ID0gZnVuY3Rpb24oYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG4gICAgICB0aGlzLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQgfHwgMDtcbiAgICAgIHRoaXMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfHwgYnVmZmVyLmJ5dGVMZW5ndGggfHwgYnVmZmVyLmxlbmd0aDtcbiAgICAgIHRoaXMuX2lzU3RyaW5nID0gdHlwZW9mIGJ1ZmZlciA9PT0gXCJzdHJpbmdcIjtcbiAgICB9O1xuICAgIERhdGFWaWV3LnByb3RvdHlwZSA9IHtcbiAgICAgIF9nZXRDaGFyQ29kZXM6IGZ1bmN0aW9uKGJ1ZmZlciwgc3RhcnQsIGxlbmd0aCkge1xuICAgICAgICBzdGFydCA9IHN0YXJ0IHx8IDA7XG4gICAgICAgIGxlbmd0aCA9IGxlbmd0aCB8fCBidWZmZXIubGVuZ3RoO1xuICAgICAgICB2YXIgZW5kID0gc3RhcnQgKyBsZW5ndGg7XG4gICAgICAgIHZhciBjb2RlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICAgIGNvZGVzLnB1c2goYnVmZmVyLmNoYXJDb2RlQXQoaSkgJiAweGZmKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29kZXM7XG4gICAgICB9LFxuICAgICAgX2dldEJ5dGVzOiBmdW5jdGlvbihsZW5ndGgsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICAgICAgICB2YXIgcmVzdWx0O1xuICAgICAgICBpZiAobGl0dGxlRW5kaWFuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBsaXR0bGVFbmRpYW4gPSB0aGlzLl9saXR0bGVFbmRpYW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJ5dGVPZmZzZXQgPSB0aGlzLmJ5dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGVuZ3RoID0gdGhpcy5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGF0YVZpZXcgYnl0ZU9mZnNldCBpcyBub3QgYSBudW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVuZ3RoIDwgMCB8fCBieXRlT2Zmc2V0ICsgbGVuZ3RoID4gdGhpcy5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhVmlldyBsZW5ndGggb3IgKGJ5dGVPZmZzZXQrbGVuZ3RoKSB2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNTdHJpbmcpIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLl9nZXRDaGFyQ29kZXModGhpcy5idWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdCA9IHRoaXMuYnVmZmVyLnNsaWNlKGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghbGl0dGxlRW5kaWFuICYmIGxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBpZiAoIShyZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBnZXRGbG9hdDY0OiBmdW5jdGlvbihieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgICAgICAgdmFyIGIgPSB0aGlzLl9nZXRCeXRlcyg4LCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pLFxuICAgICAgICAgICAgc2lnbiA9IDEgLSAoMiAqIChiWzddID4+IDcpKSxcbiAgICAgICAgICAgIGV4cG9uZW50ID0gKCgoKGJbN10gPDwgMSkgJiAweGZmKSA8PCAzKSB8IChiWzZdID4+IDQpKSAtICgoMSA8PCAxMCkgLSAxKSxcbiAgICAgICAgICAgIG1hbnRpc3NhID0gKChiWzZdICYgMHgwZikgKiBNYXRoLnBvdygyLCA0OCkpICsgKGJbNV0gKiBNYXRoLnBvdygyLCA0MCkpICsgKGJbNF0gKiBNYXRoLnBvdygyLCAzMikpICsgKGJbM10gKiBNYXRoLnBvdygyLCAyNCkpICsgKGJbMl0gKiBNYXRoLnBvdygyLCAxNikpICsgKGJbMV0gKiBNYXRoLnBvdygyLCA4KSkgKyBiWzBdO1xuICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEwMjQpIHtcbiAgICAgICAgICBpZiAobWFudGlzc2EgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaWduICogSW5maW5pdHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChleHBvbmVudCA9PT0gLTEwMjMpIHtcbiAgICAgICAgICByZXR1cm4gc2lnbiAqIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTEwMjIgLSA1Mik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZ24gKiAoMSArIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTUyKSkgKiBNYXRoLnBvdygyLCBleHBvbmVudCk7XG4gICAgICB9LFxuICAgICAgZ2V0RmxvYXQzMjogZnVuY3Rpb24oYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIHZhciBiID0gdGhpcy5fZ2V0Qnl0ZXMoNCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSxcbiAgICAgICAgICAgIHNpZ24gPSAxIC0gKDIgKiAoYlszXSA+PiA3KSksXG4gICAgICAgICAgICBleHBvbmVudCA9ICgoKGJbM10gPDwgMSkgJiAweGZmKSB8IChiWzJdID4+IDcpKSAtIDEyNyxcbiAgICAgICAgICAgIG1hbnRpc3NhID0gKChiWzJdICYgMHg3ZikgPDwgMTYpIHwgKGJbMV0gPDwgOCkgfCBiWzBdO1xuICAgICAgICBpZiAoZXhwb25lbnQgPT09IDEyOCkge1xuICAgICAgICAgIGlmIChtYW50aXNzYSAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNpZ24gKiBJbmZpbml0eTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4cG9uZW50ID09PSAtMTI3KSB7XG4gICAgICAgICAgcmV0dXJuIHNpZ24gKiBtYW50aXNzYSAqIE1hdGgucG93KDIsIC0xMjYgLSAyMyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNpZ24gKiAoMSArIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTIzKSkgKiBNYXRoLnBvdygyLCBleHBvbmVudCk7XG4gICAgICB9LFxuICAgICAgZ2V0SW50MzI6IGZ1bmN0aW9uKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICAgICAgICB2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDQsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbik7XG4gICAgICAgIHJldHVybiAoYlszXSA8PCAyNCkgfCAoYlsyXSA8PCAxNikgfCAoYlsxXSA8PCA4KSB8IGJbMF07XG4gICAgICB9LFxuICAgICAgZ2V0VWludDMyOiBmdW5jdGlvbihieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SW50MzIoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA+Pj4gMDtcbiAgICAgIH0sXG4gICAgICBnZXRJbnQxNjogZnVuY3Rpb24oYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIHJldHVybiAodGhpcy5nZXRVaW50MTYoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA8PCAxNikgPj4gMTY7XG4gICAgICB9LFxuICAgICAgZ2V0VWludDE2OiBmdW5jdGlvbihieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgICAgICAgdmFyIGIgPSB0aGlzLl9nZXRCeXRlcygyLCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICByZXR1cm4gKGJbMV0gPDwgOCkgfCBiWzBdO1xuICAgICAgfSxcbiAgICAgIGdldEludDg6IGZ1bmN0aW9uKGJ5dGVPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmdldFVpbnQ4KGJ5dGVPZmZzZXQpIDw8IDI0KSA+PiAyNDtcbiAgICAgIH0sXG4gICAgICBnZXRVaW50ODogZnVuY3Rpb24oYnl0ZU9mZnNldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Qnl0ZXMoMSwgYnl0ZU9mZnNldClbMF07XG4gICAgICB9XG4gICAgfTtcbiAgfVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3V0aWwvU1RMTG9hZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIn0=