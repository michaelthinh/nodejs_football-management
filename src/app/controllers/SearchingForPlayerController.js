const { Player } = require("../models/Player");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");
class SearchingForPlayerController {
  index(req, res) {
    if (!req.session.user) {
      res.redirect("/log-in");
    }
    res.render("searching-for-player");
  }
  search(req, res, next) {
    Player.find({ name: req.query.name })
      .then((player) => {
        player = multipleMongooseToObject(player);

        if (player === null) {
          res.redirect("/home");
        } else {
          res.render("player/show", { player });
        }
      })
      .catch(next);
  }
}

module.exports = new SearchingForPlayerController();
