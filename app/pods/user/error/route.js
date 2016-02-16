import Ember from 'ember';

const { on } = Ember;

export default Ember.Route.extend({
  listenForOnline: on('activate', function() {
    this._onlineListener = window.addEventListener('online', function() {
      this.transitionTo('user.login');
    }.bind(this));
  }),

  cancelListenForOnline: on('deactivate', function() {
    window.removeEventListener('online', this._onlineListener);
  })
});
