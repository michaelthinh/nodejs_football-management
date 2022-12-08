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
  async update(req, res, next) {
    let err;
    if (req.params.id === "rule-1") {
      if (
        req.body.maxAge < 0 ||
        req.body.minAge < 0 ||
        req.body.minPlayer < 0 ||
        req.body.maxPlayer < 0 ||
        req.body.maxForeigner < 0 ||
        req.body.maxAge < req.body.minAge ||
        req.body.maxPlayer < req.body.minPlayer
      ) {
        err = true;
        const rule = await Rule.findOne({ slug: req.params.id });
        res.render("rule/" + req.params.id, {
          err: err,
          rule: MongooseToObject(rule),
        });
      } else {
        Rule.updateOne({ slug: req.params.id }, req.body)
          .then(() => {
            res.redirect("/rules-changing");
          })
          .catch(next);
      }
    } else if (req.params.id === "rule-3") {
      if (req.body.maxScoreTime < 0) {
        err = true;
        const rule = await Rule.findOne({ slug: req.params.id });
        res.render("rule/" + req.params.id, {
          err: err,
          rule: MongooseToObject(rule),
        });
      } else {
        Rule.updateOne({ slug: req.params.id }, req.body)
          .then(() => {
            res.redirect("/rules-changing");
          })
          .catch(next);
      }
    } else if (req.params.id === "rule-5") {
      if (
        req.body.winScore < 0 ||
        req.body.loseScore < 0 ||
        req.body.tieScore < 0 ||
        req.body.winScore <= req.body.loseScore ||
        req.body.winScore <= req.body.tieScore ||
        req.body.tieScore <= req.body.loseScore
      ) {
        err = true;
        const rule = await Rule.findOne({ slug: req.params.id });
        res.render("rule/" + req.params.id, {
          err: err,
          rule: MongooseToObject(rule),
        });
      } else {
        Rule.updateOne({ slug: req.params.id }, req.body)
          .then(() => {
            res.redirect("/rules-changing");
          })
          .catch(next);
      }
    }
  }
}

module.exports = new RulesChangingRouter();
