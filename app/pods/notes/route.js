import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var name = this.get('session.secure.userCtx.name');
    var userId = `org.couchdb.user:${name}`;

    var user = this.store.find('user', userId);
    var notes = this.findNotes(user);

    return Ember.RSVP.hash({ notes, user });
  },

  findNotes(user) {
    return user.then((user) => {
      this.sync(user.get('notesUrl'));
      return this.store.find('note');
    });
  },

  sync(remoteDb) {
    var sync = PouchDB.sync('notes', remoteDb, { live: true, retry: true });
    this.on('deactivate', sync.cancel.bind(sync));
  }
});
