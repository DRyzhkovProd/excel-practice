// рендерит компоненты
import {$} from 'core/dom';
import {Emitter} from '../../core/Emmiter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector)// корневой сеоектор (#app)
    this.components = options.components || [] // компоненты или пусой массив
    this.emitter = new Emitter()
  }
  // создание шаблона компонентов и вставка их перед закрывающим тегом $root
  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
    }
    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      $el.html(component.toHtml())
      $root.append($el)
      return component
    })
    return $root
  }
  //  вывод шаблона компонентов
  render() {
    this.$el.append(this.getRoot())
    console.log(this.components);
    this.components.forEach(component => component.init())
  }
  destroy() {
    this.components.forEach(component => component.destroy())
  }
}
