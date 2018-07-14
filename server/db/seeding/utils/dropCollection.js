const dropCollection = async collection => {
  try {
    await collection.remove();
  } catch (err) {
    console.log(
      `Error: could not drop the ${collection} collection while seeding the database.`
    );
  }
};

module.exports = dropCollection;
