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
}

// even.target
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
