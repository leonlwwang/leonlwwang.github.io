let opened = false

export const enableToolbar = (toolbar) => {
  const tools = toolbar.querySelector('ul')
  const toggle = toolbar.querySelector('img[block]')

  toggle.addEventListener('pointerdown', () => {
    opened = !opened
    if (opened) {
      toggle.src = '/assets/usedblock.svg'
      tools.className = 'open'
    } else {
      toggle.src = '/assets/block.svg'
      tools.className = 'closed'
    }
  })
}
