const { Score } = require("../models/Score");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Player } = require("../models/Player");

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
    Score.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/match-results/" + matchId + "/show"))
      .catch(next);
  }
}

module.exports = new ScoreController();
