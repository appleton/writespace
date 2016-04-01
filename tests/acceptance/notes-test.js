import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';

import page from 'writespace/tests/pages/notes';
import login from 'writespace/tests/helpers/login';
import { db } from 'writespace/adapters/note';

let note;

moduleForAcceptance('Acceptance | notes', {
  beforeEach(assert) {
    login(this.application);

    const done = assert.async();
    note = server.create('note');
    db.post(note).then(done);
  }
});

test('visiting /', function(assert) {
  page
    .visit();

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
