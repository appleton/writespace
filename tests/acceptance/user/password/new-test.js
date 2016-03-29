import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';

import page from 'writespace/tests/pages/user/password/new';

moduleForAcceptance('Acceptance | user/password/new');

const email = 'test@example.com';

test('success', function(assert) {
  assert.expect(2);
  const done = assert.async();

  server.post('/api/passwords', (db, request) => {
    assert.equal(JSON.parse(request.requestBody).email, email);
    done();
  }, 201);

  page
    .visit()
    .email(email)
    .submit();

  andThen(function() {
    assert.equal(page.success, `A password reset link has been sent to ${email}`);
  });
});

test('error', function(assert) {
  server.post('/api/passwords', {
    errors: [{
      source: { pointer: `data/attributes/email` },
      detail: 'Email does not exist'
    }]
  }, 422);

  page
    .visit()
    .email(email)
    .submit();

  andThen(function() {
    assert.equal(page.errors, 'Email does not exist');
  });
});
