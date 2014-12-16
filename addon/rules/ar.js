import base from 'ember-cli-i18n/rules/base';

export default function(value, result, path, countryCode) {
  var validKeys = ['zero', 'one', 'two', 'few', 'many', 'other'];

  return base(validKeys, value, result, path, countryCode, function(value) {
    var mod100 = value % 100;
    switch(true) {
      case (value === 0): return 'zero';
      case (value === 1): return 'one';
      case (value === 2): return 'two';
      case (mod100 >= 3 && mod100 <= 10): return 'few';
      case (mod100 >= 11 && mod100 <= 99): return 'many';
      default: return 'other';
    }
  });
}
