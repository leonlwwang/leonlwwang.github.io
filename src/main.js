import './style.css'
import { render } from './index/stippler.js'

document.querySelector('div[index]').innerHTML = `
  <canvas stippler width='1000' height='1000'></canvas>
`

render(document.querySelector('canvas[stippler]'))

document.querySelector('div[profile]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Profile]</h3>
`

document.querySelector('div[projects]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Projects]</h3>
`
