const express = require("express");
const router = express.Router();

const rulesChangingController = require("../app/controllers/RulesChangingController");

router.use("/", rulesChangingController.index);

module.exports = router;
