import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import InfoCard from "./InfoCard";
// helpers
import createDetailsArray from "./helpers/createDetailsArray";
// utils
import createObjWithAllPropsAsArrays from "../../../utils/createObjWithAllPropsAsArrays";
// actions
import {
  startGetProductDetails,
  deleteProduct
} from "../../../actions/product";

class Product extends Component {
  componentDidMount() {
    this.getProduct();
  }

  // api calls ---------------------------------------
  getProduct = () => {
    const { startGetProductDetails, match } = this.props;
    const { productId } = match.params;
    startGetProductDetails(productId);
  };

  onDeleteProduct = () => {
    const { deleteProduct, match, history } = this.props;
    const { productId } = match.params;
    deleteProduct(productId, history);
  };

  render() {
    const { product, loading } = this.props;
    let content;

    if (loading || !product) {
      content = <Spinner />;
    } else {
      const { match, history } = this.props;
      const { productId } = match.params;

      const {
        // array ----------
        packagingPictures,
        productPictures,
        comments,
        productMaterial,
        customer: customers,
        // obj ----------
        producer,
        packagingMeasurments,
        productMeasurments,
        productLocation
      } = product;

      const defaultedObj = createObjWithAllPropsAsArrays([
        { packagingPictures },
        { productPictures },
        { comments },
        { productMaterial },
        { customers }
      ]);

      // Info Card
      const productDetails = createDetailsArray(product);

      content = (
        <div>
          <InfoCard
            pageName="Product"
            productId={productId}
            productDetails={productDetails}
            productPictures={defaultedObj.productPictures}
            packagingPictures={defaultedObj.packagingPictures}
            // cb
            deleteCb={this.onDeleteProduct}
            // router
            history={history}
          />
        </div>
      );
    }

    return (
      <div className="container">
        <Message cb={this.getProduct} />
        <Heading title="Product Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  loading: ui.loading,
  msg: ui.msg,
  product: product.product
});

export default connect(
  mapStateToProps,
  { startGetProductDetails, deleteProduct }
)(withRouter(Product));
