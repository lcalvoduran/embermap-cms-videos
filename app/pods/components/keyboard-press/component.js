import Component from '@ember/component';
import { EKMixin, keyDown } from 'ember-keyboard';

export default Component.extend(EKMixin, {
  key: null,
  'on-press'() {},

  didInsertElement() {
    this._super(...arguments);

    this.set('keyboardActivated', true);

    let key = this.key;
    let action = this['on-press'];

    this.on(keyDown(key), action);
  },
});
