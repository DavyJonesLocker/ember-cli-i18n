import Ember from 'ember';
import T from 'ember-cli-i18n/utils/t';
import tHelper from '../helpers/t';
import Stream from 'ember-cli-i18n/utils/stream';

export function initialize(container, application) {
  Ember.Handlebars.registerHelper('t', tHelper);

  container.localeStream = new Stream(function() {
    return Ember.get(container, 'locale');
  });

  Ember.addObserver(container, 'locale', function() {
    container.localeStream.notify();
  });

  Ember.addObserver(application, 'locale', function(){
    Ember.set(container, 'locale', application.get('locale'));
  })

  container.register('utils:t', T);
  container.injection('route', 't', 'utils:t');
  container.injection('model', 't', 'utils:t');
  container.injection('component', 't', 'utils:t');
  container.injection('controller', 't', 'utils:t');
};

export default {
  name: 't',
  initialize: initialize
};
