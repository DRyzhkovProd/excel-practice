import {ExcelComponent} from 'core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }
  toHtml() {
    return `<div class="btn">
                <span class="material-icons">format_align_left</span>
            </div>
            <div class="btn">
                <span class="material-icons">format_align_center</span>
            </div>
            <div class="btn">
                <span class="material-icons">format_align_right</span>
            </div>
            <div class="btn">
                <span class="material-icons">format_bold</span>
            </div>
            <div class="btn">
                <span class="material-icons">format_italic</span>
            </div>
            <div class="btn">
                <span class="material-icons">format_underline</span>
            </div>`
  }
  onClick(event) {
    console.log(event.target)
  }
}
