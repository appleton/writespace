import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  authenticate() {
    this.get('session').authenticate(
      'authenticator:couchdb',
      this.get('model.email'),
      this.get('model.password')
    );
  },

  actions: {
    createUser() {
      this.get('model').saveNew().then(this.authenticate.bind(this));
    }
  }
});
