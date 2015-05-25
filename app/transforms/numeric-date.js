import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return serialized == null ? null : new Date(serialized);
  },

  serialize(deserialized) {
    return deserialized == null ? null : deserialized.valueOf();
  }
});
