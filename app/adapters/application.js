import config from '../config/environment';

var db = new PouchDB('notes');
// TODO: sync when logged in
// var remote = new PouchDB('http://localhost:5984/my_couch');

// db.sync(remote, {
//    live: true,
//    retry: true
// });

export default EmberPouch.Adapter.extend({
  db: db
});
