// коды буквы диапазон сколько колонок
const CODES ={
  A: 65,
  Z: 90
}
// eslint-disable-next-line no-unused-vars
// function toCell(_, col) {
//   return `
//       <div class="cell" contenteditable="true" data-col="${col}"></div>`
// }

function toCell(row) {
  return function(_, col) {
    return `
       <div 
       class="cell" 
       contenteditable
       data-col="${col}"
       data-type = "cell"
       data-id="${row}:${col}"
       >
       </div>`
  }
}
// eslint-disable-next-line no-unused-vars
function toColumn(el, index) {
  return `
      <div class="column" data-type = "resizable"  data-col="${index}">
            ${el}
            <div class="col-resize" data-resize="col">
            </div>     
      </div>
      
  `
}
// eslint-disable-next-line no-unused-vars
function createRow(index, content) {
  const resize = index ? `<div class="row-resize" data-resize="row"></div>` : ''
  return `
     <div class="row" data-type = "resizable">
        <div class="row-info">
            ${index ? index : ''}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
     </div>
    `
}
// _ = el  in toColumn(el)
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount =15) {
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
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount) // [], length =25
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(row + 1, cells))
  }
  return rows.join('')
}
