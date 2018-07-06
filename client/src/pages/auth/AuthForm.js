import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import TextInput from "../../components/inputs/TextInput";
import Spinner from "../../components/Spinner";
import Message from "../../components/Message";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import formIsValid from "./formIsValid";

class AuthForm extends Component {
  state = {
    username: "",
    usernameErr: null,
    email: "",
    emailErr: null,
    password: "",
    passwordErr: null,
    confirmPassword: "",
    confirmPasswordErr: null
  };

  onChange = e => {
    const { name, value } = e.target;
    const error = name + "Err"; // reset any errors on target input
    this.setState(() => ({ [name]: value, [error]: null }));
  };

  registerFlow = () => {};

  loginFlow = () => {};

  onSubmit = e => {
    e.preventDefault();
    const { isValid, errObj } = formIsValid(this.state);
    if (!isValid) {
      this.setState(() => ({ ...errObj }));
    }

    switch (this.props.parent) {
      case "register":
        this.registerFlow();
        break;

      case "login":
        this.loginFlow();
        break;

      default:
        break;
    }
  };

  render() {
    const { loading, msg, parent } = this.props;

    const tempMsg = {
      type: "Post Error",
      details:
        "There was an problem while trying to post the auth-data. Please try again.",
      color: "danger",
      cb: null
    };

    const {
      username,
      usernameErr,
      email,
      emailErr,
      password,
      passwordErr,
      confirmPassword,
      confirmPasswordErr
    } = this.state;

    let content, uiMsg;

    if (msg) {
      const { type, details, color, cb } = tempMsg;
      uiMsg = <Message type={type} details={details} color={color} cb={cb} />;
    }
    if (loading && !uiMsg) {
      content = <Spinner />;
    } else {
      content = (
        <form onSubmit={this.onSubmit} noValidate>
          {parent === "register" && (
            <TextInput
              label="Username"
              placeholder="Username"
              name="username"
              onChange={this.onChange}
              error={usernameErr}
              value={username}
            />
          )}
          <TextInput
            label="Email"
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.onChange}
            error={emailErr}
            value={email}
          />
          <TextInput
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            onChange={this.onChange}
            error={passwordErr}
            value={password}
          />
          {parent === "register" && (
            <TextInput
              label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={this.onChange}
              error={confirmPasswordErr}
              value={confirmPassword}
            />
          )}
          <button className="btn btn-info btn-block mt-4">Submit</button>
        </form>
      );
    }

    return (
      <div>
        {uiMsg}
        <h2 className="text-center display-4">
          {capitalizeFirstLetter(parent)}
        </h2>
        {content}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  msg: auth.msg
});

export default connect(mapStateToProps)(withRouter(AuthForm));
