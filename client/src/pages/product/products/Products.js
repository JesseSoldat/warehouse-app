import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Paginator from "./Paginator";
import CardList from "./CardList";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import {
  startGetProducts,
  startGetProductsQuery
} from "../../../actions/product";

class Products extends Component {
  componentDidMount() {
    this.getProducts();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products");
  }

  // api calls ----------------------------------
  getProducts = () => {
    const { query, startGetProducts } = this.props;
    startGetProducts(query);
  };

  getProductsQuery = query => {
    const { startGetProductsQuery } = this.props;
    this.props.query.keyName = "productName";
    this.props.query.value = "Generic Granite Bacon";
    console.log("query", this.props.query);
    startGetProductsQuery(this.props.query);
  };

  render() {
    const { loading, products, query } = this.props;

    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = <CardList products={products} />;
    }

    return (
      <div className="container">
        <Message cb={this.getProducts} />
        <Heading title="Products" />
        <Paginator query={query} cb1={this.getProductsQuery} />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  msg: ui.msg,
  options: ui.options,
  loading: ui.loading,
  products: product.products,
  query: product.query
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducts, startGetProductsQuery }
)(Products);
