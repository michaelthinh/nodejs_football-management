const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/football_manager"),
      {
        useNewUrlParser: true,
        useUnifedTopology: true,
        useCreateIndex: true,
      };

    console.log("Connect DB successfully");
  } catch (error) {
    console.log(error);
    console.log("Connect DB failed");
  }
}

module.exports = { connect };
