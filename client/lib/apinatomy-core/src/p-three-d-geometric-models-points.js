define([
	'jquery',
	'three-js',
	'./util/misc.js'
], function ($, THREE, U) {
	'use strict';


	/* the plugin */
	var plugin = $.circuitboard.plugin.do('three-d-geometric-models-points', {
		requires: ['three-d-geometric-models']
	});


	/* to translate a 3D point description object to a Geometry object */
	function coordsToGeometry({coordinates}) {
		var result = new THREE.Geometry();
		coordinates.forEach((coords) => {
			var geometry = new THREE.SphereGeometry(4, 32, 32);
			geometry.applyMatrix(new THREE.Matrix4()
					.setPosition(U.applyConstructor(THREE.Vector3, coords)));
			result.merge(geometry);
		});
		return result;
	}


	/* the loader */
	plugin.add('Circuitboard.threeJsLoaders.points', U.newSubclass(THREE.EventDispatcher, (superFn) => function () { superFn() }, {


		load(url, callback) {

			/* set up an HTTP request to get the file */
			var xhr = new XMLHttpRequest();
			xhr.addEventListener('load', ({ target: { status, response, statusText } }) => {
				if (status === 200 || status === 0) {

					/* generate the 3D object */
					var geometry = coordsToGeometry(this.parse(response));

					/* transmit that object in both supported ways */
					this.dispatchEvent({ type: 'load', content: geometry });
					if (callback) { callback(geometry) }

				} else {

					/* on an error loading the file */
					this.dispatchEvent({
						type: 'error',
						message: `Couldn't load URL [${url}]`,
						response: statusText
					});

				}
			}, false);

			/* on progress loading the file */
			xhr.addEventListener('progress', ({ loaded, total }) => {
				this.dispatchEvent({ type: 'progress', loaded: loaded, total: total });
			}, false);

			/* on an error loading the file */
			xhr.addEventListener('error', () => {
				this.dispatchEvent({ type: 'error', message: `Couldn't load URL [${url}]` });
			}, false);

			/* send the file request */
			xhr.open('GET', url, true);
			xhr.send(null);

		},


		parse(data) { return JSON.parse(data) }


	}));


});
