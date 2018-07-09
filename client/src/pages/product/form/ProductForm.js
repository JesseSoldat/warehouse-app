import React, { Component } from "react";
import moment from "moment";

import TextInputList from "./TextInputList";
import ObjInputList from "./ObjInputList";
import SelectInput from "../../../components/inputs/SelectInput";
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
    packLength: 0,
    //Ref
    producerId: "", //producer model id
    customerIds: [] //customer model ids
  };

  onSubmit = e => {
    e.preventDefault();
    this.refs.submitBtn.setAttribute("disabled", "disabled");
    const { isValid, errObj } = validateOnSubmit(this.state);
    this.setState(() => ({ ...errObj }));

    if (!isValid) {
      this.refs.submitBtn.removeAttribute("disabled");
      return;
    }

    formatFieldValues(this.state);
  };

  onChange = e => {
    const { name, value } = e.target;
    const requiredField = resetRequiredFieldsErr(name);

    if (requiredField) {
      return this.setState(() => ({ [name]: value, [requiredField]: "" }));
    }
    this.setState(() => ({ [name]: value }));
  };

  onSelect = selectedOption => {
    const stateName = "producerId";
    const value = selectedOption ? selectedOption.value : "";
    this.setState(() => ({ [stateName]: value }));
  };

  render() {
    const { customerOptions, producerOptions } = this.props;
    const { producerId } = this.state;
    // when a message from the server arrives let the user resubmit the form
    if (this.props.msg) {
      if (this.refs && "submitBtn" in this.refs) {
        this.refs.submitBtn.removeAttribute("disabled");
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList state={this.state} cb={this.onChange} />
        <SelectInput
          options={producerOptions}
          label="Producer"
          name="producerName"
          cb={this.onSelect}
          selectedOption={producerId}
        />
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
