import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { waitUntil } from '@ember/test-helpers';

module('Integration | Component | bar-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render two bars', async function(assert) {
    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 8 }
    ]);

    await render(hbs`
      {{bar-chart data=data
        duration=10
        onAnimationStart=(action (mut isAnimating) true)
        onAnimationEnd=(action (mut isAnimating) false)
      }}
    `);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 2 });
  });

  test('it can add new bars', async function(assert) {
    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 8 }
    ]);

    await render(hbs`
      {{bar-chart data=data
        duration=10
        onAnimationStart=(action (mut isAnimating) true)
        onAnimationEnd=(action (mut isAnimating) false)
      }}
    `);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 2 });

    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 8 },
      { label: 'Label 3', count: 3 }
    ]);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 3 });
  });

  test('it can add and remove bars', async function(assert) {
    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 8 }
    ]);

    await render(hbs`
      {{bar-chart data=data
        duration=10
        onAnimationStart=(action (mut isAnimating) true)
        onAnimationEnd=(action (mut isAnimating) false)
      }}
    `);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 2 });

    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 8 },
      { label: 'Label 3', count: 3 }
    ]);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 3 });

    this.set('data', [
      { label: 'Label 1', count: 5 }
    ]);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect').exists({ count: 1 });
  });

  test('it can update bars', async function(assert) {
    this.set('data', [
      { label: 'Label 1', count: 5 },
      { label: 'Label 2', count: 10 }
    ]);

    await render(hbs`
      {{bar-chart data=data
        duration=10
        onAnimationStart=(action (mut isAnimating) true)
        onAnimationEnd=(action (mut isAnimating) false)
      }}
    `);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect:nth-child(1)').hasAttribute('height', '50%');
    assert.dom('rect:nth-child(2)').hasAttribute('height', '100%');

    this.set('data', [
      { label: 'Label 1', count: 10 },
      { label: 'Label 2', count: 10 }
    ]);
    await waitUntil(() => this.isAnimating === false);

    assert.dom('rect:nth-child(1)').hasAttribute('height', '100%');
    assert.dom('rect:nth-child(2)').hasAttribute('height', '100%');
  });
});