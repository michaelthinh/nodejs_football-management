const { Player } = require("../models/Player");

class SearchingForPlayerController {
  index(req, res) {
    res.render("searching-for-player");
  }
}

module.exports = new SearchingForPlayerController();
