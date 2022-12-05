const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class TournamentReport {
  index(req, res) {
    res.render("tournament-report");
  }
}

module.exports = new TournamentReport();
