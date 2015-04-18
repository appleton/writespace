import Ember from 'ember';

export default Ember.Controller.extend({
  note: Ember.computed.alias('model'),

  saveNote() {
    if (this.get('note.isDirty')) {
      return this.get('note').set('updatedAt', new Date()).save();
    }
  },

  observeNoteText: function() {
    Ember.run.debounce(this, this.saveNote, 1000);
  }.observes('note.text'),

  actions: {
    deleteNote() {
      this.get('note').destroyRecord().then(() => this.transitionToRoute('notes'));
    }
  }
});
