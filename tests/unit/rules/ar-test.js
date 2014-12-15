import Ember from 'ember';
import rules from 'ember-cli-i18n/rules/ar';
import cldrTest from '../../helpers/cldr';

var result = {
  zero: 'zero',
  one: 'one',
  two: 'two',
  few: 'few',
  many: 'many',
  other: 'other'
};

var path = 'result';
var countryCode = 'en';
var ruleResults;

module('CLDR Rules - Arabic (ar)');

test('zero', function() {
  cldrTest(0, 'zero', rules, result, path, countryCode);
});

test('one', function() {
  cldrTest(1, 'one', rules, result, path, countryCode);
});

test('two', function() {
  cldrTest(2, 'two', rules, result, path, countryCode);
});

var fewTest = function(value) {
  cldrTest(value, 'few', rules, result, path, countryCode);
};

test('few', function() {
  fewTest(3);
  fewTest(103);
  fewTest(110);
  fewTest(100003);
  fewTest(92103);
  fewTest(91207);
  fewTest(9110);
});

var manyTest = function(value) {
  cldrTest(value, 'many', rules, result, path, countryCode);
};

test('many', function() {
  manyTest(11);
  manyTest(99);
  manyTest(211);
  manyTest(299);
  manyTest(123411);
  manyTest(123499);
});

var otherTest = function(value) {
  cldrTest(value, 'other', rules, result, path, countryCode);
};

test('other', function() {
  otherTest(100);
  otherTest(101);
  otherTest(120200);
  otherTest(10.5);
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
