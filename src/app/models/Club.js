const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const clubs = new Schema({
  clubName: { type: String, required: true },
  slug: { type: String, slug: "clubName", unique: true },
  stadium: { type: String },
  players: { type: Array },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  qualified: { type: Boolean, default: false },
});

const Club = mongoose.model("clubs", clubs);

module.exports = {
  Club,
};
