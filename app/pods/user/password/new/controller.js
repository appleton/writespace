import Ember from 'ember';

export default Ember.Controller.extend({
  isDisabled: Ember.computed.empty('model.email'),

  clearMessages() {
    this.get('model.errors').clear();
    this.set('message', null);
  },

  actions: {
    resetPassword() {
      this.get('model').save().then(() => {
        this.clearMessages();
        var msg = `A password reset link has been sent to ${this.get('model.email')}`;
        this.set('message', msg);
        this.set('model', this.store.createRecord('password'));
      }).catch((error) => {
        this.clearMessages();
        this.get('model.errors').add('email', error.responseJSON.errors[0].msg)
      });
    }
  }
});
