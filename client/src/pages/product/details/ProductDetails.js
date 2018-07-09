import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import { startGetProductDetails } from "../../../actions/product";

class ProductDetails extends Component {
  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    const { startGetProductDetails, match } = this.props;
    const { productId } = match.params;
    startGetProductDetails(productId);
  };

  render() {
    return (
      <div className="container">
        <Message />
        <Heading title="Product Details" />
        <div className="row">
          <div className="col-12" />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { startGetProductDetails }
)(ProductDetails);
