import Mirage, { faker } from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  _id: faker.random.uuid,
  text() { return faker.lorem.paragraphs(3); },
  updatedAt() { return (new Date()).valueOf(); },
  createdAt() { return (new Date()).valueOf(); }
});
