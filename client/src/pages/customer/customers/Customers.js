import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import CardList from "../../../components/CardList";
// helpers
import customerCardData from "./helpers/customerCardData";
// actions
import { startGetCustomers } from "../../../actions/customer";

class Customers extends Component {
  componentDidMount() {
    this.getCustomers();
  }

  getCustomers = () => {
    this.props.startGetCustomers();
  };

  render() {
    const { loading, customers } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else {
      content = <CardList data={customerCardData(customers)} />;
    }
    return (
      <div className="container">
        <Message cb={this.getCustomers} />
        <Heading title="Customers" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer }) => ({
  loading: ui.loading,
  customers: customer.customers
});

export default connect(
  mapStateToProps,
  { startGetCustomers }
)(Customers);
