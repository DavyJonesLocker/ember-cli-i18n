import base from 'ember-cli-i18n/rules/base';

export default function(value, result, path, countryCode) {
  var validKeys = ['zero', 'one', 'two', 'few', 'many', 'other'];

  return base(validKeys, value, result, path, countryCode, function(value) {
    var tmpVal;
    switch(true) {
      case (value === 0): return 'zero';
      case (value === 1): return 'one';
      case (value === 2): return 'two';
      case ((tmpVal = value % 100) && tmpVal >= 3 && tmpVal <= 10): return 'few';
      case ((tmpVal = value % 100) && tmpVal >= 11 && tmpVal <= 99): return 'many';
      default: return 'other';
    }
  });
}
