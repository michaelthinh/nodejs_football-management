const express = require("express");
const router = express.Router();

const ruleController = require("../app/controllers/RuleController");

router.get("/:id", ruleController.index);

module.exports = router;
