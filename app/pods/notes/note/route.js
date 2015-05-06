import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

export default Ember.Route.extend(KeyboardShortcuts, {
  model: function(params) {
    return this.store.find('note', params.id);
  },

  renderTemplate(...args) {
    this.render('notes.note.actions', { outlet: 'app-header' });
    return this._super(...args);
  },

  keyboardShortcuts: {
    f: { action: 'focusNote', global: false },
    d: { action: 'showDeleteModal', global: false },
    enter: { action: 'deleteNote', global: false }
  },

  actions: {
    focusNote() { this.controller.send('focusNote'); },
    deleteNote() { this.controller.send('deleteNote'); },
    showDeleteModal() { this.controller.send('showDeleteModal'); },
  }
});
