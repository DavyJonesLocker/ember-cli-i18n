import base from 'ember-cli-i18n/rules/base';

export default function(value, result, path, countryCode) {
  return base(['one', 'other'], value, result, path, countryCode, function(value) {
    switch(true) {
      case (value >= 0 && value < 2): return 'one';
      default: return 'other';
    }
  });
}
