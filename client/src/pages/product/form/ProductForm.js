import React, { Component } from "react";
import moment from "moment";

// components
import TextInputList from "./TextInputList";
import ObjInputList from "./ObjInputList";
import SelectInput from "../../../components/inputs/SelectInput";
import MultiSelectInput from "../../../components/inputs/MultiSelectInput";
import DatePickerInput from "../../../components/inputs/DatePickerInput";
// helpers
import resetRequiredFieldsErr from "./helpers/resetRequiredFieldsErr";
import formatClientSelectOptions from "./helpers/formatClientSelectOptions";
import validateOnSubmit from "./helpers/validateOnSubmit";
import formatFormValues from "./helpers/formatFormValues";
import getEditStateObj from "./helpers/getEditStateObj";

class ProductForm extends Component {
  state = {
    //errors----------------
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
    selectedProducer: this.props.selectedProducer,
    selectedCustomers: this.props.selectedCustomers
      ? this.props.selectedCustomers
      : []
  };

  // Edit Product flow ---------------------------------------
  componentWillReceiveProps(nextProps) {
    const { product } = nextProps;
    // product is only passed during edit mode
    if (product) {
      this.setStateWithProductDetails(product);
    }
  }

  setStateWithProductDetails = product => {
    const editStateObj = getEditStateObj(product);
    this.setState(() => ({ ...editStateObj }));
  };

  // Events --------------------------------
  onSubmit = e => {
    const { handleSendMsg, handleSubmit } = this.props;
    e.preventDefault();
    // don't allow the user to submit more than once
    this.refs.submitBtn.setAttribute("disabled", "disabled");
    // clear any messages from the server
    handleSendMsg(null);

    const { isValid, errObj } = validateOnSubmit(this.state);

    if (!isValid) {
      // allow user to submit form again
      this.refs.submitBtn.removeAttribute("disabled");
      this.setState(() => ({ ...errObj }));
      // TODO add smooth scrolling
      // scroll to the message since the form is long
      window.scrollTo(0, 0);
      return;
    }

    const formattedValues = formatFormValues(this.state);

    handleSubmit(formattedValues);
  };

  onChange = e => {
    const { name, value } = e.target;
    const requiredField = resetRequiredFieldsErr(name);

    if (requiredField) {
      return this.setState(() => ({ [name]: value, [requiredField]: "" }));
    }
    this.setState(() => ({ [name]: value }));
  };

  // Select
  onSelect = selectedOption => {
    const stateName = "selectedProducer";
    const value = selectedOption ? selectedOption : "";
    this.setState(() => ({ [stateName]: value }));
  };

  onMultiSelect = selectedOptions => {
    const stateName = "selectedCustomers"; // array of selected obj
    const value = selectedOptions ? selectedOptions : [];
    this.setState(() => ({ [stateName]: value }));
  };

  // Date
  handleDateChange = manufacturingDate => {
    this.setState({ manufacturingDate });
  };

  handleCheck = () => {
    this.setState({ dateCheckbox: !this.state.dateCheckbox });
  };

  render() {
    const { msg, producerOptions, customerOptions } = this.props; //customerOptions
    const {
      selectedProducer,
      selectedCustomers, // edit mode
      manufacturingDate,
      dateCheckbox
    } = this.state;

    // transform raw api data to work with react-select api
    const {
      producerSelectOptions,
      customerSelectOptions
    } = formatClientSelectOptions(producerOptions, customerOptions);

    // when a message from the server arrives let the user resubmit the form
    if (msg) {
      if (this.refs && "submitBtn" in this.refs) {
        this.refs.submitBtn.removeAttribute("disabled");
      }
    }

    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList state={this.state} cb={this.onChange} />
        <DatePickerInput
          dateLabel="Manufacturing Date"
          checkLabel="Use this date"
          date={manufacturingDate}
          checked={dateCheckbox}
          handleDateChange={this.handleDateChange}
          handleCheck={this.handleCheck}
        />
        <SelectInput
          options={producerSelectOptions}
          label="Producer"
          name="producerName"
          cb={this.onSelect}
          selectedOption={selectedProducer}
        />

        <MultiSelectInput
          options={customerSelectOptions}
          selectedOptions={selectedCustomers}
          label="Customers"
          cb={this.onMultiSelect}
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
