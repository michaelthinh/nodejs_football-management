const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
class ClubController {
  async index(req, res, next) {
    const players = await Player.find({ slugTeam: req.params.id });
    const club = await Club.findOne({ slug: req.params.id });
    const numberPlayers = players.length;
    res.render("club/show", {
      players: multipleMongooseToObject(players),
      club: MongooseToObject(club),
      numberPlayers,
    });
  }
  update(req, res, next) {
    Club.updateOne({ slug: req.params.id }, req.body)
      .then(() => res.redirect("/home"))
      .catch(next);
  }
  edit(req, res, next) {
    Club.findOne({ slug: req.params.id })
      .then((club) => {
        res.render("club/edit", {
          club: MongooseToObject(club),
        });
      })
      .catch(next);
  }
}

module.exports = new ClubController();
