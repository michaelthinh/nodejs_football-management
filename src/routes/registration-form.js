const express = require("express");
const router = express.Router();

const registrationFormController = require("../app/controllers/RegistrationFormController");

router.post("/store", registrationFormController.store);
router.use("/", registrationFormController.index);

module.exports = router;
