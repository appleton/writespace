import Ember from 'ember';
import AuthenticatorBase from 'ember-simple-auth/authenticators/base';
import CouchSession from '../models/couch-session';
import {db} from '../adapters/note';

export default AuthenticatorBase.extend({
  mixpanel: Ember.inject.service(),

  authenticate(name, password) {
    return CouchSession.login({name, password}).then(() => this.restore());
  },

  restore() {
    return CouchSession.find().then((session) => {
      this.get('mixpanel').identify(session.userCtx.name);
      return session;
    });
  },

  invalidate() {
    return CouchSession.logout().then(() => db.destroy()).then(() => {
      document.location.reload();
    });
  }
});
