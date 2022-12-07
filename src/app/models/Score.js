const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const scores = new Schema({
  slugMatch: { type: String },
  scoreMinute: { type: Number },
  slugPlayer: { type: String },
});

const Score = mongoose.model("scores", scores);

module.exports = {
  Score,
};
