import {DomListener} from 'core/DomListener';
// определяет шаблон компонента, поведение
export class ExcelComponent extends DomListener {
  // Возвращает структуру компонента

  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
    this.prepare()
  }
  // настраиваем компонент до init
  prepare() {}
  toHtml() {
    return ''
  }
  // Уведомляем про события
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // Подписка на события
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // инициализируем компонент
  // добавляем ДОМ- слушатели
  init() {
    this.initDOMListeners()
  }
  // Удаляем компонент
  // удаляем ДОМ- слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
