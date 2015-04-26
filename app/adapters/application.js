export var db = new PouchDB('notes');

/*
 * relational-pouch stores attributes in a nested `data` hash. Since we have
 * existing data in an unnested format we need to transform it using
 * transform-pouch.
 *
 *   in:  { "_id": "...", "_rev": "...", "data": {"attr": "..."}}
 *   out: { "_id": "...", "_rev": "...", "attr": "..."}
 */

db.transform({
  incoming(doc) {
    Object.keys(doc.data).forEach((key) => doc[key] = doc.data[key]);
    delete doc.data;
    return doc;
  },

  outgoing(doc) {
    var data = {};

    Object.keys(doc).forEach((key) => {
      if (key === '_id' || key === '_rev') return;
      data[key] = doc[key];
      delete doc.key;
    });

    doc.data = data;
    return doc;
  }
});

export default EmberPouch.Adapter.extend({ db });
