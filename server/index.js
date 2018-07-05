require("./config/config");
const express = require("express");
const bodyParser = require("body-parser");
const connectToDb = require("./db/mongoose");

connectToDb();

const app = express();

app.use(bodyParser.json());

require("./routes/user")(app);

app.use((err, req, res, next) => {
  const { statusCode = 400, msg = "Server Error" } = err;
  console.log(msg);
  return res.status(statusCode).send(msg);
});

app.get("*", (req, res) => {
  res.send("server running");
});

app.listen(process.env.PORT);
