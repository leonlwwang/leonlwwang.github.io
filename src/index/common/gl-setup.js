const initData = async (path) => {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    console.log(`${response.status} ${response.statusText} ${response.headers.get('Content-Type')}`)
    if (!response.headers.get('Content-Type')?.includes('application/octet-stream')) {
      throw new Error(`Unexpected content type: ${response.headers.get('Content-Type')}`)
    }
    return await response.arrayBuffer()
  } catch (error) {
    console.error(`Failed to fetch ${path}: ${error.message}`)
    return null
  }
}

const initShaders = async (gl) => {
  const importShader = async (gl, type, path) => {
    const source = await fetch(path).then((response) => response.text())
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`Failed to compile shader: ${gl.getShaderInfoLog(shader)}`)
      gl.deleteShader(shader)
      return null
    }
    return shader
  }
  const vertexShader = await importShader(gl, gl.VERTEX_SHADER, '/shaders/vertex.glsl')
  const fragmentShader = await importShader(gl, gl.FRAGMENT_SHADER, '/shaders/fragment.glsl')

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error(`Failed to link program: ${gl.getProgramInfoLog(shaderProgram)}`)
    return null
  }

  return shaderProgram
}

const initBuffer = (gl, data) => {
  const positionBuffer = gl.createBuffer()

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)

  return {
    position: positionBuffer,
  }
}

export { initData, initShaders, initBuffer }
