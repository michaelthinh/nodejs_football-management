const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.use("/registration-form", siteController.registrationForm);
router.use("/set-up-schedule", siteController.setUpSchedule);
router.use("/match-results", siteController.matchResults);
router.use("/searching-for-player", siteController.searchingForPlayer);
router.use("/tournament-report", siteController.tournamentReport);
router.use("/rules-changing", siteController.rulesChanging);
router.use("/", siteController.index);

module.exports = router;
