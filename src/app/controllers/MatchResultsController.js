const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class MatchResults {
  index(req, res) {
    res.render("match-results");
  }
}

module.exports = new MatchResults();
