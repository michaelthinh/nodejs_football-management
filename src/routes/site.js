const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.delete("/:id/force", siteController.destroy);
router.use("/", siteController.index);

module.exports = router;
