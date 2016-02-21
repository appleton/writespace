import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  mixpanel: Ember.inject.service(),

  actions: {
    authenticate: function() {
      this.get('session').authenticate(
        'authenticator:couchdb',
        this.get('email'),
        this.get('password')
      ).then(() => {
        this.get('mixpanel').trackEvent('user login');
        this.set('error', null);
      }).catch((err) => {
        this.get('mixpanel').trackEvent('user login error');
        this.set('error', err.responseJSON.reason);
      });
    }
  }
});
