import Ember from 'ember';

export default Ember.Controller.extend({
  mixpanel: Ember.inject.service(),

  isDisabled: Ember.computed.empty('model.email'),

  notifySuccess(email) {
    const msg = `A password reset link has been sent to ${email}`;
    this.set('successMessage', msg);
  },

  actions: {
    resetPassword() {
      this.set('successMessage', null);

      const model = this.get('model');

      model.save().then(() => {
        this.get('mixpanel').trackEvent('password reset requested');
        this.notifySuccess(model.get('email'));
        this.set('model', this.store.createRecord('password'));
      }).catch(() => {});
    }
  }
});
