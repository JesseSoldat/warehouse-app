const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");

module.exports = app => {
  // Get all shelves
  app.get("/api/shelf", async (req, res, next) => {
    try {
      const shelves = await Shelf.find({});
      succRes(res, shelves);
    } catch (err) {
      next(errRes(errMsg("fetch", "shelves")));
    }
  });

  // Get a single shelf
  app.get("/api/shelf/:shelfId", async (req, res, next) => {
    const { shelfId } = req.params;
    try {
      const shelf = await Shelf.findById(shelfId)
        .populate({
          path: "shelfSpots",
          populate: { path: "storedItems.item " }
        })
        .populate({
          path: "rack",
          populate: {
            path: "storage"
          }
        });
      succRes(res, shelf);
    } catch (err) {
      next(errRes(errMsg("fetch", "shelf")));
    }
  });
  // Create a new shelf inside a rack and link it to the rack
  app.post("/api/shelf/:rackId", async (req, res, next) => {
    let { rackId } = req.params;
    const shelf = new Shelf();
    shelf["rack"] = rackId;

    try {
      shelf["shelfLabel"] = await Rack.getShelfLabel(rackId);
      await shelf.save();

      const rack = await Rack.findByIdAndUpdate(
        rackId,
        {
          $addToSet: {
            shelves: shelf._id
          }
        },
        { new: true }
      );

      succRes(res, { rack, shelf });
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes(errMsg("save", "shelf")));
    }
  });
};
