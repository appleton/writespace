import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import OnlineOnlyRoute from 'scribly/mixins/online-only-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, OnlineOnlyRoute, {
  model() {
    var newUser = this.store.createRecord('user');
    this.set('newUser', newUser);
    return newUser;
  },

  tidy: function() {
    var newUser = this.get('newUser');
    if (newUser.get('isNew')) newUser.destroyRecord();
  }.on('destory')
});
