const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { ClubScore } = require("../models/ClubScore");
const { Schedule } = require("../models/Schedule");
const { Rule } = require("../models/Rule");
const results = require("./MatchResultsController");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class TournamentReport {
  async showClub(req, res, next) {
    let clubs = await Club.find({ qualified: true });
    const ruleFive = await Rule.findOne({ slug: "rule-5" });
    const winScore = ruleFive.winScore;
    const loseScore = ruleFive.loseScore;
    const tieScore = ruleFive.tieScore;
    for (let i = 0; i < clubs.length; i++) {
      let numberWins = await Schedule.find({ teamWin: clubs[i].slug });
      let numberLoses = await Schedule.find({ teamLose: clubs[i].slug });
      let numberMatches = await Schedule.find({
        $or: [{ slugFirst: clubs[i].slug }, { slugSecond: clubs[i].slug }],
      });
      let numberTies =
        numberMatches.length - numberWins.length - numberLoses.length;
      let totalPoints =
        numberWins.length * winScore +
        numberLoses.length * loseScore +
        numberTies * tieScore;
      let updateClubScore = await ClubScore.findOneAndUpdate(
        { slug: clubs[i].slug },
        {
          $set: {
            wins: numberWins.length,
            loses: numberLoses.length,
            ties: numberTies,
            points: totalPoints,
          },
        }
      );
    }
    const clubHehe = await ClubScore.find({ qualified: true })
      .then((clubScoreboard) => {
        res.render("tournament-report", {
          clubScoreboard: multipleMongooseToObject(clubScoreboard),
        });
      })
      .catch(next);
  }
  async showPlayer(req, res) {
    let players = await Player.find({});
    res.render("tournament-report-sub", {
      players: multipleMongooseToObject(players),
    });
  }
}

module.exports = new TournamentReport();
