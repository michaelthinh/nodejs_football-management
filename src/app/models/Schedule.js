const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const schedule = new Schema({
  round: { type: Number },

  slugFirst: { type: String },

  slugSecond: { type: String },
  firstScore: { type: Number },
  secondScore: { type: Number },
  teamWin: { type: String },
  teamLose: { type: String },
  date: { type: Date },
  stadium: { type: String },
});

const Schedule = mongoose.model("schedule", schedule);

module.exports = {
  Schedule,
};
