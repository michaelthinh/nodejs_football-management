const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const players = new Schema({
  name: { type: String },
  slug: { type: String, slug: "name", unique: true },
  birthday: { type: Date },
  typePlayer: { type: String },
  goals: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Player = mongoose.model("players", players);

module.exports = {
  Player,
};
