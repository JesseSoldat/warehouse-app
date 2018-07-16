import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtns from "../../../components/TopRowBtns";
import SingleFieldList from "../../../components/SingleFieldList";
// helpers
import producerListData from "./helpers/producerListData";
// actions
import { startGetProducer } from "../../../actions/producer";
import { serverMsg } from "../../../actions/ui";

class Producer extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };

  componentDidMount() {
    this.getProducer();
  }

  componentWillUnmount() {
    this.props.serverMsg(null);
  }

  goBack = () => {
    this.props.history.push("/producers");
  };

  // api call
  getProducer = () => {
    const { producerId } = this.props.match.params;
    this.props.startGetProducer(producerId);
  };

  // events
  onDeleteProduct = () => {
    const { match, history } = this.props;
    const { producerId } = match.params;
    console.log("delete");
    // deleteProduct(id, history);
  };

  onEdit = () => {
    const { match, history } = this.props;
    const { producerId } = match.params;
    history.push(`/producers/edit/${producerId}`);
  };

  render() {
    // props
    const { loading, producer } = this.props;
    // state
    const { bt1Disable, bt2Disable } = this.state;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!producer) {
      // dispatch a msg that no producer was found
      console.log("No producer found");
    } else {
      content = <SingleFieldList data={producerListData(producer)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducer} />
        {producer && (
          <TopRowBtns
            bt1Disable={bt1Disable}
            bt2Disable={bt2Disable}
            btn0Cb={this.goBack}
            btn1Cb={this.onDeleteProduct}
            btn2Cb={this.onEdit}
            showRightBtns={true}
          />
        )}
        <Heading title="Producer Details" />
        {content}
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
  { startGetProducer, serverMsg }
)(withRouter(Producer));
