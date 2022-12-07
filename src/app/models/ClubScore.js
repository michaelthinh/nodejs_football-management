const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const clubscores = new Schema({
  name: { type: String },
  idTeam: { type: String },
  wins: { type: Number },
  loses: { type: Number },
  ties: { type: Number },
  points: { type: Number },
  slug: { type: String, slug: "name", unique: true },
});

const ClubScore = mongoose.model("clubscores", clubscores);

module.exports = {
  ClubScore,
};
