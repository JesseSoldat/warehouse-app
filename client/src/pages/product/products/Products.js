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
    value: "",
    valueErr: "",
    value2: "",
    value2Err: "",
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
    let searchType;

    switch (value) {
      case "productName":
      case "brandName":
        searchType = "string";
        break;

      case "price":
      case "productLabel":
        searchType = "number";
        break;

      case "manufacturingDate":
        searchType = "date";
        break;

      default:
        searchType = "string";
        break;
    }

    this.setState(() => ({
      searchType,
      searchOption: value,
      value: "",
      valueErr: "",
      value2: "",
      value2Err: ""
    }));
  };

  // Value Changed CB ----------------------------------
  onChangeSearchValue = e => {
    this.setState({ value: e.target.value });
  };

  onChangeSearchValue2 = e => {
    this.setState({ value2: e.target.value });
  };

  // SearchBtn CB ------------------------------
  onSearchProduct = e => {
    const { value, value2 } = this.state;
    console.log("value:", value, "value2:", value2);
  };

  onResetFilter = e => {
    this.setState(() => ({
      searchType: "string",
      searchOption: "productName",
      value: "",
      valueErr: "",
      value2: "",
      value2Err: ""
    }));
  };

  render() {
    // props
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
        <SearchBar
          // option
          searchOption={this.state.searchOption}
          searchOptionErr={this.state.searchOptionErr}
          // value
          value={this.state.value}
          valueErr={this.state.valueErr}
          value2={this.state.value2}
          value2Err={this.state.value2Err}
          // type
          searchType={this.state.searchType}
          // CB
          onChangeSearchOption={this.onChangeSearchOption}
          onChangeSearchValue={this.onChangeSearchValue}
          onChangeSearchValue2={this.onChangeSearchValue2}
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
