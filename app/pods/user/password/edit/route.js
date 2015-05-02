import Ember from 'ember';

export default Ember.Route.extend({
  model({ token }) {
    return this.store.createRecord('password', { token: token });
  }
});
