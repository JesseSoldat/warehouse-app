const seedProducts = require("./productSeed");

const seedDb = async () => {
  try {
    await seedProducts();
  } catch (err) {
    console.log("Error while seeding the DB.");
  }
};

// Uncomment to seed db

// seedDb();
