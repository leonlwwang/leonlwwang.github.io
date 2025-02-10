const cartesianToNDC = (gl, data) => {
  const screenWidth = gl.canvas.width
  const screenHeight = gl.canvas.height
  for (let i = 0; i < data.length; i += 2) {
    data[i] = (data[i] / screenWidth - 0.5) * 2
    data[i + 1] = (data[i + 1] / screenHeight - 0.5) * -2
    // clamp values to [-1, 1]
    data[i] = Math.max(-1, Math.min(1, data[i]))
    data[i + 1] = Math.max(-1, Math.min(1, data[i + 1]))
  }
  return data
}

const getNDCMousePosition = (event, canvas) => {
  const rect = canvas.getBoundingClientRect()

  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top

  const mouseNDCx = (mouseX / rect.width - 0.5) * 2
  const mouseNDCy = (mouseY / rect.height - 0.5) * -2

  return new Float32Array([mouseNDCx, mouseNDCy])
}

const getPointerLocation = (event) => {
  if (event.type === 'drop') {
    const x = event.clientX
    const y = event.clientY
    console.log(x, y)
  } else if (event.type === 'touchend') {
    const touch = event.changedTouches[0]
    const x = touch.clientX + window.scrollX
    const y = touch.clientY + window.scrollY
    console.log(x, y)
  }
}

export { cartesianToNDC, getNDCMousePosition, getPointerLocation }
