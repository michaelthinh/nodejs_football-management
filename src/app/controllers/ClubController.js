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
  addPlayer(req, res, next) {
    let clubId = req.params.id;
    res.render("player/create", { clubId });
  }
  store(req, res, next) {
    const formData = { ...req.body };
    const player = new Player(formData);
    console.log(formData);
    player
      .save()
      .then(() => res.redirect("/home"))
      .catch((error) => {});
  }
  updateClub(req, res, next) {
    Club.updateOne({ slug: req.params.id }, req.body)
      .then(() => res.redirect("/home"))
      .catch(next);
  }
  editClub(req, res, next) {
    Club.findOne({ slug: req.params.id })
      .then((club) => {
        res.render("club/edit", {
          club: MongooseToObject(club),
        });
      })
      .catch(next);
  }
  async destroy(req, res, next) {
    const player = await Player.findOne({ _id: req.params.id });
    const clubId = player.slugTeam;
    Player.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/club/" + clubId))
      .catch(next);
  }
}

module.exports = new ClubController();
