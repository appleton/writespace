import Ember from 'ember';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct',
  'Nov', 'Dec'
];

const units = [
  { name: 'second', limit: 60,    inSeconds: 1 },
  { name: 'minute', limit: 3600,  inSeconds: 60 },
  { name: 'hour',   limit: 86400, inSeconds: 3600 }
];

export default Ember.Component.extend({
  tagName: 'time',
  attributeBindings: ['isoDate:datetime'],

  now() {
    return new Date();
  },

  diff() {
    return (this.now() - this.get('date')) / 1000;
  },

  timeAgo: function() {
    var date = this.get('date');
    var now = this.now();

    var diff = this.diff();
    if (diff < 5) return 'just now';

    var i = 0, unit;
    while (unit = units[i++]) {
      if (diff < unit.limit || !unit.limit){
        diff = Math.floor(diff / unit.inSeconds);
        return diff + ' ' + unit.name + (diff > 1 ? 's' : '') + ' ago';
      }
    }

    var day = days[date.getDay()];
    var dayOfMonth = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();
    var out = [day, dayOfMonth, month];
    if (year !== now.getFullYear()) out.push(year);

    return out.join(' ');
  }.property('date'),

  isoDate: function() {
    return this.get('date').toISOString();
  }.property('date'),

  nextTickTime() {
    var diff = this.diff();

    // Every 5 seconds for the first minute
    if (diff < 60) return 5000;
    // Every minute for 1min to 1 hour
    if (diff >= 60 && diff < 3600) return 60000;
    // Every half hour for 1 hour onwards
    if (diff >= 3600) return 1800000;
  },

  startTick: function() {
    this.tick();
  }.on('didInsertElement'),

  stopTick: function() {
    Ember.run.cancel(this.get('nextTick'));
  }.on('willDestroyElement'),

  tick() {
    var tick = Ember.run.later(() => {
      this.notifyPropertyChange('timeAgo');
      this.tick();
    }, this.nextTickTime());
    this.set('nextTick', tick);
  }
});
