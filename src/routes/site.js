const express = require("express");
const router = express.Router();

const siteController = require("../app/controllers/SiteController");

router.get("/:id/edit", siteController.edit);
router.delete("/:id/force", siteController.destroy);
router.use("/", siteController.index);

module.exports = router;
