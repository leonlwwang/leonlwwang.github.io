import { FRICTION, MOUSE_RANGE } from "./constants"

const mouseCollisions = (mouse, vertices) => {
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

const hitsWall = (v) => { return v <= -1 || v >= 1 }
const friction = (v) => { return v *= (1 - FRICTION) }

export { mouseCollisions, hitsWall, friction }
