import DS from 'ember-data';
import Ember from 'ember';

let db;

if (Worker in window) {
  db = new PouchDB('notes', { adapter: 'worker' });
} else {
  db = new PouchDB('notes');
}

function toRecord(doc) {
  doc.rev = doc._rev;
  doc.id = doc._id;
  delete doc._rev;
  delete doc._id;

  return doc;
}

function toData(store, type, record) {
  var serializer = store.serializerFor(type.typeKey);
  var data = {};

  serializer.serializeIntoHash(data, type, record, { includeId: true });
  data = data[type.typeKey];

  data._rev = data.rev;
  data._id = data.id;
  delete data.rev;
  delete data.id;

  if (data._rev === null) delete data._rev;
  if (data._id === null) delete data._id;

  return data;
}

export default DS.RESTAdapter.extend({
  db,

  coalesceFindRequests: true,

  init: function () {
    this._super();
    this._listenToChanges();
  },

  findAll() {
    return this.db.allDocs({ include_docs: true }).then((res) => {
      return { notes: res.rows.map((row) => toRecord(row.doc)) };
    });
  },

  findMany(store, type, ids) {
    return this.db.allDocs({ include_docs: true, keys: ids }).then((res) => {
      return { notes: res.rows.map((row) => toRecord(row.doc)) };
    });
  },

  find(store, type, id) {
    return this.db.get(id).then((res) => {
      if (Ember.isNone(res)) throw new Error(`Not found: note with id ${id}`);
      return { notes: toRecord(res) };
    });
  },

  findQuery() {
    throw new Error('findQuery is not implemented');
  },

  createRecord(store, type, record) {
    var data = toData(store, type, record);
    return this.db.post(data).then((res) => {
      data.id = res.id;
      data.rev = res.rev;
      return { notes: data };
    });
  },

  updateRecord(store, type, record) {
    var data = toData(store, type, record);

    return this.db.put(data).then((res) => {
      data.id = res.id;
      data.rev = res.rev;
      return { notes: data };
    });
  },

  deleteRecord(store, type, record) {
    var data = toData(store, type, record);
    return this.db.remove(data).then(() => '');
  },

  _listenToChanges: function () {
    this.changes = this.db.changes({
      since: 'now',
      live: true,
      returnDocs: false
    }).on('change', (change) => {
      Ember.run(() => {
        if (!change.id) { return; }

        var store = this.container.lookup('store:main');
        var record = store.getById('note', change.id);

        if (!record) return store.find('note');
        if (!record.get('isLoaded') || record.get('isDirty')) return;

        if (change.deleted) {
          store.unloadRecord(record);
        } else {
          record.reload();
        }
      });
    });
  },

  willDestroy() {
    if (this.changes) this.changes.cancel();
  }
});
