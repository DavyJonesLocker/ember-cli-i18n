import Ember from 'ember';
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

test('no arguments', function() {
  visit('/');

  andThen(function() {
    var span = find('span.one');
    equal(span.text(), 'bar');
  });
});

test('with bound arguments', function() {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    equal(span.text(), 'You are 35 years old');
  });
});

test('with pluralization', function() {
  visit('/');

  andThen(function() {
    var span = find('span.three');
    equal(span.text(), 'There are many people here');
  });
});

test('with pluralization updated from a stream', function(){
  visit('/');

  andThen(function(){
    var span = find('span.four');
    equal(span.text(), 'There is 1 dependent person here');
  });

  andThen(function(){
    click('.add-dependent');
  });

  andThen(function(){
    var span = find('span.four');
    equal(span.text(), 'There are 2 dependent people here');
  });

});

test('changing application locale', function() {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    equal(span.text(), 'You are 35 years old');
  });

  andThen(function() {
    App.set('locale', 'es');
  });

  andThen(function() {
    var spanOne = find('span.one');
    equal(spanOne.text(), 'es_bar');

    var spanTwo = find('span.two');
    equal(spanTwo.text(), 'es_You are 35 years old');
  });
});
