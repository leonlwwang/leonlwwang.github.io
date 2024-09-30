import { drawScene } from './view/stippler'
import { cartesianToNDC } from './common/math/ndc'
import { loadPhysicsEngine } from './view/engine'
import { initData, initShaders, initBuffer } from './common/gl-setup'
import { loadTheme } from '../header/theme'

export const render = async (canvas) => {
  /* prepare theme toggler for canvas */
  loadTheme()

  /* unpack stippling data from binary */
  const path = '/src/index/stippling.bin'
  const arrBuffer = await initData(path)
  if (!arrBuffer) {
    console.error('Failed to load buffer')
    return
  }
  const vertices = new Float32Array(arrBuffer)
  console.log(`Buffer loaded ${vertices.byteLength} bytes`)

  /* initialize gl context */
  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported')
    return
  }
  console.log('WebGL context loaded')
  gl.clearColor(1.0, 0.933, 0.875, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  /* configure shaders and buffer */
  const program = await initShaders(gl)
  console.log('Shaders initialized')

  const programInfo = {
    program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(program, 'vertexPosition'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(program, 'projectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(program, 'modelViewMatrix'),
    },
  }
  let verticesNDC = cartesianToNDC(gl, vertices)
  const buffer = initBuffer(gl, verticesNDC)

  drawScene(gl, programInfo, buffer)
  loadPhysicsEngine(gl, programInfo, canvas, verticesNDC)
}
