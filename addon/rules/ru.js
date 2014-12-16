import base from 'ember-cli-i18n/rules/base';

export default function(value, result, path, countryCode) {
  var validKeys = ['one','few', 'many', 'other'];

  return base(validKeys, value, result, path, countryCode, function(value) {
    var mod1 = value % 1;
    var mod10 = value % 10;
    var mod100 = value % 100;
    switch(true) {
      case (value % 10 === 1 && value % 100 !== 11): return 'one';
      case (mod1 === 0 && (mod10 >= 2 && mod10 <= 4) && !(mod100 >= 12 && mod100 <= 14)): return 'few';
      case (mod1 === 0 && (mod10 === 0 || (mod10 >= 5 && mod10 <= 9) || (mod100 >= 11 && mod100 <= 14))): return 'many';
      default: return 'other';
    }
  });
}
