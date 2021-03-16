import {ExcelComponent} from 'core/ExcelComponent';
import {createTable} from '@/components/Table/table.template';

export class Tabl extends ExcelComponent {
  static className = 'excel__table'
  toHtml() {
    return createTable(30)
  }
}
