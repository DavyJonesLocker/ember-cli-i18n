import Ember from 'ember';
import { module, test } from 'qunit';
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

test('t gets injected into controllers', function(assert) {
  var FooController = Ember.ObjectController.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('controller:foo', FooController);

  var fooControllerInstance = container.lookup('controller:foo');
  assert.equal(fooControllerInstance.get('foo'), 'bar');
});

test('t gets injected into routes', function(assert) {
  var FooRoute = Ember.Route.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('route:foo', FooRoute);

  var fooRouteInstance = container.lookup('route:foo');
  assert.equal(fooRouteInstance.get('foo'), 'bar');
});

test('t gets injected into models', function(assert) {
  var FooModel = DS.Model.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('model:foo', FooModel);

  Ember.run(function() {
    var fooModelInstance = container.lookup('store:main').createRecord('foo');
    assert.equal(fooModelInstance.get('foo'), 'bar');
  });
});

test('t gets injected into components', function(assert) {
  var FooComponent = Ember.Component.extend({
    foo: Ember.computed(function() {
      return this.t('foo');
    })
  });
  container.register('component:foo', FooComponent);

  var fooComponentInstance = container.lookup('component:foo');
  assert.equal(fooComponentInstance.get('foo'), 'bar');
});
