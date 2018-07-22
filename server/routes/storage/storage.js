// models
const Storage = require("../../models/storage/storage");
// utils
const { serverRes, msgObj } = require("../../utils/serverRes");
const serverMsg = require("../../utils/serverMsg");
const mergeObjFields = require("../../utils/mergeObjFields");

module.exports = app => {
  // Get all storages
  app.get("/api/storages", async (req, res) => {
    try {
      const storages = await Storage.find({}).populate({
        path: "racks",
        populate: { path: "shelves" }
      });

      serverRes(res, 200, null, storages);
    } catch (err) {
      console.log("ERR: GET/api/storages", err);

      const msg = serverMsg("error", "fetch", "storages");
      serverRes(res, 400, msg, null);
    }
  });
  // Get a single storage by storageId
  app.get("/api/storages/:storageId", async (req, res) => {
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

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: GET/api/storage/:storageId", err);

      const msg = serverMsg("error", "fetch", "storage");
      serverRes(res, 400, msg, null);
    }
  });
  // Create new warehouse storage
  app.post("/api/storage", async (req, res, next) => {
    const storage = new Storage(req.body);
    try {
      await storage.save();

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: POST/api/storage", err);

      const msg = serverMsg("error", "save", "storage");
      serverRes(res, 400, msg, null);
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

      serverRes(res, 200, null, storage);
    } catch (err) {
      console.log("ERR: PATCH/api/storage/:storageId", err);

      const msg = serverMsg("error", "update", "storage");
      serverRes(res, 400, msg, null);
    }
  });
  // Delete storage
};
