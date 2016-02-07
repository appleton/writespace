import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['token'],

  session: Ember.inject.service(),

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
    this.notifications.clearAll();
    this.notifications.addNotification({
      message: 'Password updated',
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
    editPassword() {
      this.get('model').save().then(() => {
        this.notifySuccess();
        this.authenticate();
      }).catch((res) => this.notifyError(res.responseJSON.errors[0].msg));
    }
  }
});
