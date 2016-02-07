import AuthenticatorBase from 'ember-simple-auth/authenticators/base';
import CouchSession from '../models/couch-session';
import {db} from '../adapters/note';

export default AuthenticatorBase.extend({
  authenticate(name, password) {
    return CouchSession.login({name, password}).then(() => CouchSession.find());
  },

  restore() {
    return CouchSession.find();
  },

  invalidate() {
    return CouchSession.logout().then(() => db.destroy()).then(() => {
      document.location.reload();
    });
  }
});
