import { MOUSE_RANGE, GRAVITY } from '/src/index/common/math/constants'
import { hitsWall, friction, limit } from '/src/index/common/math/physics'

self.onmessage = (event) => {
  const {
    sharedVertexBuffer,
    sharedVelocityBuffer,
    sharedCollisionsBuffer,
    mousePositionBuffer,
    mouseVelocityBuffer,
    gravityBuffer,
    touchDeviceBuffer,
  } = event.data

  const status = calculateFrame(
    sharedVertexBuffer,
    sharedVelocityBuffer,
    sharedCollisionsBuffer,
    mousePositionBuffer,
    mouseVelocityBuffer,
    gravityBuffer,
    touchDeviceBuffer
  )
  postMessage(status)
}

/**
 * Calculates all point displacements for the next frame
 * @param {SharedArrayBuffer | ArrayBuffer} sharedVertexBuffer
 * @param {SharedArrayBuffer | ArrayBuffer} sharedVelocityBuffer
 * @param {SharedArrayBuffer | ArrayBuffer} sharedCollisionsBuffer
 * @param {ArrayBuffer} mousePositionBuffer
 * @param {ArrayBuffer} mouseVelocityBuffer
 * @param {ArrayBuffer} gravityBuffer
 * @param {ArrayBuffer} touchDeviceBuffer
 * @returns {boolean}
 */
export const calculateFrame = (
  sharedVertexBuffer,
  sharedVelocityBuffer,
  sharedCollisionsBuffer,
  mousePositionBuffer,
  mouseVelocityBuffer,
  gravityBuffer,
  touchDeviceBuffer
) => {
  const points = new Float32Array(sharedVertexBuffer)
  const velocities = new Float32Array(sharedVelocityBuffer)
  const collisions = new Uint32Array(sharedCollisionsBuffer)
  const mousePosition = new Float32Array(mousePositionBuffer)
  const mouseVelocity = new Float32Array(mouseVelocityBuffer)
  const gravity = new Int8Array(gravityBuffer)
  const touchDevice = new Int8Array(touchDeviceBuffer)

  /* get collisions */
  let j = 0
  for (let i = 0; i < points.length; i += 2) {
    const dx = mousePosition[0] - points[i]
    const dy = mousePosition[1] - points[i + 1]
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= MOUSE_RANGE) {
      collisions[j] = i
      j += 1
    }
  }
  const numCollisions = j + 1

  /* update velocity on mouse collision */
  for (let i = 0; i < numCollisions; i++) {
    const index = collisions[i]
    const x = index
    const y = index + 1
    velocities[x] += mouseVelocity[0]
    velocities[y] += mouseVelocity[1]
  }

  /* move vertices, check wall collisions */
  for (let i = 0; i < points.length; i += 2) {
    velocities[i] = friction(limit(velocities[i]))
    velocities[i + 1] = friction(limit(velocities[i + 1]))
    if (gravity[0] == 1) {
      velocities[i + 1] += GRAVITY
    }
    points[i] += velocities[i]
    points[i + 1] += velocities[i + 1]
    if (hitsWall(points[i])) velocities[i] *= -1
    if (hitsWall(points[i + 1])) velocities[i + 1] *= -1
    if (points[i + 1] < -1) {
      points[i + 1] = -1
    }
  }

  return true
}
