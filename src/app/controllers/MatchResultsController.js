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
        console.log(req.params.id);
        res.redirect("/match-results");
      })
      .catch(next);
  }
  async store(req, res, next) {
    const formData = req.body;
    const idPlayer = formData.slugPlayer;
    console.log(idPlayer);
    let banthang = 0;
    const player = await Player.findOne({ slugId: idPlayer }).then((player) => {
      banthang = player.goals;
    });
    banthang = banthang + 1;
    const updatePlayer = await Player.findOneAndUpdate(
      { slugId: idPlayer },
      {
        $set: {
          goals: banthang,
        },
      }
    );
    console.log(updatePlayer);
    const score = new Score(formData);
    score
      .save()
      .then(() => res.redirect("/match-results"))
      .catch(next);
  }
}

module.exports = new MatchResults();
