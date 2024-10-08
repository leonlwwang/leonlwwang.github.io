const drag = (event) => {
  event.dataTransfer.setData('text', event.target.id)
}

const drop = (event) => {
  event.preventDefault()
  const x = event.clientX
  const y = event.clientY
  console.log(x, y)
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

const touchDrop = (event) => {
  const touch = event.changedTouches[0]
  const x = touch.clientX + window.scrollX
  const y = touch.clientY + window.scrollY
  console.log(x, y)
  event.target.style.position = ''
}

export const enableDragDrop = (dragElement, dropElement) => {
  dragElement.setAttribute('draggable', 'true')

  dragElement.addEventListener('dragstart', (event) => drag(event))
  dropElement.addEventListener('drop', (event) => drop(event))
  dropElement.addEventListener('dragover', (event) => allowDrop(event))

  dragElement.addEventListener('touchmove', (event) => touchDrag(event))
  dragElement.addEventListener('touchend', (event) => touchDrop(event))
}
