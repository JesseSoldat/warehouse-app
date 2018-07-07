import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Heading from "../../../components/Heading";

class Products extends Component {
  render() {
    let content, uiMsg;

    return (
      <div className="container">
        {uiMsg}
        <Heading title="Products" />

        <div className="row">
          <div className="col-12">
            <h3>Paginator</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null)(Products);
