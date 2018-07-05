const Product = require("../models/product");
const Counter = require("../models/counter");
const isAuth = require("../middleware/isAuth");
const { succRes, errRes, errMsg } = require("../utils/serverResponses");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  app.get("/api/products", async (req, res, next) => {
    let { skip = 0, limit = 20 } = req.query;
    skip = parseInt(skip, 10);
    limit = parseInt(limit, 10);

    try {
      const [products, count] = await Promise.all([
        Product.find({})
          .skip(skip)
          .limit(limit),
        Product.find().count()
      ]);
      succRes(res, { products, count, skip, limit });
    } catch (err) {
      next(errRes(errMsg("fetch", "products")));
    }
  });

  app.get("/api/products/:productId", async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId).populate(
        "customer producer"
      );
      succRes(res, product);
    } catch (err) {
      next(errRes(errMsg("fetch", "product")));
    }
  });

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
      next(errRes(errMsg("save", "product")));
    }
  });

  app.patch("/api/products/:productId", async (req, res, next) => {
    const { productId } = req.params;
    const { producerId, customerIds } = req.body;
    const product = req.body;

    if (producerId) {
      product["producer"] = producerId;
    }

    if (customerIds) {
      product["customer"] = customerIds;
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        mergeObjFields("", product),
        { new: true }
      );
      succRes(res, updatedProduct);
    } catch (err) {
      next(errRes(errMsg("update", "product")));
    }
  });
};
