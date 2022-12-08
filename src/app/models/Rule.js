const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const rules = new Schema({
  minAge: { type: Number },
  maxAge: { type: Number },
  minPlayer: { type: Number },
  maxPlayer: { type: Number },
  maxForeigner: { type: Number },
  maxScoreTime: { type: Number },
  winScore: { type: Number },
  loseScore: { type: Number },
  tieScore: { type: Number },
  description: { type: String },
  name: { type: String },
  slug: { type: String, slug: "name", unique: true },
});

const Rule = mongoose.model("rules", rules);

module.exports = {
  Rule,
};
