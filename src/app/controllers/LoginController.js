const { User } = require("../models/User");
const { MongooseToObject } = require("../../util/mongoose");

class LoginController {
  index(req, res) {
    res.render("log-in");
  }
  check(req, res, next) {
    const userData = [
      {
        username: "cat",
        password: "123",
      },
    ];
    const nguoidung = new User(userData);
    nguoidung
      .save()
      .then(() => res.redirect("/home"))
      .catch((error) => {});
  }
}

// Course.findOne({ slug: req.params.slug })
// .then((course) => {
//   res.render("courses/show", { course: MongooseToObject(course) });
// })
// .catch(next);

module.exports = new LoginController();
