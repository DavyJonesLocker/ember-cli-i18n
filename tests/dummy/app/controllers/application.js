import Ember from 'ember';

export default Ember.Controller.extend({
  age: 35,
  colorCount: 2,
  dependentPeopleCount: 1,
  numDependentPeopleBinding: 'dependentPeopleCount',
  actions: {
    addDependentPerson: function(){
      this.set('dependentPeopleCount', this.get('dependentPeopleCount') + 1);
    }
  }
});
