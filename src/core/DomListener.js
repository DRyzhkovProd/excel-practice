import {capitalize} from 'core/utils';

export class DomListener {
  constructor($root, listeners =[]) {
    // listeners - это массив слушателей
    if (!$root) {
      throw new Error('No $root provider for DomListener')
    }
    // eslint-disable-next-line no-unreachable
    this.$root = $root
    this.listeners = listeners
  }
  initDOMListeners() {
    // получаем все слушатели из класса компонента
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      console.log(method);
      if (!this[method]) {
        throw new Error(`Method ${method} is not found in 
        ${this.name || ''} Component`)
      }
      // корневой элемент для каждого компонента
      this[method] = this[method].bind(this)
      console.log(this.$root)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener =>{
      const method = getMethodName(listener)
      this.$root.remove(listener, this[method])
    })
  }
}
// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
