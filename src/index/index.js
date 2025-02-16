import { drawScene } from '/src/index/view/stippler'
import { cartesianToNDC } from '/src/index/common/math/utils'
import { loadPhysicsEngine } from '/src/index/view/engine'
import { initData, initShaders, initBuffer } from '/src/index/common/gl-setup'
import { loadTheme } from '/src/header/theme'

export const render = async (canvas) => {
  /* unpack stippling data from binary */
  const path = '/stippling.bin'
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

  /* configure shaders and buffer */
  const program = await initShaders(gl)
  gl.useProgram(program)
  console.log('Shaders initialized')

  /* get color and load theme toggler */
  loadTheme(gl, program)

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
