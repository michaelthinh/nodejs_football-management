const express = require("express");
const router = express.Router();

const searchingForPlayerController = require("../app/controllers/SearchingForPlayerController");

router.get("/search", searchingForPlayerController.search);
router.use("/", searchingForPlayerController.index);

module.exports = router;
