var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "API-svar från Users-rutan" });
});

module.exports = router;
