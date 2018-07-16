import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { startGetProducers } from "../../../actions/producer";

class Producers extends Component {
  componentDidMount() {
    this.props.startGetProducers();
  }

  render() {
    console.log(this.props.producers);

    return <div />;
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
