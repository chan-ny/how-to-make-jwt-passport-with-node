const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const Morgan = require("morgan");
const PORT = process.env.PORT || 3000;

app.use(Morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var corsOption = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOption));

require("./passport");
// require("./passportAdmin");

require("./routes")(app);

app.get("/", (req, res) => {
  res.send("ສະບາຍດີ");
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("server running ", PORT);
  });
});
