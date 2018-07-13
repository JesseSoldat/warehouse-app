import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import ProductForm from "./ProductForm";
// helpers
import getInitialProductState from "./helpers/getInitialProductState";
import getEditStateObj from "./helpers/getEditStateObj";
// actions
import {
  getProductDetails,
  startGetProductWithClients,
  editProduct
} from "../../../actions/product";
import { serverMsg } from "../../../actions/ui";

class EditProduct extends Component {
  componentDidMount() {
    this.getFormData();
  }

  getFormData = () => {
    const { productId } = this.props.match.params;
    this.props.getProductDetails(null);
    this.props.startGetProductWithClients(productId);
  };

  handleSubmit = form => {
    const { productId } = this.props.match.params;
    this.props.editProduct(productId, form, this.props.history);
  };

  handleSendMsg = msg => {
    this.props.serverMsg(msg);
  };

  render() {
    const { msg, product, loading, producers, customers } = this.props;

    let selectedProducer = "";
    let selectedCustomers = [];

    let productObj = getInitialProductState();

    if (product) {
      productObj = getEditStateObj(product);

      const { producer, customer } = product;
      if (producer) {
        selectedProducer = {
          label: producer.producerName,
          value: producer._id
        };
      }
      if (customer) {
        selectedCustomers = customer.map(obj => ({
          label: obj.customerName,
          value: obj._id
        }));
      }
    }

    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <ProductForm
          msg={msg}
          productObj={productObj}
          product={product}
          producerOptions={producers}
          selectedProducer={selectedProducer}
          customerOptions={customers}
          selectedCustomers={selectedCustomers}
          handleSendMsg={this.handleSendMsg}
          handleSubmit={this.handleSubmit}
        />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getFormData} />
        <Heading title="Edit Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product, producer, customer }) => {
  return {
    product: product.product,
    loading: ui.loading,
    msg: ui.msg,
    producers: producer.producers,
    customers: customer.customers
  };
};
export default connect(
  mapStateToProps,
  { serverMsg, getProductDetails, startGetProductWithClients, editProduct }
)(withRouter(EditProduct));
