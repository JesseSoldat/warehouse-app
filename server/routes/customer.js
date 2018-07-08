const Customer = require("../models/customer");
const isAuth = require("../middleware/isAuth");
const { succRes, errRes } = require("../utils/serverResponses");

module.exports = app => {
  app.post("/api/customers", isAuth, async (req, res, next) => {
    const customer = new Customer(req.body);
    try {
      await customer.save();
      succRes(res, customer);
    } catch (err) {
      next(errRes("A error occured while saving the customer"));
    }
  });
};
