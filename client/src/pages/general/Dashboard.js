import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// components
import Message from "../../components/Message";
import Heading from "../../components/Heading";
// utils
import clearUiMsg from "../../utils/clearUiMsg";
// actions
import { changeRoute } from "../../actions/router";
import { serverMsg } from "../../actions/ui";

class Dashboard extends Component {
  componentWillUnmount() {
    const { msg, options, serverMsg, changeRoute } = this.props;
    clearUiMsg(msg, options, serverMsg);
    changeRoute("/dashboard");
  }

  render() {
    return (
      <div className="container">
        <Message />
        <Heading title="Dashboard" />
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-between my-4">
            <div
              className="card mr-1 ml-1 mb-3 col-xs-12 col-md-5 col-lg-3"
              style={{ minHeight: "11rem" }}
            >
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title text-center pt-2">
                  Search & Edit Products
                </h5>
                <p className="card-text">Search and edit products here</p>
                <Link to="/products/search">Go!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  msg: ui.msg,
  options: ui.options
});

export default connect(
  mapStateToProps,
  { serverMsg, changeRoute }
)(Dashboard);
