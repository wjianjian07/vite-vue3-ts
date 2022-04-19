let url = "http://xxxxxxxxxxxx"

module.exports = {
  proxy: {
    "/api": {
      target: url,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    },
  },
}