const express = require("express");
const router = express.Router();

const clubController = require("../app/controllers/ClubController");

router.use("/:id", clubController.index);

module.exports = router;
