var mongoose = require("mongoose");

var FjallSchema = new mongoose.Schema(
  {
    name: String,
    height: String,
    location: String,
    about: String,
  },
  {
    collection: "svenskafjall_collection",
  }
);

module.exports = mongoose.model("FjallModel", FjallSchema);
