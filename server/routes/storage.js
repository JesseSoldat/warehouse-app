const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");

module.exports = app => {
  // POST ROUTES --------------------------------
  app.post("/api/storage", async (req, res, next) => {
    const storage = new Storage(req.body);
    try {
      await storage.save();
      succRes(res, storage);
    } catch (err) {
      next(errRes(errMsg("save", "storage")));
    }
  });
};
