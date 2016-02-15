import Ember from 'ember';
import OnlineOnlyRoute from 'scribly/mixins/online-only-route';

export default Ember.Route.extend(OnlineOnlyRoute, {
  model() {
    return this.store.createRecord('password');
  }
});
