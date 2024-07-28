import { inflate } from 'pako'

export const render = async (canvas) => {
  const path = '/src/assets/stippling.bin'
  const rawBuffer = await load(path)
  if (!rawBuffer) {
    console.error('Failed to load buffer')
    return
  }
  const buffer = inflate(rawBuffer)
  console.log(`Buffer loaded ${buffer.byteLength} bytes`)

  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported')
    return
  }
  console.log('WebGL context loaded')

  gl.clearColor(1.0, 0.933, 0.875, 1.0)

  gl.clear(gl.COLOR_BUFFER_BIT)
}

const load = async (path) => {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`)
    }
    console.log(`${response.status} ${response.statusText} ${response.headers.get('Content-Type')}`)
    if (!response.headers.get('Content-Type')?.includes('application/octet-stream')) {
      throw new Error(`Unexpected content type: ${response.headers.get('Content-Type')}`)
    }
    return await response.arrayBuffer()
  } catch (error) {
    console.error(`Failed to fetch ${path}: ${error.message}`)
    return null
  }
}
