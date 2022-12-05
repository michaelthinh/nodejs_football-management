const { Player } = require("../models/Player");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class RulesChangingRouter {
  index(req, res) {
    res.render("rules-changing");
  }
}

module.exports = new RulesChangingRouter();
