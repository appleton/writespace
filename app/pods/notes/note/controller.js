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

  showDeleteModal() {
    this.set('isShowingDeleteModal', true);
  },

  hideDeleteModal() {
    this.set('isShowingDeleteModal', false);
  },

  actions: {
    showDeleteModal() {
      this.showDeleteModal();
    },

    hideDeleteModal() {
      this.hideDeleteModal();
    },

    deleteNote() {
      if (!this.get('isShowingDeleteModal')) return;

      this.get('note').destroyRecord().then(() => {
        this.hideDeleteModal();
        this.send('noteDeleted');
        this.transitionToRoute('notes');
      });
    }
  }
});
