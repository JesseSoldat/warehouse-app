const Producer = require("../models/producer");
const isAuth = require("../middleware/isAuth");
const { serverRes, msgObj, errMsg } = require("../utils/serverResponses");

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
