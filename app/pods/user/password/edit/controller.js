import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['token'],

  session: Ember.inject.service(),
  mixpanel: Ember.inject.service(),

  hasToken: Ember.computed.notEmpty('model.token'),
  passwordIsEmpty: Ember.computed.empty('model.password'),

  authenticate() {
    this.get('session').authenticate(
      'authenticator:couchdb',
      this.get('model.email'),
      this.get('model.password')
    );
  },

  notifySuccess() {
    this.set('successMessage', 'Password updated');
  },

  actions: {
    editPassword() {
      this.get('model').save().then(() => {
        this.get('mixpanel').trackEvent('password reset complete');
        this.notifySuccess();
        this.authenticate();
      }).catch(() => this.get('mixpanel').trackEvent('password reset error'));
    }
  }
});
