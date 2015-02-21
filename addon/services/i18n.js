import Ember from 'ember';

var get = Ember.get;

export default {
  resolveLocale: function(container) {
    var application = container.lookup('application:main');
    var locale = application.localeStream.value();
    var defaultLocale = application.defaultLocale;
    var localeSet = container.lookupFactory('locale:' + locale);

    if (!localeSet) {
      locale = defaultLocale;
    }

    return locale;
  },
  getLocalizedPath: function(locale, path, container) {
    var localeSet = container.lookupFactory('locale:' + locale);

    return get(localeSet, path);
  },
  applyPluralizationRules: function(result, locale, path, container, values) {
    if (Ember.typeOf(result) === 'object') {
      var rules = container.lookupFactory('ember-cli-i18n@rule:'+locale.split('-')[0]);
      var ruleResults = rules(values[0], result, path, locale);
      result = ruleResults.result;
      path = ruleResults.path;
    }
    return result;
  },
  fmt: Ember.String.fmt
};
