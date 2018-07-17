import React, { Component } from "react";
import { connect } from "react-redux";
// import Select from "react-select";

// components
import MultiSelectInput from "../../components/inputs/MultiSelectInput";
// utils
import clearUiMsg from "../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../actions/router";
import { serverMsg } from "../../actions/ui";

// used to test concepts
class PlayGround extends Component {
  state = {
    selectedCustomers: [
      { label: "Jesse", value: "123" },
      { label: "Anna", value: "456" }
    ]
  };

  componentWillUnmount() {
    const { msg, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, serverMsg);
    changeRoute("/admin/playGround");
  }

  onMultiSelect = selectedOptions => {
    console.log("onMulti", selectedOptions);
    const stateName = "selectedCustomers"; // array of selected obj
    // const value = selectedOptions ? selectedOptions : [];
    this.setState(() => ({ [stateName]: selectedOptions }));
  };

  render() {
    const { selectedCustomers } = this.state;
    const customerSelectOptions = [
      { label: "Jesse", value: "123" },
      { label: "Anna", value: "456" },
      { label: "Joe", value: "789" },
      { label: "Kelly", value: "321" }
    ];
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 mx-auto">
            <MultiSelectInput
              options={customerSelectOptions}
              selectedOptions={selectedCustomers}
              label="Customers"
              cb={this.onMultiSelect}
            />

            {/* <Select
              isMulti
              value={selectedCustomers}
              // defaultValue={selectedCustomers}
              options={customerSelectOptions}
              onChange={this.onMultiSelect}
              className="basic-multi-select"
              classNamePrefix="select"
            /> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute }
)(PlayGround);
