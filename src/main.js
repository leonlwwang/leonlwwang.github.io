import './style.css'
import { render } from './index/index.js'
import { loadPage } from './router.js'

await loadPage('/src/index/profile.html', 'div[index]').then(() => {
  render(document.querySelector('canvas[stippler'))
})

await loadPage('/src/projects/projects.html', 'div[projects]')
