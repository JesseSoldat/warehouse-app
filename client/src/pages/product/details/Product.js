import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import InfoCard from "./InfoCard";
import LocationCard from "./LocationCard";
import ToggleListCard from "./ToggleListCard";
import MeasurmentCard from "./MeasurmentCard";
import ClientsCard from "./ClientsCard";
// helpers
import createDetailsArray from "./helpers/createDetailsArray";
import createLocationObj from "./helpers/createLocationObj";
import createMeasurmentsArray from "./helpers/createMeasurmentsArray";
import createProducerArray from "./helpers/createProducerArray";
import createCustomersArray from "./helpers/createCustomersArray";
// utils
import createObjWithAllPropsAsArrays from "../../../utils/createObjWithAllPropsAsArrays";
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  getProductDetails,
  startGetProductDetails,
  deleteProduct
} from "../../../actions/product";

class Product extends Component {
  componentDidMount() {
    this.getProduct();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products/:productId");
  }

  // api calls ---------------------------------------
  getProduct = () => {
    const { getProductDetails, startGetProductDetails, match } = this.props;
    const { productId } = match.params;
    // clear old data
    getProductDetails(null);
    // fetch new data
    startGetProductDetails(productId);
  };

  onDeleteProduct = () => {
    const { deleteProduct, match, history } = this.props;
    const { productId } = match.params;
    deleteProduct(productId, history);
  };

  onUnlinkProduct = () => {};

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

      // Card Data ----------------------------------------
      // Info Card
      const productDetails = createDetailsArray(product);
      // Location Card
      const locationDetails = createLocationObj(productLocation, productId);
      // MeasurmentCard
      const measurmentDetails = createMeasurmentsArray(
        productMeasurments,
        packagingMeasurments
      );
      // ClientsCard
      const producerDetails = createProducerArray(producer);
      const customersDetails = createCustomersArray(defaultedObj.customers);

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

          <LocationCard
            productId={productId}
            productLocationObj={locationDetails}
            // cb
            unlinkCb={this.onUnlinkProduct}
            history={history}
          />

          <ToggleListCard array={comments} label="Comments" />
          <ToggleListCard array={productMaterial} label="Materials" />

          {measurmentDetails.map((array, i) => (
            <MeasurmentCard array={array} key={i} />
          ))}

          {producerDetails.map((array, i) => (
            <ClientsCard array={array} key={i} />
          ))}

          {customersDetails.map((array, i) => (
            <ClientsCard array={array} key={i} />
          ))}
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
  options: ui.options,
  msg: ui.msg,
  product: product.product
});

export default connect(
  mapStateToProps,
  {
    serverMsg,
    changeRoute,
    getProductDetails,
    startGetProductDetails,
    deleteProduct
  }
)(withRouter(Product));
