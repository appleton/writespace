import Ember from 'ember';

export default Ember.Controller.extend({
  user:  Ember.computed.alias('model.user'),
  notes: Ember.computed.sort('filteredNotes', (a, b) => b.get('updatedAt') - a.get('updatedAt')),

  filteredNotes: function() {
    var search = this.get('searchText');
    var notes = this.get('model.notes');
    if (Ember.isEmpty(search)) return notes;

    return notes.filter((note) => note.matches(search));
  }.property('model.notes.@each.text', 'searchText'),

  actions: {
    createNote() {
      this.store.createRecord('note').save().then((note) => {
        this.transitionToRoute('notes.note', note);
      });
    }
  }
});
