// утилита для взаимодействием с домом
class Dom {
  constructor(selector) {
    // #app
    // мы распознаем, что это класс(стринг) или элемент ноды
    // если класс, то ищем его , если элемент новы, возвращаем как параметр
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
      : selector
  }
  // реализуем метод вставки хтмл
  // если нам нужно получить элемент- это геттер мы, проверяем
  // если аргумент - это класс, то вставляем его в html
  // иначе возвращаем весь элемент
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }
  clear() {
    this.html('')
    return this
  }
  // on === addEventListener
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  remove(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }
  get dataget() {
    return this.$el.dataset;
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  css(styles = {}) {
    Object.keys(styles)
        .forEach(key =>{
          this.$el.style[key] = styles[key]
        })
  }
  getStyles(styles =[]) {
    return styles.reduce((res, s)=>{
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }
  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.dataget.id
  }
  focus() {
    this.$el.focus()
    return this
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
}
export function $(selector) {
  return new Dom(selector)
}
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
