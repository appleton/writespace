import IvyCodemirror from 'ivy-codemirror/components/ivy-codemirror';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default IvyCodemirror.extend(KeyboardShortcuts, {
  keyboardShortcuts: {
    f: { action: 'setFocus', global: false },
    esc: { action: 'resignFocus', global: true, preventDefault: false }
  },

  actions: {
    setFocus() {
      this.get('codeMirror').focus();
    },

    resignFocus() {
      // Hacky. Focus whatever just to remove focus from the editor
      document.body.querySelector('button').focus();
    }
  }
});
