import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),

  actions: {
    authenticate: function() {
      this.get('session').authenticate(
        'authenticator:couchdb',
        this.get('email'),
        this.get('password')
      ).then(() => {
        this.set('error', null);
      }).catch((err) => {
        this.set('error', err.responseJSON.reason);
      });
    }
  }
});
