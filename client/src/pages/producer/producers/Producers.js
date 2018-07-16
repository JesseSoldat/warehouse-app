import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/CardList";
// helpers
import producerCardData from "./helpers/producerCardData";
// actions
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  componentDidMount() {
    this.getProducers();
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
  loading: ui.loading,
  producers: producer.producers
});

export default connect(
  mapStateToProps,
  { startGetProducers }
)(Producers);
