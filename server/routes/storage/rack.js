// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
// middleware
const isAuth = require("../../middleware/isAuth");
// utils
const { msgObj, serverRes } = require("../../utils/serverRes");
const { serverMsg } = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = app => {
  // Get all of the racks
  app.get("/api/rack", isAuth, async (req, res, next) => {
    try {
      const racks = await Rack.find({}).populate("shelves");

      serverRes(res, 200, null, racks);
    } catch (err) {
      console.log("Err: GET/api/rack", err);

      const msg = serverMsg("error", "fetch", "racks");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single rack
  app.get("/api/rack/:rackId", isAuth, async (req, res, next) => {
    const { rackId } = req.params;
    try {
      const rack = await Rack.findById(rackId)
        .populate({
          path: "shelves",
          populate: { path: "shelfSpots" }
        })
        .populate("storage");

      serverRes(res, 200, null, rack);
    } catch (err) {
      console.log("Err: GET/api/rack/:rackId", err);

      const msg = serverMsg("error", "fetch", "rack");
      serverRes(res, 400, msg, null);
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

      const msg = msgObj("The rack was saved.", "green", "create");
      serverRes(res, 200, msg, { storage, rack });
    } catch (err) {
      console.log("Err: POST/api/rack/:storageId", err);

      const msg = serverMsg("error", "save", "rack", "create error");
      serverRes(res, 400, msg, null);
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

      const msg = msgObj("The rack was updated.", "green", "update");
      serverRes(res, 200, msg, rack);
    } catch (err) {
      console.log("Err: PATCH/api/rack/:rackId", err);

      const msg = serverMsg("error", "update", "rack", "update error");
      serverRes(res, 400, msg, null);
    }
  });
};
