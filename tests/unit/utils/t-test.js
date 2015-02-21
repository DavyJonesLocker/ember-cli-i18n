import T from 'ember-cli-i18n/utils/t';
import Ember from 'ember';

var get = Ember.get;
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
        title: 'Welcome',
        namedTitle: 'Welcome %@'
      },
      number: 'Number: %@1',
      name: '%@ %@',
      friend: {
        one: '%@ friend',
      }
    };
  });

  define('dummy/locales/en-us', [], function() {
    return {
      friend: {
        one: '%@ friend',
      }
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
      var splitName = name.split(/[@|:]/);
      var module;
      if (splitName.length === 2) {
        splitName.unshift('dummy');
      }

      splitName[1] = splitName[1] + 's';

      try {
        module = require(splitName.join('/'));
      }
      catch(e) {
        return null;
      }

      if (module && module['default']) { module = module['default']; }

      return module;
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

test('can lookup in a path and does not always assume pluralization', function() {
  application.defaultLocale = 'en';

  equal(t('home.namedTitle', 'Brian'), 'Welcome Brian');
});

test('interpolation', function() {
  application.defaultLocale = 'en';

  equal(t('number', 5), 'Number: 5');
});

test('pluralization', function() {
  application.defaultLocale = 'en';

  equal(t('friend', 1), '1 friend');
});

test('pluralization with hyphenated locale', function() {
  application.defaultLocale = 'en-us';

  equal(t('friend', 1), '1 friend');
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

test('throws on missing keys', function() {
  application.defaultLocale = 'en';

  throws(function() { t('missing'); });
});

test('throws on non-string values', function() {
  application.defaultLocale = 'en';

  throws(function() { t('home'); });
});

test('can override the locale lookup handler', function() {
  define('dummy/services/i18n', [], function() {
    return {
      getLocalizedPath: function(locale, path) {
        var translations = {
          'en': {
            'foo': 'bizbar'
          }
        };

        return get(translations[locale], path);
      },
      resolveLocale: function() {
        return 'en';
      },
      applyPluralizationRules: function(result) {
        return result;
      },
      fmt: function(result) {
        return result;
      }
    };
  });

  application.defaultLocale = 'en';

  equal(t('foo'), 'bizbar');
});

test('can override the format handler', function() {
  define('dummy/services/i18n', [], function() {
    return {
      getLocalizedPath: function(locale, path) {
        var translations = {
          'en': {
            'foo': 'bizbar'
          }
        };

        return get(translations[locale], path);
      },
      resolveLocale: function() {
        return 'en';
      },
      applyPluralizationRules: function(result) {
        return result;
      },
      fmt: function(result) {
        return 'barbiz';
      }
    };
  });

  application.defaultLocale = 'en';

  equal(t('foo'), 'barbiz');
});
