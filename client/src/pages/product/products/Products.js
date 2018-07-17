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
import { startGetProducts } from "../../../actions/product";

class Products extends Component {
  componentDidMount() {
    this.getProducts();
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products");
  }

  getProducts = () => {
    const { skip, limit } = this.props;
    this.props.startGetProducts(skip, limit);
  };

  getProductsQuery = () => {
    console.log("query");
  };

  render() {
    const {
      loading,
      products,
      page,
      count,
      // filteredCount,
      skip,
      limit
    } = this.props;

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
        <div className="row">
          <div className="col-12">
            <Paginator
              page={page}
              skip={skip}
              limit={limit}
              count={count}
              getProductsQuery={this.getProductsQuery}
            />
          </div>
        </div>

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
  page: product.page,
  count: product.count, // total amount of products
  filteredCount: product.filteredCount, // count after filter
  skip: product.skip,
  limit: product.limit
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetProducts }
)(Products);
