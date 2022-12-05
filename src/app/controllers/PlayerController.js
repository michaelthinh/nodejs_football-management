const { Club } = require("../models/Club");
const { Player } = require("../models/Player");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

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
    const clubId = player.slugTeam;
    Player.updateOne({ slugId: req.params.id }, req.body)
      .then(() => res.redirect("/club/" + clubId))
      .catch(next);
  }
}

module.exports = new PlayerController();
