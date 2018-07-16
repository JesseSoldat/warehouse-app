import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtn from "../../../components/TopRowBtn";
import SingleFieldList from "../../../components/SingleFieldList";
// helpers
import producerListData from "./helpers/producerListData";
// actions
import { startGetProducer } from "../../../actions/producer";

class Producer extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };

  componentDidMount() {
    this.getProducer();
  }

  // api call
  getProducer = () => {
    const { producerId } = this.props.match.params;
    this.props.startGetProducer(producerId);
  };

  // events
  onDeleteProduct = () => {
    const { match, history } = this.props;
    const { productId } = match.params;
    console.log("delete");
    // deleteProduct(id, history);
  };

  onEdit = () => {
    const { match, history } = this.props;
    const { productId } = match.params;
    console.log("edit");
    // history.push(`/products/edit/${productId}`);
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
      // props
      const { match, history } = this.props;
      const { producerId } = match.params;

      content = <SingleFieldList data={producerListData(producer)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducer} />
        {producer && (
          <TopRowBtn
            bt1Disable={bt1Disable}
            bt2Disable={bt2Disable}
            btn1Cb={this.onDeleteProduct}
            btn2Cb={this.onEdit}
          />
        )}
        <Heading title="Producer" />
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
  { startGetProducer }
)(withRouter(Producer));
