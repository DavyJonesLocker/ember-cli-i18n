# Ember CLI i18n

[![Build](https://travis-ci.org/dockyard/ember-cli-i18n.svg?branch=master)](https://travis-ci.org/dockyard/ember-cli-i18n)

## About ##

Simple Internationalization support for ember-cli apps.

**Note: This release requires Ember 1.9. Will likely break with 1.10**

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

`defaultLocale` is only the fallback. If you wanted to change the locale
of the application you should modify your application's `locale`:

```js
var set = Ember.set;
var application = container.lookup('application:main');
set(application, 'locale', 'fr');
```

You can can trigger this after authentication, or if the user modifies a
language setting in the app. Of course when this state is removed you
should clear `locale` so that internationalization fallback to
`defaultLocale`.

#### Locale Files

Generate a new locale file:

```
ember g locale en
```

The file will be added to `app/locales`

```
app
└── locales
    └── en.js
```

Then export a single POJO:

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
  age: 'You are %@1 years old.',
  name: '%@, %@'
};
```

The rules for interpolation follow the same from
[`Ember.String.fmt`](http://emberjs.com/api/classes/Ember.String.html#method_fmt)

#### Pluralization

Translations can have the following pluralization values `zero`, `one`,
and `other`:

```javascript
export default {
  friend: {
    zero: 'no friends, %@2',
    one: 'only one friend, %@2',
    other: '%@ friends, %@'
  }
};
```

The first value passed will be considered the `count` for determining
how to pluralize. 

```javascript
t('friend', 0, 'Brian');
// no friends, Brian

t('friend', 1, 'Brian');
// only one friend, Brian

t('friend', 10, 'Brian');
// 10 friends, Brian
```

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

export default Ember.Object.extend({
  foo: function() {
    var t = container.lookup('utils:t');
    return t('foo.bar');
  }
});
```

`t` is automatically injected into **Controllers**, **Components**,
**Routes**, and **Models**:

```javascript
export default DS.Model.extend({
  name: function() {
    return this.t('name', 'John', 'Doe');
  }
});
```
Note that interpolation values can also be passed as an array if you prefer this style. `this.t('name', ['John', 'Doe'])` 

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
