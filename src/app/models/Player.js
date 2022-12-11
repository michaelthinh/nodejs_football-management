const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const players = new Schema({
  name: { type: String },
  slugId: { type: String, slug: "name" },
  age: { type: Number },
  typePlayer: { type: String },
  goals: { type: Number },
  createdAt: { type: Date, default: Date.now },
  slugTeam: { type: String },
  note: { type: String },
});

const Player = mongoose.model("players", players);

module.exports = {
  Player,
};
