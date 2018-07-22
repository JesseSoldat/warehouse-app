const seedProducts = require("./seeding/productSeed");
const seedProducer = require("./seeding/producerSeed");
const seedCustomer = require("./seeding/customerSeed");
const storageSeed = require("./seeding/storageSeed");

const seedDb = async () => {
  try {
    // await seedProducts();
    // await seedProducer();
    // await seedCustomer();
    await storageSeed();
  } catch (err) {
    console.log("Error while seeding the DB.");
  }
};

// Uncomment to seed db
// seedDb();
