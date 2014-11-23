import t from 'ember-cli-i18n/utils/t';
import Ember from 'ember';

var container;
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

module('t Helper', {
  setup: function() {
    requirejs.backup();
    requirejs.clear();
    requirejs.rollback();
    setupLocales();

    application = {};

    container = new Ember.Container();
    container.lookupFactory = function(name) {
      var splitName = name.split(':');
      splitName[0] = splitName[0] + 's';

      return require('dummy/'+splitName.join('/'));
    };

    container.register('application:main', application, { instantiate: false });

    options = {
      data: {
        view: {
          container: container
        }
      }
    };
  },
  teardown: function() {
    requirejs.clear();
    requirejs.rollback();
  }
});

test('can lookup english translation', function() {
  application.defaultLocale = 'en';

  var result = t('foo', options);
  equal(result, 'bar');
});

test('can lookup french translation', function() {
  application.defaultLocale = 'fr';

  var result = t('foo', options);
  equal(result, 'baz');
});

test('can lookup in a path', function() {
  application.defaultLocale = 'en';

  var result = t('home.title', options);
  equal(result, 'Welcome');
});

test('interpolation', function() {
  application.defaultLocale = 'en';

  var result = t('number', 5, options);
  equal(result, 'Number: 5');
});
