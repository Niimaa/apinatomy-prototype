define(['jquery', 'bluebird', './misc.js', '../Artefact.js', './kefir-and-eggs.js'], function ($, P, U, ArtefactP) {
	'use strict';


	/*  a function to create an apinatomy component (widget)          */
	/*  as a jQuery element plugin; this is returned from the module  */
	function newWidgetType(typeName, optionDefaults = {}) {

		/* the specific widget class */
		var WidgetP = ArtefactP.then((Artefact) => Artefact.newSubclass(typeName, function ({cssClass}) {

			/* set the element CSS class */
			if (U.isDefined(cssClass)) { this.element.addClass(cssClass) }

			/* if the jquery element is removed, destroy the artefact */
			this.element.asKefirStream('remove').onValue(() => { this.destroy() });

		}, {

			get model() { return this.options.model },

			get element() { return this.options.element }

		}, U.extend({

			beforeConstruction: P.resolve() // guarantee all widget construction to be asynchronous

		}, optionDefaults)));

		/* create a lowercase name for this widget type */
		var lowercaseName = typeName[0].toLowerCase() + typeName.slice(1);

		/* jQuery plugin: the widget creation & retrieval function  */
		$.fn[lowercaseName] = function (options) {

			/* if the word 'instance' is passed, return the (already created) widget promise */
			if (options === 'instance') { return this.data(`-amy-${lowercaseName}`) }

			/* else, create a new widget and set a promise to it */
			this.data(`-amy-${lowercaseName}`, WidgetP
					.then((Widget) => new Widget(U.extend(options, { element: this })).constructed));

			/* return the jQuery element instance, by jQuery convention */
			return this;

		};

		/* return a promise to the widget artefact class */
		return WidgetP;

	}


	/* expose the widget class creator function */
	return newWidgetType;


});
