import React, { Component } from "react";

// components
import TextInputList from "../../../components/inputs/TextInputList";
// helpers
import producerFieldData from "./helpers/producerFieldData";
// utils
import validateOnChange from "../../../utils/validation/validateOnChange";
import validateOnSubmit from "../../../utils/validation/validateOnSubmit";

class ProducerForm extends Component {
  state = {
    producerNameErr: "",
    producerName: "",
    producerContact: "",
    producerAddress: ""
  };

  // events ------------------------
  onSubmit = e => {
    e.preventDefault();
    this.refs.submitBtn.setAttribute("disabled", "disabled");

    const { isValid, errObj } = validateOnSubmit(producerFieldData, this.state);

    if (!isValid) {
      this.setState({ ...errObj });
      this.refs.submitBtn.removeAttribute("disabled");
      return;
    }

    this.refs.submitBtn.removeAttribute("disabled");

    //this.props.handleSubmit(this.state);
  };

  onChange = e => {
    const { name, value } = e.target;
    const { shouldRemoveError, newErrorState } = validateOnChange(
      producerFieldData,
      name,
      value
    );
    if (shouldRemoveError) {
      console.log(newErrorState);

      this.setState({ [name]: value, ...newErrorState });
      return;
    }
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <TextInputList
          data={producerFieldData}
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

export default ProducerForm;
