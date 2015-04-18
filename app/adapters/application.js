export var db = new PouchDB('notes');

export default EmberPouch.Adapter.extend({db});
