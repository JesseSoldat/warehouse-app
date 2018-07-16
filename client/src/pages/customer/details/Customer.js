import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// components
import Spinner from "../../../components/Spinner";
import Message from "../../../components/Message";
import Heading from "../../../components/Heading";
import TopRowBtns from "../../../components/TopRowBtns";
import SingleFieldList from "../../../components/SingleFieldList";
// helpers
import customerListData from "./helpers/customerListData";
// actions
import {
  startGetCustomer,
  startDeleteCustomer
} from "../../../actions/customer";

class Customer extends Component {
  state = {
    bt1Disable: false,
    bt2Disable: false
  };

  componentDidMount() {
    this.getCustomer();
  }

  goBack = () => {
    this.props.history.push("/customers");
  };
  // api call
  getCustomer = () => {
    const { customerId } = this.props.match.params;
    this.props.startGetCustomer(customerId);
  };

  // events
  onDeleteCustomer = () => {
    this.setState({ bt1Disable: true });
    const { startDeleteCustomer, match, history } = this.props;
    const { customerId } = match.params;
    startDeleteCustomer(customerId, history);
  };

  onEditCustomer = () => {
    const { match, history } = this.props;
    const { customerId } = match.params;
    history.push(`/customers/edit/${customerId}`);
  };

  render() {
    // props
    const { loading, customer } = this.props;
    // state
    const { bt1Disable, bt2Disable } = this.state;
    let content;

    if (loading) {
      content = <Spinner />;
    } else if (!customer) {
      // dispatch a msg that no customer was found
      console.log("No customer found");
    } else {
      content = <SingleFieldList data={customerListData(customer)} />;
    }

    return (
      <div className="container">
        <Message cb={this.getCustomer} />
        {customer && (
          <TopRowBtns
            bt1Disable={bt1Disable}
            bt2Disable={bt2Disable}
            btn0Cb={this.goBack}
            btn1Cb={this.onDeleteCustomer}
            btn2Cb={this.onEditCustomer}
            showRightBtns={true}
          />
        )}
        <Heading title="Customer Details" />
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ ui, customer }) => ({
  loading: ui.loading,
  customer: customer.customer
});

export default connect(
  mapStateToProps,
  { startGetCustomer, startDeleteCustomer }
)(Customer);
