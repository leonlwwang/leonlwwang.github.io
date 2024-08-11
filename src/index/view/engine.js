import { C } from '../common/math/constants'
import { drawScene } from './stippler'
import { initBuffer } from '../common/gl-setup'
import { getNDCMousePosition } from '../common/math/ndc'
import { checkCollision, calcDisplacement } from '../common/math/physics'

export const loadPhysicsEngine = (gl, programInfo, canvas, data) => {
  /* mouse physics */
  let mouseMove = false
  let movementTimer = null
  let previousMoveTime = 0
  let prevMouseVelocity = { x: 0, y: 0 }

  /* collision physics */
  let sampleTime = 0
  let forceVector = { x: 0, y: 0 }
  let collisions = []

  const animate = () => {
    requestAnimationFrame(animate)
    if (
      (forceVector.x !== 0 || forceVector.y !== 0) &&
      sampleTime !== 0 &&
      collisions.length !== 0
    ) {
      const displacement = calcDisplacement(forceVector, sampleTime)
      for (const index of collisions) {
        const xIndex = index
        const yIndex = index + 1
        data[xIndex] += displacement.x
        data[yIndex] += displacement.y
      }

      /* reload buffer, re-render */
      const newBuffer = initBuffer(gl, data)
      drawScene(gl, programInfo, newBuffer)
    }
  }
  animate()

  canvas.addEventListener('mousemove', (event) => {
    if (!mouseMove) {
      mouseMove = true
      previousMoveTime = Date.now()
    }

    const mousePosition = getNDCMousePosition(event, canvas)
    collisions = checkCollision(mousePosition, data)

    /* determine sampling rate */
    const currentMoveTime = Date.now()
    const time = currentMoveTime - previousMoveTime / 1000
    previousMoveTime = currentMoveTime

    const velocity = {
      x: time !== 0 ? mousePosition.x / time : 0,
      y: time !== 0 ? mousePosition.y / time : 0,
    }
    const acceleration = {
      x: time !== 0 ? (velocity.x - prevMouseVelocity.x) / time : 0,
      y: time !== 0 ? (velocity.y - prevMouseVelocity.y) / time : 0,
    }
    const force = {
      x: C.MOUSE.MASS * acceleration.x,
      y: C.MOUSE.MASS * acceleration.y,
    }

    sampleTime = time
    forceVector = force
    prevMouseVelocity = { x: velocity.x, y: velocity.y }

    clearTimeout(movementTimer)
    movementTimer = setTimeout(() => {
      reset()
    }, C.MOUSE.TIMEOUT)
  })

  const reset = () => {
    mouseMove = false
    movementTimer = null
    previousMoveTime = 0
    prevMouseVelocity = { x: 0, y: 0 }
    sampleTime = 0
    forceVector = { x: 0, y: 0 }
    collisions = []
  }
}
