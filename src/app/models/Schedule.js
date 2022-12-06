const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const schedule = new Schema({
  round: { type: Number },
  firstClub: { type: String },
  slugFirst: { type: String, slug: "firstClub" },
  secondClub: { type: String },
  slugSecond: { type: String, slug: "secondClub" },
  firstScore: { type: Number },
  secondScore: { type: Number },
  teamWin: { type: String },
  date: { type: Date },
  stadium: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Schedule = mongoose.model("schedule", schedule);

module.exports = {
  Schedule,
};
