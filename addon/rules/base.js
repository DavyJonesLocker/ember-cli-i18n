import Ember from 'ember';

export default function(keys, value, result, path, countryCode, fn) {
  var type;

  if (hasValidKey(keys, result)) {
    if(Ember.typeOf(value) === 'number') {
      type = fn(value);      
    } else {
      Ember.assert('Translation for key "' + path + '" expected a count value.', false);
    }
  } else {
    Ember.assert('Translation for key "' + path + '" does not contain valid pluralization types for language "' + countryCode + '". Must contain one of the follow keys: ' + keys.join(', '), false);
  }

  return { result: result[type], path: path + '.' + type };
}

function hasValidKey(keys, result) {
  var resultKeys = Ember.keys(result);

  for(var i = 0; i < resultKeys.length; i++) {
    if (keys.indexOf(resultKeys[i]) > -1) {
     return true; 
    }
  }

  return false;
}
