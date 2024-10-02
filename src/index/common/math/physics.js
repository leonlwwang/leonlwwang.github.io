import { FRICTION, VELOCITY_MAX } from '/src/index/common/math/constants'

const hitsWall = (v) => {
  return v <= -1 || v >= 1
}
const friction = (v) => {
  return v * (1 - FRICTION)
}
const limit = (v) => {
  return Math.abs(v) > VELOCITY_MAX ? Math.sign(v) * VELOCITY_MAX : v
}

export { hitsWall, friction, limit }
