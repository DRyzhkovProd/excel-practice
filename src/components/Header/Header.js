import {ExcelComponent} from 'core/ExcelComponent';
import {$} from '../../core/dom/dom';
import {changeTitle} from '../../redux/actions';
import {defaultTitle} from '../../constants';
import {debounce} from '../../core/utils';
import {ActiveRoute} from '../../core/router/ActiveRoute';

export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }
  static className = 'excel__header'
  toHtml() {
    const title = this.store.getState().title || defaultTitle
    return `<input type="text" class="excel__input" value="${title}">
            <div class="excel__buttons">
                <div class="btn" data-btn="remove">
                    <span 
                    class="material-icons"
                     data-btn="remove">delete</span>
                </div>
                <div class="btn" data-btn="exit">
                    <span 
                    class="material-icons" 
                    data-btn="exit">exit_to_app</span>
                </div>
            </div>`
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
  onClick(event) {
    const $target =$(event.target)
    if ($target.dataget.btn === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту страницу?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param())
        ActiveRoute.navigate('')
      }
    } else if ($target.dataget.btn === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}
