import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('note', params.id);
  },

  renderTemplate(...args) {
    this.render('notes.note.actions', { outlet: 'app-header' });
    return this._super(...args);
  }
});
