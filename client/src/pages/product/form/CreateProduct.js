import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import ProductForm from "./ProductForm";
import { startGetClients } from "../../../actions/product";

class CreateProduct extends Component {
  componentDidMount() {
    this.props.startGetClients();
  }

  handleSubmit = form => {
    console.log("form", form);
  };

  render() {
    const { msg, loading, customers, producers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = (
        <ProductForm
          msg={msg}
          customerOptions={customers}
          producerOptions={producers}
        />
      );
    }

    return (
      <div className="container">
        <Message />
        <Heading title="Create Product" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer, producer }) => ({
  msg: ui.msg,
  loading: ui.loading,
  producers: producer.producers, // select options
  customers: customer.customers // select options
});

export default connect(
  mapStateToProps,
  { startGetClients }
)(withRouter(CreateProduct));
