export class Page {
  constructor(params) {
    this.params = params
  }
  // возвращение корня, который будем аппендить
  getRoot() {
    throw new Error('Method getRoot should be implemented')
  }
  afterRender() {}
  // удаление страниц
  destroy() {}
}
