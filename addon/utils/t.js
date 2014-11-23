import Ember from 'ember';

var get = Ember.get;
var fmt = Ember.String.fmt;

export default function t() {
  var args = Array.prototype.slice.call(arguments);
  var path = args.shift();
  var options = args.pop();

  var container = options.data.view.container;
  var countryCode = container.lookup('application:main').defaultLocale;

  var locale = container.lookupFactory('locale:' + countryCode);

  var result = get(locale, path);

  result = fmt(result, args);

  return result;
}
