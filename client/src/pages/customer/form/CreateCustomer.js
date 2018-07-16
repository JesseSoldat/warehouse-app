import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CustomerForm from "./CustomerForm";
// actions
import { startCreateCustomer } from "../../../actions/customer";

const CreateCustomer = ({ loading, history, startCreateCustomer }) => {
  const handleSubmit = formData => {
    startCreateCustomer(formData, history);
  };

  let content;
  if (loading) {
    content = <Spinner />;
  } else {
    content = <CustomerForm handleSubmit={handleSubmit} />;
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
};

const mapStateToProps = ({ ui }) => ({
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { startCreateCustomer }
)(withRouter(CreateCustomer));
