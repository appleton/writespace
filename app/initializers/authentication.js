import AuthenticatorBase from 'simple-auth/authenticators/base';
import CouchSession from '../models/couch-session';

var CouchAuthenticator = AuthenticatorBase.extend({
  authenticate(data) {
    return CouchSession.login(data).then(() => CouchSession.find());
  },

  restore() {
    return CouchSession.find();
  },

  invalidate() {
    return CouchSession.logout();
  }
});

export function initialize(container) {
  container.register('authenticator:couchdb', CouchAuthenticator);
}

export default {
  name: 'authentication',
  initialize: initialize
};
