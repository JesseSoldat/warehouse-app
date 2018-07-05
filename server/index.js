require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

connectToDb();

const app = express();

app.use(bodyParser.json());

require("./routes/user")(app);
require("./routes/product")(app);
require("./routes/customer")(app);
require("./routes/producer")(app);
require("./routes/storage")(app);
require("./routes/rack")(app);
require("./routes/shelf")(app);
require("./routes/shelfSpot")(app);

app.use((err, req, res, next) => {
  const { statusCode = 400, msg = "Server Error" } = err;
  console.log(msg);
  return res.status(statusCode).send(msg);
});

app.get("*", (req, res) => {
  res.send("server running");
});

app.listen(process.env.PORT);
