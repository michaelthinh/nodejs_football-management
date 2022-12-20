const { Score } = require("../models/Score");
const { Player } = require("../models/Player");
const { Schedule } = require("../models/Schedule");
const { Rule } = require("../models/Rule");
const session = require("express-session");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class MatchResults {
  index(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
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
    const scoreMinute = formData.scoreMinute;
    const rule = await Rule.findOne({ slug: "rule-3" });
    const match = await Schedule.findOne({ _id: req.params.id });
    const score = await Score.find({ slugMatch: req.params.id });
    let err = true;
    let banthang;
    const playerFound = await Player.findOne({ slugId: idPlayer });
    if (
      playerFound === null ||
      scoreMinute > rule.maxScoreTime ||
      scoreMinute < 0
    ) {
      res.render("match-results/show", {
        err,
        match: MongooseToObject(match),
        score: multipleMongooseToObject(score),
      });
    } else {
      banthang = playerFound.goals + 1;
      const clubFound = await Schedule.findOne({
        $or: [
          { slugFirst: playerFound.slugTeam },
          { slugSecond: playerFound.slugTeam },
        ],
      });
      if (clubFound === null) {
        res.render("match-results/show", {
          err,
          match: MongooseToObject(match),
          score: multipleMongooseToObject(score),
        });
      } else {
        const updatePlayer = await Player.findOneAndUpdate(
          { slugId: idPlayer },
          {
            $set: {
              goals: banthang,
            },
          }
        );
        let clubGoal = await Schedule.findOne({
          $and: [{ _id: match.id }, { slugFirst: playerFound.slugTeam }],
        });
        if (clubGoal === null) {
          clubGoal = await Schedule.findOne({
            $and: [{ _id: match.id }, { slugSecond: playerFound.slugTeam }],
          });
          let banthang = clubGoal.secondScore;
          let temp = await Schedule.findOneAndUpdate(
            { slugSecond: playerFound.slugTeam },
            {
              $set: {
                secondScore: banthang + 1,
              },
            }
          );
        } else {
          let banthang = clubGoal.firstScore;
          let temp = await Schedule.findOneAndUpdate(
            { slugFirst: playerFound.slugTeam },
            {
              $set: {
                firstScore: banthang + 1,
              },
            }
          );
        }
        const updateScore = new Score(formData);
        updateScore.save();
        res.redirect("/match-results/" + req.params.id + "/show");
      }
    }
  }
}

module.exports = new MatchResults();
