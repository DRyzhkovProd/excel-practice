import {ExcelComponent} from 'core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';
import {resizeHandler} from '@/components/Table/resize';
import {
  isCell,
  matrix,
  nextSelector,
  shouldResize
} from '@/components/Table/table.functions';
import {TableSelection} from '@/components/Table/TableSelection';
import {$} from 'core/dom';


export class Tabl extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  toHtml() {
    return createTable(30)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  // вызов базовых составляющих
  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:done', ()=> {
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"`))
        console.log($cells);
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys =[
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown'
    ]
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}

