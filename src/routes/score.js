const express = require("express");
const router = express.Router();

const scoreController = require("../app/controllers/ScoreController");

router.delete("/:id/force", scoreController.destroy);

module.exports = router;
