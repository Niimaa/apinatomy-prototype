describe("circuitboard widget", function () {
	'use strict';

	var div;
	beforeEach(function () {
		div = $('<div>').appendTo('body');
	});

	it("is present", function () {
		expect(typeof div.circuitboard).toBe('function');
	});

	it("adds the 'circuitboard' class", function () {
		div.circuitboard();
		expect(div.hasClass('circuitboard')).toBeTruthy();
	});

	// TODO: more tests

});
