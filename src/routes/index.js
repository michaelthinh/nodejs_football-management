const siteRouter = require("./site");
const loginRouter = require("./login");
const registrationFormRouter = require("./registration-form");
const searchingForPlayerRouter = require("./searching-for-player");
const rulesChangingRouter = require("./rules-changing");
const tournamentReportRouter = require("./tournament-report");
const matchResultsRouter = require("./match-results");
const setUpScheduleRouter = require("./set-up-schedule");
const clubRouter = require("./club");
const ruleRouter = require("./rule");
const playerRouter = require("./player");
const scoreRouter = require("./score");
function route(app) {
  app.use("/home", siteRouter);
  app.use("/registration-form", registrationFormRouter);
  app.use("/searching-for-player", searchingForPlayerRouter);
  app.use("/tournament-report", tournamentReportRouter);
  app.use("/match-results", matchResultsRouter);
  app.use("/set-up-schedule", setUpScheduleRouter);
  app.use("/player", playerRouter);
  app.use("/score", scoreRouter);
  app.use("/club", clubRouter);
  app.use("/rules-changing", rulesChangingRouter);
  app.use("/rule", ruleRouter);
  app.use("/log-in", loginRouter);
}

module.exports = route;
