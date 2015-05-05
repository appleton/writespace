import Ember from 'ember';

export default Ember.TextField.extend({
  setFocus: function() {
    if (this.get('isFocused')) this.$().focus();
    this.set('isFocused', false);
  }.observes('isFocused')
});
