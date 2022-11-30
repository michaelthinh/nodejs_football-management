const express = require("express");
const router = express.Router();

const loginController = require("../app/controllers/LoginController");

router.post("/check", loginController.check);
router.use("/", loginController.index);

module.exports = router;
