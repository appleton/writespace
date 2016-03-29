import PageObject from 'writespace/tests/page-object';

const { visitable, clickable, fillable, text } = PageObject;

export default PageObject.create({
  visit:    visitable('/user/new'),
  email:    fillable('#email'),
  password: fillable('#password'),
  errors:   text('.form-errors'),
  submit:   clickable('button')
});
