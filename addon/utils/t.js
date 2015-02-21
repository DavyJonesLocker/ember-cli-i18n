import Ember from 'ember';
import defaultservice from 'ember-cli-i18n/services/i18n';

var bind = Ember.run.bind;

import { read, readArray } from 'ember-cli-i18n/utils/stream';

function T(attributes) {
  for(var key in attributes) {
    this[key] = attributes[key];
  }
  this.t = function(path, values) {
    var service = this.container.lookupFactory('service:i18n');
    var result;
    var locale;

    if (!Ember.isArray(values)) {
      values = Array.prototype.slice.call(arguments, 1);
    }

    if (!service || service.lookupLocalePath) {
      service = defaultservice;
    }

    path = read(path);

    locale = service.resolveLocale(this.container, this);
    result = service.getLocalizedPath(locale, path, this.container, this);
    result = service.applyPluralizationRules(result, locale, path, this.container, values, this);

    Ember.assert('Missing translation for key "' + path + '".', result);
    Ember.assert('Translation for key "' + path + '" is not a string.', Ember.typeOf(result) === 'string');

    return service.fmt(result, readArray(values));
  };
}

T.create = function(attributes) {
  var t = new T(attributes);
  var fn = bind(t, t.t);
  fn.destroy = function() {};
  return fn;
};

export default T;
