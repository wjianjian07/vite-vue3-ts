let url = "http://172.16.168.10:8081";

module.exports = {
  proxy: {
    "/api": {
      target: url,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  },
};
