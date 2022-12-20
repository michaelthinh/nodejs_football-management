const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { Rule } = require("../models/Rule");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");
const { updateClub } = require("./ClubController");
const session = require("express-session");
class PlayerController {
  index(req, res, next) {
    res.render("player/edit");
  }
  edit(req, res, next) {
    Player.findOne({ slugId: req.params.id })
      .then((player) => {
        res.render("player/edit", {
          player: MongooseToObject(player),
        });
      })
      .catch(next);
  }
  async update(req, res, next) {
    const player = await Player.findOne({ slugId: req.params.id });
    const clubFound = await Club.findOne({ slug: player.slugTeam });
    const clubId = player.slugTeam;
    let clubForeigner = clubFound.numberForeinger;
    if (req.body.typePlayer === "Nội" && player.typePlayer === "Ngoại") {
      const updateClub = await Club.findOneAndUpdate(
        { slug: player.slugTeam },
        {
          $set: {
            numberForeinger: clubForeigner - 1,
          },
        }
      );
    }
    if (req.body.typePlayer === "Ngoại" && player.typePlayer === "Nội") {
      const updateClub = await Club.findOneAndUpdate(
        { slug: player.slugTeam },
        {
          $set: {
            numberForeinger: clubForeigner + 1,
          },
        }
      );
    }
    const ruleFound = await Rule.findOne({ slug: "rule-1" });

    if (clubForeigner === ruleFound.maxForeigner) {
      const upClub = await Club.findOneAndUpdate(
        { slug: player.slugTeam },
        {
          $set: {
            qualified: false,
          },
        }
      );
    } else if (clubForeigner === ruleFound.maxForeigner + 1) {
      const upClub = await Club.findOneAndUpdate(
        { slug: player.slugTeam },
        {
          $set: {
            qualified: true,
          },
        }
      );
    }

    const updatePlayerTwo = await Player.updateOne(
      { slugId: req.params.id },
      req.body
    )
      .then(() => res.redirect("/club/" + clubId))
      .catch(next);
  }
}

module.exports = new PlayerController();
