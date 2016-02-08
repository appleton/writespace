import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('notes', { path: '/' }, function() {
    this.route('note', { path: '/:id' });
  });

  this.route('user', function() {
    this.route('login');
    this.route('new');

    this.route('password', function() {
      this.route('new');
      this.route('edit');
    });
  });
});
