import { C } from "./constants"

const checkCollision = (mouse, vertices) => {
  const collisions = []
  for (let i = 0; i < vertices.length; i += 2) {
    const dx = mouse.x - vertices[i]
    const dy = mouse.y - vertices[i + 1]
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance <= C.MOUSE.RANGE) {
      collisions.push(i)
    }
  }
  return collisions
}

const calcDisplacement = (force, time) => {
  const magnitude = Math.sqrt(force.x * force.x + force.y * force.y)
  const totalDisplacement = (magnitude * (time * time)) / (2 * C.DOT.MASS)
  const displacement = {
    x: totalDisplacement * (force.x / magnitude),
    y: totalDisplacement * (force.y / magnitude),
  }
  return displacement
}

export { checkCollision, calcDisplacement }
