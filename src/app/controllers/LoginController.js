const { User } = require("../models/User");
const { MongooseToObject } = require("../../util/mongoose");
const session = require("express-session");

class LoginController {
  index(req, res) {
    res.render("log-in");
  }
  async check(req, res, next) {
    let err;
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      err = true;
      res.render("log-in", { err: err });
    } else {
      if (req.body.password === user.password) {
        req.session.user = user.username;
        req.session.isLoggedIn = true;
        res.redirect("/home");
      } else {
        err = true;
        res.render("log-in", { err: err });
      }
    }
  }
}

module.exports = new LoginController();
