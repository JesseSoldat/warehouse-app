const faker = require("faker");
// get the unique object id
const mongoose = require("mongoose");

// models
const Storage = require("../../models/storage/storage");
const Rack = require("../../models/storage/rack");
const Shelf = require("../../models/storage/shelf");
const ShelfSpot = require("../../models/storage/shelfSpot");

// helpers
const randomMinMaxNum = require("./helpers/randomMinMaxNum");
const dropCollections = require("./helpers/dropCollections");

const STORAGES_TO_ADD = randomMinMaxNum(1, 3);
const RACKS_TO_ADD = randomMinMaxNum(1, 3);
const SHELVES_TO_ADD = randomMinMaxNum(1, 3);
const SHELFSPOTS_TO_ADD = randomMinMaxNum(1, 3);

// create ------------------------------
const createShelfSpots = async shelfId => {
  const shelfSpotsId = mongoose.Types.ObjectId();
  const shelfSpot = new ShelfSpot({
    _id: shelfSpotsId,
    spotLabel: randomMinMaxNum(1, 1000),
    shelf: shelfId
  });

  try {
    await shelfSpot.save();

    return shelfSpotsId;
  } catch (err) {
    console.log("ERR: createShelfSpots");
  }
};

const createShelves = async rackId => {
  const shelfId = mongoose.Types.ObjectId();
  const shelf = new Shelf({
    _id: shelfId,
    shelfLabel: randomMinMaxNum(1, 1000),
    rack: rackId,
    shelfSpots: []
  });

  try {
    const shelfSpotId = await createShelfSpots(shelfId);

    shelf.shelfSpots.push(shelfSpotId);

    await shelf.save();

    return shelfId;
  } catch (err) {
    console.log("ERR: createShelves");
  }
};

const createRacks = async storageId => {
  const rackId = mongoose.Types.ObjectId();
  const rack = new Rack({
    _id: rackId,
    storage: storageId,
    rackLabel: randomMinMaxNum(1, 1000),
    shelves: []
  });

  try {
    const shelfId = await createShelves(rackId);

    rack.shelves.push(shelfId);

    await rack.save();

    return rackId;
  } catch (err) {
    console.log("ERR: createRacks");
  }
};

const createStorages = async () => {
  const storageId = mongoose.Types.ObjectId();

  const storage = new Storage({
    _id: storageId,
    storageLabel: faker.random.word(), //unique
    description: faker.lorem.sentence(),
    racks: []
  });

  try {
    const rackId = await createRacks(storageId);

    storage.racks.push(rackId);

    await storage.save();
  } catch (err) {
    console.log("ERR: createStorages");
  }
};

module.exports = seedStorages = async () => {
  let times = 0;

  try {
    const collections = [Storage, Rack, Shelf, ShelfSpot];
    await dropCollections(collections);

    // STORAGE --------------------------------------------
    while (times < STORAGES_TO_ADD) {
      ++times;
      await createStorages();
    }
    console.log("done");
  } catch (err) {
    console.log("An error occured while seeding the Storage collection.");
  }
};
