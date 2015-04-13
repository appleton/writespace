import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNote() {
      this.store.createRecord('note', {
        text: this.get('text')
      }).save();
    }
  }
});
