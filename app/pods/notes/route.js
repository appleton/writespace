import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    var name = this.get('session.secure.userCtx.name');
    var userId = `org.couchdb.user:${name}`;

    return Ember.RSVP.hash({
      notes: this.store.find('note'),
      user:  this.store.find('user', userId)
    });
  },

  afterModel: function({user}) {
    var sync = PouchDB.sync('notes', user.get('notesUrl'), {
      live: true,
      retry: true
    });
    this.set('sync', sync);
  },

  cancelSync: function() {
    this.get('sync').cancel();
  }.on('deactivate')
});
