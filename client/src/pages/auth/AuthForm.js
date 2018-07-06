import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AuthForm extends Component {
  state = {
    errors: {},
    email: "",
    password: "",
    confirmPassword: ""
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { loading, msg } = this.props;
    let content, uiMsg;

    if (msg) {
      uiMsg = msg;
    } else if (loading) {
      content = null;
    } else {
      content = (
        <form onSubmit={this.onSubmit} noValidate>
          <button className="btn btn-info btn-block mt-4">Submit</button>
        </form>
      );
    }

    return <div>{content}</div>;
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  msg: auth.msg
});

export default connect(mapStateToProps)(withRouter(AuthForm));
