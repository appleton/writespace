import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';

import page from 'writespace/tests/pages/user/login';

moduleForAcceptance('Acceptance | user/login');

test('success', function(assert) {
  assert.expect(2);
  const done = assert.async();

  server.post('/db/_session', (db, request) => {
    assert.equal(JSON.parse(request.requestBody).name, 'test@example.com');
    assert.equal(JSON.parse(request.requestBody).password, 's3cret');

    done();

    return {
      ok: true,
      name: 'test@example.com',
      roles: []
    };
  }, 201);

  page
    .visit()
    .email('test@example.com')
    .password('s3cret')
    .submit();

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('error', function(assert) {
  server.get('/db/_session', {}, 404);
  server.post('/db/_session', {
    error:  'unauthorized',
    reason: 'Name or password is incorrect.'
  }, 401);

  page
    .visit()
    .email('test@example.com')
    .password('wr0ng')
    .submit();

  andThen(function() {
    assert.equal(page.errors, 'Name or password is incorrect.');
  });
});
