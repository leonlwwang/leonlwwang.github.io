import './style.css'
import { render } from './index/index.js'

const lightModeIcon = `
  <svg id="svgContainer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
`

const darkModeIcon = `
  <svg id="svgContainer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
`

let dark = false

const enableDarkMode = () => {
  const root = document.documentElement
  root.classList.add('dark')
}

const disableDarkMode = () => {
  const root = document.documentElement
  root.classList.remove('dark')
}

const theme = document.querySelector('div[theme]')
theme.addEventListener('click', () => {
  theme.innerHTML = dark ? lightModeIcon : darkModeIcon
  if (dark) {
    theme.innerHTML = lightModeIcon
    disableDarkMode()
  } else {
    theme.innerHTML = darkModeIcon
    enableDarkMode()
  }
  dark = !dark
})

document.querySelector('div[index]').innerHTML = `
  <canvas stippler width='500' height='500'></canvas>
`

render(document.querySelector('canvas[stippler]'))

document.querySelector('div[profile]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Profile]</h3>
`

document.querySelector('div[projects]').innerHTML = `
  <h3 id="placeholder" style="padding-bottom: 4rem;">[Projects]</h3>
`
