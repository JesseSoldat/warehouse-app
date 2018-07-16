import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import ProducerForm from "./ProducerForm";
// actions
import { startCreateProducer } from "../../../actions/producer";

const CreateProducer = ({ loading, history, startCreateProducer }) => {
  const handleSubmit = formData => {
    startCreateProducer(formData, history);
  };

  let content;
  if (loading) {
    content = <Spinner />;
  } else {
    content = <ProducerForm handleSubmit={handleSubmit} />;
  }

  return (
    <div className="container">
      <Message />
      <Heading title="Create Producer" />
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
  { startCreateProducer }
)(withRouter(CreateProducer));
