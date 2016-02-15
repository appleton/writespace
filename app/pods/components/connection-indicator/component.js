import Ember from 'ember';

const { on } = Ember;
const { not } = Ember.computed;

export default Ember.Component.extend({
  isOffline: not('isOnline'),

  listenForStatus: on('didInsertElement', function() {
    this._onlineListener = window.addEventListener('online', function() {
      this.set('isOnline', true);
    }.bind(this));

    this._offlineListener = window.addEventListener('offline', function() {
      this.set('isOnline', false);
    }.bind(this));
  }),

  teardown: on('willDestroyElement', function() {
    window.removeEventListener(this._onlineListener);
    window.removeEventListener(this._offlineListener);
  })
});