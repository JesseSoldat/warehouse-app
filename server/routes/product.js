const Product = require("../models/product");
const Counter = require("../models/counter");
const isAuth = require("../middleware/isAuth");
const { succRes, errRes } = require("../utils/serverResponses");

module.exports = app => {
  app.post("/api/products", async (req, res, next) => {
    const { producerId, customerIds } = req.body;
    const newProduct = new Product(req.body);

    try {
      newProduct["productLabel"] = await Counter.createProductLabel();
      succRes(res, newProduct);
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while trying to save the product"));
    }
  });
};
