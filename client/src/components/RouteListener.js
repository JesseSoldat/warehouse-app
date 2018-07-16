import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RouteListener extends Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen(location => {
      console.log("#1 FROM", this.props.match.path);

      console.log("#2 TO", location.pathname);
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return <div />;
  }
}

export default withRouter(RouteListener);
