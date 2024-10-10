import { MOUSE_TIMEOUT, UINT_32, WEIGHT } from '/src/index/common/math/constants'
import { drawScene } from '/src/index/view/stippler'
import { initBuffer } from '/src/index/common/gl-setup'
import { getNDCMousePosition, getPointerLocation } from '/src/index/common/math/utils'

let gravity = false

export const enableGravity = (event) => {
  getPointerLocation(event)
  gravity = true
}

export const loadPhysicsEngine = (gl, programInfo, canvas, vertices) => {
  const worker = new Worker(new URL('/src/index/common/worker.js', import.meta.url), {
    type: 'module',
  })

  /* mouse physics */
  let mouseMove = false
  let movementTimer = null
  let previousMoveTime = 0
  let mousePosition = new Float32Array([0, 0])
  let mouseVelocity = new Float32Array([0, 0])

  /* vertex physics */
  const gravityFlag = new Int8Array([0])
  const sharedVertexBuffer = new SharedArrayBuffer(vertices.byteLength)
  const points = new Float32Array(sharedVertexBuffer)
  points.set(vertices)
  const sharedVelocityBuffer = new SharedArrayBuffer(vertices.byteLength)
  const sharedCollisionsBuffer = new SharedArrayBuffer(UINT_32 * (points.length / 2))

  const animate = () => {
    requestAnimationFrame(animate)
    if (gravity) gravityFlag[0] = 1
    const mousePositionBuffer = mousePosition.buffer
    const mouseVelocityBuffer = mouseVelocity.buffer
    const gravityBuffer = gravityFlag.buffer
    worker.postMessage({
      sharedVertexBuffer,
      sharedVelocityBuffer,
      sharedCollisionsBuffer,
      mousePositionBuffer,
      mouseVelocityBuffer,
      gravityBuffer,
    })
    worker.onmessage = (event) => {
      if (event.data) {
        const newBuffer = initBuffer(gl, points)
        drawScene(gl, programInfo, newBuffer)
      }
    }
  }
  animate()

  canvas.addEventListener('pointermove', (event) => {
    if (!mouseMove) {
      mouseMove = true
      previousMoveTime = Date.now()
    }

    /* determine sampling rate */
    const currentMoveTime = Date.now()
    const time = (currentMoveTime - previousMoveTime) * WEIGHT
    previousMoveTime = currentMoveTime

    mousePosition = getNDCMousePosition(event, canvas)
    mouseVelocity[0] = time === 0 ? 0 : mousePosition[0] / time
    mouseVelocity[1] = time === 0 ? 0 : mousePosition[1] / time

    clearTimeout(movementTimer)
    movementTimer = setTimeout(() => {
      reset()
    }, MOUSE_TIMEOUT)
  })

  const reset = () => {
    mouseMove = false
    movementTimer = null
    mouseVelocity = new Float32Array([0, 0])
    previousMoveTime = 0
  }
}
