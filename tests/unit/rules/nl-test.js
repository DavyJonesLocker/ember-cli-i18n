import Ember from 'ember';
import rules from 'ember-cli-i18n/rules/nl';
import cldrTest from '../../helpers/cldr';

var result = {
  one: 'one',
  other: 'other'
};

var path = 'result';
var countryCode = 'nl';
var ruleResults;

module('CLDR Rules - Dutch ('+countryCode+')');

test('one', function() {
  cldrTest(1, 'one', rules, result, path, countryCode);
});

test('other', function() {
  cldrTest(0, 'other', rules, result, path, countryCode);
  cldrTest(2, 'other', rules, result, path, countryCode);
});

test('assertion is thrown if no valid keys exist', function() {
  var badResult = {foo: 'bar'};
  var count = 0;
  var oldAssert = Ember.assert;
  Ember.assert = function() {
    count += 1;
  };

  rules(0, badResult, path, countryCode);
  equal(count, 1);
  Ember.assert = oldAssert;
});

test('assertion is thrown if non-numeric value is passed ', function() {
  var count = 0;
  var oldAssert = Ember.assert;
  Ember.assert = function() {
    count += 1;
  };

  rules('0', result, path, countryCode);
  equal(count, 1);
  Ember.assert = oldAssert;
});
