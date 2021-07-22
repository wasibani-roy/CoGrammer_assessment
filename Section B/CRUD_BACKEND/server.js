const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const db = require("./app/models");

dotenv.config();
const app = express();



db.sequelize.sync();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD application." });
});

// set port, listen for requests

require('./app/routes/auth.routes')(app);
require("./app/routes/blog.routes")(app);
const PORT = process.env.PORT || 8080;
module.exports=app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
