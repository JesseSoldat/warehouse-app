import React, { Component } from "react";
import { connect } from "react-redux";

// utils
import clearUiMsg from "../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../actions/router";
import { serverMsg } from "../../actions/ui";
import { startGetAllUsers } from "../../actions/admin";

class ManageUsers extends Component {
  componentDidMount() {
    this.getAllUser();
  }

  componentWillUnmount() {
    const { msg, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, serverMsg);
    changeRoute("/admin/manageUsers");
  }

  getAllUser = () => {
    this.props.startGetAllUsers();
  };

  render() {
    return <div />;
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute, startGetAllUsers }
)(ManageUsers);
