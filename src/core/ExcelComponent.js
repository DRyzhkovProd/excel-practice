import {DomListener} from 'core/DomListener';
// определяет шаблон компонента, поведение
export class ExcelComponent extends DomListener {
  // Возвращает структуру компонента

  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
  }
  toHtml() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
  }
}
