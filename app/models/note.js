import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  rev: DS.attr('string'),
  text: DS.attr('string', { defaultValue: '' }),
  updatedAt: DS.attr('date', { defaultValue() { return new Date(); } }),
  createdAt: DS.attr('date', { defaultValue() { return new Date(); } }),

  firstLine: function() {
    var line = this.get('text').split('\n')[0];
    return Ember.isEmpty(line) ? 'untitled' : line;
  }.property('text'),

  secondLine: function() {
    var line = this.get('text').split('\n')[1];
    return Ember.isEmpty(line) ? '' : line;
  }.property('text'),

  matches(search) {
    return (this.get('text') || '').indexOf(search) !== -1;
  }
});
