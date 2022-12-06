const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { Schedule } = require("../models/Schedule");
const results = require("./MatchResultsController");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class TournamentReport {
  async showClub(req, res, next) {
    let wins = [];

    let clubs = await Club.find({ qualified: "true" });
    for (let i = 0; i < clubs.length; i++) {
      let numberWins = await Schedule.find({ teamWin: clubs[i].slug });
      wins.push(numberWins.length);
    }

    res.render("tournament-report", {
      clubs: multipleMongooseToObject(clubs),
      wins,
    });
  }
  showPlayer(req, res) {
    res.render("tournament-report-sub");
  }
}

module.exports = new TournamentReport();
