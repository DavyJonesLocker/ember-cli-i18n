import Ember from 'ember';
import { module, test } from 'qunit';
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
var countryCode = 'ar';
var ruleResults;

module('CLDR Rules - Arabic ('+countryCode+')');

test('zero', function(assert) {
  cldrTest(assert, 0, 'zero', rules, result, path, countryCode);
});

test('one', function(assert) {
  cldrTest(assert, 1, 'one', rules, result, path, countryCode);
});

test('two', function(assert) {
  cldrTest(assert, 2, 'two', rules, result, path, countryCode);
});

var fewTest = function(assert, value) {
  cldrTest(assert, value, 'few', rules, result, path, countryCode);
};

test('few', function(assert) {
  fewTest(assert, 3);
  fewTest(assert, 103);
  fewTest(assert, 110);
  fewTest(assert, 100003);
  fewTest(assert, 92103);
  fewTest(assert, 91207);
  fewTest(assert, 9110);
});

var manyTest = function(assert, value) {
  cldrTest(assert, value, 'many', rules, result, path, countryCode);
};

test('many', function(assert) {
  manyTest(assert, 11);
  manyTest(assert, 99);
  manyTest(assert, 211);
  manyTest(assert, 299);
  manyTest(assert, 123411);
  manyTest(assert, 123499);
});

var otherTest = function(assert, value) {
  cldrTest(assert, value, 'other', rules, result, path, countryCode);
};

test('other', function(assert) {
  otherTest(assert, 100);
  otherTest(assert, 101);
  otherTest(assert, 120200);
  otherTest(assert, 10.5);
});

test('assertion is thrown if no valid keys exist', function(assert) {
  var badResult = {foo: 'bar'};
  var count = 0;
  var oldAssert = Ember.assert;
  Ember.assert = function() {
    count += 1;
  };

  rules(0, badResult, path, countryCode);
  assert.equal(count, 1);
  Ember.assert = oldAssert;
});

test('assertion is thrown if non-numeric value is passed ', function(assert) {
  var count = 0;
  var oldAssert = Ember.assert;
  Ember.assert = function() {
    count += 1;
  };

  rules('0', result, path, countryCode);
  assert.equal(count, 1);
  Ember.assert = oldAssert;
});
