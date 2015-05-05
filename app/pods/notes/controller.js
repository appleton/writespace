import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['application'],
  user:  Ember.computed.alias('model.user'),
  notes: Ember.computed.sort('filteredNotes', (a, b) => b.get('updatedAt') - a.get('updatedAt')),
  currentRoute: Ember.computed.oneWay('controllers.application.currentRoute'),

  selectedNote: function() {
    return this.get('notes').findBy('isSelected');
  }.property('notes.@each.isSelected'),

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
    },

    nextNote() {
      var notes = this.get('notes');
      var current = this.get('selectedNote');
      var currentIndex = notes.indexOf(current);

      if (currentIndex === (notes.length - 1)) return;

      var next = notes[currentIndex + 1];

      next.set('isSelected', true);
      current.set('isSelected', false);
    },

    prevNote() {
      var notes = this.get('notes');
      var current = this.get('selectedNote');
      var currentIndex = notes.indexOf(current);

      if (currentIndex === 0) return;

      var previous = notes[currentIndex - 1];

      previous.set('isSelected', true);
      current.set('isSelected', false);
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
    }
  }
});
