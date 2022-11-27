class SiteController {
  // [GET]-/
  index(req, res) {
    res.render("log-in");
  }
  // [GET]-/search
  home(req, res) {
    res.render("home");
  }
}

module.exports = new SiteController();
