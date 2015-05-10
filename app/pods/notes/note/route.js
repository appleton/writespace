import Ember from 'ember';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

export default Ember.Route.extend(KeyboardShortcuts, {
  model: function(params) {
    return this.store.find('note', params.id);
  },

  renderTemplate(controller, model) {
    this.render('notes.note.actions', { outlet: 'app-header' });
    this.send('noteSelected', model);
    return this._super(controller, model);
  },

  keyboardShortcuts: {
    d: { action: 'showDeleteModal', global: false },
    enter: { action: 'deleteNote', global: false }
  },

  actions: {
    deleteNote() { this.controller.send('deleteNote'); },
    showDeleteModal() { this.controller.send('showDeleteModal'); }
  }
});
