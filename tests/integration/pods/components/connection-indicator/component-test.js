import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('connection-indicator', 'Integration | Component | connection indicator', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{connection-indicator tooltipContent="you arere offline"}}`);
  assert.equal(this.$().text().trim(), '');
});
