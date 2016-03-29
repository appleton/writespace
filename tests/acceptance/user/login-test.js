import { test } from 'qunit';
import moduleForAcceptance from 'writespace/tests/helpers/module-for-acceptance';
import { currentSession } from 'writespace/tests/helpers/ember-simple-auth';

import page from 'writespace/tests/pages/user/login';

moduleForAcceptance('Acceptance | user/login');

test('success', function(assert) {
  page
    .visit()
    .email('test@example.com')
    .password('s3cret')
    .submit();

  andThen(() => {
    const session = currentSession(this.application);
    const loggedInUser = session.get('data.authenticated.userCtx.name');

    assert.equal(loggedInUser, 'test@example.com');
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

  andThen(() => {
    assert.equal(page.errors, 'Name or password is incorrect.');
  });
});
