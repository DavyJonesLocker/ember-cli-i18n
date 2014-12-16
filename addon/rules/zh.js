import base from 'ember-cli-i18n/rules/base';

export default function(value, result, path, countryCode) {
  return base(['other'], value, result, path, countryCode, function(value) {
    switch(value) {
      default: return 'other';
    }
  });
}
