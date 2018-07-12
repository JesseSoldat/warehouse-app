// required fields for creating a product
// err is the name of the the error in component state
// msg is what should be set in state if the field is empty on submit

const requiredFields = {
  productName: {
    err: "productNameErr",
    msg: "Product name is a required field!"
  },
  brandName: { err: "brandNameErr", msg: "Brand name is a required field!" }
};

export default requiredFields;
