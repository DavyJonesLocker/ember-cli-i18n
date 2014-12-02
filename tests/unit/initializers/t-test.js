import Ember from 'ember';
import { initialize } from 'dummy/initializers/t';

var container, application;

module('T Initializer', {
  setup: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;

      application.defaultLocale = 'en';
      container.register('locale:en', {
        foo: 'bar'
      });

      application.deferReadiness();
      initialize(container, application);
    });
  }
});

test('t gets injected into controllers', function() {
  var FooController = Ember.ObjectController.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('controller:foo', FooController);

  var fooControllerInstance = container.lookup('controller:foo');
  equal(fooControllerInstance.get('foo'), 'bar');
});

test('t gets injected into routes', function() {
  var FooRoute = Ember.Route.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('route:foo', FooRoute);

  var fooRouteInstance = container.lookup('route:foo');
  equal(fooRouteInstance.get('foo'), 'bar');
});

test('t gets injected into models', function() {
  var FooModel = DS.Model.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('model:foo', FooModel);

  Ember.run(function() {
    var fooModelInstance = container.lookup('store:main').createRecord('foo');
    equal(fooModelInstance.get('foo'), 'bar');
  });
});

test('t gets injected into components', function() {
  var FooComponent = Ember.Component.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('component:foo', FooComponent);

  var fooComponentInstance = container.lookup('component:foo');
  equal(fooComponentInstance.get('foo'), 'bar');
});
