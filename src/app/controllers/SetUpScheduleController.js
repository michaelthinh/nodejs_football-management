const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Schedule } = require("../models/Schedule");
class SetUpSchedule {
  index(req, res, next) {
    Schedule.find({})
      .then((schedule) => {
        res.render("set-up-schedule", {
          schedule: multipleMongooseToObject(schedule),
        });
      })
      .catch(next);
  }
  store(req, res, next) {
    const formData = { ...req.body };
    const schedule = new Schedule(formData);
    console.log(formData);
    schedule
      .save()
      .then(() => res.redirect("/set-up-schedule"))
      .catch((error) => {});
  }
  destroy(req, res, next) {
    Schedule.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/set-up-schedule"))
      .catch(next);
  }
}

module.exports = new SetUpSchedule();
