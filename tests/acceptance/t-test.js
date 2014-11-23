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
    equal('bar', span.text());
  });
});

test('no bound arguments', function() {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    equal('You are 35 years old', span.text());
  });
});
