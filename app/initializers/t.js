import Ember from 'ember';
import T from 'ember-cli-i18n/utils/t';
import tHelper from '../helpers/t';
import Stream from 'ember-cli-i18n/utils/stream';

export function initialize(container, application) {
  Ember.HTMLBars._registerHelper('t', tHelper);

  application.localeStream = new Stream(function() {
    return  application.get('locale');
  });

  Ember.addObserver(application, 'locale', function() {
    application.localeStream.notify();
  });

  application.register('utils:t', T);
  application.inject('route', 't', 'utils:t');
  application.inject('model', 't', 'utils:t');
  application.inject('component', 't', 'utils:t');
  application.inject('controller', 't', 'utils:t');
};

export default {
  name: 't',
  initialize: initialize
};
