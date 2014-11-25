import Ember from 'ember';
import tHelper from '../helpers/t';
import Stream from 'ember-cli-i18n/utils/stream';

export function initialize(container, application) {
  Ember.Handlebars.registerHelper('t', tHelper);

  application.localeStream = new Stream(function() {
    return  application.get('locale');
  });

  Ember.addObserver(application, 'locale', function() {
    application.localeStream.notify();
  });
};

export default {
  name: 't',
  initialize: initialize
};
