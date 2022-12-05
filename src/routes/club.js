const express = require("express");
const router = express.Router();

const clubController = require("../app/controllers/ClubController");

router.delete("/:id/force", clubController.destroy);
router.post("/:id/store", clubController.store);
router.use("/:id/add", clubController.addPlayer);
router.use("/:id", clubController.index);

module.exports = router;
