import Mirage  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  _id() {
    return `org.couchdb.user:${this.name}`;
  },
  name: 'user@example.com',
  type: 'user',
  roles: [],
  notes_db: 'notes_e78320d2f8ea3dbf05d0b723f8285b50ed8ddfa7'
});
