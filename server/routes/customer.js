// models
const Customer = require("../models/customer");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, msgObj, errMsg } = require("../utils/serverRes");
const serverMsg = require("../utils/serverMsg");

module.exports = app => {
  // Get all customers
  app.get("/api/customers", isAuth, async (req, res) => {
    try {
      const customers = await Customer.find({}).sort({ $natural: -1 });

      serverRes(res, 200, null, customers);
    } catch (err) {
      console.log("Err: GET/api/customers,", err);

      const msg = serverMsg("error", "get", "customers");
      serverRes(res, 400, msg, null);
    }
  });
  // Get one customer
  app.get("/api/customers/:customerId", isAuth, async (req, res) => {
    const { customerId } = req.params;
    try {
      const customer = await Customer.findById(customerId);

      serverRes(res, 200, null, customer);
    } catch (err) {
      console.log("Err: GET/api/customers/:customerId,", err);

      const msg = serverMsg("error", "get", "customer");
      serverRes(res, 400, msg, null);
    }
  });
  // Create a new customer
  app.post("/api/customers", isAuth, async (req, res) => {
    const customer = new Customer(req.body);
    try {
      await customer.save();

      const msg = msgObj("The customer was saved.", "green");
      serverRes(res, 200, msg, customer);
    } catch (err) {
      console.log("Err: POST/api/customers,", err);

      const msg = serverMsg("error", "save", "customer");
      serverRes(res, 400, msg, null);
    }
  });
};
