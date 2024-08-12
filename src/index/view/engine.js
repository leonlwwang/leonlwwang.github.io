import { MOUSE_TIMEOUT, WEIGHT } from '../common/math/constants'
import { drawScene } from './stippler'
import { initBuffer } from '../common/gl-setup'
import { getNDCMousePosition } from '../common/math/ndc'
import { mouseCollisions, hitsWall, friction } from '../common/math/physics'

export const loadPhysicsEngine = (gl, programInfo, canvas, vertices) => {
  /* mouse physics */
  let mouseMove = false
  let movementTimer = null
  let previousMoveTime = 0

  /* collision physics */
  let collisions = []
  let mouseVelocity = { x: 0, y: 0 }
  let velocities = new Float32Array(vertices.length)

  const animate = () => {
    requestAnimationFrame(animate)

    /* update velocity if collisions found */
    for (const index of collisions) {
      const x = index
      const y = index + 1
      velocities[x] += mouseVelocity.x
      velocities[y] += mouseVelocity.y
    }

    /* update vertex positions */
    for (let i = 0; i < vertices.length; i += 2) {
      vertices[i] += friction(velocities[i])
      vertices[i + 1] += friction(velocities[i + 1])
      if (hitsWall(vertices[i])) velocities[i] *= -1
      if (hitsWall(vertices[i + 1])) velocities[i + 1] *= -1
    }

    /* reload buffer and re-render */
    const newBuffer = initBuffer(gl, vertices)
    drawScene(gl, programInfo, newBuffer)
  }
  animate()

  canvas.addEventListener('mousemove', (event) => {
    if (!mouseMove) {
      mouseMove = true
      previousMoveTime = Date.now()
    }

    const mousePosition = getNDCMousePosition(event, canvas)
    collisions = mouseCollisions(mousePosition, vertices)

    /* determine sampling rate */
    const currentMoveTime = Date.now()
    const time = (currentMoveTime - previousMoveTime) * WEIGHT
    previousMoveTime = currentMoveTime

    mouseVelocity.x = time === 0 ? 0 : mousePosition.x / time,
    mouseVelocity.y = time === 0 ? 0 : mousePosition.y / time,

    clearTimeout(movementTimer)
    movementTimer = setTimeout(() => {
      reset()
    }, MOUSE_TIMEOUT)
  })

  const reset = () => {
    mouseMove = false
    movementTimer = null
    mouseVelocity.x = 0
    mouseVelocity.y = 0
    previousMoveTime = 0
  }
}
