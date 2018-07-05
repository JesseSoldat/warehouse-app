const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");

module.exports = app => {
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
};
