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

test('with bound arguments', function() {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    equal('You are 35 years old', span.text());
  });
});

test('changing application locale', function() {
  visit('/');

  andThen(function() {
    var span = find('span.two');
    equal('You are 35 years old', span.text());
  });

  andThen(function() {
    App.set('locale', 'es');
  });

  andThen(function() {
    var spanOne = find('span.one');
    equal('es_bar', spanOne.text());

    var spanTwo = find('span.two');
    equal('es_You are 35 years old', spanTwo.text());
  });
});
