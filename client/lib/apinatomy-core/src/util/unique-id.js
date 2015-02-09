define([], function () {
	'use strict';

	var _nextId = 0;

	return function uniqueId(prefix) {
		return `${prefix||"unique-id"}-${_nextId++}`;
	};
});
