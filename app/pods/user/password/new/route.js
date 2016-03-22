import Ember from 'ember';
import OnlineOnlyRoute from 'writespace/mixins/online-only-route';

export default Ember.Route.extend(OnlineOnlyRoute, {
  model() {
    return this.store.createRecord('password');
  }
});
