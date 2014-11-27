import T from 'ember-cli-i18n/utils/t';
import t from 'dummy/helpers/t';
import Ember from 'ember';

var run = Ember.run;
var compile = Ember.Handlebars.compile;

var container;
var view;
var application;
var options;

/*globals define, require, requirejs*/

requirejs.rollback = function() {
  for(var entry in this.backupEntries) {
    this.entries[entry] = this.backupEntries[entry];
  }
};

requirejs.backup = function() {
  this.backupEntries = {};

  for(var entry in this.entries) {
    this.backupEntries[entry] = this.entries[entry];
  }
};

function setupLocales() {
  define('dummy/locales/en', [], function() {
    return {
      foo: 'bar',
      home: {
        title: 'Welcome'
      },
      number: 'Number: %@1'
    };
  });

  define('dummy/locales/fr', [], function() {
    return {
      foo: 'baz',
      home: {
        title: 'Bienvenue'
      }
    };
  });
}

function appendView(view) {
  run(view, 'appendTo', '#qunit-fixture');
}

module('t Helper', {
  setup: function() {
    requirejs.backup();
    requirejs.clear();
    requirejs.rollback();
    setupLocales();

    Ember.Handlebars.helpers['t'] = t;

    application = {
      localeStream: {
        value: function() {
          return application.locale;
        },
        subscribe: function () {}
      }
    };

    container = new Ember.Container();
    container.lookupFactory = function(name) {
      var splitName = name.split(':');
      splitName[0] = splitName[0] + 's';

      return require('dummy/'+splitName.join('/'));
    };

    container.register('utils:t', T);
    container.register('application:main', application, { instantiate: false });
  },
  teardown: function() {
    requirejs.clear();
    requirejs.rollback();

    if (view) {
      run(view, 'destroy');
    }
  }
});

test('can lookup english translation', function() {
  application.defaultLocale = 'en';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "foo"}}')
  });

  appendView(view);

  equal(view.$().text(), 'bar');
});

test('can lookup french translation', function() {
  application.defaultLocale = 'fr';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "foo"}}')
  });

  appendView(view);

  equal(view.$().text(), 'baz');
});

test('can lookup in a path', function() {
  application.defaultLocale = 'en';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "home.title"}}')
  });

  appendView(view);

  equal(view.$().text(), 'Welcome');
});

test('handles missing keys', function() {
  application.defaultLocale = 'en';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "not-there"}}')
  });

  appendView(view);

  equal(view.$().text(), '');
});

test('interpolation', function() {
  application.defaultLocale = 'en';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "number" 5}}')
  });

  appendView(view);

  equal(view.$().text(), 'Number: 5');
});

test('prefers locale to defaultLocale', function() {
  application.defaultLocale = 'en';
  application.locale = 'fr';

  view = Ember.View.create({
    container: container,
    template: compile('{{t "foo"}}')
  });

  appendView(view);

  equal(view.$().text(), 'baz');
});

