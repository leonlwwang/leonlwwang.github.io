import '/src/style.css'
import { colorBtn } from '/src/index/view/button'
import { render } from '/src/index/index.js'
import { loadPage } from '/src/router.js'

await loadPage('/src/index/profile.html', 'div[index]').then(() => {
  colorBtn()
  render(document.querySelector('canvas[stippler]'))
})

await loadPage('/src/projects/projects.html', 'div[projects]')
