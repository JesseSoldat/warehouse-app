import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import ProductForm from "./ProductForm";

class CreateProduct extends Component {
  componentDidMount() {}

  handleSubmit = form => {
    console.log("form", form);
  };

  render() {
    const { msg, loading } = this.props;
    let content, uiMsg;

    if (msg) {
      uiMsg = <Message msg={msg} />;
    }

    if (loading) {
      content = <Spinner />;
    } else {
      content = <ProductForm />;
    }

    return (
      <div className="container">
        {uiMsg}
        <Heading title="Create Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  loading: ui.loading
});

export default connect(mapStateToProps)(withRouter(CreateProduct));
