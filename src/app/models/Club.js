const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clubs = new Schema({
  clubId: { type: Schema.Types.ObjectId, ref: "Club" },
  clubName: { type: String },
  stadium: { type: String },
  note: { type: String },
  players: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Club = mongoose.model("clubs", clubs);

module.exports = {
  Club,
};
