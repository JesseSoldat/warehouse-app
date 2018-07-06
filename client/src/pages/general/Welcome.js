import React from "react";
import { connect } from "react-redux";

import { startGetAllUsers } from "../../actions/admin";

const Welcome = ({ startGetAllUsers }) => (
  <div className="welcomepage">
    <div className="dark-overlay text-light">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="display-3 mb-4 mt-5">SaR-Application</h1>
            <button className="btn btn-primary" onClick={startGetAllUsers}>
              Get Users
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default connect(
  null,
  { startGetAllUsers }
)(Welcome);
