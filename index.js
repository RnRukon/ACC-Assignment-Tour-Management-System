const express = require("express");
const app = express();
const cors = require("cors");


//middle wares
app.use(express.json());
app.use(cors());


// route -----------
const toursRoute = require('./Routes/Tours.route')


app.get("/", (req, res, next) => {
  res.send("Route is working! YaY!");
});

// post data =======================
app.use('/api/v1/tour', toursRoute);

module.exports = app;
