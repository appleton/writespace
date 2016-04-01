import PageObject from 'writespace/tests/page-object';

let { visitable } = PageObject;

export default PageObject.create({
  visit: visitable('/')
});
