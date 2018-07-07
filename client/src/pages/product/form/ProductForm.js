import React, { Component } from "react";
import moment from "moment";

import TextInputList from "./TextInputList";
import ObjInputList from "./ObjInputList";
import resetRequiredFieldsErr from "./helpers/resetRequiredFieldsErr";
import validateOnSubmit from "./helpers/validateOnSubmit";
import formatFieldValues from "./helpers/formatFieldValues";

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
    weight: 0,
    //Array of Strings
    productMaterial: "",
    comments: "",
    //Obj
    productMeasurements: {},
    prodHeight: 0,
    prodWidth: 0,
    prodLength: 0,
    packagingMeasurements: {},
    packHeight: 0,
    packWidth: 0,
    packLength: 0
  };

  onSubmit = e => {
    e.preventDefault();
    const { isValid, errObj } = validateOnSubmit(this.state);
    this.setState(() => ({ ...errObj }));

    if (!isValid) return;

    formatFieldValues(this.state);
  };

  onChange = e => {
    const { name, value } = e.target;
    console.log(name, value);

    const requiredField = resetRequiredFieldsErr(name);

    if (requiredField) {
      return this.setState(() => ({ [name]: value, [requiredField]: "" }));
    }
    this.setState(() => ({ [name]: value }));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList state={this.state} cb={this.onChange} />
        <ObjInputList state={this.state} cb={this.onChange} />
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
