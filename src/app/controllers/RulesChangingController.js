const { Rule } = require("../models/Rule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class RulesChangingRouter {
  index(req, res, next) {
    Rule.find({})
      .then((rules) => {
        res.render("rules-changing", {
          rules: multipleMongooseToObject(rules),
        });
      })
      .catch(next);
  }
}

module.exports = new RulesChangingRouter();