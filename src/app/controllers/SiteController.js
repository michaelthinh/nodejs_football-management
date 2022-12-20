const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { Score } = require("../models/Score");
const { ClubScore } = require("../models/ClubScore");
const { Schedule } = require("../models/Schedule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");
class SiteController {
  index(req, res, next) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
    Club.find({})
      .then((clubs) => {
        res.render("home", {
          clubs: multipleMongooseToObject(clubs),
        });
      })
      .catch(next);
  }
  async destroy(req, res, next) {
    const clubFound = await Club.findOne({ _id: req.params.id });
    let clubId = clubFound.slug;

    const deletePlayer = await Player.deleteMany({
      slugTeam: clubId,
    });
    const deleteSchedule = await Schedule.deleteMany({
      $or: [{ slugFirst: clubId }, { slugSecond: clubId }],
    });
    const playerFound = await Player.findOne({ slugTeam: clubId });
    if (playerFound === null) {
      const test = await ClubScore.deleteOne({ slug: clubId });
      Club.deleteOne({ _id: req.params.id })
        .then(() => res.redirect("/home"))
        .catch(next);
    } else {
      const deletePlayerScore = await Score.deleteMany({
        slugPlayer: playerFound.slugId,
      });
      const test = await ClubScore.deleteOne({ slug: clubId });
      Club.deleteOne({ _id: req.params.id })
        .then(() => res.redirect("/home"))
        .catch(next);
    }
  }
  logOut(req, res, next) {
    delete req.session.user;
    res.redirect("/log-in");
  }
}

module.exports = new SiteController();
