import React, { Component } from "react";

// components
import TextInputList from "../../../components/inputs/TextInputList";
// helpers
import customerFieldData from "./helpers/customerFieldData";
// utils
import validateOnChange from "../../../utils/validation/validateOnChange";
import validateOnSubmit from "../../../utils/validation/validateOnSubmit";

class CustomerForm extends Component {
  state = {
    customerNameErr: "",
    customerName: "",
    customerContact: "",
    customerAddress: ""
  };

  // events ------------------------
  onSubmit = e => {
    e.preventDefault();
    this.refs.submitBtn.setAttribute("disabled", "disabled");

    const { isValid, errObj } = validateOnSubmit(customerFieldData, this.state);

    if (!isValid) {
      this.setState({ ...errObj });
      this.refs.submitBtn.removeAttribute("disabled");
      return;
    }

    this.props.handleSubmit({
      customerName: this.state.customerName,
      customerContact: this.state.customerContact,
      customerAddress: this.state.customerAddress
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    // newErrorState will be null || obj with errors
    const newErrorState = validateOnChange(customerFieldData, { name, value });

    if (newErrorState) {
      this.setState({ [name]: value, ...newErrorState });
      return;
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList
          data={customerFieldData}
          state={this.state}
          cb={this.onChange}
        />
        <input
          ref="submitBtn"
          type="submit"
          value="Submit"
          className="btn btn-info btn-block mt-4"
        />
      </form>
    );
  }
}

export default CustomerForm;
