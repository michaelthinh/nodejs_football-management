const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { ClubScore } = require("../models/ClubScore");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
class SiteController {
  index(req, res, next) {
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

    const test = await ClubScore.deleteOne({ slug: clubId });
    Club.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/home"))
      .catch(next);
  }
}

module.exports = new SiteController();
