import Ember from 'ember';

var get = Ember.get;
var fmt = Ember.String.fmt;

export default function t() {
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift();
  var options = args.pop();
  var countryCode;
  var locale;

  var container = options.data.view.container;

  countryCode = container.lookup('application:main').locale;

  if (countryCode) {
    locale = lookupLocale(countryCode, container);
  }

  if (!locale) {
    countryCode = container.lookup('application:main').defaultLocale;
    locale = lookupLocale(countryCode, container);
  }

  var result = get(locale, path);

  result = fmt(result, args);

  return result;
}

function lookupLocale(countryCode, container) {
  return container.lookupFactory('locale:' + countryCode);
}
