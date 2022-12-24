const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Club } = require("../models/Club");
const { Schedule } = require("../models/Schedule");
const { Score } = require("../models/Score");
const { Player } = require("../models/Player");
const session = require("express-session");
class SetUpSchedule {
  index(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
    Schedule.find({})
      .then((schedule) => {
        res.render("set-up-schedule", {
          schedule: multipleMongooseToObject(schedule),
        });
      })
      .catch(next);
  }
  async store(req, res, next) {
    let err;
    const formData = req.body;
    const clubOneFound = await Club.findOne({ slug: formData.slugFirst });
    const clubTwoFound = await Club.findOne({ slug: formData.slugSecond });
    if (clubOneFound === null || clubTwoFound === null) {
      err = true;
      res.render("match-results/create", { err: err });
    } else {
      const schedule = new Schedule(formData);
      schedule
        .save()
        .then(() => res.redirect("/set-up-schedule"))
        .catch(next);
    }
  }
  create(req, res, next) {
    res.render("match-results/create");
  }
  async destroy(req, res, next) {
    Schedule.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/set-up-schedule"))
      .catch(next);
  }
}

module.exports = new SetUpSchedule();
