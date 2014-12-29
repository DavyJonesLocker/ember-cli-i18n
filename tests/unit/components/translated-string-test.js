import Ember from 'ember';
import {test, moduleForComponent} from 'ember-qunit';
import initializer from 'dummy/initializers/t';

moduleForComponent(
  'translated-string',
  'TranslatedString',
  {
    setup: function(container){
      Ember.set(container, 'locale', 'en');
      initializer.initialize(container);
    },
    needs: ['locale:en']
  }
);

test('it translates a string', function(){
  var translatedString = this.subject();
  equal(translatedString.get('myString'), 'Translated Bar');
});

moduleForComponent(
  'translated-string',
  'TranslatedString',
  {
    setup: function(container){
      Ember.set(container, 'locale', 'en');
      initializer.initialize(container);
    },
    needs: ['locale:en']
  }
);

test('it renders its template propertly', function(){
  var translatedString = this.subject();
  this.append();

  equal(translatedString.$().find('.with-t-helper').text(), 'Translated Bar');
  equal(translatedString.$().find('.from-component').text(), 'Translated Bar');
});