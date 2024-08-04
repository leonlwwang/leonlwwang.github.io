import { mat4 } from 'gl-matrix'

export const drawScene = (gl, programInfo, buffer) => {
  gl.clearColor(1.0, 0.933, 0.875, 1.0)
  gl.clearDepth(1.0)
  gl.enable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LEQUAL)

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

  const fovy = (45 * Math.PI) / 180
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight
  const near = 0.1
  const far = 100.0
  const projectionMatrix = mat4.create()

  mat4.perspective(projectionMatrix, fovy, aspect, near, far)

  const modelViewMatrix = mat4.create()
}
