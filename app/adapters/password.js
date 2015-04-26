import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.API_URL,

  ajax(url, method, opts = {}) {
    opts.crossDomain = true;
    opts.xhrFields = { withCredentials: true };
    return this._super(url, method, opts);
  }
});
