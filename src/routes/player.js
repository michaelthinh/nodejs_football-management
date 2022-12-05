const express = require("express");
const router = express.Router();

const playerController = require("../app/controllers/PlayerController");

router.get("/:id/edit", playerController.edit);
router.put("/:id", playerController.update);

module.exports = router;
