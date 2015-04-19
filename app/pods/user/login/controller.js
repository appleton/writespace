import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function() {
      this.get('session').authenticate('authenticator:couchdb', {
        name: this.get('email'),
        password: this.get('password')
      }).then(() => {
        this.set('error', null);
      }).catch((err) => {
        this.set('error', err.responseJSON.reason);
      });
    }
  }
});
