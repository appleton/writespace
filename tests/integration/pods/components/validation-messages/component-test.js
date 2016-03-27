import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let model;

moduleForComponent('validation-messages', 'Integration | Component | validation messages', {
  integration: true,

  beforeEach() {
    const model = Ember.Object.create({
      errors: {
        messages: ['an error happened', 'another error happened']
      }
    });

    this.set('model', model);
    this.set('successMessage', 'success happened');

    this.render(hbs`
      {{validation-messages model=model successMessage=successMessage}}
    `);
  }
});

test('it renders errors', function(assert) {
  const text = this.$('.form-errors').text();

  assert.ok(
    text.includes('an error happened'),
    'expected to render the first error'
  );

  assert.ok(
    text.includes('another error happened'),
    'expected to render the second error'
  );
});

test('it renders success', function(assert) {
  const text = this.$('.form-message').text();

  assert.ok(
    text.includes('success happened'),
    'expected to render the success message'
  );
});
