const { Rule } = require("../models/Rule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");
class RulesChangingRouter {
  index(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
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
