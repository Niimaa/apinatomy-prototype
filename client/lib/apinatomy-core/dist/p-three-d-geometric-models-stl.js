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
	  var plugin = $.circuitboard.plugin.do('three-d-geometric-models-stl', {requires: ['three-d-geometric-models']});
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA3YjdiZDY0NzNhODEwYzMzZmVkOCIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9TVExMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0EsMEVBQXlFLHVDQUF1QztBQUNoSDtBQUNBLEVBQUM7Ozs7Ozs7QUNKRCxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztpRUNBQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBLHdDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImpxdWVyeVwiKSwgcmVxdWlyZShcInRocmVlLWpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImpxdWVyeVwiLCBcInRocmVlLWpzXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSkgOiBmYWN0b3J5KHJvb3RbXCJqUXVlcnlcIl0sIHJvb3RbXCJUSFJFRVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3YjdiZDY0NzNhODEwYzMzZmVkOFxuICoqLyIsImRlZmluZShbJ2pxdWVyeScsICd0aHJlZS1qcycsICcuL3V0aWwvU1RMTG9hZGVyLmpzJ10sIGZ1bmN0aW9uKCQsIFRIUkVFKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgdmFyIHBsdWdpbiA9ICQuY2lyY3VpdGJvYXJkLnBsdWdpbi5kbygndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLXN0bCcsIHtyZXF1aXJlczogWyd0aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMnXX0pO1xuICBwbHVnaW4uYWRkKCdDaXJjdWl0Ym9hcmQudGhyZWVKc0xvYWRlcnMuc3RsJywgVEhSRUUuU1RMTG9hZGVyKTtcbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9wLXRocmVlLWQtZ2VvbWV0cmljLW1vZGVscy1zdGwuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImRlZmluZShbJ3RocmVlLWpzJ10sIGZ1bmN0aW9uKFRIUkVFKSB7XG4gIFRIUkVFLlNUTExvYWRlciA9IGZ1bmN0aW9uKCkge307XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUgPSB7Y29uc3RydWN0b3I6IFRIUkVFLlNUTExvYWRlcn07XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKHVybCwgY2FsbGJhY2spIHtcbiAgICB2YXIgc2NvcGUgPSB0aGlzO1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBmdW5jdGlvbiBvbmxvYWRlZChldmVudCkge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldC5zdGF0dXMgPT09IDIwMCB8fCBldmVudC50YXJnZXQuc3RhdHVzID09PSAwKSB7XG4gICAgICAgIHZhciBnZW9tZXRyeSA9IHNjb3BlLnBhcnNlKGV2ZW50LnRhcmdldC5yZXNwb25zZSB8fCBldmVudC50YXJnZXQucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgdHlwZTogJ2xvYWQnLFxuICAgICAgICAgIGNvbnRlbnQ6IGdlb21ldHJ5XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoY2FsbGJhY2spXG4gICAgICAgICAgY2FsbGJhY2soZ2VvbWV0cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgICBtZXNzYWdlOiAnQ291bGRuXFwndCBsb2FkIFVSTCBbJyArIHVybCArICddJyxcbiAgICAgICAgICByZXNwb25zZTogZXZlbnQudGFyZ2V0LnN0YXR1c1RleHRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkZWQsIGZhbHNlKTtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgc2NvcGUuZGlzcGF0Y2hFdmVudCh7XG4gICAgICAgIHR5cGU6ICdwcm9ncmVzcycsXG4gICAgICAgIGxvYWRlZDogZXZlbnQubG9hZGVkLFxuICAgICAgICB0b3RhbDogZXZlbnQudG90YWxcbiAgICAgIH0pO1xuICAgIH0sIGZhbHNlKTtcbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgIHNjb3BlLmRpc3BhdGNoRXZlbnQoe1xuICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICBtZXNzYWdlOiAnQ291bGRuXFwndCBsb2FkIFVSTCBbJyArIHVybCArICddJ1xuICAgICAgfSk7XG4gICAgfSwgZmFsc2UpO1xuICAgIGlmICh4aHIub3ZlcnJpZGVNaW1lVHlwZSlcbiAgICAgIHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgeGhyLnNlbmQobnVsbCk7XG4gIH07XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIGlzQmluYXJ5ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZXhwZWN0LFxuICAgICAgICAgIGZhY2Vfc2l6ZSxcbiAgICAgICAgICBuX2ZhY2VzLFxuICAgICAgICAgIHJlYWRlcjtcbiAgICAgIHJlYWRlciA9IG5ldyBEYXRhVmlldyhiaW5EYXRhKTtcbiAgICAgIGZhY2Vfc2l6ZSA9ICgzMiAvIDggKiAzKSArICgoMzIgLyA4ICogMykgKiAzKSArICgxNiAvIDgpO1xuICAgICAgbl9mYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xuICAgICAgZXhwZWN0ID0gODAgKyAoMzIgLyA4KSArIChuX2ZhY2VzICogZmFjZV9zaXplKTtcbiAgICAgIHJldHVybiBleHBlY3QgPT09IHJlYWRlci5ieXRlTGVuZ3RoO1xuICAgIH07XG4gICAgdmFyIGJpbkRhdGEgPSB0aGlzLmVuc3VyZUJpbmFyeShkYXRhKTtcbiAgICByZXR1cm4gaXNCaW5hcnkoKSA/IHRoaXMucGFyc2VCaW5hcnkoYmluRGF0YSkgOiB0aGlzLnBhcnNlQVNDSUkodGhpcy5lbnN1cmVTdHJpbmcoZGF0YSkpO1xuICB9O1xuICBUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLnBhcnNlQmluYXJ5ID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRGF0YVZpZXcoZGF0YSk7XG4gICAgdmFyIGZhY2VzID0gcmVhZGVyLmdldFVpbnQzMig4MCwgdHJ1ZSk7XG4gICAgdmFyIHIsXG4gICAgICAgIGcsXG4gICAgICAgIGIsXG4gICAgICAgIGhhc0NvbG9ycyA9IGZhbHNlLFxuICAgICAgICBjb2xvcnM7XG4gICAgdmFyIGRlZmF1bHRSLFxuICAgICAgICBkZWZhdWx0RyxcbiAgICAgICAgZGVmYXVsdEIsXG4gICAgICAgIGFscGhhO1xuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCA4MCAtIDEwOyBpbmRleCsrKSB7XG4gICAgICBpZiAoKHJlYWRlci5nZXRVaW50MzIoaW5kZXgsIGZhbHNlKSA9PSAweDQzNEY0QzRGKSAmJiAocmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNCkgPT0gMHg1MikgJiYgKHJlYWRlci5nZXRVaW50OChpbmRleCArIDUpID09IDB4M0QpKSB7XG4gICAgICAgIGhhc0NvbG9ycyA9IHRydWU7XG4gICAgICAgIGNvbG9ycyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XG4gICAgICAgIGRlZmF1bHRSID0gcmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNikgLyAyNTU7XG4gICAgICAgIGRlZmF1bHRHID0gcmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNykgLyAyNTU7XG4gICAgICAgIGRlZmF1bHRCID0gcmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgOCkgLyAyNTU7XG4gICAgICAgIGFscGhhID0gcmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgOSkgLyAyNTU7XG4gICAgICB9XG4gICAgfVxuICAgIHZhciBkYXRhT2Zmc2V0ID0gODQ7XG4gICAgdmFyIGZhY2VMZW5ndGggPSAxMiAqIDQgKyAyO1xuICAgIHZhciBvZmZzZXQgPSAwO1xuICAgIHZhciBnZW9tZXRyeSA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuICAgIHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XG4gICAgdmFyIG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGZhY2VzICogMyAqIDMpO1xuICAgIGZvciAodmFyIGZhY2UgPSAwOyBmYWNlIDwgZmFjZXM7IGZhY2UrKykge1xuICAgICAgdmFyIHN0YXJ0ID0gZGF0YU9mZnNldCArIGZhY2UgKiBmYWNlTGVuZ3RoO1xuICAgICAgdmFyIG5vcm1hbFggPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCwgdHJ1ZSk7XG4gICAgICB2YXIgbm9ybWFsWSA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0ICsgNCwgdHJ1ZSk7XG4gICAgICB2YXIgbm9ybWFsWiA9IHJlYWRlci5nZXRGbG9hdDMyKHN0YXJ0ICsgOCwgdHJ1ZSk7XG4gICAgICBpZiAoaGFzQ29sb3JzKSB7XG4gICAgICAgIHZhciBwYWNrZWRDb2xvciA9IHJlYWRlci5nZXRVaW50MTYoc3RhcnQgKyA0OCwgdHJ1ZSk7XG4gICAgICAgIGlmICgocGFja2VkQ29sb3IgJiAweDgwMDApID09PSAwKSB7XG4gICAgICAgICAgciA9IChwYWNrZWRDb2xvciAmIDB4MUYpIC8gMzE7XG4gICAgICAgICAgZyA9ICgocGFja2VkQ29sb3IgPj4gNSkgJiAweDFGKSAvIDMxO1xuICAgICAgICAgIGIgPSAoKHBhY2tlZENvbG9yID4+IDEwKSAmIDB4MUYpIC8gMzE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgciA9IGRlZmF1bHRSO1xuICAgICAgICAgIGcgPSBkZWZhdWx0RztcbiAgICAgICAgICBiID0gZGVmYXVsdEI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IDM7IGkrKykge1xuICAgICAgICB2YXIgdmVydGV4c3RhcnQgPSBzdGFydCArIGkgKiAxMjtcbiAgICAgICAgdmVydGljZXNbb2Zmc2V0XSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0LCB0cnVlKTtcbiAgICAgICAgdmVydGljZXNbb2Zmc2V0ICsgMV0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDQsIHRydWUpO1xuICAgICAgICB2ZXJ0aWNlc1tvZmZzZXQgKyAyXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgOCwgdHJ1ZSk7XG4gICAgICAgIG5vcm1hbHNbb2Zmc2V0XSA9IG5vcm1hbFg7XG4gICAgICAgIG5vcm1hbHNbb2Zmc2V0ICsgMV0gPSBub3JtYWxZO1xuICAgICAgICBub3JtYWxzW29mZnNldCArIDJdID0gbm9ybWFsWjtcbiAgICAgICAgaWYgKGhhc0NvbG9ycykge1xuICAgICAgICAgIGNvbG9yc1tvZmZzZXRdID0gcjtcbiAgICAgICAgICBjb2xvcnNbb2Zmc2V0ICsgMV0gPSBnO1xuICAgICAgICAgIGNvbG9yc1tvZmZzZXQgKyAyXSA9IGI7XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ICs9IDM7XG4gICAgICB9XG4gICAgfVxuICAgIGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKSk7XG4gICAgZ2VvbWV0cnkuYWRkQXR0cmlidXRlKCdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5vcm1hbHMsIDMpKTtcbiAgICBpZiAoaGFzQ29sb3JzKSB7XG4gICAgICBnZW9tZXRyeS5hZGRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpKTtcbiAgICAgIGdlb21ldHJ5Lmhhc0NvbG9ycyA9IHRydWU7XG4gICAgICBnZW9tZXRyeS5hbHBoYSA9IGFscGhhO1xuICAgIH1cbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH07XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUucGFyc2VBU0NJSSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgZ2VvbWV0cnksXG4gICAgICAgIGxlbmd0aCxcbiAgICAgICAgbm9ybWFsLFxuICAgICAgICBwYXR0ZXJuRmFjZSxcbiAgICAgICAgcGF0dGVybk5vcm1hbCxcbiAgICAgICAgcGF0dGVyblZlcnRleCxcbiAgICAgICAgcmVzdWx0LFxuICAgICAgICB0ZXh0O1xuICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLkdlb21ldHJ5KCk7XG4gICAgcGF0dGVybkZhY2UgPSAvZmFjZXQoW1xcc1xcU10qPyllbmRmYWNldC9nO1xuICAgIHdoaWxlICgocmVzdWx0ID0gcGF0dGVybkZhY2UuZXhlYyhkYXRhKSkgIT09IG51bGwpIHtcbiAgICAgIHRleHQgPSByZXN1bHRbMF07XG4gICAgICBwYXR0ZXJuTm9ybWFsID0gL25vcm1hbFtcXHNdKyhbXFwtK10/WzAtOV0rXFwuP1swLTldKihbZUVdW1xcLStdP1swLTldKyk/KStbXFxzXSsoW1xcLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPykrW1xcc10rKFtcXC0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8pKy9nO1xuICAgICAgd2hpbGUgKChyZXN1bHQgPSBwYXR0ZXJuTm9ybWFsLmV4ZWModGV4dCkpICE9PSBudWxsKSB7XG4gICAgICAgIG5vcm1hbCA9IG5ldyBUSFJFRS5WZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pLCBwYXJzZUZsb2F0KHJlc3VsdFs1XSkpO1xuICAgICAgfVxuICAgICAgcGF0dGVyblZlcnRleCA9IC92ZXJ0ZXhbXFxzXSsoW1xcLStdP1swLTldK1xcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPykrW1xcc10rKFtcXC0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KSsvZztcbiAgICAgIHdoaWxlICgocmVzdWx0ID0gcGF0dGVyblZlcnRleC5leGVjKHRleHQpKSAhPT0gbnVsbCkge1xuICAgICAgICBnZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pLCBwYXJzZUZsb2F0KHJlc3VsdFs1XSkpKTtcbiAgICAgIH1cbiAgICAgIGxlbmd0aCA9IGdlb21ldHJ5LnZlcnRpY2VzLmxlbmd0aDtcbiAgICAgIGdlb21ldHJ5LmZhY2VzLnB1c2gobmV3IFRIUkVFLkZhY2UzKGxlbmd0aCAtIDMsIGxlbmd0aCAtIDIsIGxlbmd0aCAtIDEsIG5vcm1hbCkpO1xuICAgIH1cbiAgICBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdCb3goKTtcbiAgICBnZW9tZXRyeS5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcbiAgICByZXR1cm4gZ2VvbWV0cnk7XG4gIH07XG4gIFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUuZW5zdXJlU3RyaW5nID0gZnVuY3Rpb24oYnVmKSB7XG4gICAgaWYgKHR5cGVvZiBidWYgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHZhciBhcnJheV9idWZmZXIgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWYuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN0ciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFycmF5X2J1ZmZlcltpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgfTtcbiAgVEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5lbnN1cmVCaW5hcnkgPSBmdW5jdGlvbihidWYpIHtcbiAgICBpZiAodHlwZW9mIGJ1ZiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgdmFyIGFycmF5X2J1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ1Zi5sZW5ndGgpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBidWYubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJyYXlfYnVmZmVyW2ldID0gYnVmLmNoYXJDb2RlQXQoaSkgJiAweGZmO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycmF5X2J1ZmZlci5idWZmZXIgfHwgYXJyYXlfYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgfTtcbiAgVEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hcHBseShUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlKTtcbiAgaWYgKHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBEYXRhVmlldyA9IGZ1bmN0aW9uKGJ1ZmZlciwgYnl0ZU9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICAgICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgICB0aGlzLmJ5dGVPZmZzZXQgPSBieXRlT2Zmc2V0IHx8IDA7XG4gICAgICB0aGlzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoIHx8IGJ1ZmZlci5sZW5ndGg7XG4gICAgICB0aGlzLl9pc1N0cmluZyA9IHR5cGVvZiBidWZmZXIgPT09IFwic3RyaW5nXCI7XG4gICAgfTtcbiAgICBEYXRhVmlldy5wcm90b3R5cGUgPSB7XG4gICAgICBfZ2V0Q2hhckNvZGVzOiBmdW5jdGlvbihidWZmZXIsIHN0YXJ0LCBsZW5ndGgpIHtcbiAgICAgICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgICAgICBsZW5ndGggPSBsZW5ndGggfHwgYnVmZmVyLmxlbmd0aDtcbiAgICAgICAgdmFyIGVuZCA9IHN0YXJ0ICsgbGVuZ3RoO1xuICAgICAgICB2YXIgY29kZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgICBjb2Rlcy5wdXNoKGJ1ZmZlci5jaGFyQ29kZUF0KGkpICYgMHhmZik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvZGVzO1xuICAgICAgfSxcbiAgICAgIF9nZXRCeXRlczogZnVuY3Rpb24obGVuZ3RoLCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgaWYgKGxpdHRsZUVuZGlhbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbGl0dGxlRW5kaWFuID0gdGhpcy5fbGl0dGxlRW5kaWFuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBieXRlT2Zmc2V0ID0gdGhpcy5ieXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ5dGVPZmZzZXQgPSB0aGlzLmJ5dGVPZmZzZXQgKyBieXRlT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGxlbmd0aCA9IHRoaXMuYnl0ZUxlbmd0aCAtIGJ5dGVPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ICE9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RhdGFWaWV3IGJ5dGVPZmZzZXQgaXMgbm90IGEgbnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxlbmd0aCA8IDAgfHwgYnl0ZU9mZnNldCArIGxlbmd0aCA+IHRoaXMuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YVZpZXcgbGVuZ3RoIG9yIChieXRlT2Zmc2V0K2xlbmd0aCkgdmFsdWUgaXMgb3V0IG9mIGJvdW5kcycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzU3RyaW5nKSB7XG4gICAgICAgICAgcmVzdWx0ID0gdGhpcy5fZ2V0Q2hhckNvZGVzKHRoaXMuYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmJ1ZmZlci5zbGljZShieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgbGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxpdHRsZUVuZGlhbiAmJiBsZW5ndGggPiAxKSB7XG4gICAgICAgICAgaWYgKCEocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyZXN1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgZ2V0RmxvYXQ2NDogZnVuY3Rpb24oYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIHZhciBiID0gdGhpcy5fZ2V0Qnl0ZXMoOCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSxcbiAgICAgICAgICAgIHNpZ24gPSAxIC0gKDIgKiAoYls3XSA+PiA3KSksXG4gICAgICAgICAgICBleHBvbmVudCA9ICgoKChiWzddIDw8IDEpICYgMHhmZikgPDwgMykgfCAoYls2XSA+PiA0KSkgLSAoKDEgPDwgMTApIC0gMSksXG4gICAgICAgICAgICBtYW50aXNzYSA9ICgoYls2XSAmIDB4MGYpICogTWF0aC5wb3coMiwgNDgpKSArIChiWzVdICogTWF0aC5wb3coMiwgNDApKSArIChiWzRdICogTWF0aC5wb3coMiwgMzIpKSArIChiWzNdICogTWF0aC5wb3coMiwgMjQpKSArIChiWzJdICogTWF0aC5wb3coMiwgMTYpKSArIChiWzFdICogTWF0aC5wb3coMiwgOCkpICsgYlswXTtcbiAgICAgICAgaWYgKGV4cG9uZW50ID09PSAxMDI0KSB7XG4gICAgICAgICAgaWYgKG1hbnRpc3NhICE9PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2lnbiAqIEluZmluaXR5O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXhwb25lbnQgPT09IC0xMDIzKSB7XG4gICAgICAgICAgcmV0dXJuIHNpZ24gKiBtYW50aXNzYSAqIE1hdGgucG93KDIsIC0xMDIyIC0gNTIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaWduICogKDEgKyBtYW50aXNzYSAqIE1hdGgucG93KDIsIC01MikpICogTWF0aC5wb3coMiwgZXhwb25lbnQpO1xuICAgICAgfSxcbiAgICAgIGdldEZsb2F0MzI6IGZ1bmN0aW9uKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICAgICAgICB2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDQsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbiksXG4gICAgICAgICAgICBzaWduID0gMSAtICgyICogKGJbM10gPj4gNykpLFxuICAgICAgICAgICAgZXhwb25lbnQgPSAoKChiWzNdIDw8IDEpICYgMHhmZikgfCAoYlsyXSA+PiA3KSkgLSAxMjcsXG4gICAgICAgICAgICBtYW50aXNzYSA9ICgoYlsyXSAmIDB4N2YpIDw8IDE2KSB8IChiWzFdIDw8IDgpIHwgYlswXTtcbiAgICAgICAgaWYgKGV4cG9uZW50ID09PSAxMjgpIHtcbiAgICAgICAgICBpZiAobWFudGlzc2EgIT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBOYU47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaWduICogSW5maW5pdHk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChleHBvbmVudCA9PT0gLTEyNykge1xuICAgICAgICAgIHJldHVybiBzaWduICogbWFudGlzc2EgKiBNYXRoLnBvdygyLCAtMTI2IC0gMjMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaWduICogKDEgKyBtYW50aXNzYSAqIE1hdGgucG93KDIsIC0yMykpICogTWF0aC5wb3coMiwgZXhwb25lbnQpO1xuICAgICAgfSxcbiAgICAgIGdldEludDMyOiBmdW5jdGlvbihieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgICAgICAgdmFyIGIgPSB0aGlzLl9nZXRCeXRlcyg0LCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICByZXR1cm4gKGJbM10gPDwgMjQpIHwgKGJbMl0gPDwgMTYpIHwgKGJbMV0gPDwgOCkgfCBiWzBdO1xuICAgICAgfSxcbiAgICAgIGdldFVpbnQzMjogZnVuY3Rpb24oYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEludDMyKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikgPj4+IDA7XG4gICAgICB9LFxuICAgICAgZ2V0SW50MTY6IGZ1bmN0aW9uKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICAgICAgICByZXR1cm4gKHRoaXMuZ2V0VWludDE2KGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikgPDwgMTYpID4+IDE2O1xuICAgICAgfSxcbiAgICAgIGdldFVpbnQxNjogZnVuY3Rpb24oYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gICAgICAgIHZhciBiID0gdGhpcy5fZ2V0Qnl0ZXMoMiwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKTtcbiAgICAgICAgcmV0dXJuIChiWzFdIDw8IDgpIHwgYlswXTtcbiAgICAgIH0sXG4gICAgICBnZXRJbnQ4OiBmdW5jdGlvbihieXRlT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiAodGhpcy5nZXRVaW50OChieXRlT2Zmc2V0KSA8PCAyNCkgPj4gMjQ7XG4gICAgICB9LFxuICAgICAgZ2V0VWludDg6IGZ1bmN0aW9uKGJ5dGVPZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEJ5dGVzKDEsIGJ5dGVPZmZzZXQpWzBdO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn0pO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy91dGlsL1NUTExvYWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6InAtdGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLXN0bC5qcyJ9