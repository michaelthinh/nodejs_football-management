const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class TournamentReport {
  showClub(req, res) {
    res.render("tournament-report");
  }
  showPlayer(req, res) {
    res.render("tournament-report-sub");
  }
}

module.exports = new TournamentReport();
