import {$} from 'core/dom';

export function resizeHandler($root, event) {
  const $resize = $(event.target)
  const $parent = $resize.closest('[data-type = "resizable"]')
  const coords = $parent.getCoords()
  const type = $resize.dataget.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  let value;
  $resize.css({opacity: 1, [sideProp]: '-5000px'})
  // событие при движении
  document.onmousemove = e => {
    if (type === 'col') {
      // текущее положение курсора от правого края блока
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resize.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resize.css({bottom: -delta + 'px'})
    }
  }
  // при отпуске клика
  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null
    if (type === 'col') {
      $parent.css({width: value + 'px'})
      $root
          .findAll(`[data-col="${$parent.dataget.col}"]`)
          .forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
    }
    $resize.css({opacity: 0, bottom: '0', right: 0})
  }
}
