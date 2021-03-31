import {ExcelComponent} from 'core/ExcelComponent';
import {$} from '../../core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    });
  }
  toHtml() {
    return `<div class="formula-info">fx</div>
            <div 
            id="formula"
            class="formula-input" 
            contenteditable="true" 
            spellcheck="false">
            
</div>`
  }
  init() {
    super.init()
    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $cell=> {
      this.$formula.text($cell.text())
    })
    this.$on('table:input', $cell => {
      this.$formula.text($cell.text())
    })
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  onClick(event) {
    console.log('click:', event)
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
