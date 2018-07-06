const Storage = require("../models/storage");
const Rack = require("../models/rack");
const Shelf = require("../models/shelf");
const ShelfSpot = require("../models/shelfSpot");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  // Get all storages
  app.get("/api/storage", async (req, res, next) => {
    try {
      const storages = await Storage.find({}).populate({
        path: "racks",
        populate: { path: "shelves" }
      });
      succRes(res, storages);
    } catch (err) {
      next(errRes(errMsg("fetch", "storages")));
    }
  });

  // Get a single storage by storageId
  app.get("/api/storage/:storageId", async (req, res, next) => {
    const { storageId } = req.params;
    try {
      const storage = await Storage.findById(storageId).populate({
        path: "racks",
        populate: {
          path: "shelves",
          populate: {
            path: "shelfSpots"
          }
        }
      });
      succRes(res, storage);
    } catch (err) {
      next(errRes(errMsg("fetch", "storage")));
    }
  });

  // Create new warehouse storage
  app.post("/api/storage", async (req, res, next) => {
    const storage = new Storage(req.body);
    try {
      await storage.save();
      succRes(res, storage);
    } catch (err) {
      next(errRes(errMsg("save", "storage")));
    }
  });

  // Update a storage
  app.patch("/api/storage/:storageId", async (req, res, next) => {
    const { storageId } = req.params;
    try {
      const storage = await Storage.findByIdAndUpdate(
        storageId,
        mergeObjFields("", req.body),
        { new: true }
      );
      succRes(res, storage);
    } catch (err) {
      next(errRes(errMsg("update", "storage")));
    }
  });
};
