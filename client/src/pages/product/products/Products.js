import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Paginator from "./Paginator";
import CardList from "./CardList";
import { startGetProducts } from "../../../actions/product";

class Products extends Component {
  componentDidMount() {
    this.props.startGetProducts();
  }
  render() {
    const { msg, loading, products } = this.props;
    let content, uiMsg;

    if (msg) {
      uiMsg = <Message msg={msg} />;
    }
    if (loading) {
      content = <Spinner />;
    } else {
      content = <CardList products={products} />;
    }

    return (
      <div className="container">
        {uiMsg}
        <Heading title="Products" />

        <div className="row">
          <div className="col-12">
            <Paginator page="1" skip="2" limit="10" count="13" />
          </div>
        </div>

        <div className="row">
          <div className="col-11 d-flex justify-content-around flex-wrap m-auto">
            {content}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  msg: ui.msg,
  loading: ui.loading,
  products: product.products,
  page: product.page,
  count: product.count, // total amount of products
  filteredCount: product.filteredCount, // count after filter
  skip: product.skip,
  limit: product.limit
});

export default connect(
  mapStateToProps,
  { startGetProducts }
)(Products);
