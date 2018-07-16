import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// actions
import { changeRoute } from "../actions/router";

class RouteListener extends Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen(location => {
      // console.log("#1 FROM", this.props.match.path);
      // console.log("#2 TO", location.pathname);
      this.props.changeRoute(this.props.match.path, location.pathname);
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  { changeRoute }
)(withRouter(RouteListener));
