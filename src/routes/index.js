const siteRouter = require("./site");
const loginRouter = require("./login");
function route(app) {
  app.use("/home", siteRouter);
  app.use("/log-in", loginRouter);
}

module.exports = route;
