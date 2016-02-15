import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import OnlineOnlyRoute from 'scribly/mixins/online-only-route';

export default Ember.Route.extend(UnauthenticatedRouteMixin, OnlineOnlyRoute);
