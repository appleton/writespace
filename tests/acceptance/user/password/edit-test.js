import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';

import page from 'writespace/tests/pages/user/password/edit';

let user;
const token = '123abc';
const newPassword = 'n3wpassw0rd';

moduleForAcceptance('Acceptance | user/password/edit', {
  beforeEach() {
    user = server.create('user');
  }
});

test('redirects with no token', function(assert) {
  page.visit();
  andThen(() => assert.equal(currentURL(), '/user/password/new'));
});

test('success', function(assert) {
  assert.expect(3);
  const done = assert.async();

  server.put('/api/passwords', (db, request) => {
    const body = JSON.parse(request.requestBody);
    assert.equal(body.token, token);
    assert.equal(body.password, newPassword);
    done();

    return { email: user.name };
  }, 200);

  page
    .visit({ token })
    .password(newPassword)
    .submit();

  andThen(() => {
    assert.equal(currentURL(), '/');
  });
});

test('error', function(assert) {
  server.put('/api/passwords', {
    errors: [{
      source: { pointer: `data/attributes/password` },
      detail: 'Invalid reset token'
    }]
  }, 422);

  page
    .visit({ token })
    .password(newPassword)
    .submit();

  andThen(() => assert.equal(page.errors, 'Invalid reset token'));
});
