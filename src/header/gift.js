export const enableToolbar = (toolbar) => {
  const toggle = toolbar.querySelector('svg')

  toggle.addEventListener('pointerdown', () => {
    toggle.classList.add('shake')

    setTimeout(() => {
      toolbar.removeChild(toggle)
      const pow = document.querySelector('img[pow-block]')
      pow.style.visibility = 'visible'
    }, 1000)
  })
}
