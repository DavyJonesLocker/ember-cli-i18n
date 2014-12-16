import Ember from 'ember';
import rules from 'ember-cli-i18n/rules/ru';
import cldrTest from '../../helpers/cldr';

var result = {
  one: 'one',
  few: 'few',
  many: 'many',
  other: 'other'
};

var path = 'result';
var countryCode = 'ru';
var ruleResults;

module('CLDR Rules - Russian ('+countryCode+')');

test('one', function() {
  cldrTest(1, 'one', rules, result, path, countryCode);
  cldrTest(21, 'one', rules, result, path, countryCode);
  cldrTest(251, 'one', rules, result, path, countryCode);
});

test('few', function() {
  cldrTest(2, 'few', rules, result, path, countryCode);
  cldrTest(3, 'few', rules, result, path, countryCode);
  cldrTest(4, 'few', rules, result, path, countryCode);
  cldrTest(22, 'few', rules, result, path, countryCode);
  cldrTest(23, 'few', rules, result, path, countryCode);
  cldrTest(24, 'few', rules, result, path, countryCode);
});

test('many', function() {
  cldrTest(0, 'many', rules, result, path, countryCode);
  cldrTest(5, 'many', rules, result, path, countryCode);
  cldrTest(10, 'many', rules, result, path, countryCode);
  cldrTest(15, 'many', rules, result, path, countryCode);
  cldrTest(20, 'many', rules, result, path, countryCode);
  cldrTest(25, 'many', rules, result, path, countryCode);
  cldrTest(26, 'many', rules, result, path, countryCode);
  cldrTest(27, 'many', rules, result, path, countryCode);
  cldrTest(28, 'many', rules, result, path, countryCode);
  cldrTest(29, 'many', rules, result, path, countryCode);
  cldrTest(30, 'many', rules, result, path, countryCode);
});

test('other', function() {
  cldrTest(1.2, 'other', rules, result, path, countryCode);
  cldrTest(2.07, 'other', rules, result, path, countryCode);
  cldrTest(5.94, 'other', rules, result, path, countryCode);
  cldrTest(100.4, 'other', rules, result, path, countryCode);
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
