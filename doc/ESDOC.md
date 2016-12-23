# Esdoc

Esdoc is used to generate detailed documentation and measures documentation coverage.
It's mandatory to use Esdoc comments in this project.

## Format of esdoc

Sample comment:

```javascript
/**
 * [foo description]
 * @author Roman Pushkin (roman.pushkin@gmail.com)
 * @date 2016-04-24
 * @version [version]
 * @since [since_version_from_package_json]
 * @param {[type]} a [description]
 * @param {[type]} par [description]
 * @return {[type]} [description]
 */
function foo(a, par)
```

All parameters are required for public functions. It's also highly recommended
to write descriptions for private functions.

Parameter   | Description
------------|--------------
 `@version` | Function/class version. When you create a file, set it to 1.1. When you edit and delget it, increment minor version, e.g. to 1.2. Increment major version only if you have breaking changes.
 `@since` | Version parameter from `package.json`

Note that `@version` is not SEMVER. However, `@since` is SEMVER.

See also:
* [Difference](http://stackoverflow.com/a/32246313/337085) between @version and @since.
* [Esdoc Tags](https://esdoc.org/tags.html)
* [Esdoc Tutorial](https://esdoc.org/tutorial.html)

Along with tags described above, these tags are also highly recommended to use:

* `@example` - use to provide API example
* `@see http://` - use to provide a website link
* `@extends {ParentClass}` - use to specify parent class
* `{@link OtherClass}` - use to link documentation between one class and another

## Esdoc editor configuration

(Optional. You may want just to copy and paste documentation blocks from other parts of the project).

[dockblockr](https://atom.io/packages/docblockr) plugin is used for Atom (this plugin is also available for Sublime Text).

When using `dockblockr`, there are two essential commands available when you type:

```
/**
```

First command is `Enter` (press right after you typed `/**`). Second command is `Tab`. Depending on command you will either generate class/function description, or just a comment. Please note: there is limited support in dockblockr for es6.

Two important settings for docblockr (in Atom: `Cmd+Shift+P` -> `View installed packages` -> `docblockr` -> `Settings`):

* Align tags: no
* Extra tags: just copy the code below changing your name and email:

```
@author Roman Pushkin (roman.pushkin\@gmail.com), @date {{date}}, @version ${1:[version]}, @since ${1:[since_version_from_package_json]}
```

See also: [Configuration section on dockblockr plugin page](https://atom.io/packages/docblockr).

## Generate documentation

```bash
npm run esdoc
```

Command above will automatically generate documentation. `open ./esdoc/index.html`
to open docs in your browser. It's recommended to execute `npm run esdoc` every
time you create/update docs for your classes.
