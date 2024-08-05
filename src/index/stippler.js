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

  setPositionAttribute(gl, buffer, programInfo)

  gl.useProgram(programInfo.program)

  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, modelViewMatrix)

  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)

  const bufferByteSize = gl.getBufferParameter(gl.ARRAY_BUFFER, gl.BUFFER_SIZE)

  {
    const offset = 0
    /* multiply 2 for (x, y) */
    const vertexCount = bufferByteSize / (2 * Float32Array.BYTES_PER_ELEMENT)
    gl.drawArrays(gl.POINTS, offset, vertexCount)
  }
}

const setPositionAttribute = (gl, buffer, programInfo) => {
  const numComponents = 2
  const type = gl.FLOAT
  const normalize = false
  const stride = 0
  const offset = 0

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.position)
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  )
  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
}
