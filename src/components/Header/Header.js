import {ExcelComponent} from 'core/ExcelComponent';
import {$} from '../../core/dom';
import {changeTitle} from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {debounce} from '../../core/utils';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  static className = 'excel__header'
  toHtml() {
    const title = this.store.getState().title || defaultTitle
    console.log(title)
    return `<input type="text" class="excel__input" value="${title}">
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
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
