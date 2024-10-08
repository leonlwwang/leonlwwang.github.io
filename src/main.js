import '/src/style.css'
import { colorBtn } from '/src/index/view/button'
import { render } from '/src/index/index.js'
import { loadPage } from '/src/router.js'
import { enableDragDrop } from '/src/index/view/draggable'

await loadPage('/src/index/profile.html', 'div[index]').then(() => {
  colorBtn()
  enableDragDrop(
    document.querySelector('img[pow-block]'),
    document.querySelector('canvas[stippler]')
  )
  render(document.querySelector('canvas[stippler]'))
})

await loadPage('/src/projects/projects.html', 'div[projects]')
