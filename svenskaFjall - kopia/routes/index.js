var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.json({ message: "API-svar från index", title: "Express" });
});

module.exports = router;
