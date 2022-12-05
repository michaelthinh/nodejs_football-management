const express = require("express");
const router = express.Router();

const tournamentReportController = require("../app/controllers/TournamentReportController");

router.use("/", tournamentReportController.index);

module.exports = router;
