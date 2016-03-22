import Ember from 'ember';

export default Ember.Controller.extend({
  mixpanel: Ember.inject.service(),

  isDisabled: Ember.computed.empty('model.email'),

  notifySuccess() {
    this.notifications.clearAll();
    this.notifications.addNotification({
      message: `A password reset link has been sent to ${this.get('model.email')}`,
      type: 'success',
      autoClear: true
    });
  },

  notifyError(msg) {
    this.notifications.clearAll();
    this.notifications.addNotification({
      message: msg,
      type: 'error'
    });
  },

  actions: {
    resetPassword() {
      const model = this.get('model');

      model.save().then(() => {
        this.get('mixpanel').trackEvent('password reset requested');
        this.notifySuccess();
        this.set('model', this.store.createRecord('password'));
      }).catch(() => {
        const message = model.get('errors.messages').join(', ');
        this.notifyError(message);
      });
    }
  }
});
