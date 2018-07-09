import React, { Component } from "react";
import { connect } from "react-redux";

import { startGetAllUsers } from "../../actions/admin";

class ManageUsers extends Component {
  componentDidMount() {
    this.getAllUser();
  }

  getAllUser = () => {
    this.props.startGetAllUsers();
  };

  render() {
    return <div />;
  }
}

export default connect(
  null,
  { startGetAllUsers }
)(ManageUsers);
