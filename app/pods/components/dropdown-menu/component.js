import Ember from 'ember';

export default Ember.Component.extend({
  menuIsVisible: false,

  initListener: function() {
    var $body = Ember.$(document.body);

    var listener = $body.on('click', (ev) => {
      var menuIsVisible = this.get('menuIsVisible');
      var clickIsOnMenu = menuIsVisible && Ember.$.contains(this.get('menu'), ev.target);
      var clickIsOnButton = ev.target === this.get('button');

      if (menuIsVisible && !clickIsOnMenu && !clickIsOnButton) {
        this.toggleMenu();
      }
    });

    this.on('willDestroyElement', () => $body.off('click', listener));
  }.on('didInsertElement'),

  toggleMenu() {
    this.toggleProperty('menuIsVisible');
  },

  menu: function() {
    if (this.get('isDestroying')) return;
    return this.$('ul')[0];
  }.property(),

  button: function() {
    if (this.get('isDestroying')) return;
    return this.$('button')[0];
  }.property(),

  actions: {
    toggleMenu() {
      this.toggleMenu();
    }
  }
});
