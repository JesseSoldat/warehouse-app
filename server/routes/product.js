const Product = require("../models/product");
const Counter = require("../models/counter");
const isAuth = require("../middleware/isAuth");
const { succRes, errRes } = require("../utils/serverResponses");

module.exports = app => {
  app.post("/api/products", async (req, res, next) => {
    const { producerId, customerIds } = req.body;
    const product = new Product(req.body);

    if (customerIds) {
      product["customer"] = customerIds;
    }

    if (producerId) {
      product["producer"] = producerId;
    }

    try {
      product["productLabel"] = await Counter.createProductLabel();
      await product.save();
      succRes(res, product);
    } catch (err) {
      if (err.msg) {
        return next(err);
      }
      next(errRes("An error occured while trying to save the product"));
    }
  });
};
