import './style.css'
import { render } from './index/index.js'
import { loadPage } from './router.js'

await loadPage('/src/index/profile.html', 'div[index]').then(() => {
  render(document.querySelector('canvas[stippler'))
})

document.querySelector('div[profile]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Profile]</h3>
`

document.querySelector('div[projects]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Projects]</h3>
`
