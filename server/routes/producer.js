const Producer = require("../models/producer");
const isAuth = require("../middleware/isAuth");
const { succRes, errRes } = require("../utils/serverResponses");

module.exports = app => {
  app.post("/api/producers", isAuth, async (req, res, next) => {
    const producer = new Producer(req.body);
    try {
      await producer.save();
      succRes(res, producer);
    } catch (err) {
      next(errRes("An error occured while saving the producer"));
    }
  });
};
