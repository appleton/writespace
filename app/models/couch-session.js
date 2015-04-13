import Ember from 'ember';
import config from '../config/environment';

function request(opts) {
  opts.url = config.COUCH_URL + '/_session';
  opts.dataType = 'json';
  opts.xhrFields = { withCredentials: true };

  return new Ember.RSVP.Promise(function(resolve, reject) {
    return Ember.$.ajax(opts).then(resolve, reject);
  });
}

export default {
  login(data) {
    return request({ method: 'POST', data: data });
  },

  find() {
    return request({ method: 'GET' });
  },

  logout() {
    return request({ method: 'DELETE' });
  }
};
