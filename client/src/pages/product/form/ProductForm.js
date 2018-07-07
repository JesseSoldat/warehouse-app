import React, { Component } from "react";
import moment from "moment";

import TextInputList from "./TextInputList";
import resetRequiredFieldsErr from "./resetRequiredFieldsErr";
import validateOnSubmit from "./validateOnSubmit";

class ProductForm extends Component {
  state = {
    //errors----------------
    errors: {},
    productNameErr: "",
    brandNameErr: "",
    //fields---------------
    brandName: "",
    productName: "",
    pointOfBuy: "",
    //Date
    manufacturingDate: moment(),
    dateCheckbox: false,
    //Numbers
    price: 0,
    amountOfPieces: 0,
    quantity: 1,
    weight: 0
  };

  onSubmit = e => {
    e.preventDefault();
    const errObj = validateOnSubmit(this.state);
    this.setState(() => errObj);
  };

  onChange = e => {
    const { name, value } = e.target;
    const requiredField = resetRequiredFieldsErr(name);

    if (requiredField) {
      return this.setState(() => ({ [name]: value, requiredFieldErr: "" }));
    }
    this.setState(() => ({ [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList state={this.state} cb={this.onChange} />
        <input
          type="submit"
          className="btn btn-info btn-block mt-4"
          value="Submit"
          ref="submitBtn"
        />
      </form>
    );
  }
}

export default ProductForm;
