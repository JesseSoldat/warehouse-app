import React from "react";
import { connect } from "react-redux";

import { serverMsg } from "../actions/ui";

const Message = ({ msg, serverMsg }) => {
  const { heading, details, color, cb } = msg;
  const closeMessage = () => {
    serverMsg(null);
  };

  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 mx-auto">
        <div className="mt-3">
          <div
            className={`alert alert-${color} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{heading}: </strong> {details}
            <button
              onClick={closeMessage}
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {cb && (
              <button className="btn btn-primary" onClick={cb}>
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { serverMsg }
)(Message);
