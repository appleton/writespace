import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  host: config.COUCH_URL,

  pathForType(type) {
    return `_${Ember.Inflector.inflector.pluralize(type)}`;
  },

  ajax(url, method, opts = {}) {
    opts.crossDomain = true;
    opts.xhrFields = { withCredentials: true };
    return this._super(url, method, opts);
  }
});
