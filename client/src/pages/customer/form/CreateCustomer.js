import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CustomerForm from "./CustomerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startCreateCustomer } from "../../../actions/customer";

class CreateCustomer extends Component {
  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/customers/create");
  }

  handleSubmit = formData => {
    const { history, startCreateCustomer } = this.props;
    startCreateCustomer(formData, history);
  };

  render() {
    const data = {
      customerName: "",
      customerContact: "",
      customerAddress: ""
    };

    let content;

    if (this.props.loading) {
      content = <Spinner />;
    } else {
      content = <CustomerForm handleSubmit={this.handleSubmit} data={data} />;
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Create Customer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 m-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startCreateCustomer }
)(withRouter(CreateCustomer));
