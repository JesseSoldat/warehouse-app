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
    searchOption: "productName",
    valueErr: "",
    value: this.props.query.value || "",
    value2: this.props.query.value2 || "",
    searchType: this.props.query.searchType || "string"
  };

  componentDidMount() {
    const { query } = this.props;
    this.getProducts(query);
  }

  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/products");
  }

  // api calls ----------------------------------
  getProducts = query => {
    const { startGetProducts } = this.props;
    const { value, value2, searchOption, searchType } = this.state;
    query["keyName"] = searchOption;
    query["searchType"] = searchType;
    query["value"] = value;
    query["value2"] = value2;
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
      value2: "",
      valueErr: ""
    }));
  };

  // Value Changed CB ----------------------------------
  onChangeSearchValue = e => {
    this.setState({ value: e.target.value, valueErr: "" });
  };

  onChangeSearchValue2 = e => {
    this.setState({ value2: e.target.value });
  };

  // SearchBtn CB ------------------------------
  onSearchProduct = e => {
    const { value } = this.state;
    if (!value) {
      this.setState({ valueErr: "This field can not be empty." });
      return;
    }

    const { query } = this.props;
    query["page"] = 1;
    query["skip"] = 0;
    this.getProducts(query);
  };

  onResetFilter = e => {
    this.setState(() => ({
      searchType: "string",
      searchOption: "productName",
      value: "",
      value2: "",
      valueErr: ""
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
        <Paginator query={query} cb1={this.getProducts} />
        <SearchBar
          // option
          searchOption={this.state.searchOption}
          // value
          value={this.state.value}
          value2={this.state.value2}
          valueErr={this.state.valueErr}
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
