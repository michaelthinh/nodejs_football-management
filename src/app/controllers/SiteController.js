const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
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
  destroy(req, res, next) {
    Club.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/home"))
      .catch(next);
  }
}

module.exports = new SiteController();
