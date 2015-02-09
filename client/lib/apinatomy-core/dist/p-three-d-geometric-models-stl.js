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
	
	//# sourceMappingURL=<compileOutput>


/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYjM4MzYwYWVmNjg0YjE3NzFhZSIsIndlYnBhY2s6Ly8vLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiVEhSRUVcIixcImNvbW1vbmpzMlwiOlwidGhyZWUtanNcIixcImNvbW1vbmpzXCI6XCJ0aHJlZS1qc1wiLFwiYW1kXCI6XCJ0aHJlZS1qc1wifSIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC9TVExMb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O2lFQ3RDQSxpQ0FDQyx1QkFDQSx3QkFDQSx3QkFDRCxDQUFHLDBDQUFVLEVBQUcsTUFBSSxDQUFHO0FBQ3RCLGNBQVcsQ0FBQztBQUlSLFlBQUssRUFBSSxlQUFhLE9BQVEsQ0FBQztBQUNsQyxRQUFHLENBQUcsK0JBQTZCO0FBQ25DLFlBQU8sQ0FBRyxFQUFDLDBCQUF5QixDQUFDO0FBQUEsR0FDdEMsQ0FBQyxDQUFDO0FBSUYsUUFBSyxJQUFLLENBQUMsaUNBQWdD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VUFBVyxDQUFDLEVBQUcsV0FBUyxDQUFDLENBQUUsRUFBQyxDQUFDO09BQ3hDO0FBQUEsS0FFRCxDQUFDO0dBRUY7QUFHRCxFQUFDLCtJQUFDO0FBR0YiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJqcXVlcnlcIiksIHJlcXVpcmUoXCJ0aHJlZS1qc1wiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJqcXVlcnlcIiwgXCJ0aHJlZS1qc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwianF1ZXJ5XCIpLCByZXF1aXJlKFwidGhyZWUtanNcIikpIDogZmFjdG9yeShyb290W1wialF1ZXJ5XCJdLCByb290W1wiVEhSRUVcIl0pO1xuXHRcdGZvcih2YXIgaSBpbiBhKSAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZXhwb3J0cyA6IHJvb3QpW2ldID0gYVtpXTtcblx0fVxufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGIzODM2MGFlZjY4NGIxNzcxYWVcbiAqKi8iLCJkZWZpbmUoW1xuXHQnanF1ZXJ5Jyxcblx0J3RocmVlLWpzJyxcblx0Jy4vdXRpbC9TVExMb2FkZXIuanMnXG5dLCBmdW5jdGlvbiAoJCwgVEhSRUUpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cblx0LyogdGhlIHBsdWdpbiAqL1xuXHR2YXIgcGx1Z2luID0gJC5jaXJjdWl0Ym9hcmQucGx1Z2luKHtcblx0XHRuYW1lOiAndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzLXN0bCcsXG5cdFx0cmVxdWlyZXM6IFsndGhyZWUtZC1nZW9tZXRyaWMtbW9kZWxzJ11cblx0fSk7XG5cblxuXHQvKiB0aGUgbG9hZGVyICovXG5cdHBsdWdpbi5hZGQoJ0NpcmN1aXRib2FyZC50aHJlZUpzTG9hZGVycy5zdGwnLCBUSFJFRS5TVExMb2FkZXIpO1xuXG5cbn0pO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIlRIUkVFXCIsXCJjb21tb25qczJcIjpcInRocmVlLWpzXCIsXCJjb21tb25qc1wiOlwidGhyZWUtanNcIixcImFtZFwiOlwidGhyZWUtanNcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKipcbiAqIEBhdXRob3IgYWxlZXBlciAvIGh0dHA6Ly9hZGFtbGVlcGVyLmNvbS9cbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIGdlcm8zIC8gaHR0cHM6Ly9naXRodWIuY29tL2dlcm8zXG4gKlxuICogRGVzY3JpcHRpb246IEEgVEhSRUUgbG9hZGVyIGZvciBTVEwgQVNDSUkgZmlsZXMsIGFzIGNyZWF0ZWQgYnkgU29saWR3b3JrcyBhbmQgb3RoZXIgQ0FEIHByb2dyYW1zLlxuICpcbiAqIFN1cHBvcnRzIGJvdGggYmluYXJ5IGFuZCBBU0NJSSBlbmNvZGVkIGZpbGVzLCB3aXRoIGF1dG9tYXRpYyBkZXRlY3Rpb24gb2YgdHlwZS5cbiAqXG4gKiBMaW1pdGF0aW9uczpcbiAqICAgIEJpbmFyeSBkZWNvZGluZyBzdXBwb3J0cyBcIk1hZ2ljc1wiIGNvbG9yIGZvcm1hdCAoaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9TVExfKGZpbGVfZm9ybWF0KSNDb2xvcl9pbl9iaW5hcnlfU1RMKS5cbiAqICAgIFRoZXJlIGlzIHBlcmhhcHMgc29tZSBxdWVzdGlvbiBhcyB0byBob3cgdmFsaWQgaXQgaXMgdG8gYWx3YXlzIGFzc3VtZSBsaXR0bGUtZW5kaWFuLW5lc3MuXG4gKiAgICBBU0NJSSBkZWNvZGluZyBhc3N1bWVzIGZpbGUgaXMgVVRGLTguIFNlZW1zIHRvIHdvcmsgZm9yIHRoZSBleGFtcGxlcy4uLlxuICpcbiAqIFVzYWdlOlxuICogICAgdmFyIGxvYWRlciA9IG5ldyBUSFJFRS5TVExMb2FkZXIoKTtcbiAqICAgIGxvYWRlci5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIGZ1bmN0aW9uICggZXZlbnQgKSB7XG4gKlxuICogXHRcdHZhciBnZW9tZXRyeSA9IGV2ZW50LmNvbnRlbnQ7XG4gKiBcdFx0c2NlbmUuYWRkKCBuZXcgVEhSRUUuTWVzaCggZ2VvbWV0cnkgKSApO1xuICpcbiAqIFx0fSApO1xuICogICAgbG9hZGVyLmxvYWQoICcuL21vZGVscy9zdGwvc2xvdHRlZF9kaXNrLnN0bCcgKTtcbiAqXG4gKiBGb3IgYmluYXJ5IFNUTHMgZ2VvbWV0cnkgbWlnaHQgY29udGFpbiBjb2xvcnMgZm9yIHZlcnRpY2VzLiBUbyB1c2UgaXQ6XG4gKiAgLi4uIC8vIHVzZSB0aGUgc2FtZSBjb2RlIHRvIGxvYWQgU1RMIGFzIGFib3ZlXG4gKiAgdmFyIGdlb21ldHJ5ID0gZXZlbnQuY29udGVudDtcbiAqICBpZiAoZ2VvbWV0cnkuaGFzQ29sb3JzKSB7XG4gKiAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGhvbmdNYXRlcmlhbCh7IG9wYWNpdHk6IGdlb21ldHJ5LmFscGhhLCB2ZXJ0ZXhDb2xvcnM6IFRIUkVFLlZlcnRleENvbG9ycyB9KTtcbiAqICB9IGVsc2UgeyAuLi4uIH1cbiAqIHZhciBtZXNoID0gbmV3IFRIUkVFLk1lc2goIGdlb21ldHJ5LCBtYXRlcmlhbCApO1xuICovXG5cblxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xuXG5kZWZpbmUoWyd0aHJlZS1qcyddLCBmdW5jdGlvbiAoVEhSRUUpIHtcblxuXG5cdFRIUkVFLlNUTExvYWRlciA9IGZ1bmN0aW9uICgpIHt9O1xuXG5cdFRIUkVFLlNUTExvYWRlci5wcm90b3R5cGUgPSB7XG5cblx0XHRjb25zdHJ1Y3RvcjogVEhSRUUuU1RMTG9hZGVyXG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAodXJsLCBjYWxsYmFjaykge1xuXG5cdFx0dmFyIHNjb3BlID0gdGhpcztcblxuXHRcdHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdGZ1bmN0aW9uIG9ubG9hZGVkKGV2ZW50KSB7XG5cblx0XHRcdGlmIChldmVudC50YXJnZXQuc3RhdHVzID09PSAyMDAgfHwgZXZlbnQudGFyZ2V0LnN0YXR1cyA9PT0gMCkge1xuXG5cdFx0XHRcdHZhciBnZW9tZXRyeSA9IHNjb3BlLnBhcnNlKGV2ZW50LnRhcmdldC5yZXNwb25zZSB8fCBldmVudC50YXJnZXQucmVzcG9uc2VUZXh0KTtcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2xvYWQnLCBjb250ZW50OiBnZW9tZXRyeSB9KTtcblxuXHRcdFx0XHRpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGdlb21ldHJ5KTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHtcblx0XHRcdFx0XHR0eXBlOiAnZXJyb3InLFxuXHRcdFx0XHRcdG1lc3NhZ2U6ICdDb3VsZG5cXCd0IGxvYWQgVVJMIFsnICsgdXJsICsgJ10nLFxuXHRcdFx0XHRcdHJlc3BvbnNlOiBldmVudC50YXJnZXQuc3RhdHVzVGV4dFxuXHRcdFx0XHR9KTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBvbmxvYWRlZCwgZmFsc2UpO1xuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cblx0XHRcdHNjb3BlLmRpc3BhdGNoRXZlbnQoeyB0eXBlOiAncHJvZ3Jlc3MnLCBsb2FkZWQ6IGV2ZW50LmxvYWRlZCwgdG90YWw6IGV2ZW50LnRvdGFsIH0pO1xuXG5cdFx0fSwgZmFsc2UpO1xuXG5cdFx0eGhyLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRzY29wZS5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2Vycm9yJywgbWVzc2FnZTogJ0NvdWxkblxcJ3QgbG9hZCBVUkwgWycgKyB1cmwgKyAnXScgfSk7XG5cblx0XHR9LCBmYWxzZSk7XG5cblx0XHRpZiAoeGhyLm92ZXJyaWRlTWltZVR5cGUpIHhoci5vdmVycmlkZU1pbWVUeXBlKCd0ZXh0L3BsYWluOyBjaGFyc2V0PXgtdXNlci1kZWZpbmVkJyk7XG5cdFx0eGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cdFx0eGhyLnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XG5cdFx0eGhyLnNlbmQobnVsbCk7XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuXG5cdFx0dmFyIGlzQmluYXJ5ID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHR2YXIgZXhwZWN0LCBmYWNlX3NpemUsIG5fZmFjZXMsIHJlYWRlcjtcblx0XHRcdHJlYWRlciA9IG5ldyBEYXRhVmlldyhiaW5EYXRhKTtcblx0XHRcdGZhY2Vfc2l6ZSA9ICgzMiAvIDggKiAzKSArICgoMzIgLyA4ICogMykgKiAzKSArICgxNiAvIDgpO1xuXHRcdFx0bl9mYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xuXHRcdFx0ZXhwZWN0ID0gODAgKyAoMzIgLyA4KSArIChuX2ZhY2VzICogZmFjZV9zaXplKTtcblx0XHRcdHJldHVybiBleHBlY3QgPT09IHJlYWRlci5ieXRlTGVuZ3RoO1xuXG5cdFx0fTtcblxuXHRcdHZhciBiaW5EYXRhID0gdGhpcy5lbnN1cmVCaW5hcnkoZGF0YSk7XG5cblx0XHRyZXR1cm4gaXNCaW5hcnkoKVxuXHRcdFx0XHQ/IHRoaXMucGFyc2VCaW5hcnkoYmluRGF0YSlcblx0XHRcdFx0OiB0aGlzLnBhcnNlQVNDSUkodGhpcy5lbnN1cmVTdHJpbmcoZGF0YSkpO1xuXG5cdH07XG5cblx0VEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZUJpbmFyeSA9IGZ1bmN0aW9uIChkYXRhKSB7XG5cblx0XHR2YXIgcmVhZGVyID0gbmV3IERhdGFWaWV3KGRhdGEpO1xuXHRcdHZhciBmYWNlcyA9IHJlYWRlci5nZXRVaW50MzIoODAsIHRydWUpO1xuXG5cdFx0dmFyIHIsIGcsIGIsIGhhc0NvbG9ycyA9IGZhbHNlLCBjb2xvcnM7XG5cdFx0dmFyIGRlZmF1bHRSLCBkZWZhdWx0RywgZGVmYXVsdEIsIGFscGhhO1xuXG5cdFx0Ly8gcHJvY2VzcyBTVEwgaGVhZGVyXG5cdFx0Ly8gY2hlY2sgZm9yIGRlZmF1bHQgY29sb3IgaW4gaGVhZGVyIChcIkNPTE9SPXJnYmFcIiBzZXF1ZW5jZSkuXG5cdFx0Zm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IDgwIC0gMTA7IGluZGV4KyspIHtcblxuXHRcdFx0aWYgKChyZWFkZXIuZ2V0VWludDMyKGluZGV4LCBmYWxzZSkgPT0gMHg0MzRGNEM0RiAvKkNPTE8qLykgJiZcblx0XHRcdFx0XHQocmVhZGVyLmdldFVpbnQ4KGluZGV4ICsgNCkgPT0gMHg1MiAvKidSJyovKSAmJlxuXHRcdFx0XHRcdChyZWFkZXIuZ2V0VWludDgoaW5kZXggKyA1KSA9PSAweDNEIC8qJz0nKi8pKSB7XG5cblx0XHRcdFx0aGFzQ29sb3JzID0gdHJ1ZTtcblx0XHRcdFx0Y29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShmYWNlcyAqIDMgKiAzKTtcblxuXHRcdFx0XHRkZWZhdWx0UiA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDYpIC8gMjU1O1xuXHRcdFx0XHRkZWZhdWx0RyA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDcpIC8gMjU1O1xuXHRcdFx0XHRkZWZhdWx0QiA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDgpIC8gMjU1O1xuXHRcdFx0XHRhbHBoYSA9IHJlYWRlci5nZXRVaW50OChpbmRleCArIDkpIC8gMjU1O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHZhciBkYXRhT2Zmc2V0ID0gODQ7XG5cdFx0dmFyIGZhY2VMZW5ndGggPSAxMiAqIDQgKyAyO1xuXG5cdFx0dmFyIG9mZnNldCA9IDA7XG5cblx0XHR2YXIgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdHZhciB2ZXJ0aWNlcyA9IG5ldyBGbG9hdDMyQXJyYXkoZmFjZXMgKiAzICogMyk7XG5cdFx0dmFyIG5vcm1hbHMgPSBuZXcgRmxvYXQzMkFycmF5KGZhY2VzICogMyAqIDMpO1xuXG5cdFx0Zm9yICh2YXIgZmFjZSA9IDA7IGZhY2UgPCBmYWNlczsgZmFjZSsrKSB7XG5cblx0XHRcdHZhciBzdGFydCA9IGRhdGFPZmZzZXQgKyBmYWNlICogZmFjZUxlbmd0aDtcblx0XHRcdHZhciBub3JtYWxYID0gcmVhZGVyLmdldEZsb2F0MzIoc3RhcnQsIHRydWUpO1xuXHRcdFx0dmFyIG5vcm1hbFkgPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDQsIHRydWUpO1xuXHRcdFx0dmFyIG5vcm1hbFogPSByZWFkZXIuZ2V0RmxvYXQzMihzdGFydCArIDgsIHRydWUpO1xuXG5cdFx0XHRpZiAoaGFzQ29sb3JzKSB7XG5cblx0XHRcdFx0dmFyIHBhY2tlZENvbG9yID0gcmVhZGVyLmdldFVpbnQxNihzdGFydCArIDQ4LCB0cnVlKTtcblxuXHRcdFx0XHRpZiAoKHBhY2tlZENvbG9yICYgMHg4MDAwKSA9PT0gMCkgeyAvLyBmYWNldCBoYXMgaXRzIG93biB1bmlxdWUgY29sb3JcblxuXHRcdFx0XHRcdHIgPSAocGFja2VkQ29sb3IgJiAweDFGKSAvIDMxO1xuXHRcdFx0XHRcdGcgPSAoKHBhY2tlZENvbG9yID4+IDUpICYgMHgxRikgLyAzMTtcblx0XHRcdFx0XHRiID0gKChwYWNrZWRDb2xvciA+PiAxMCkgJiAweDFGKSAvIDMxO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0ciA9IGRlZmF1bHRSO1xuXHRcdFx0XHRcdGcgPSBkZWZhdWx0Rztcblx0XHRcdFx0XHRiID0gZGVmYXVsdEI7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPD0gMzsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHZlcnRleHN0YXJ0ID0gc3RhcnQgKyBpICogMTI7XG5cblx0XHRcdFx0dmVydGljZXNbb2Zmc2V0XSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0LCB0cnVlKTtcblx0XHRcdFx0dmVydGljZXNbb2Zmc2V0ICsgMV0gPSByZWFkZXIuZ2V0RmxvYXQzMih2ZXJ0ZXhzdGFydCArIDQsIHRydWUpO1xuXHRcdFx0XHR2ZXJ0aWNlc1tvZmZzZXQgKyAyXSA9IHJlYWRlci5nZXRGbG9hdDMyKHZlcnRleHN0YXJ0ICsgOCwgdHJ1ZSk7XG5cblx0XHRcdFx0bm9ybWFsc1tvZmZzZXRdID0gbm9ybWFsWDtcblx0XHRcdFx0bm9ybWFsc1tvZmZzZXQgKyAxXSA9IG5vcm1hbFk7XG5cdFx0XHRcdG5vcm1hbHNbb2Zmc2V0ICsgMl0gPSBub3JtYWxaO1xuXG5cdFx0XHRcdGlmIChoYXNDb2xvcnMpIHtcblx0XHRcdFx0XHRjb2xvcnNbb2Zmc2V0XSA9IHI7XG5cdFx0XHRcdFx0Y29sb3JzW29mZnNldCArIDFdID0gZztcblx0XHRcdFx0XHRjb2xvcnNbb2Zmc2V0ICsgMl0gPSBiO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0b2Zmc2V0ICs9IDM7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHZlcnRpY2VzLCAzKSk7XG5cdFx0Z2VvbWV0cnkuYWRkQXR0cmlidXRlKCdub3JtYWwnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKG5vcm1hbHMsIDMpKTtcblxuXHRcdGlmIChoYXNDb2xvcnMpIHtcblx0XHRcdGdlb21ldHJ5LmFkZEF0dHJpYnV0ZSgnY29sb3InLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKGNvbG9ycywgMykpO1xuXHRcdFx0Z2VvbWV0cnkuaGFzQ29sb3JzID0gdHJ1ZTtcblx0XHRcdGdlb21ldHJ5LmFscGhhID0gYWxwaGE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGdlb21ldHJ5O1xuXG5cdH07XG5cblx0VEhSRUUuU1RMTG9hZGVyLnByb3RvdHlwZS5wYXJzZUFTQ0lJID0gZnVuY3Rpb24gKGRhdGEpIHtcblxuXHRcdHZhciBnZW9tZXRyeSwgbGVuZ3RoLCBub3JtYWwsIHBhdHRlcm5GYWNlLCBwYXR0ZXJuTm9ybWFsLCBwYXR0ZXJuVmVydGV4LCByZXN1bHQsIHRleHQ7XG5cdFx0Z2VvbWV0cnkgPSBuZXcgVEhSRUUuR2VvbWV0cnkoKTtcblx0XHRwYXR0ZXJuRmFjZSA9IC9mYWNldChbXFxzXFxTXSo/KWVuZGZhY2V0L2c7XG5cblx0XHR3aGlsZSAoKCByZXN1bHQgPSBwYXR0ZXJuRmFjZS5leGVjKGRhdGEpICkgIT09IG51bGwpIHtcblxuXHRcdFx0dGV4dCA9IHJlc3VsdFswXTtcblx0XHRcdHBhdHRlcm5Ob3JtYWwgPSAvbm9ybWFsW1xcc10rKFtcXC0rXT9bMC05XStcXC4/WzAtOV0qKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KStbXFxzXSsoW1xcLStdP1swLTldKlxcLj9bMC05XSsoW2VFXVtcXC0rXT9bMC05XSspPykrL2c7XG5cblx0XHRcdHdoaWxlICgoIHJlc3VsdCA9IHBhdHRlcm5Ob3JtYWwuZXhlYyh0ZXh0KSApICE9PSBudWxsKSB7XG5cblx0XHRcdFx0bm9ybWFsID0gbmV3IFRIUkVFLlZlY3RvcjMocGFyc2VGbG9hdChyZXN1bHRbMV0pLCBwYXJzZUZsb2F0KHJlc3VsdFszXSksIHBhcnNlRmxvYXQocmVzdWx0WzVdKSk7XG5cblx0XHRcdH1cblxuXHRcdFx0cGF0dGVyblZlcnRleCA9IC92ZXJ0ZXhbXFxzXSsoW1xcLStdP1swLTldK1xcLj9bMC05XSooW2VFXVtcXC0rXT9bMC05XSspPykrW1xcc10rKFtcXC0rXT9bMC05XSpcXC4/WzAtOV0rKFtlRV1bXFwtK10/WzAtOV0rKT8pK1tcXHNdKyhbXFwtK10/WzAtOV0qXFwuP1swLTldKyhbZUVdW1xcLStdP1swLTldKyk/KSsvZztcblxuXHRcdFx0d2hpbGUgKCggcmVzdWx0ID0gcGF0dGVyblZlcnRleC5leGVjKHRleHQpICkgIT09IG51bGwpIHtcblxuXHRcdFx0XHRnZW9tZXRyeS52ZXJ0aWNlcy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IzKHBhcnNlRmxvYXQocmVzdWx0WzFdKSwgcGFyc2VGbG9hdChyZXN1bHRbM10pLCBwYXJzZUZsb2F0KHJlc3VsdFs1XSkpKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRsZW5ndGggPSBnZW9tZXRyeS52ZXJ0aWNlcy5sZW5ndGg7XG5cblx0XHRcdGdlb21ldHJ5LmZhY2VzLnB1c2gobmV3IFRIUkVFLkZhY2UzKGxlbmd0aCAtIDMsIGxlbmd0aCAtIDIsIGxlbmd0aCAtIDEsIG5vcm1hbCkpO1xuXG5cdFx0fVxuXG5cdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cdFx0Z2VvbWV0cnkuY29tcHV0ZUJvdW5kaW5nU3BoZXJlKCk7XG5cblx0XHRyZXR1cm4gZ2VvbWV0cnk7XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmVuc3VyZVN0cmluZyA9IGZ1bmN0aW9uIChidWYpIHtcblxuXHRcdGlmICh0eXBlb2YgYnVmICE9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgYXJyYXlfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcblx0XHRcdHZhciBzdHIgPSAnJztcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYnVmLmJ5dGVMZW5ndGg7IGkrKykge1xuXHRcdFx0XHRzdHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhcnJheV9idWZmZXJbaV0pOyAvLyBpbXBsaWNpdGx5IGFzc3VtZXMgbGl0dGxlLWVuZGlhblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0cjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGJ1Zjtcblx0XHR9XG5cblx0fTtcblxuXHRUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlLmVuc3VyZUJpbmFyeSA9IGZ1bmN0aW9uIChidWYpIHtcblxuXHRcdGlmICh0eXBlb2YgYnVmID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHR2YXIgYXJyYXlfYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmxlbmd0aCk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJ1Zi5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRhcnJheV9idWZmZXJbaV0gPSBidWYuY2hhckNvZGVBdChpKSAmIDB4ZmY7IC8vIGltcGxpY2l0bHkgYXNzdW1lcyBsaXR0bGUtZW5kaWFuXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYXJyYXlfYnVmZmVyLmJ1ZmZlciB8fCBhcnJheV9idWZmZXI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBidWY7XG5cdFx0fVxuXG5cdH07XG5cblx0VEhSRUUuRXZlbnREaXNwYXRjaGVyLnByb3RvdHlwZS5hcHBseShUSFJFRS5TVExMb2FkZXIucHJvdG90eXBlKTtcblxuXHRpZiAodHlwZW9mIERhdGFWaWV3ID09PSAndW5kZWZpbmVkJykge1xuXG5cdFx0RGF0YVZpZXcgPSBmdW5jdGlvbiAoYnVmZmVyLCBieXRlT2Zmc2V0LCBieXRlTGVuZ3RoKSB7XG5cblx0XHRcdHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuXHRcdFx0dGhpcy5ieXRlT2Zmc2V0ID0gYnl0ZU9mZnNldCB8fCAwO1xuXHRcdFx0dGhpcy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aCB8fCBidWZmZXIubGVuZ3RoO1xuXHRcdFx0dGhpcy5faXNTdHJpbmcgPSB0eXBlb2YgYnVmZmVyID09PSBcInN0cmluZ1wiO1xuXG5cdFx0fVxuXG5cdFx0RGF0YVZpZXcucHJvdG90eXBlID0ge1xuXG5cdFx0XHRfZ2V0Q2hhckNvZGVzOiBmdW5jdGlvbiAoYnVmZmVyLCBzdGFydCwgbGVuZ3RoKSB7XG5cdFx0XHRcdHN0YXJ0ID0gc3RhcnQgfHwgMDtcblx0XHRcdFx0bGVuZ3RoID0gbGVuZ3RoIHx8IGJ1ZmZlci5sZW5ndGg7XG5cdFx0XHRcdHZhciBlbmQgPSBzdGFydCArIGxlbmd0aDtcblx0XHRcdFx0dmFyIGNvZGVzID0gW107XG5cdFx0XHRcdGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSsrKSB7XG5cdFx0XHRcdFx0Y29kZXMucHVzaChidWZmZXIuY2hhckNvZGVBdChpKSAmIDB4ZmYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjb2Rlcztcblx0XHRcdH0sXG5cblx0XHRcdF9nZXRCeXRlczogZnVuY3Rpb24gKGxlbmd0aCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG5cblx0XHRcdFx0dmFyIHJlc3VsdDtcblxuXHRcdFx0XHQvLyBIYW5kbGUgdGhlIGxhY2sgb2YgZW5kaWFubmVzc1xuXHRcdFx0XHRpZiAobGl0dGxlRW5kaWFuID09PSB1bmRlZmluZWQpIHtcblxuXHRcdFx0XHRcdGxpdHRsZUVuZGlhbiA9IHRoaXMuX2xpdHRsZUVuZGlhbjtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gSGFuZGxlIHRoZSBsYWNrIG9mIGJ5dGVPZmZzZXRcblx0XHRcdFx0aWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdFx0Ynl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldDtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ynl0ZU9mZnNldCA9IHRoaXMuYnl0ZU9mZnNldCArIGJ5dGVPZmZzZXQ7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdFx0bGVuZ3RoID0gdGhpcy5ieXRlTGVuZ3RoIC0gYnl0ZU9mZnNldDtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gRXJyb3IgQ2hlY2tpbmdcblx0XHRcdFx0aWYgKHR5cGVvZiBieXRlT2Zmc2V0ICE9PSAnbnVtYmVyJykge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRGF0YVZpZXcgYnl0ZU9mZnNldCBpcyBub3QgYSBudW1iZXInKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGxlbmd0aCA8IDAgfHwgYnl0ZU9mZnNldCArIGxlbmd0aCA+IHRoaXMuYnl0ZUxlbmd0aCkge1xuXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdEYXRhVmlldyBsZW5ndGggb3IgKGJ5dGVPZmZzZXQrbGVuZ3RoKSB2YWx1ZSBpcyBvdXQgb2YgYm91bmRzJyk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLmlzU3RyaW5nKSB7XG5cblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLl9nZXRDaGFyQ29kZXModGhpcy5idWZmZXIsIGJ5dGVPZmZzZXQsIGJ5dGVPZmZzZXQgKyBsZW5ndGgpO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHRyZXN1bHQgPSB0aGlzLmJ1ZmZlci5zbGljZShieXRlT2Zmc2V0LCBieXRlT2Zmc2V0ICsgbGVuZ3RoKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFsaXR0bGVFbmRpYW4gJiYgbGVuZ3RoID4gMSkge1xuXG5cdFx0XHRcdFx0aWYgKCEocmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpKSB7XG5cblx0XHRcdFx0XHRcdHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHJlc3VsdCk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXN1bHQucmV2ZXJzZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHJlc3VsdDtcblxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQ29tcGF0aWJpbGl0eSBmdW5jdGlvbnMgb24gYSBTdHJpbmcgQnVmZmVyXG5cblx0XHRcdGdldEZsb2F0NjQ6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblxuXHRcdFx0XHR2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDgsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbiksXG5cblx0XHRcdFx0XHRcdHNpZ24gPSAxIC0gKDIgKiAoYls3XSA+PiA3KSksXG5cdFx0XHRcdFx0XHRleHBvbmVudCA9ICgoKChiWzddIDw8IDEpICYgMHhmZikgPDwgMykgfCAoYls2XSA+PiA0KSkgLSAoKDEgPDwgMTApIC0gMSksXG5cblx0XHRcdFx0Ly8gQmluYXJ5IG9wZXJhdG9ycyBzdWNoIGFzIHwgYW5kIDw8IG9wZXJhdGUgb24gMzIgYml0IHZhbHVlcywgdXNpbmcgKyBhbmQgTWF0aC5wb3coMikgaW5zdGVhZFxuXHRcdFx0XHRcdFx0bWFudGlzc2EgPSAoKGJbNl0gJiAweDBmKSAqIE1hdGgucG93KDIsIDQ4KSkgKyAoYls1XSAqIE1hdGgucG93KDIsIDQwKSkgKyAoYls0XSAqIE1hdGgucG93KDIsIDMyKSkgK1xuXHRcdFx0XHRcdFx0XHRcdChiWzNdICogTWF0aC5wb3coMiwgMjQpKSArIChiWzJdICogTWF0aC5wb3coMiwgMTYpKSArIChiWzFdICogTWF0aC5wb3coMiwgOCkpICsgYlswXTtcblxuXHRcdFx0XHRpZiAoZXhwb25lbnQgPT09IDEwMjQpIHtcblx0XHRcdFx0XHRpZiAobWFudGlzc2EgIT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybiBOYU47XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBzaWduICogSW5maW5pdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAtMTAyMykgeyAvLyBEZW5vcm1hbGl6ZWRcblx0XHRcdFx0XHRyZXR1cm4gc2lnbiAqIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTEwMjIgLSA1Mik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gc2lnbiAqICgxICsgbWFudGlzc2EgKiBNYXRoLnBvdygyLCAtNTIpKSAqIE1hdGgucG93KDIsIGV4cG9uZW50KTtcblxuXHRcdFx0fSxcblxuXHRcdFx0Z2V0RmxvYXQzMjogZnVuY3Rpb24gKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuXG5cdFx0XHRcdHZhciBiID0gdGhpcy5fZ2V0Qnl0ZXMoNCwgYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSxcblxuXHRcdFx0XHRcdFx0c2lnbiA9IDEgLSAoMiAqIChiWzNdID4+IDcpKSxcblx0XHRcdFx0XHRcdGV4cG9uZW50ID0gKCgoYlszXSA8PCAxKSAmIDB4ZmYpIHwgKGJbMl0gPj4gNykpIC0gMTI3LFxuXHRcdFx0XHRcdFx0bWFudGlzc2EgPSAoKGJbMl0gJiAweDdmKSA8PCAxNikgfCAoYlsxXSA8PCA4KSB8IGJbMF07XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAxMjgpIHtcblx0XHRcdFx0XHRpZiAobWFudGlzc2EgIT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybiBOYU47XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBzaWduICogSW5maW5pdHk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGV4cG9uZW50ID09PSAtMTI3KSB7IC8vIERlbm9ybWFsaXplZFxuXHRcdFx0XHRcdHJldHVybiBzaWduICogbWFudGlzc2EgKiBNYXRoLnBvdygyLCAtMTI2IC0gMjMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHNpZ24gKiAoMSArIG1hbnRpc3NhICogTWF0aC5wb3coMiwgLTIzKSkgKiBNYXRoLnBvdygyLCBleHBvbmVudCk7XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRJbnQzMjogZnVuY3Rpb24gKGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuXHRcdFx0XHR2YXIgYiA9IHRoaXMuX2dldEJ5dGVzKDQsIGJ5dGVPZmZzZXQsIGxpdHRsZUVuZGlhbik7XG5cdFx0XHRcdHJldHVybiAoYlszXSA8PCAyNCkgfCAoYlsyXSA8PCAxNikgfCAoYlsxXSA8PCA4KSB8IGJbMF07XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRVaW50MzI6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0SW50MzIoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA+Pj4gMDtcblx0XHRcdH0sXG5cblx0XHRcdGdldEludDE2OiBmdW5jdGlvbiAoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG5cdFx0XHRcdHJldHVybiAodGhpcy5nZXRVaW50MTYoYnl0ZU9mZnNldCwgbGl0dGxlRW5kaWFuKSA8PCAxNikgPj4gMTY7XG5cdFx0XHR9LFxuXG5cdFx0XHRnZXRVaW50MTY6IGZ1bmN0aW9uIChieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcblx0XHRcdFx0dmFyIGIgPSB0aGlzLl9nZXRCeXRlcygyLCBieXRlT2Zmc2V0LCBsaXR0bGVFbmRpYW4pO1xuXHRcdFx0XHRyZXR1cm4gKGJbMV0gPDwgOCkgfCBiWzBdO1xuXHRcdFx0fSxcblxuXHRcdFx0Z2V0SW50ODogZnVuY3Rpb24gKGJ5dGVPZmZzZXQpIHtcblx0XHRcdFx0cmV0dXJuICh0aGlzLmdldFVpbnQ4KGJ5dGVPZmZzZXQpIDw8IDI0KSA+PiAyNDtcblx0XHRcdH0sXG5cblx0XHRcdGdldFVpbnQ4OiBmdW5jdGlvbiAoYnl0ZU9mZnNldCkge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5fZ2V0Qnl0ZXMoMSwgYnl0ZU9mZnNldClbMF07XG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdH1cblxuXG59KTtcblxuLyoganNoaW50IGlnbm9yZTplbmQgKi9cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3V0aWwvU1RMTG9hZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoicC10aHJlZS1kLWdlb21ldHJpYy1tb2RlbHMtc3RsLmpzIn0=