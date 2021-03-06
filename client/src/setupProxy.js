const { createProxyMiddleware } =  require('http-proxy-middleware');
//import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware';

module.exports = function(app) {
  app.use("/auth/google", createProxyMiddleware({ target: "http://localhost:5001",changeOrigin: false }));
  app.use("/auth/slack", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: false }));
  app.use("/login", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: false }));
  //app.use(proxy("/register", { target: "http://127.0.0.1:5000" }));
  app.use("/api/**", createProxyMiddleware({ target: "http://localhost:5001",changeOrigin: false}));
  app.use("/reports/", createProxyMiddleware({ target: "http://localhost:5001",changeOrigin: false}));
  //app.use(proxy("/api/users/", {target: "http://127.0.0.1:5001"}))
};
