import T from 'ember-cli-i18n/utils/t';
import Ember from 'ember';

var container;
var application;
var t;

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
      number: 'Number: %@1',
      name: '%@ %@'
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

module('t utility function', {
  setup: function() {
    requirejs.backup();
    requirejs.clear();
    requirejs.rollback();
    setupLocales();

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

    container.register('application:main', application, { instantiate: false });

    t = T.create({container: container});
  },
  teardown: function() {
    requirejs.clear();
    requirejs.rollback();
  }
});

test('can lookup english translation', function() {
  application.defaultLocale = 'en';

  equal(t('foo'), 'bar');
});

test('can lookup french translation', function() {
  application.defaultLocale = 'fr';

  equal(t('foo'), 'baz');
});

test('can lookup in a path', function() {
  application.defaultLocale = 'en';

  equal(t('home.title'), 'Welcome');
});

test('interpolation', function() {
  application.defaultLocale = 'en';

  equal(t('number', 5), 'Number: 5');
});

test('prefers locale to defaultLocale', function() {
  application.defaultLocale = 'en';
  application.locale = 'fr';

  equal(t('foo'), 'baz');
});

test('can take value arguments', function() {
  application.defaultLocale = 'en';

  equal(t('name', 'John', 'Doe'), 'John Doe');
});

test('can take array arguments', function() {
  application.defaultLocale = 'en';

  equal(t('name', ['John', 'Doe']), 'John Doe');
});
