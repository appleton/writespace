import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';

import page from 'writespace/tests/pages/user/login';

moduleForAcceptance('Acceptance | user/login');

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

test('success', function(assert) {
  page
    .visit()
    .email('test@example.com')
    .password('s3cret')
    .submit();

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
