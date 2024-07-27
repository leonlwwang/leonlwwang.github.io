import './style.css'
import { render } from './index/stippler.js'

document.querySelector('div[index]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Index]</h3>
  <canvas stippler hidden></canvas>
`

render(document.querySelector('canvas[stippler]'))

document.querySelector('div[profile]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Profile]</h3>
`

document.querySelector('div[projects]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Projects]</h3>
`
