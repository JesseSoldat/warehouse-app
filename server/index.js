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
require("./routes/storage/storage")(app);
require("./routes/storage/rack")(app);
require("./routes/storage/shelf")(app);
require("./routes/storage/shelfSpot")(app);

app.use((err, req, res, next) => {
  const { msg = null, payload = null } = err;
  const statusCode = msg.statusCode || 500;

  console.log(
    "-------------- Error Handling Middleware ----------------------------"
  );
  console.error("Msg:", err.msg.msg);
  console.log("Status Code:", err.msg.statusCode);
  console.error("Payload:", err.payload);
  console.log("-----------------------------------------------------------");

  return res.status(statusCode).send({
    payload,
    msg
  });
});

app.get("*", (req, res) => {
  res.send("server running");
});

app.listen(process.env.PORT);
