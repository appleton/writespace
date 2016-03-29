import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';
import { currentSession } from 'writespace/tests/helpers/ember-simple-auth';

import page from 'writespace/tests/pages/user/new';

moduleForAcceptance('Acceptance | user/new');

const email = 'tester@example.com';

test('success', function(assert) {
  assert.expect(2);
  const done = assert.async();

  server.post('/api/users', function(db, req) {
    const params = JSON.parse(req.requestBody);

    assert.equal(params.email, email);
    done();

    return server.create('user', { name: params.email });
  }, 201);

  page
    .visit()
    .email(email)
    .password('s3cret')
    .submit();

  andThen(() => assert.equal(currentURL(), '/'));
});

test('error', function(assert) {
  server.post('/api/users', {
    errors: [{
      source: { pointer: `data/attributes/user` },
      detail: 'User already exists'
    }]
  }, 422);

  page
    .visit()
    .email(email)
    .password('s3cret')
    .submit();

  andThen(() => assert.equal(page.errors, 'User already exists'));
});
