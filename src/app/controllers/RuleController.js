const { Rule } = require("../models/Rule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { Club } = require("../models/Club");
const { Score } = require("../models/Score");
const session = require("express-session");
class RulesChangingRouter {
  index(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
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
        console.log(req.body.maxForeigner);
        let teamFoundOne = await Club.updateMany(
          { numberForeinger: { $gt: req.body.maxForeigner } },
          {
            $set: {
              qualified: false,
            },
          }
        );
        let teamFoundTwo = await Club.updateMany(
          {
            $and: [
              { numberForeinger: { $gt: 0 } },
              { numberForeinger: { $lte: req.body.maxForeigner } },
            ],
          },
          {
            $set: {
              qualified: true,
            },
          }
        );
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
        const playerFixed = await Score.deleteMany({
          scoreMinute: { $gt: req.body.maxScoreTime },
        });
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
