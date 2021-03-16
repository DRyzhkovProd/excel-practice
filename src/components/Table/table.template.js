// коды буквы диапазон сколько колонок
const CODES ={
  A: 65,
  Z: 90
}
// eslint-disable-next-line no-unused-vars
function toCell() {
  return `
      <div class="cell" contenteditable="true"></div>`
}
// eslint-disable-next-line no-unused-vars
function toColumn(el) {
  return `
      <div class="column">
            ${el}
      </div>
      
  `
}
// eslint-disable-next-line no-unused-vars
function createRow(index, content) {
  return `
     <div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
     </div>
    `
}
// _ = el  in toColumn(el)
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount =15) {
  // eslint-disable-next-line no-unused-vars
  const colsCount = CODES.Z - CODES.A + 1
  // массив строк таблицы
  const rows = []
  // новый массив дляя определения кол-ва колонок
  const cols = new Array(colsCount)
      .fill('')
  // приводим массив  к буквенному значению цифр (A = 65, A++, ...)
      .map(toChar)
  // вставляем буквы в <div>
      .map(toColumn)
      .join('')
  // формируем в массиве rows через фу-цию createRow колонки[A-Z]
  rows.push(createRow('', cols))
  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount) // [], length =25
        .fill('')
        .map(toCell) // создаем ячейки
        .join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}