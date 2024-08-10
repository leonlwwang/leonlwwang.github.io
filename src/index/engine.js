import { vec2 } from 'gl-matrix'
import { drawScene } from './stippler'
import { getNDCMousePosition } from './util/ndc'

export const loadPhysicsEngine = (gl, canvas, data) => {
  let mouseVelocity = vec2.fromValues(0, 0)
  let velocities = new Array(data.length / 2)
  for (let i = 0; i < data.length / 2; i++) {
    velocities[i] = vec2.fromValues(0, 0)
  }

  const animate = () => {
    requestAnimationFrame(animate)

    // if collisions not empty,
    // calculate collision effects based on
    // the current velocities and mouse velocity

    // then update velocities and render
    // the new vertex locations by updating
    // the data, reloading buffer and redrawing scene
    // position.x = velocity.x * time (in frames)
  }

  canvas.addEventListener('mousemove', (event) => {
    const mousePosition = getNDCMousePosition(event, canvas)
    const collisions = isMouseOverStippling(mousePosition, data)
    console.log(collisions)

    // track when mouse starts moving and time it
    // set an upper limit or how much energy can be
    // accumulated for the mouse velocity vector
  })
}

const isMouseOverStippling = (mouse, vertices) => {
  const epsilon = 1e-2
  const collisions = []
  for (let i = 0; i < vertices.length; i += 2) {
    const dx = mouse.x - vertices[i]
    const dy = mouse.y - vertices[i + 1]
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= epsilon) {
      collisions.push(i)
    }
  }
  return collisions
}
