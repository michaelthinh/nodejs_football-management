const { TRUE } = require("node-sass");
const { Club } = require("../models/Club");
const { ClubScore } = require("../models/ClubScore");
class RegistrationFormController {
  index(req, res) {
    res.render("registration-form");
  }
  async store(req, res, next) {
    const formData = { ...req.body };
    let newClubScore = {
      name: formData.clubName,
      wins: 0,
      loses: 0,
      ties: 0,
      points: 0,
    };
    const clubscore = new ClubScore(newClubScore);
    let err;
    clubscore.save().catch((next) => {
      err = TRUE;
      res.render("registration-form", { err: err });
    });
    const clubs = new Club(formData);
    clubs
      .save()
      .then(() => res.redirect("/home"))
      .catch((next) => {
        err = TRUE;
        res.render("registration-form", { err: err });
      });
  }
}

module.exports = new RegistrationFormController();
