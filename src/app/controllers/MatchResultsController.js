const { Score } = require("../models/Score");
const { Player } = require("../models/Player");
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
  async show(req, res, next) {
    const score = await Score.find({ slugMatch: req.params.id });
    Schedule.findById(req.params.id).then((match) => {
      res.render("match-results/show", {
        match: MongooseToObject(match),
        score: multipleMongooseToObject(score),
      });
    });
  }
  update(req, res, next) {
    if (req.body.firstScore > req.body.secondScore) {
      req.body.teamWin = req.body.slugFirst;
      req.body.teamLose = req.body.slugSecond;
    }
    if (req.body.firstScore < req.body.secondScore) {
      req.body.teamWin = req.body.slugSecond;
      req.body.teamLose = req.body.slugFirst;
    }
    Schedule.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.redirect("/match-results");
      })
      .catch(next);
  }
  async store(req, res, next) {
    const formData = req.body;
    const idPlayer = formData.slugPlayer;
    const match = await Schedule.findOne({ _id: req.params.id });
    const score = await Score.find({ slugMatch: req.params.id });
    let err = true;
    let banthang;
    const playerFound = await Player.findOne({ slugId: idPlayer });
    if (playerFound === null) {
      res.render("match-results/show", {
        err,
        match: MongooseToObject(match),
        score: multipleMongooseToObject(score),
      });
    } else {
      banthang = playerFound.goals + 1;
      const updatePlayer = await Player.findOneAndUpdate(
        { slugId: idPlayer },
        {
          $set: {
            goals: banthang,
          },
        }
      );
      const updateScore = new Score(formData);
      updateScore.save();
      res.redirect("/match-results/" + req.params.id + "/show");
    }
  }
}

module.exports = new MatchResults();
