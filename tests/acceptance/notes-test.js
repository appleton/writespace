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

test('viewing a pre-existing note', function(assert) {
  page
    .visit()
    .clickOnNote();

  andThen(() => assert.equal(currentURL(), `/${note._id}`));
});

test('creating a note', function(assert) {
  const done = assert.async();
  assert.expect(2);

  page
    .visit()
    .clickNewNoteButton();

  andThen(() => {
    db.allDocs().then((res) => {
      const newId = res.rows.find((doc) => doc.id !== note._id).id;

      assert.equal(res.rows.length, 2);
      assert.equal(currentURL(), `/${newId}`);

      done();
    });
  });
});
