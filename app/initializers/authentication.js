import CouchAuthenticator from 'writespace/authenticators/couchdb';

export function initialize(container) {
  container.register('authenticator:couchdb', CouchAuthenticator);
}

export default {
  name: 'authentication',
  initialize: initialize
};
