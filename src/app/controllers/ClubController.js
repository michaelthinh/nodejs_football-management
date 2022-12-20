const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { Rule } = require("../models/Rule");
const { ClubScore } = require("../models/ClubScore");
const { Score } = require("../models/Score");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");

class ClubController {
  async index(req, res, next) {
    const players = await Player.find({ slugTeam: req.params.id });
    const club = await Club.findOne({ slug: req.params.id });
    const ruleOne = await Rule.findOne({ slug: "rule-1" });
    const maxPlayer = ruleOne.maxPlayer;
    const minPlayer = ruleOne.minPlayer;
    const numberPlayers = players.length;
    if (numberPlayers >= minPlayer && numberPlayers <= maxPlayer) {
      club.qualified = true;
    } else {
      club.qualified = false;
    }
    const updateClubScore = await ClubScore.findOneAndUpdate(
      { slug: club.slug },
      {
        $set: {
          qualified: club.qualified,
        },
      }
    );
    Club.updateOne({ slug: req.params.id }, club)
      .then(() => {
        res.render("club/show", {
          players: multipleMongooseToObject(players),
          club: MongooseToObject(club),
          numberPlayers,
        });
      })
      .catch(next);
  }
  addPlayer(req, res, next) {
    let clubId = req.params.id;
    res.render("player/create", { clubId });
  }
  async store(req, res, next) {
    const formData = { ...req.body };
    const player = new Player(formData);
    const clubFound = await Club.findOne({ slug: formData.slugTeam });
    const ruleFound = await Rule.findOne({ slug: "rule-1" });
    let maxForeigner = ruleFound.maxForeigner;
    let clubForeigner = clubFound.numberForeinger;
    let err;
    let error;
    const clubId = player.slugTeam;
    if (formData.age < ruleFound.minAge || formData.age > ruleFound.maxAge) {
      err = true;
      res.render("player/create", { err: err, clubId: clubId });
    } else {
      if (maxForeigner === clubForeigner && req.body.typePlayer === "Ngoại") {
        error = true;
        res.render("player/create", { error: error, clubId: clubId });
      } else {
        const clubId = player.slugTeam;
        if (formData.typePlayer === "Ngoại") {
          const updateClub = await Club.findOneAndUpdate(
            { slug: formData.slugTeam },
            {
              $set: {
                numberForeinger: clubFound.numberForeinger + 1,
              },
            }
          );
        }
        player
          .save()
          .then(() => res.redirect("/club/" + player.slugTeam))
          .catch((next) => {
            err = true;
            res.render("player/create", { err: err, clubId: clubId });
          });
      }
    }
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
    const clubFound = await Club.findOne({ slug: player.slugTeam });
    if (player.typePlayer === "Ngoại") {
      const updateClub = await Club.findOneAndUpdate(
        { slug: player.slugTeam },
        {
          $set: {
            numberForeinger: clubFound.numberForeinger - 1,
          },
        }
      );
    }
    const deletePlayerScore = await Score.deleteMany({
      slugPlayer: player.slugId,
    });
    const clubId = player.slugTeam;
    Player.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("/club/" + clubId))
      .catch(next);
  }
}

module.exports = new ClubController();
