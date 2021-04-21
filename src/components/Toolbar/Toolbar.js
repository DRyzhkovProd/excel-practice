

import {defaultStyles} from '../../constants';
import {ExcelStateComponent} from '../../core/ExcelStateComponent';
import {$} from '../../core/dom';
import {createToolbar} from './toolbar.template';


export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.dataget.type === 'button') {
      const value = JSON.parse($target.dataget.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
