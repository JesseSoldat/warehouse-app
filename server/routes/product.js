// models
const Product = require("../models/product");
const Counter = require("../models/counter");
const Customer = require("../models/customer");
const Producer = require("../models/producer");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { errMsg, msgObj, serverRes } = require("../utils/serverRes");
const mergeObjFields = require("../utils/mergeObjFields");

module.exports = app => {
  // Get All Products
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

  // Get Producers & Customers for Product Form (Form Data)
  app.get("/api/products/clients", isAuth, async (req, res) => {
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

  // Products & Producers & Customer for Product Form (Form Data)
  app.get(
    "/api/products/productWithClients/:productId",
    isAuth,
    async (req, res) => {
      const { productId } = req.params;
      try {
        const [product, customers, producers] = await Promise.all([
          Product.findById(productId).populate("producer customer"),
          Customer.find({}),
          Producer.find({})
        ]);
        serverRes(res, 200, null, { product, customers, producers });
      } catch (err) {
        const msg = msgObj(errMsg("fetch", "eform data"), "red");
        serverRes(res, 400, msg, null);
      }
    }
  );

  // Get a Single Product
  app.get("/api/products/:productId", isAuth, async (req, res) => {
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

  // Post a Product
  app.post("/api/products", isAuth, async (req, res) => {
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

  // Update a Product
  app.patch("/api/products/:productId", isAuth, async (req, res) => {
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

      const msg = msgObj("The product was updated.", "green");
      serverRes(res, 200, msg, updatedProduct);
    } catch (err) {
      const msg = msgObj(errMsg("update", "product"), "red");
      serverRes(res, 400, msg, null);
    }
  });

  // Delete a Product
  app.delete("/api/products/:productId", isAuth, async (req, res) => {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId);

      const {
        productFolder,
        pictureFolder,
        packagingFolder,
        productPictures,
        packagingPictures
      } = product;

      // if any of these exist
      if (
        productFolder ||
        pictureFolder ||
        packagingFolder ||
        (productPictures && productPictures.length > 0) ||
        (productPictures && packagingPictures.length > 0)
      ) {
        const msg = msgObj(
          "Delete all pictures and their parent folders first.",
          "red",
          "delete err"
        );

        return serverRes(res, 400, msg, product);
      }

      await product.remove();

      const msg = msgObj("The product was deleted.", "green");

      serverRes(res, 200, msg, null);
    } catch (error) {
      const msg = msgObj(errMsg("delete", "product"), "red", "delete err");
      serverRes(res, 400, msg, null);
    }
  });
};
