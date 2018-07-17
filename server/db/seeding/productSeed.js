const faker = require("faker");

// Models
const Product = require("../../models/product");
// Utils
const randomMinMaxNum = require("./utils/randomMinMaxNum");
const dropCollection = require("./utils/dropCollection");
const generateArray = require("./utils/generateArray");

const PRODUCTS_TO_ADD = 22;

const createProducts = labelNumber => ({
  productLabel: labelNumber + 1000, //unique
  // string
  brandName: faker.commerce.productName(),
  productName: faker.commerce.productName(),
  pointOfBuy: faker.address.city(),
  // number
  price: randomMinMaxNum(18, 6965),
  weight: randomMinMaxNum(1, 65),
  quantity: randomMinMaxNum(1, 65),
  amountOfPieces: randomMinMaxNum(1, 30),
  // array of strings
  productMaterial: generateArray(randomMinMaxNum(1, 11), "productMaterial"),
  comments: generateArray(randomMinMaxNum(1, 11), "productAdjective"),
  packagingPictures: generateArray(randomMinMaxNum(1, 6), "image"),
  productPictures: generateArray(randomMinMaxNum(1, 11), "avatar"),
  // objects
  productMeasurments: {
    prodHeight: randomMinMaxNum(5, 25),
    prodWidth: randomMinMaxNum(5, 25),
    prodLength: randomMinMaxNum(5, 25)
  },
  packagingMeasurments: {
    packHeight: randomMinMaxNum(5, 25),
    packWidth: randomMinMaxNum(5, 25),
    packLength: randomMinMaxNum(5, 25)
  }
});

module.exports = seedProducts = async () => {
  try {
    // times will be the label
    let times = 0;
    await dropCollection(Product);

    while (times < PRODUCTS_TO_ADD) {
      ++times;
      const product = new Product(createProducts(times));
      product.save();
    }
  } catch (err) {
    console.log("An error occured while seeding the Products collection.");
  }
};
