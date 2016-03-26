import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  mixpanel: Ember.inject.service(),

  authenticate() {
    this.get('session').authenticate(
      'authenticator:couchdb',
      this.get('model.email'),
      this.get('model.password')
    );
  },

  actions: {
    createUser() {
      this.get('model').save().then(() => {
        this.get('mixpanel').trackEvent('user create');
        this.authenticate();
      });
    }
  }
});
