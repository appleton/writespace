import PageObject from 'writespace/tests/page-object';

const { visitable, clickable, fillable, text } = PageObject;

export default PageObject.create({
  visit:    visitable('/user/password/new'),
  email:    fillable('#email'),
  errors:   text('.form-errors'),
  success:  text('.form-message'),
  submit:   clickable('button')
});
