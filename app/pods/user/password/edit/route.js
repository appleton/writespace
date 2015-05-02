import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel({ queryParams }) {
    if (Ember.isNone(queryParams.token)) this.transitionTo('user.password.new');
  },

  model({ token }) {
    return this.store.createRecord('password', { token: token });
  }
});
