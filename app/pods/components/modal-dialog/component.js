import ModalDialog from 'ember-modal-dialog/components/modal-dialog';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

export default ModalDialog.extend(KeyboardShortcuts, {
  keyboardShortcuts: {
    esc: { action: 'close', global: false}
  }
});
