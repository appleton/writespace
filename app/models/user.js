import DS from 'ember-data';
import config from '../config/environment';

export default DS.Model.extend({
  _id: DS.attr('string'),
  name: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  notes_db: DS.attr('string'),

  notesUrl: function() {
    return `${config.COUCH_URL}/${this.get('notes_db')}`;
  }.property('notes_db')
});
