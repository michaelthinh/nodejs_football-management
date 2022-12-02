const express = require("express");
const router = express.Router();

const searchingForPlayerController = require("../app/controllers/SearchingForPlayerController");

router.use("/", searchingForPlayerController.index);

module.exports = router;
