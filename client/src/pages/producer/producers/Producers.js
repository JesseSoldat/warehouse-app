import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/CardList";
// helpers
import producerCardData from "./helpers/producerCardData";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  componentDidMount() {
    this.getProducers();
  }

  componentWillUnmount() {
    const { msg, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, serverMsg);
    changeRoute("/producers");
  }

  getProducers = () => {
    this.props.startGetProducers();
  };

  render() {
    const { loading, producers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = <CardList data={producerCardData(producers)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducers} />
        <Heading title="Producers" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, producer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducers }
)(Producers);
