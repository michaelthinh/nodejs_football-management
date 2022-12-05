const express = require("express");
const router = express.Router();

const tournamentReportController = require("../app/controllers/TournamentReportController");

router.use("/sub", tournamentReportController.showPlayer);
router.use("/", tournamentReportController.showClub);

module.exports = router;
