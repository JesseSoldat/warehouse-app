import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Heading from "../../../components/Heading";
import Message from "../../../components/Message";
import Spinner from "../../../components/Spinner";
import TopRowBtns from "../../../components/TopRowBtns";
import CustomerForm from "./CustomerForm";
// actions
import { startGetCustomer, startEditCustomer } from "../../../actions/customer";

class EditCustomer extends Component {
  componentDidMount() {
    this.getCustomer();
  }

  getCustomer = () => {
    const { customerId } = this.props.match.params;
    this.props.startGetCustomer(customerId);
  };

  handleSubmit = formData => {
    const { customerId } = this.props.match.params;
    this.props.startEditCustomer(customerId, formData, this.props.history);
  };

  goBack = () => {
    const { from, history, match } = this.props;
    const { customerId } = match.params;

    switch (from) {
      case "/customers":
        history.push("/customers");
        return;

      case "/customers/:customerId":
        history.push(`/customers/${customerId}`);
        return;

      default:
        history.push("/customers");
        break;
    }
  };

  render() {
    const { loading, customer } = this.props;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!customer) {
    } else {
      content = (
        <CustomerForm handleSubmit={this.handleSubmit} data={customer} />
      );
    }

    return (
      <div className="container">
        <Message cb={this.getCustomer} />
        <TopRowBtns btn0Cb={this.goBack} />
        <Heading title="Edit Customer" />
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">{content}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui, router, customer }) => ({
  loading: ui.loading,
  from: router.from,
  customer: customer.customer
});

export default connect(
  mapStateToProps,
  { startGetCustomer, startEditCustomer }
)(withRouter(EditCustomer));
