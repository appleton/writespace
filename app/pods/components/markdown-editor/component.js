import Ember from 'ember';
import Component from 'ember-component';
import computed from 'ember-computed';
import KeyboardShortcuts from 'ember-keyboard-shortcuts/mixins/component';

const { on } = Ember;

export default Component.extend(KeyboardShortcuts, {
  placeholder: 'start writing',

  keyboardShortcuts: {
    f: { action: 'setFocus', global: false },
    esc: { action: 'resignFocus', global: true, preventDefault: false },
    'meta+enter': { action: 'toggleFullScreen' }
  },

  setupSimpleMDE: on('didInsertElement', function() {
    const editor = new window.SimpleMDE({
      element: this.$('textarea')[0],
      autoDownloadFontAwesome: false,
      autofocus: true,
      indentWithTabs: false,
      placeholder: this.get('placeholder'),
      spellChecker: false,
      status: false,
      toolbar: false,
      shortcuts: {
        togglePreview: '',
        toggleFullScreen: '',
        toggleSideBySide: '',
        cleanBlock: '',
        toggleHeadingBigger: '',
        toggleHeadingSmaller: ''
      }
    });

    this.set('editor', editor);

    this.bindCodeMirrorEvent('change', this, 'updateValue');
    this.bindCodeMirrorProperty('value', this, 'valueDidChange');

    this.valueDidChange();
  }),

  bindCodeMirrorEvent(event, target, method) {
    const callback = Ember.run.bind(target, method);

    this.get('codemirror').on(event, callback);

    this.on('willDestroyElement', this, function() {
      this.get('codemirror').off(event, callback);
    });
  },

  bindCodeMirrorProperty(key, target, method) {
    this.addObserver(key, target, method);

    this.on('willDestroyElement', this, function() {
      this.removeObserver(key, target, method);
    });
  },

  updateValue() {
    const value = this.get('editor').value();
    this.set('value', value);
  },

  valueDidChange() {
    const editor = this.get('editor');
    const value = this.get('value');

    if (value !== editor.value()) {
      editor.value(value || '');
    }
  },

  codemirror: computed('editor', function() {
    return this.get('editor').codemirror;
  }),

  actions: {
    setFocus() {
      this.get('codemirror').focus();
    },

    resignFocus() {
      // Hacky. Focus whatever just to remove focus from the editor
      document.body.querySelector('button').focus();
    },

    toggleFullScreen() {
      this.toggleProperty('isFullScreen');
      this.get('codemirror').setOption('fullScreen', this.get('isFullScreen'));
    }
  }
});
