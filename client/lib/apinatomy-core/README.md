# apinatomy-core

This is the core component (widget) of the ApiNATOMY circuit-board system. It offers a jQuery plugin to
create visual [*treemaps*](http://en.wikipedia.org/wiki/Treemapping) that can be manipulated and made
dynamic through a flexible plugin system.

We will generally call the resulting visualization a *circuitboard*, because the plugin system allows for
various content to appear on top of the treemap, floating over the treemap, or interconnecting the tiles
inside the treemap. We will use the term *treemap* when we consider only the (nested) tile-structure.


## Installation

This library depends on
[jQuery](https://github.com/jquery/jquery),
[bluebird](https://github.com/petkaantonov/bluebird),
[delta.js](https://github.com/mhelvens/delta.js) and
[js-graph](https://github.com/mhelvens/js-graph).

### Install using Bower

`apinatomy-core` is available as a [Bower](http://bower.io/) package, installed as follows:

```shell
bower install apinatomy-core
```

### Install using NPM

`apinatomy-core` is available as an [NPM](https://www.npmjs.org) package, installed as follows:

```shell
npm install apinatomy-core
```

## Usage

The `apinatomy-core` packages use the [UMD](https://github.com/umdjs/umd) API, so they support
AMD ([RequireJS](http://requirejs.org/)), CommonJS and script-tags.

There are currently two types of files that may be loaded:

| File                      | Purpose                                                  |
|:------------------------- |:-------------------------------------------------------- |
| `dist/circuitboard.js`    | the main package, with the `.circuitboard` jQuery method |
| `dist/p-<name>.js`        | one of many *plugins*, which enables new features        |

Check out the files in the `example` folder to see these files in use.

### Importing the Library

This is how to use the HTML `<script>` tag to import the library:

```html
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="https://code.jquery.com/ui/1.11.1/jquery-ui.min.js"></script>
<script src="lib/apinatomy-core/dist/circuitboard.min.js"></script>
```

### Instantiating a circuit-board

Then, an existing element can be turned into a circuit-board as follows:

```html
<div id="my-circuitboard"></div>

<script>
    $('#my-circuitboard').circuitboard({
        // options
    });
</script>
```

**However, before you get something useful from this, two extra ingredients are needed:
  a *model* and a set of *plugins*.**


## Models

The structure of the treemap is determined by a *model*. ApiNATOMY expects such a model
to offer a certain API in order to traverse its structure. At the very least, a model is
a JavaScript object with the following members:

*  A field `id` which contains a string; a unique identifier.
*  A method `getChildIds()` which returns
   (a [promise](https://github.com/petkaantonov/bluebird#what-are-promises-and-why-should-i-use-them) of)
   an array of identifiers, representing the direct children of this model.
*  A method `getModels(ids)` which takes an array of identifiers, and returns
   (a promise of) an array filled with (promises of) the corresponding models.
   Each model again needs to satisfy these three properties.

ApiNATOMY allows these methods to return promises (rather than immediate data) because
the process of retrieving such data is likely to be asynchronous. For example, it may
send a server request, or attempt to load the data from disk.

A model is loaded into the circuit-board by use of an option:

```javascript
$('#my-circuitboard').circuitboard({
    model: myModel
});
```

Each model may be represented by zero or more tiles in the treemap. I'll repeat that:
*zero or more tiles*. A model may never end up being displayed—by plugging in a filter
that rejects it—, or it may be displayed more than once—by being an ancestor of the
root tile through multiple paths. Note, however, that *no two distinct models may have
the same `id`*. In other words, it is expected that the model implementation takes care
of merging identical models into a single JavaScript object. (In the future, a caching
layer will be made available which can take care of this for you.)

Certain plugins may require other properties of a model. For example, the `tile-skin` plugin
looks for a `name` property to display in the tile, and a `css` property to apply
customizable styling. But… what are plugins?

## Using Plugins

The bare `circuitboard.js` widget does almost nothing, except create some
variation points where plugins can hook in. In ApiNATOMY, everything is plugins.
A number of fundamental plugins are supplied with the core, `tile-skin` and
`tile-click-to-open` being basic examples.

The plugins of ApiNATOMY are based on the [`delta.js`](https://github.com/mhelvens/delta.js) library (i.e., a plugin is a delta). If you want to do advanced things with plugins, it is recommended that you familiarize yourself with `delta.js`.

A plugin can be in one of three states:

1. *registered*, meaning the plugin system is aware of the plugin, but not that it will necessarily be applied,
2. *selected*, meaning it is chosen by the developer (either directly or indirectly) to be applied, and
3. *applied*, meaning it is done loading, and the artefacts of ApiNATOMY now exhibit its features.

A plugin is *registered* when its `p-*.js` file is loaded. This can be as simple as
loading it with a script-tag:

```html
...
<script src="lib/apinatomy-core/dist/circuitboard.min.js"></script>
<script src="lib/apinatomy-core/dist/p-tile-skin.min.js"></script>
<script src="lib/apinatomy-core/dist/p-tile-click-to-open.min.js"></script>
```

Though more advanced module loaders such as RequireJS may also be used.
Note that the plugin files must be loaded *after* `circuitboard.js`.

Plugins can be explicitly *selected* by using the `$.circuitboard.plugin` function. For example:

```javascript
$.circuitboard.plugin('tile-skin', 'tile-click-to-open');
$('$my-circuitboard').circuitboard({
    model: myModel
});
```
This can only be done for plugins that have `manuallySelectable` set to `true` (the default).

Note that plugins must be selected *before* any circuit-board artefact is instantiated.
It should be one of the first things you do in your application.

The `tile-skin` plugin gives the tiles a more comfortable look and feel, and differentiates
between the style of an open tile and a closed tile. `tile-click-to-open` allows
you to open tiles by clicking on them. Comprehensive descriptions of the other standard
plugins are forthcoming.

The plugin system allows ApiNATOMY to be only as big and complicated as you need, and
avoids mixing up concerns inside the code-base. As a result, it will be a lot easier
to extend ApiNATOMY to support new features.

There will be many more plugins for basic functionality, as it has become the main way
of implementing new features. It can become tedious to load all of these manually,
so future versions will offer a way to simplify and/or automate loading the basic stuff.

## Developing Plugins

A plugin is a JavaScript object registered through the `$.circuitboard.plugin` function
(this overloads the function that *selects* a plugin):

```javascript
var plugin = $.circuitboard.plugin({
    name:  'my-plugin',
    if:    autoLoadingCondition,
    requires: ['other-plugin-1', 'other-plugin-3']
    after: ['other-plugin-1', 'other-plugin-2'],
});
```

### Predicates

Before explaining the supported options, let's briefly describe the notion of 'predicate',
a type of data accepted by several of those options.
A predicate is a condition on the set of selected deltas, and can be
given as one of the following:

* the value `true`
* the value `false`
* an array of delta-names, interpreted as a conjunction. The condition is true exactly if *all* deltas in the list are selected.

### Supported Options

The following options may be passed to the `Delta` constructor:

| options              | default   | meaning
| -------------------- | --------- | -------
| `name`               |           | an string by which to refer to the plugin. No two plugins may have the same name.
| `manuallySelectable` | `true`    | a Boolean, specifying whether the plugin can be selected through the `.plugin` method
| `if`                 | `false`   | a predicate, specifying whether this plugin will be automatically selected
| `onlyIf`             | `true`    | a predicate that is required to hold if this plugin is ever selected. If this plugin is ever selected without this predicate being met, an error will be thrown at the variation point where the plugin is applied.
| `after`              | `[]`      | a list of plugin names. This plugin is guaranteed to be applied after the deltas in this list. If the registration of this plugin creates an application order cycle, an error will be thrown.
| `selects`            | `[]`      | a list of plugin names. If this plugin is selected, all deltas in this list will also be selected.

Each of these options will be available as a field on the constructed plugin.
For convenience, there are some options that combine multiple of the above:

| options     | combines
| ----------- | --------
| `iff`       | `if` and `onlyIf`
| `expects`   | `onlyIf` and `after`
| `requires`  | `after` and `selects`
| `resolves`  | `if`, `onlyIf` and `after`; and sets `manuallySelectable` to `false`


The *operations*, which actually implement the plugin, deserve a separate subsection.

### Plugin Operations

Plugins modify the main ApiNATOMY artefacts on a code level (by something called *invasive composition*).
At the top level, a plugin specifies one or more artefacts to modify. There are currently three
types of artefact: `Circuitboard`, `Tilemap` and `Tile`. These can be seen as 'JavaScript classes', and
are internally instantiated with `new`, and each is guaranteed to then call their own `.construct` method. A plugin can modify these artefact classes in any number of ways,
and to a granularity of any depth. For example, to add a new `refresh` method to `Circuitboard` instances,
you could do the following:

```javascript
var plugin = $.circuitboard.plugin({ /* meta-data (see above) */ });

plugin.modify('Circuitboard').modify('prototype').add('refresh', function () {
    this.doSomeRefreshingThing();
    /* ... */
});
```

Note the method-chaining syntax being used here. `plugin`, here, is
an object (called a 'delta') that can be used to specify modifications on any artefact and at
any level. `plugin.modify('Circuitboard')` is an object that can be used to modify the
`Circuitboard` class at that level, or any below. So:

> The `modify` operation descends one level in the artefact hierarchy to specify more fine-grained modifications.

The syntax above has a convenient shorthand:

```javascript
plugin.add('Circuitboard.prototype.refresh', function () { /* ... */ });
```

> The dot-notation is a shorthand for inserting a number of chained `modify` operations.

In those regards, `modify` is special. But there are a number of other available operations. For comprehensive documentation for each of them, have a look at the documentation of the [delta API](https://github.com/mhelvens/delta.js#the-delta-api).

| operation | meaning
| -------   | ---
| `add`     | add a new key/value pair to an object. This assumes it is not already there.
| `remove`  | remove a key/value pair from an object. This assumes it is there to be removed.
| `replace` | the same as a `remove` followed by an `add`. So this assumes the key is present.
| `forbid`  | the same as an `add` followed by a `remove`. So this is only an assertion that the given key is not present.
| `insert`  | insert a a function to be run inside an existing method. This assumes the given key already has a function value. It keeps its function scope, so you can use plugin-local variables, and it receives the same arguments as the original function. It is guaranteed *not* to go 'inside' of another `insert`ed code-block, but no guarantees are made as to the order between such code-blocks.
| `prepend` | like `insert`, but it always inserts the new code at the beginning of the target function
| `append`  | like `insert`, but it always inserts the new code at the end of the target function
| `after`   | like `append`, except that it is aware of asynchronous operations by use of *promises*. If the original function returns a promise, the inserted code runs only after that promise has been fulfilled.

Here is a short example, which also shows an alternative syntax for specifying operations:

```javascript
$.circuitboard.plugin({
    name: 'click-to-maximize',
    after: ['tile-maximize'],
    
    'modify Tile.prototype': {
        'add ensureMaximization': function () {
            this.maximized = true;
        },
        'after construct': function () {
            this.on('click', function () {
                this.ensureMaximization();
            });
        }
    }
});
```

> Inside a 'modify context' (including the main plugin object configuration object),
> nested objects with `<operation> <propertyName>` may be used to specify operations
> instead of method-chaining. This is a matter of personal preference.

The `after` operation can be very useful for asynchronous code, but as you can see,
you can safely use `after` without having to know about promises.
Have a look at `p-tile-spacing.js` for another good example of this.

Every artefact prototype has a `construct` method, which is guaranteed to run for each
artefact instance. It is common practice
to `insert` or `after` initialization code directly into this method.

To get a better intuition behind plugins, you are encouraged to look at the files in `src/`.
All the ones that start with `p-` are plugins.

Plugins continue to be refined (see, for example, #7 and #8). As plugins change, I hope to
keep this documentation somewhat up to date. But things are still moving rather quickly.
Be aware that the plugin API may still change in incompatible ways.
