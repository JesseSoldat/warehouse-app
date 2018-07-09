const Customer = require("../models/customer");
const isAuth = require("../middleware/isAuth");
const { serverRes, msgObj, errMsg } = require("../utils/serverResponses");

module.exports = app => {
  app.post("/api/customers", isAuth, async (req, res, next) => {
    const customer = new Customer(req.body);
    try {
      await customer.save();

      const msg = msgObj("The customer was saved.", "green");
      serverRes(res, 200, msg, customer);
    } catch (err) {
      const msg = msgObj(errMsg("save", "customer"), "red");
      serverRes(res, 400, msg, null);
    }
  });
};
