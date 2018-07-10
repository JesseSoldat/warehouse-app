const Product = require("../models/product");
const Counter = require("../models/counter");
const Customer = require("../models/customer");
const Producer = require("../models/producer");
const isAuth = require("../middleware/isAuth");
const { errMsg, msgObj, serverRes } = require("../utils/serverResponses");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  app.get("/api/products", isAuth, async (req, res) => {
    let { skip = 0, limit = 20 } = req.query;
    skip = parseInt(skip, 10);
    limit = parseInt(limit, 10);

    try {
      const [products, count] = await Promise.all([
        Product.find({})
          .skip(skip)
          .limit(limit),
        Product.find().countDocuments()
      ]);

      serverRes(res, 200, null, { products, count, skip, limit });
    } catch (err) {
      const msg = msgObj(errMsg("fetch", "products"), "red");
      serverRes(res, 400, msg, null);
    }
  });

  app.get("/api/products/clients", isAuth, async (req, res, next) => {
    try {
      const [customers, producers] = await Promise.all([
        Customer.find({}),
        Producer.find({})
      ]);
      serverRes(res, 200, null, { customers, producers });
    } catch (err) {
      const msg = msgObj(errMsg("fetch", "form data"), "red");
      serverRes(res, 400, msg, null);
    }
  });

  app.get("/api/products/:productId", isAuth, async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId).populate(
        "customer producer"
      );

      serverRes(res, 200, null, product);
    } catch (err) {
      const msg = msgObj(errMsg("fetch", "product"), "red");
      serverRes(res, 400, msg, null);
    }
  });

  app.post("/api/products", isAuth, async (req, res, next) => {
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

      const msg = msgObj("The product was saved.", "green");
      serverRes(res, 200, msg, product);
    } catch (err) {
      const msg = msgObj(errMsg("save", "product"), "red");
      serverRes(res, 400, msg, null);
    }
  });

  app.patch("/api/products/:productId", isAuth, async (req, res, next) => {
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

      const msg = msgObj("The producer was updated.", "green");
      serverRes(res, 200, msg, updatedProduct);
    } catch (err) {
      const msg = msgObj(errMsg("update", "product"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
