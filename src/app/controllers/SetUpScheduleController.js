const { Player } = require("../models/Player");
const { Club } = require("../models/Club");
const { multipleMongooseToObject } = require("../../util/mongoose");
const { MongooseToObject } = require("../../util/mongoose");

class SetUpSchedule {
  index(req, res) {
    res.render("set-up-schedule");
  }
}

module.exports = new SetUpSchedule();
