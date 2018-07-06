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
  console.log(err);

  const { msg, payload } = err;
  console.error(msg);

  return res.status(200).send({
    payload,
    msg
  });
});

app.get("*", (req, res) => {
  res.send("server running");
});

app.listen(process.env.PORT);
