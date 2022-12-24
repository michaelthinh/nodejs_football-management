const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { ClubScore } = require("../models/ClubScore");
const { Schedule } = require("../models/Schedule");
const { Rule } = require("../models/Rule");
const results = require("./MatchResultsController");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");
class TournamentReport {
  async showClub(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }

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
    let clubHehe = ClubScore.find({ qualified: "true" });
    if (req.query.hasOwnProperty("_sort")) {
      clubHehe = clubHehe.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([clubHehe]).then(([clubHehe]) =>
      res.render("tournament-report", {
        clubHehe: multipleMongooseToObject(clubHehe),
      })
    );
  }
  showPlayer(req, res) {
    let players = Player.find({});
    if (req.query.hasOwnProperty("_sort")) {
      players = players.sort({
        [req.query.column]: req.query.type,
      });
    }
    Promise.all([players]).then(([players]) =>
      res.render("tournament-report-sub", {
        players: multipleMongooseToObject(players),
      })
    );
  }
}

module.exports = new TournamentReport();
