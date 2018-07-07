import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Paginator from "./Paginator";
import { startGetProducts } from "../../../actions/product";

class Products extends Component {
  componentDidMount() {
    this.props.startGetProducts();
  }
  render() {
    const { msg } = this.props;
    let content, uiMsg;

    if (msg) {
      uiMsg = <Message msg={msg} />;
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
      </div>
    );
  }
}

const mapStateToProps = ({ ui, product }) => ({
  msg: ui.msg,
  loading: ui.loading,
  products: product.products
});

export default connect(
  mapStateToProps,
  { startGetProducts }
)(Products);
