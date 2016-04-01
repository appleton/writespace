import PageObject from 'writespace/tests/page-object';

let { visitable, clickable } = PageObject;

export default PageObject.create({
  visit:              visitable('/'),
  clickOnNote:        clickable('a.sidebar__body__list__item'),
  clickNewNoteButton: clickable('[title="New note"]')
});
