import DS from 'ember-data';
import Ember from 'ember';
import config from '../config/environment';

export default DS.Model.extend({
  _id: DS.attr('string'),
  name: DS.attr('string'),
  notes_db: DS.attr('string'),

  notesUrl: function() {
    return `${config.COUCH_URL}/${this.get('notes_db')}`;
  }.property('notes_db'),

  createParams: function() {
    return { email: this.get('email'), password: this.get('password') };
  }.property('email', 'password'),

  saveNew() {
    var errors = this.get('errors');
    errors.clear();

    return new Ember.RSVP.Promise((resolve, reject) => {
      return Ember.$.ajax({
        url: `${config.API_URL}/users`,
        method: 'post',
        dataType: 'json',
        data: this.get('createParams')
      }).then(resolve, reject);
    }).then((data) => {
      return this.setProperties(data);
    }).catch((jqXHR) => {
      jqXHR.responseJSON.errors.forEach((error) => {
        errors.add(error.param, error.msg);
      });
    });
  }
});
