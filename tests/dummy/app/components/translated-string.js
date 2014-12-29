import Ember from 'ember';

var TranslatedStringComponent = Ember.Component.extend({
  myString: (function(){
    return this.t('bar');
  }).property()
});

export default TranslatedStringComponent;