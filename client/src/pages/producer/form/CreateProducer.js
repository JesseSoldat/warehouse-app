import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import ProducerForm from "./ProducerForm";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startCreateProducer } from "../../../actions/producer";

class CreateProducer extends Component {
  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/producers/create");
  }

  handleSubmit = formData => {
    const { history, startCreateProducer } = this.props;
    startCreateProducer(formData, history);
  };

  render() {
    const { loading } = this.props;

    const data = {
      producerName: "",
      producerContact: "",
      producerAddress: ""
    };

    let content;
    if (loading) {
      content = <Spinner />;
    } else {
      content = <ProducerForm handleSubmit={this.handleSubmit} data={data} />;
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
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startCreateProducer }
)(withRouter(CreateProducer));
