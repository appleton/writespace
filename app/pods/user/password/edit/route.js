import Ember from 'ember';
import OnlineOnlyRoute from 'scribly/mixins/online-only-route';

export default Ember.Route.extend(OnlineOnlyRoute, {
  beforeModel({ queryParams }) {
    if (Ember.isNone(queryParams.token)) this.transitionTo('user.password.new');
    this._super.apply(this, arguments);
  },

  model({ token }) {
    return this.store.createRecord('password', { token: token });
  }
});
