import Ember from 'ember';

export default Ember.Controller.extend({
  mixpanel: Ember.inject.service(),

  note: Ember.computed.alias('model'),

  isShowingDeleteModal: false,

  saveNote() {
    if (this.get('note.hasDirtyAttributes')) {
      const note = this.get('note');
      note.set('updatedAt', new Date());
      return note.save();
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
        this.get('mixpanel').trackEvent('delete note');
        this.hideDeleteModal();
        this.send('noteDeleted');
        this.transitionToRoute('notes');
      });
    }
  }
});
