import {ExcelComponent} from 'core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';
import {resizeHandler} from '@/components/Table/resize';
import {shouldResize} from '@/components/Table/table.functions';

export class Tabl extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }
  toHtml() {
    return createTable(30)
  }
  // onClick(event) {
  //   console.log('click', event)
  // }
  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }
  // onMousemove(event) {
  //   console.log('mousemove', event)
  // }
  // onMouseup(event) {
  //   console.log('mouseup', event)
  // }
}

