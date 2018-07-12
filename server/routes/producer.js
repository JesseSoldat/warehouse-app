// models
const Producer = require("../models/producer");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, msgObj, errMsg } = require("../utils/serverRes");

module.exports = app => {
  app.post("/api/producers", isAuth, async (req, res, next) => {
    const producer = new Producer(req.body);
    try {
      await producer.save();

      const msg = msgObj("The producer was saved.", "green");
      serverRes(res, 200, msg, producer);
    } catch (err) {
      const msg = msgObj(errMsg("save", "producer"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
