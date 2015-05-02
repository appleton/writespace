import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['token'],
  hasToken: Ember.computed.notEmpty('model.token'),
  passwordIsEmpty: Ember.computed.empty('model.password'),

  authenticate() {
    this.get('session').authenticate('authenticator:couchdb', {
      name: this.get('model.email'),
      password: this.get('model.password')
    });
  },

  actions: {
    editPassword() {
      this.get('model').save().then(this.authenticate.bind(this));
    }
  }
});
