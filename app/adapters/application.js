import Ember from 'ember';

export var db = new PouchDB('notes');

export default EmberPouch.Adapter.extend({
  db,

  // Immediately refresh datasets when changes are recieved
  updateRecords: function() {
    db.changes({
      since: 'now',
      live: true,
      returnDocs: false
    }).on('change', (change) => {
      var type = db.rel.parseDocID(change.id).type;
      if (Ember.isEmpty(type)) return;
      this.container.lookup('store:main').find(type);
    });
  }.on('init')
});
