import Ember from 'ember';
import tHelper from '../helpers/t';

export function initialize(/* container, application */) {
  Ember.Handlebars.registerHelper('t', tHelper);
}

export default {
  name: 't',
  initialize: initialize
};
