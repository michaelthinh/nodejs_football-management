const { Club } = require("../models/Club");

class RegistrationFormController {
  index(req, res) {
    res.render("registration-form");
  }
  store(req, res, next) {
    const formData = { ...req.body };
    const clubs = new Club(formData);

    clubs
      .save()
      .then(() => res.redirect("/home"))
      .catch((error) => {});
  }
}

module.exports = new RegistrationFormController();
