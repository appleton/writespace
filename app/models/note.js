import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  rev: DS.attr('string'),
  text: DS.attr('string', { defaultValue: '' }),
  updatedAt: DS.attr('date', { defaultValue() { return new Date(); } }),
  createdAt: DS.attr('date', { defaultValue() { return new Date(); } }),

  lines: function() {
    return (this.get('text') || '').split('\n');
  }.property('text'),

  linesWithText: Ember.computed.filter('lines', (line) => !Ember.isEmpty(line)),

  firstLine: function() {
    var line = this.get('linesWithText')[0];
    return Ember.isEmpty(line) ? 'untitled' : line;
  }.property('linesWithText.[]'),

  secondLine: function() {
    var line = this.get('linesWithText')[1];
    return Ember.isEmpty(line) ? 'untitled' : line;
  }.property('linesWithText.[]'),

  matches(search) {
    return (this.get('text') || '').indexOf(search) !== -1;
  }
});
