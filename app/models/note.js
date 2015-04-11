import DS from 'ember-data';

export default DS.Model.extend({
  rev: DS.attr('string'),
  text: DS.attr('string'),
  updatedAt: DS.attr('date', {
    defaultValue() { return Date.now(); }
  })
});
