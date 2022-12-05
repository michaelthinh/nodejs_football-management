const express = require("express");
const router = express.Router();

const matchResultsController = require("../app/controllers/MatchResultsController");

router.use("/", matchResultsController.index);

module.exports = router;
