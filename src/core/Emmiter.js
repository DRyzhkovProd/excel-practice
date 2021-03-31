// слушатель событий в компонентах
export class Emitter {
  constructor() {
    this.listeners = {}
  }
  // триггер на события, который уведомляет слушателей
  // eventName -string!('focus, formula:done')
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener =>{
      listener(...args)
    })
    console.log(this.listeners);
    return true
  }
  // Подписываемся на уведомления от  emitera
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    console.log(this.listeners[event])
    // удалляем подписку
    return () => {
      return this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}
// example
/*
const emitter = new Emitter()
const unsub = emitter.subscribe('dima', data => console.log(data))
unsub()
emitter.subscribe('0000', func => console.log(func))
emitter.emit('0000', 42)
emitter.emit('dima', 98)
*/
