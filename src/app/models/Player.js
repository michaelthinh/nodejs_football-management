const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const players = new Schema({
  name: { type: String },
  birthday: { type: Date },
  typePlayer: { type: String },
  goals: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

const Player = mongoose.model("players", players);

module.exports = {
  Player,
};
