const { Rule } = require("../models/Rule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class RulesChangingRouter {
  index(req, res, next) {
    const dieuhuong = req.params.id;
    Rule.findOne({ slug: dieuhuong })
      .then((rule) => {
        res.render("rule/" + dieuhuong, {
          rule: MongooseToObject(rule),
        });
      })
      .catch(next);
  }
}

module.exports = new RulesChangingRouter();
