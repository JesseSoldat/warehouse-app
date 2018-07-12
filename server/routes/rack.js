// models
const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
// utils
const { succRes, errRes, errMsg } = require("../utils/serverRes");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  // Get all of the racks
  app.get("/api/rack", async (req, res, next) => {
    try {
      const racks = await Rack.find({}).populate("shelves");
      succRes(res, racks);
    } catch (err) {
      next(errRes(errMsg("fetch", "racks")));
    }
  });
  // Get a single rack
  app.get("/api/rack/:rackId", async (req, res, next) => {
    const { rackId } = req.params;
    try {
      const rack = await Rack.findById(rackId)
        .populate({
          path: "shelves",
          populate: { path: "shelfSpots" }
        })
        .populate("storage");

      succRes(res, rack);
    } catch (err) {
      next(errRes(errMsg("fetch", "rack")));
    }
  });
  // Create new rack inside storage and link the rack to storage
  app.post("/api/rack/:storageId", async (req, res, next) => {
    const { storageId } = req.params;
    const rack = new Rack();
    rack["storage"] = storageId;
    try {
      rack["rackLabel"] = await Storage.getRackLabel(storageId);
      await rack.save();

      const storage = await Storage.findByIdAndUpdate(
        storageId,
        {
          $addToSet: {
            racks: rack._id
          }
        },
        { new: true }
      );

      succRes(res, { storage, rack });
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes(errMsg("save", "rack")));
    }
  });
  // Update a rack
  app.patch("/api/rack/:rackId", async (req, res, next) => {
    const { rackId } = req.params;
    try {
      const rack = await Rack.findByIdAndUpdate(
        rackId,
        mergeObjFields("", req.body),
        { new: true }
      );
      succRes(res, rack);
    } catch (err) {
      next(errRes(errMsg("update", "rack")));
    }
  });
};
