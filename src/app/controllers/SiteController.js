class SiteController {
  index(req, res) {
    res.render("home");
  }

  registrationForm(req, res) {
    res.render("home/registration-form");
  }

  setUpSchedule(req, res) {
    res.render("home/set-up-schedule");
  }

  matchResults(req, res) {
    res.render("home/match-results");
  }

  searchingForPlayer(req, res) {
    res.render("home/searching-for-player");
  }

  tournamentReport(req, res) {
    res.render("home/tournament-report");
  }

  rulesChanging(req, res) {
    res.render("home/rules-changing");
  }
}

module.exports = new SiteController();
