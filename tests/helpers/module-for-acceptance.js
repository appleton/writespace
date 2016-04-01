import Ember from 'ember';
import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { db } from 'writespace/adapters/note';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach(assert) {
      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }

      const done = assert.async();

      db.allDocs().then((res) => {
        return Ember.RSVP.all(res.rows.map((doc) => db.remove(doc.id, doc.value.rev)));
      }).then(() => {
        destroyApp(this.application);
        done();
      });
    }
  });
}
