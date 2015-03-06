import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var App;

module('Acceptance: T', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('no arguments', function(assert) {
  visit('/');

  andThen(function() {
    var span = find('span.one');
    assert.equal(span.text(), 'bar');
  });
});

test('with bound arguments', function(assert) {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    assert.equal(span.text(), 'You are 35 years old');
  });
});

test('with pluralization', function(assert) {
  visit('/');

  andThen(function() {
    var span = find('span.three');
    assert.equal(span.text(), 'There are many people here');
  });
});

test('with pluralization updated from a stream', function(assert) {
  visit('/');

  andThen(function(){
    var span = find('span.four');
    assert.equal(span.text(), 'There is 1 dependent person here');
  });

  andThen(function(){
    click('.add-dependent');
  });

  andThen(function(){
    var span = find('span.four');
    assert.equal(span.text(), 'There are 2 dependent people here');
  });

});

test('changing application locale', function(assert) {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    assert.equal(span.text(), 'You are 35 years old');
  });

  andThen(function() {
    App.set('locale', 'es');
  });

  andThen(function() {
    var spanOne = find('span.one');
    assert.equal(spanOne.text(), 'es_bar');

    var spanTwo = find('span.two');
    assert.equal(spanTwo.text(), 'es_You are 35 years old');
  });
});
