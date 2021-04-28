import {ExcelComponent} from 'core/ExcelComponent';
import {$} from '../../core/dom/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      subscribe: ['currentText'],
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
      this.$formula.text($cell.dataget.value)
    })
  }
  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }
  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }
  onClick(event) {
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
