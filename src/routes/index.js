const siteRouter = require("./site");
const loginRouter = require("./login");
const registrationFormRouter = require("./registration-form");
const searchingForPlayerRouter = require("./searching-for-player");
const clubRouter = require("./club");
const playerRouter = require("./player");
function route(app) {
  app.use("/home", siteRouter);
  app.use("/registration-form", registrationFormRouter);
  app.use("/searching-for-player", searchingForPlayerRouter);
  app.use("/player", playerRouter);
  app.use("/club", clubRouter);
  app.use("/log-in", loginRouter);
}

module.exports = route;
