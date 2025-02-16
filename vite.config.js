export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  build: {
    minify: false, // Disables minification
    sourcemap: true, // Enables source maps
  },
}
