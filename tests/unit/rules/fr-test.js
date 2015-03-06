import Ember from 'ember';
import { module, test } from 'qunit';
import rules from 'ember-cli-i18n/rules/fr';
import cldrTest from '../../helpers/cldr';

var result = {
  one: 'one',
  other: 'other'
};

var path = 'result';
var countryCode = 'fr';
var ruleResults;

module('CLDR Rules - French ('+countryCode+')');

test('one', function(assert) {
  cldrTest(assert, 0, 'one', rules, result, path, countryCode);
  cldrTest(assert, 1, 'one', rules, result, path, countryCode);
  cldrTest(assert, 1.9, 'one', rules, result, path, countryCode);
});

test('other', function(assert) {
  cldrTest(assert, 2, 'other', rules, result, path, countryCode);
  cldrTest(assert, 299, 'other', rules, result, path, countryCode);
  cldrTest(assert, 2.07, 'other', rules, result, path, countryCode);
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
