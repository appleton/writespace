import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    authenticate: function() {
      this.get('session').authenticate('authenticator:couchdb', {
        name: this.get('email'),
        password: this.get('password')
      });
    }
  }
});
