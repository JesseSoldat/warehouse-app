import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import ProductForm from "./ProductForm";
// helpers
import getInitialState from "./helpers/getInitialState";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  getProductDetails,
  createProduct,
  startGetClients
} from "../../../actions/product";

class CreateProduct extends Component {
  componentDidMount() {
    this.props.getProductDetails(null);
    this.getFormData();
  }

  componentWillUnmount() {
    const { msg, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, serverMsg);
    changeRoute("/products/create");
  }

  // load api data -----------
  getFormData = () => {
    this.props.startGetClients();
  };

  // handle cb ---------------
  handleSubmit = form => {
    this.props.createProduct(form, this.props.history);
  };

  handleSendMsg = msg => {
    this.props.serverMsg(msg);
  };

  render() {
    const { msg, loading, customers, producers } = this.props;
    let content;

    // set product default to child component's state
    const productObj = getInitialState();
    // No selected producers or customers during creation
    // Product form uses these during Edit mode
    const selectedProducer = "";
    const selectedCustomers = [];

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <ProductForm
          msg={msg}
          productObj={productObj}
          producerOptions={producers}
          selectedProducer={selectedProducer}
          selectedCustomers={selectedCustomers}
          customerOptions={customers}
          handleSendMsg={this.handleSendMsg}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.props.startGetClients} />
        <Heading title="Create Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer, producer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  producers: producer.producers, // select options
  customers: customer.customers // select options
});

export default connect(
  mapStateToProps,
  {
    getProductDetails,
    createProduct,
    startGetClients,
    serverMsg,
    changeRoute
  }
)(withRouter(CreateProduct));
