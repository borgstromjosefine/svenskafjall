var express = require("express");
var router = express.Router();
var FjallModel = require("../models/FjallModel");

router.get("/", async function (req, res) {
  try {
    const fjallen = await FjallModel.find();
    console.log("Hämtade fjäll från databasen:");
    res.json(fjallen);
  } catch (err) {
    console.error("Fel vid hämtning av fjäll:", err);
  }
});

module.exports = router;
