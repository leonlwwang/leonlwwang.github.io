const drag = (event) => {
  event.dataTransfer.setData('text', event.target.id)
}

const drop = (event, fn = null) => {
  event.preventDefault()
  fn && fn(event)
}

const allowDrop = (event) => {
  event.preventDefault()
}

const touchDrag = (event) => {
  event.preventDefault()
  const touch = event.touches[0]
  event.target.style.position = 'absolute'
  event.target.style.left = `${touch.clientX + window.scrollX}px`
  event.target.style.top = `${touch.clientY + window.scrollY}px`
}

const touchDrop = (event, fn = null) => {
  event.target.style.position = ''
  fn && fn(event)
}

export const enableDragDrop = (dragElement, dropElement, fn = null) => {
  dragElement.setAttribute('draggable', 'true')

  dragElement.addEventListener('dragstart', (event) => drag(event))
  dropElement.addEventListener('drop', (event) => drop(event, fn))
  dropElement.addEventListener('dragover', (event) => allowDrop(event))

  dragElement.addEventListener('touchmove', (event) => touchDrag(event))
  dragElement.addEventListener('touchend', (event) => touchDrop(event, fn))
}
