const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");

module.exports = app => {
  // Create a new shelfSpot and link it to its shelf
  app.post("/api/shelfSpot/:shelfId", async (req, res, next) => {
    const { shelfId } = req.params;
    const shelfSpot = new ShelfSpot();
    shelfSpot["shelf"] = shelfId;

    try {
      shelfSpot["spotLabel"] = await Shelf.getShelfSpotLabel(shelfId);
      await shelfSpot.save();

      const shelf = await Shelf.findByIdAndUpdate(
        shelfId,
        {
          $addToSet: {
            shelfSpots: shelfSpot._id
          }
        },
        { new: true, upsert: true }
      );

      succRes(res, { shelf, shelfSpot });
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes(errMsg("save", "shelf spot")));
    }
  });
};
