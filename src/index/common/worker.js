import { loadBVH } from './math/bvh'
import { MOUSE_RANGE } from './math/constants'
import { hitsWall, friction, limit } from './math/physics'

self.onmessage = (event) => {
  const {
    sharedVertexBuffer,
    sharedVelocityBuffer,
    sharedCollisionsBuffer,
    mousePositionBuffer,
    mouseVelocityBuffer,
  } = event.data

  const points = new Float32Array(sharedVertexBuffer)
  const velocities = new Float32Array(sharedVelocityBuffer)
  const collisions = new Uint32Array(sharedCollisionsBuffer)
  const mousePosition = new Float32Array(mousePositionBuffer)
  const mouseVelocity = new Float32Array(mouseVelocityBuffer)

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
    const index = Atomics.load(collisions, i)
    const x = index
    const y = index + 1
    velocities[x] += mouseVelocity[0]
    velocities[y] += mouseVelocity[1]
  }

  /* move vertices, check wall collisions */
  for (let i = 0; i < points.length; i += 2) {
    velocities[i] = friction(limit(velocities[i]))
    velocities[i + 1] = friction(limit(velocities[i + 1]))
    points[i] += velocities[i]
    points[i + 1] += velocities[i + 1]
    if (hitsWall(points[i])) velocities[i] *= -1
    if (hitsWall(points[i + 1])) velocities[i + 1] *= -1
  }

  /* bvh */

  postMessage(true)
}
