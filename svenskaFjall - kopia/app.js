var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Lägg till CORS här
var cors = require("cors");

var indexRouter = require("./routes/index");
var fjallRouter = require("./routes/fjall");
var usersRouter = require("./routes/users");

var app = express();

// Lägg till CORS-middleware för att tillåta anrop från din frontend
app.use(
  cors({
    origin: "*", // Tillåt alla domäner att göra anrop
    methods: ["GET", "POST", "PUT", "DELETE"], // Tillåt de HTTP-metoder du behöver
    allowedHeaders: ["Content-Type"], // Tillåt dessa headers
  })
);

mongoose.connect(
  "mongodb+srv://whippetpaws:Josefine95@test.sm713.mongodb.net/svenskafjall_db?retryWrites=true&w=majority&appName=Test",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

mongoose.connection.on("connected", () => {
  console.log("Databas ansluten!");
});

mongoose.connection.on("error", (err) => {
  console.error("Fel vid anslutning till databas", err);
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

// Lägg till ett API-anrop för fjällen
app.get("/api/fjall", function (req, res) {
  res.json({ message: "Fjäll-data här!" });
});

app.use("/", indexRouter);
app.use("/fjall", fjallRouter);
app.use("/users", usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
