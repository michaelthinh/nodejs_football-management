const { User } = require("../models/User");
const { MongooseToObject } = require("../../util/mongoose");

class LoginController {
  index(req, res) {
    res.render("log-in");
  }
  check(req, res, next) {
    User.findOne({ username: req.body.username })
      .then((user) => {
        user = MongooseToObject(user);
        if (user === null) {
          res.redirect("/log-in");
        } else {
          if (user.password === req.body.password) {
            res.redirect("/home");
          } else {
            res.redirect("/log-in");
          }
        }
      })
      .catch(next);
  }
}

module.exports = new LoginController();
