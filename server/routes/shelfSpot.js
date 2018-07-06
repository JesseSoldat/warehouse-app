const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  // Get all shelfSpots
  app.get("/api/shelfSpot", async (req, res, next) => {
    try {
      const shelfSpot = await ShelfSpot.find();
      succRes(res, shelfSpot);
    } catch (err) {
      next(errRes(errMsg("fetch", "shelf spot")));
    }
  });
  // Get a single shelfSpot
  app.get("/api/shelfSpot/:shelfSpotId", async (req, res, next) => {
    const { shelfSpotId } = req.params;
    try {
      const shelfSpot = await ShelfSpot.findById(shelfSpotId)
        .populate("storedItems.item")
        .populate({
          path: "shelf",
          populate: {
            path: "rack",
            populate: {
              path: "storage"
            }
          }
        });
      succRes(res, shelfSpot);
    } catch (err) {
      next(errRes(errMsg("fetch", "shelf spots")));
    }
  });
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
  // Update a shelfSpot
  app.patch("/api/shelfSpot/:shelfSpotId", async (req, res, next) => {
    const { shelfSpotId } = req.params;
    try {
      const shelfSpot = await ShelfSpot.findByIdAndUpdate(
        shelfSpotId,
        mergeObjFields("", req.body),
        { new: true }
      );
      succRes(res, shelfSpot);
    } catch (err) {
      next(errRes(errMsg("update", "shelf spot")));
    }
  });
};
