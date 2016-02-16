import Ember from 'ember';

const { on, computed } = Ember;
const { not, readOnly } = computed;

export default Ember.Component.extend({
  classNames: ['connection-indicator'],

  isOnline: computed(function() {
    return navigator.onLine;
  }),

  isOffline: not('isOnline'),
  isVisible: readOnly('isOffline'),

  listenForStatus: on('didInsertElement', function() {
    this._onlineListener = window.addEventListener('online', function() {
      this.notifyPropertyChange('isOnline');
    }.bind(this));

    this._offlineListener = window.addEventListener('offline', function() {
      this.notifyPropertyChange('isOnline');
    }.bind(this));
  }),

  teardown: on('willDestroyElement', function() {
    window.removeEventListener('online', this._onlineListener);
    window.removeEventListener('offline', this._offlineListener);
  })
});
