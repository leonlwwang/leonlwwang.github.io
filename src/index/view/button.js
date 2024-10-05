let base = '#ffeedf'

const randomHex = () => {
  const values = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += values[Math.floor(Math.random() * 16)]
  }
  return color
}

const hexToRgb = (hex) => {
  const bigInt = parseInt(hex.slice(1), 16)
  const r = (bigInt >> 16) & 255
  const g = (bigInt >> 8) & 255
  const b = bigInt & 255
  return [r, g, b]
}

const luminance = (r, g, b) => {
  const [R, G, B] = [r, g, b].map((value) => {
    value /= 255
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

const getBtnColors = (hex) => {
  const [r, g, b] = hexToRgb(hex)
  const textColor = luminance(r, g, b) > 0.5 ? 'black' : 'white'
  return textColor
}

const setHoverColor = (btn) => {
  const light = document.getElementById('light-mode') ? 'black' : null
  const dark = document.getElementById('dark-mode') ? 'white' : null
  const status = light ?? dark ?? 'black'
  let hex = null
  let color = null
  while (color != status) {
    hex = randomHex()
    color = getBtnColors(hex)
  }
  btn.style.backgroundImage = `linear-gradient(
    to right,
    ${base} 49.8%,
    ${hex} 50%
  )`
}

export const setBaseColor = () => {
  if (base == '#ffeedf') {
    base = '#231a1b'
  } else {
    base = '#ffeedf'
  }
  const btn = document.querySelector('button[resume]')
  setHoverColor(btn)
}

export const colorBtn = () => {
  const btn = document.querySelector('button[resume]')
  btn.addEventListener('mouseover', () => {
    setHoverColor(btn)
  })
}
