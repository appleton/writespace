import Ember from 'ember';

const { RSVP, on } = Ember;

export default Ember.Mixin.create({
  beforeModel() {
    if (!navigator.onLine) {
      return RSVP.reject({ error: 'offline' });
    }
  },

  listenForOffline: on('activate', function() {
    this._offlineListener = window.addEventListener('offline', function() {
      this.refresh();
    }.bind(this));
  }),

  cancelListenForOffnline: on('deactivate', function() {
    window.removeEventListener(this._offlineListener);
  })
});
