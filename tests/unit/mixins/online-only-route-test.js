import Ember from 'ember';
import OnlineOnlyRouteMixin from '../../../mixins/online-only-route';
import { module, test } from 'qunit';

module('Unit | Mixin | online only route');

// Replace this with your real tests.
test('it works', function(assert) {
  let OnlineOnlyRouteObject = Ember.Object.extend(OnlineOnlyRouteMixin);
  let subject = OnlineOnlyRouteObject.create();
  assert.ok(subject);
});
