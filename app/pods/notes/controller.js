import Ember from 'ember';

export default Ember.Controller.extend({
  user:  Ember.computed.alias('model.user'),
  notes: Ember.computed.sort('filteredNotes', (a, b) => b.get('updatedAt') - a.get('updatedAt')),

  selectedNote: function() {
    return this.get('notes').findBy('isSelected');
  }.property('notes.[]', 'notes.@each.isSelected'),

  filteredNotes: function() {
    var search = this.get('searchText');
    var notes = this.get('model.notes');
    if (Ember.isEmpty(search)) return notes;

    return notes.filter((note) => note.matches(search));
  }.property('model.notes.@each.text', 'searchText'),

  setSelectedNote(note) {
    this.get('selectedNote').set('isSelected', false);
    note.set('isSelected', true);
  },

  actions: {
    createNote() {
      this.store.createRecord('note').save().then((note) => {
        this.setSelectedNote(note);
        this.transitionToRoute('notes.note', note);
      });
    },

    nextNote() {
      var notes = this.get('notes');
      var current = this.get('selectedNote');
      var currentIndex = notes.indexOf(current);

      if (currentIndex === (notes.length - 1)) return;

      this.setSelectedNote(notes[currentIndex + 1]);
    },

    prevNote() {
      var notes = this.get('notes');
      var current = this.get('selectedNote');
      var currentIndex = notes.indexOf(current);

      if (currentIndex === 0) return;

      this.setSelectedNote(notes[currentIndex - 1]);
    },

    goToNote() {
      this.transitionToRoute('notes.note', this.get('selectedNote'));
    },

    showHelp() {
      this.set('isShowingHelpModal', true);
    },

    hideHelp() {
      this.set('isShowingHelpModal', false);
    },

    focusSearch() {
      this.set('focusSearch', true);
    },

    setSelectedNote(note) {
      this.setSelectedNote(note);
    }
  }
});
