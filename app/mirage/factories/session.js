import Mirage, { faker }  from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  ok: true,
  userCtx() {
    return {
      name: faker.internet.email(),
      roles: []
    };
  },
  info: {
    authentication_db: '_users',
    authentication_handlers: ['oauth','cookie','default'],
    authenticated: 'cookie'
  }
});
