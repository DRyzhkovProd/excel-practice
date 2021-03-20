import {ExcelComponent} from 'core/ExcelComponent';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input']
    });
  }
  static className = 'excel__header'
  toHtml() {
    return `<input type="text" class="excel__input" value="Новая Таблица">
            <div class="excel__buttons">
                <div class="btn">
                    <span class="material-icons">delete</span>
                </div>
                <div class="btn">
                    <span class="material-icons">exit_to_app</span>
                </div>
            </div>`
  }
  onInput(event) {
  }
}
