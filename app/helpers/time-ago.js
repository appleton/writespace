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

export function timeAgo(time) {
  time = new Date(time);
  var now = new Date();

  var diff = (now - time) / 1000;
  if (diff < 5) return 'just now';

  var i = 0, unit;
  while (unit = units[i++]) {
    if (diff < unit.limit || !unit.limit){
      diff = Math.floor(diff / unit.inSeconds);
      return diff + ' ' + unit.name + (diff > 1 ? 's' : '') + ' ago';
    }
  }

  var day = days[time.getDay()];
  var dayOfMonth = time.getDate();
  var month = months[time.getMonth()];
  var year = time.getFullYear();
  var out = [day, dayOfMonth, month];
  if (year !== now.getFullYear()) out.push(year);

  return out.join(' ');
}

export default Ember.HTMLBars.makeBoundHelper(timeAgo);
