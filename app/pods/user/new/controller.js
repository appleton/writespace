import Ember from 'ember';

export default Ember.Controller.extend({
  authenticate() {
    this.get('session').authenticate('authenticator:couchdb', {
      name: this.get('model.email'),
      password: this.get('model.password')
    });
  },

  actions: {
    createUser() {
      this.get('model').saveNew().then(this.authenticate.bind(this));
    }
  }
});
