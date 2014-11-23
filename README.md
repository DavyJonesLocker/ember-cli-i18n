# Ember CLI i18n

[![Build](https://travis-ci.org/dockyard/ember-cli-i18n.svg?branch=master)](https://travis-ci.org/dockyard/ember-cli-i18n)

## About ##

Simple Internationalization support for ember-cli apps.

## Install ##

```bash
npm install ember-cli-i18n --save-dev
```

## Usage ##

### Translate

#### Configuration

In your app's `config/environment.js` you'll need to set
`ENV.APP.defaultLocale` to a country code:

```javascript
var ENV = {
  APP: {
    defaultLocale: 'en'
  }
};
```

#### Locale Files

Generate a new locale file:

```
ember g locale en
```

The file will be added to `app/locales'

```
app/
└── locales
    └── en.js
```

The content export a single POJO:

```javascript
export default {
  home: {
    title: 'Welcome'
  }
};
```

##### Interpolation

You can add keys for interpolation

```javascript
export default {
  age: 'You are %@1 years old.'
};
```

The rules for interpolation follow the same from
`[Ember.String.fmt](http://emberjs.com/api/classes/Ember.String.html#method_fmt)`

#### Helper

You can access the translations in your app with the `t` helper:

```handlebars
{{t 'home.title'}}
```

Computed properties for the path are also supported:

```handlebars
{{t age}}
```

If the value has interpolation keys you can pass those values:

```handlebars
{{t colors colorOne colorTwo}}
```

#### Utility

The `t` function can be used outside of templates as a utility function:

```javascript
import Ember from 'ember';
import t from 'ember-cli-i18n';

export default Ember.Object.extend({
  foo: function() {
    return t('foo.bar');
  }
});
```

## Authors ##

* [Brian Cardarella](http://twitter.com/bcardarella)

[We are very thankful for the many contributors](https://github.com/dockyard/ember-cli-i18n/graphs/contributors)

## Versioning ##

This library follows [Semantic Versioning](http://semver.org)

## Want to help? ##

Please do! We are always looking to improve this gem. Please see our
[Contribution Guidelines](https://github.com/dockyard/ember-cli-i18n/blob/master/CONTRIBUTING.md)
on how to properly submit issues and pull requests.

## Legal ##

[DockYard](http://dockyard.com), Inc &copy; 2014

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
