import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/route';

export default Ember.Route.extend(AuthenticatedRouteMixin, KeyboardShortcuts, {
  session: Ember.inject.service(),

  model: function() {
    var name = this.get('session.session.secure.userCtx.name');
    var userId = `org.couchdb.user:${name}`;

    var user = this.store.find('user', userId);
    var notes = this.findNotes(user);

    return Ember.RSVP.hash({ notes, user });
  },

  setupController(controller, model) {
    this._super(controller, model);
    this.selectFirstNote();
  },

  findNotes(user) {
    return user.then((user) => {
      this.sync(user.get('notesUrl'));
      return this.store.find('note');
    });
  },

  sync(remoteDb) {
    var sync = PouchDB.sync('notes', remoteDb, {
      live: true,
      retry: true
    });
    this.on('deactivate', sync.cancel.bind(sync));
  },

  selectFirstNote() {
    let firstNote = this.controller.get('notes.firstObject');
    if (firstNote) firstNote.set('isSelected', true);
  },

  keyboardShortcuts: {
    n: { action: 'createNote', global: false },
    j: { action: 'nextNote', global: false },
    k: { action: 'prevNote', global: false },
    enter: { action: 'goToNote', global: false },
    '?': { action: 'showHelp', global: false },
    '/': { action: 'focusSearch', global: false }
  },

  actions: {
    createNote() { this.controller.send('createNote'); },
    nextNote() { this.controller.send('nextNote'); },
    prevNote() { this.controller.send('prevNote'); },
    goToNote() { this.controller.send('goToNote'); },
    showHelp() { this.controller.send('showHelp'); },
    focusSearch() { this.controller.send('focusSearch'); },
    noteDeleted() { this.selectFirstNote(); },
    noteSelected(note) { this.controller.send('setSelectedNote', note); }
  }
});
