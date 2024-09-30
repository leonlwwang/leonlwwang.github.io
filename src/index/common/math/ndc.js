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

  const mouseX = event.clientX
  const mouseY = event.clientY

  const mouseNDCx = ((mouseX - rect.left) / canvas.width - 0.5) * 2
  const mouseNDCy = ((mouseY - rect.top) / canvas.height - 0.5) * -2

  return new Float32Array([mouseNDCx, mouseNDCy])
}

export { cartesianToNDC, getNDCMousePosition }
