import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import Paginator from "./components/Paginator";
import SearchBar from "./components/SearchBar";
import CardList from "./components/CardList";
// utils
import clearUiMsg from "../../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../../actions/router";
import { serverMsg } from "../../../actions/ui";
import { startGetProducts } from "../../../actions/product";

class Products extends Component {
  state = {
    searchOption: "",
    searchOptionErr: "",
    searchText: "",
    searchTextErr: "",
    searchType: "string"
  };

  componentDidMount() {
    this.getProducts(this.props.query);
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products");
  }

  // api calls ----------------------------------
  getProducts = query => {
    const { startGetProducts } = this.props;
    startGetProducts(query);
  };
  // TODO this will be merged with above
  getProductsQuery = query => {
    const { startGetProducts } = this.props;
    query.searchType = "string";
    query.keyName = "productName";
    query.value = "Generic Granite Bacon";
    startGetProducts(query);
  };

  // SearchBar CB ------------------------------
  onChangeSearchOption = e => {
    const { value } = e.target;

    switch (value) {
      case "default":
      case "productName":
      case "brandName":
        this.setState(() => ({ searchType: "string" }));
        break;

      case "price":
      case "productLabel":
        this.setState(() => ({ searchType: "number" }));
        break;

      case "manufacturingDate":
        this.setState(() => ({ searchType: "date" }));
        break;

      default:
        this.setState(() => ({ searchType: "string" }));
        break;
    }
  };

  // SearchBtn CB ------------------------------
  onSearchProduct = e => {};

  onResetFilter = e => {};

  onChangeSearchText = e => {};

  render() {
    // props
    const { loading, products, query } = this.props;
    // state
    const {
      searchOption,
      searchOptionErr,
      searchText,
      searchTextErr,
      searchType
    } = this.state;

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
        <SearchBar
          // option
          searchOption={searchOption}
          searchOptionErr={searchOptionErr}
          // text
          searchText={searchText}
          searchTextErr={searchTextErr}
          // type
          searchType={searchType}
          // CB
          onChangeSearchOption={this.onChangeSearchOption}
          onChangeSearchText={this.onChangeSearchText}
          onSearchProduct={this.onSearchProduct}
          onResetFilter={this.onResetFilter}
        />
        <div style={{ height: "15px" }} />
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
  { serverMsg, changeRoute, startGetProducts }
)(Products);
