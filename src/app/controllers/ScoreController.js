const { Score } = require("../models/Score");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Player } = require("../models/Player");
const { Schedule } = require("../models/Schedule");

class ScoreController {
  async destroy(req, res, next) {
    const score = await Score.findOne({ _id: req.params.id });
    const matchId = score.slugMatch;
    const playerFound = await Player.findOne({ slugId: score.slugPlayer });
    let banthang = playerFound.goals - 1;
    const updatePlayer = await Player.findOneAndUpdate(
      { slugId: score.slugPlayer },
      {
        $set: {
          goals: banthang,
        },
      }
    );
    const match = await Schedule.findOne({ _id: matchId });
    if (playerFound.slugTeam === match.slugFirst) {
      let banthang = match.firstScore;
      let updateScore = await Schedule.findOneAndUpdate(
        { _id: matchId },
        {
          $set: {
            firstScore: banthang - 1,
          },
        }
      );
    } else {
      let banthang = match.secondScore;
      let updateScore = await Schedule.findOneAndUpdate(
        { _id: matchId },
        {
          $set: {
            secondScore: banthang - 1,
          },
        }
      );
    }
    Score.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/match-results/" + matchId + "/show"))
      .catch(next);
  }
}

module.exports = new ScoreController();
