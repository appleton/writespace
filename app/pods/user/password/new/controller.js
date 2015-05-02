import Ember from 'ember';

export default Ember.Controller.extend({
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
      this.get('model').save().then((res) => {
        this.notifySuccess();
        this.set('model', this.store.createRecord('password'));
      }).catch((res) => this.notifyError(res.responseJSON.errors[0].msg));
    }
  }
});
