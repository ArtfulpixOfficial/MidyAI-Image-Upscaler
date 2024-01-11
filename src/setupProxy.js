const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/proxy-image",
    createProxyMiddleware({
      target: "https://storage.googleapis.com",
      changeOrigin: true,
      pathRewrite: {
        "^/proxy-image": "", // Remove the /proxy-image prefix when forwarding the request
      },
    })
  );
};
