import { authenticateSession } from 'writespace/tests/helpers/ember-simple-auth';

export default function login(application) {
  const session = server.create('session');
  const user = server.create('user', { name: session.userCtx.name });

  authenticateSession(application, session);

  return { session, user };
}
