import { inflate } from 'pako'

export const render = async (canvas) => {
  // unpack stippling data from binary
  const path = '/src/index/stippling.bin'
  const rawBuffer = await load(path)
  if (!rawBuffer) {
    console.error('Failed to load buffer')
    return
  }
  const buffer = inflate(rawBuffer)
  console.log(`Buffer loaded ${buffer.byteLength} bytes`)

  // initialize WebGL context
  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported')
    return
  }
  console.log('WebGL context loaded')
  gl.clearColor(1.0, 0.933, 0.875, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  // configure shaders
  const program = await initShaders(gl)
  console.log('Shaders initialized')
}

const load = async (path) => {
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
    const source = await fetch(path).then(response => response.text())
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
  const vertexShader = await importShader(gl, gl.VERTEX_SHADER, '/src/index/shaders/vertex.glsl')
  const fragmentShader = await importShader(gl, gl.FRAGMENT_SHADER, '/src/index/shaders/fragment.glsl')

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
