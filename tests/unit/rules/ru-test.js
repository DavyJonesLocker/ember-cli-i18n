import Ember from 'ember';
import { module, test } from 'qunit';
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

test('one', function(assert) {
  cldrTest(assert, 1, 'one', rules, result, path, countryCode);
  cldrTest(assert, 21, 'one', rules, result, path, countryCode);
  cldrTest(assert, 251, 'one', rules, result, path, countryCode);
});

test('few', function(assert) {
  cldrTest(assert, 2, 'few', rules, result, path, countryCode);
  cldrTest(assert, 3, 'few', rules, result, path, countryCode);
  cldrTest(assert, 4, 'few', rules, result, path, countryCode);
  cldrTest(assert, 22, 'few', rules, result, path, countryCode);
  cldrTest(assert, 23, 'few', rules, result, path, countryCode);
  cldrTest(assert, 24, 'few', rules, result, path, countryCode);
});

test('many', function(assert) {
  cldrTest(assert, 0, 'many', rules, result, path, countryCode);
  cldrTest(assert, 5, 'many', rules, result, path, countryCode);
  cldrTest(assert, 10, 'many', rules, result, path, countryCode);
  cldrTest(assert, 15, 'many', rules, result, path, countryCode);
  cldrTest(assert, 20, 'many', rules, result, path, countryCode);
  cldrTest(assert, 25, 'many', rules, result, path, countryCode);
  cldrTest(assert, 26, 'many', rules, result, path, countryCode);
  cldrTest(assert, 27, 'many', rules, result, path, countryCode);
  cldrTest(assert, 28, 'many', rules, result, path, countryCode);
  cldrTest(assert, 29, 'many', rules, result, path, countryCode);
  cldrTest(assert, 30, 'many', rules, result, path, countryCode);
});

test('other', function(assert) {
  cldrTest(assert, 1.2, 'other', rules, result, path, countryCode);
  cldrTest(assert, 2.07, 'other', rules, result, path, countryCode);
  cldrTest(assert, 5.94, 'other', rules, result, path, countryCode);
  cldrTest(assert, 100.4, 'other', rules, result, path, countryCode);
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
