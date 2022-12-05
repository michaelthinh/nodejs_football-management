const express = require("express");
const router = express.Router();

const matchResultsController = require("../app/controllers/MatchResultsController");

router.use("/:id/show", matchResultsController.show);
router.put("/:id", matchResultsController.update);
router.use("/", matchResultsController.index);

module.exports = router;
