// models
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const { serverMsg } = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = app => {
  // Get all shelves
  app.get("/api/shelves", async (req, res, next) => {
    try {
      const shelves = await Shelf.find({});

      serverRes(res, 200, null, shelves);
    } catch (err) {
      console.log("Err: GET/api/shelf", err);

      const msg = serverMsg("error", "fetch", "shelves");
      serverRes(res, 400, msg, null);
    }
  });

  // Get a single shelf
  app.get("/api/shelves/:shelfId", async (req, res, next) => {
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

      serverRes(res, 200, null, shelf);
    } catch (err) {
      console.log("Err: GET/api/shelf/:shelfId", err);

      const msg = serverMsg("error", "fetch", "shelf");
      serverRes(res, 400, msg, null);
    }
  });
  // Create a new shelf inside a rack and link it to the rack
  app.post("/api/shelves/:rackId", async (req, res, next) => {
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

      const msg = msgObj("The shelf was saved.", "green", "create");
      serverRes(res, 200, msg, { rack, shelf });
    } catch (err) {
      console.log("Err: POST/api/shelf/:rackId", err);

      const msg = serverMsg("error", "create", "shelf", "create error");
      serverRes(res, 400, msg, null);
    }
  });
  // Update a shelf
  app.patch("/api/shelves/:shelfId", async (req, res, next) => {
    const { shelfId } = req.params;
    try {
      const shelf = await Shelf.findByIdAndUpdate(
        shelfId,
        mergeObjFields("", req.body),
        { new: true }
      );

      const msg = msgObj("The shelf was updateed.", "green", "update");
      serverRes(res, 200, msg, shelf);
    } catch (err) {
      console.log("Err: PATCH/api/shelf/:shelfId", err);

      const msg = serverMsg("error", "update", "shelf", "update error");
      serverRes(res, 400, msg, null);
    }
  });
};
