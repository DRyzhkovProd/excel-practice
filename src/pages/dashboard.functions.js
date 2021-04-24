import {storage} from '../core/utils';

function toHtml(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
      <li class="record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
      </li>
  `
}
export function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }
    keys.push(key)
  }
  return keys
}
export function createAllTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Таблицы отсутствуют</p>`
  }

  return `<div class="dashboard__list-header">
                <span>Название</span>
                <span>Дата открытия</span>
            </div>
            <ul class="dashboard__list">
            ${keys.map(toHtml).join('')}
            </ul>`
}
