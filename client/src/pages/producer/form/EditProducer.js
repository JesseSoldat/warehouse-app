import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import TopRowBtns from "../../../components/TopRowBtns";
import ProducerForm from "./ProducerForm";
// actions
import { startGetProducer, startEditProducer } from "../../../actions/producer";

class EditProducer extends Component {
  componentDidMount() {
    this.getProducer();
  }

  getProducer = () => {
    const { producerId } = this.props.match.params;
    this.props.startGetProducer(producerId);
  };

  handleSubmit = formData => {
    const { producerId } = this.props.match.params;
    this.props.startEditProducer(producerId, formData, this.props.history);
  };

  goBack = () => {
    console.log(this.props.match);
  };

  render() {
    const { loading, producer } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!producer) {
    } else {
      content = (
        <ProducerForm handleSubmit={this.handleSubmit} data={producer} />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getProducer} />
        <TopRowBtns btn0Cb={this.goBack} />
        <Heading title="Edit Producer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, producer }) => ({
  loading: ui.loading,
  producer: producer.producer
});

export default connect(
  mapStateToProps,
  { startGetProducer, startEditProducer }
)(withRouter(EditProducer));
