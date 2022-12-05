const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Schedule } = require("../models/Schedule");
class MatchResults {
  index(req, res, next) {
    Schedule.find({})
      .then((schedule) => {
        res.render("match-results", {
          schedule: multipleMongooseToObject(schedule),
        });
      })
      .catch(next);
  }
  show(req, res, next) {
    Schedule.findById(req.params.id).then((match) => {
      res.render("match-results/show", {
        match: MongooseToObject(match),
      });
    });
  }
  update(req, res, next) {
    Schedule.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        console.log(req.params.id);
        res.redirect("/match-results");
      })
      .catch(next);
  }
}

module.exports = new MatchResults();
