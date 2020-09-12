const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://127.0.0.1:5001" }));
  app.use(proxy("/auth/slack", { target: "http://127.0.0.1:5001" }));
  app.use(proxy("/login", { target: "http://127.0.0.1:5001" }));
  //app.use(proxy("/register", { target: "http://127.0.0.1:5000" }));
  app.use(proxy("/api/**", { target: "http://127.0.0.1:5001" }));
};
