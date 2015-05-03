import Ember from 'ember';
import ListView from 'ember-list-view';
import ListItemView from 'ember-list-view/list-item-view';

export default ListView.extend({
  width: 300,
  rowHeight: 72,
  itemViewClass: ListItemView.extend({ templateName: "note-list-item" }),

  height: function() {
    var $el = this.$();
    if (Ember.isNone($el)) return 1;
    return $el.parent().height();
  }.property(),

  updateHeight() {
    this.notifyPropertyChange('height');
  },

  resizeListener: function() {
    this.updateHeight();

    var $window = Ember.$(window);
    var listener = $window.on('resize', this.updateHeight.bind(this));
    this.on('willDestroyElement', () => $window.off('resize', listener));
  }.on('didInsertElement')
});
