const express = require("express");
const router = express.Router();

const setUpScheduleController = require("../app/controllers/SetUpScheduleController");

router.get("/create", setUpScheduleController.create);
router.post("/store", setUpScheduleController.store);
router.delete("/:id/force", setUpScheduleController.destroy);
router.use("/", setUpScheduleController.index);

module.exports = router;
