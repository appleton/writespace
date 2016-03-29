import PageObject from 'writespace/tests/page-object';

const { visitable, clickable, fillable, text } = PageObject;

export default PageObject.create({
  visit:    visitable('/user/password/edit'),
  password: fillable('#password'),
  errors:   text('.form-errors'),
  submit:   clickable('button')
});
