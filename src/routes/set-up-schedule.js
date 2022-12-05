const express = require("express");
const router = express.Router();

const setUpScheduleController = require("../app/controllers/SetUpScheduleController");

router.use("/", setUpScheduleController.index);

module.exports = router;
