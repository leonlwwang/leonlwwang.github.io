import { drawScene } from './stippler'
import { initBuffer } from './util/gl-setup'
import { getNDCMousePosition } from './util/ndc'
import { DOT_MASS, MOUSE_MASS, MOUSE_RANGE, MOUSE_TIMEOUT } from './util/constants'

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
      const displacement = calculateDisplacement(forceVector, sampleTime)
      // console.log(displacement.x, displacement.y)
      for (let i = 0; i < collisions.length; i++) {
        const xIndex = collisions[i]
        const yIndex = collisions[i] + 1
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
      initialMoveTime = Date.now()
      previousMoveTime = Date.now()
    }

    const mousePosition = getNDCMousePosition(event, canvas)
    collisions = isMouseOverStippling(mousePosition, data)
    // console.log(collisions)

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
      x: MOUSE_MASS * acceleration.x,
      y: MOUSE_MASS * acceleration.y,
    }

    sampleTime = time
    forceVector = force
    prevMouseVelocity = { x: velocity.x, y: velocity.y }

    clearTimeout(movementTimer)
    movementTimer = setTimeout(() => {
      reset()
    }, MOUSE_TIMEOUT)
  })

  const reset = () => {
    mouseMove = false
    movementTimer = null
    initialMoveTime = 0
    previousMoveTime = 0
    prevMouseVelocity = { x: 0, y: 0 }
    sampleTime = 0
    forceVector = { x: 0, y: 0 }
  }
}

const calculateDisplacement = (force, time) => {
  const magnitude = Math.sqrt(force.x * force.x + force.y * force.y)
  const totalDisplacement = (magnitude * (time * time)) / (2 * DOT_MASS)
  const displacement = {
    x: totalDisplacement * (force.x / magnitude),
    y: totalDisplacement * (force.y / magnitude),
  }
  return displacement
}

const isMouseOverStippling = (mouse, vertices) => {
  const collisions = []
  for (let i = 0; i < vertices.length; i += 2) {
    const dx = mouse.x - vertices[i]
    const dy = mouse.y - vertices[i + 1]
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= MOUSE_RANGE) {
      collisions.push(i)
    }
  }
  return collisions
}
