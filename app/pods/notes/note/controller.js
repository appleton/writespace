import Ember from 'ember';

export default Ember.Controller.extend({
  note: Ember.computed.alias('model'),

  isShowingDeleteModal: false,

  saveNote() {
    if (this.get('note.isDirty')) {
      return this.get('note').set('updatedAt', new Date()).save();
    }
  },

  observeNoteText: function() {
    Ember.run.debounce(this, this.saveNote, 1000);
  }.observes('note.text'),

  toggleDeleteModal() {
    this.toggleProperty('isShowingDeleteModal');
  },

  actions: {
    toggleDeleteModal() {
      this.toggleDeleteModal();
    },

    deleteNote() {
      this.get('note').destroyRecord().then(() => {
        this.toggleDeleteModal();
        this.transitionToRoute('notes');
      });
    }
  }
});
