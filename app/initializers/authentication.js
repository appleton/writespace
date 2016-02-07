import CouchAuthenticator from 'scribly/authenticators/couchdb';

export function initialize(container) {
  container.register('authenticator:couchdb', CouchAuthenticator);
}

export default {
  name: 'authentication',
  initialize: initialize
};
