const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");

module.exports = app => {
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
