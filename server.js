if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
require("./config/mongo")(app);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/profileRoutes")(app);

var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
//variable syncOptions inside of sync eventually
// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
