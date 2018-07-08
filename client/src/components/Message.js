import React from "react";
import { connect } from "react-redux";

import { serverMsg } from "../actions/ui";

const Message = ({ uiMsg, serverMsg, cb = null }) => {
  const closeMessage = () => {
    serverMsg(null);
  };

  const showMsgContainer = (
    <div
      className="row mt-1"
      id="showMsgContainer"
      style={{ height: "70px" }}
    />
  );

  const renderMsg = () => {
    if (uiMsg) {
      const { heading, details, color } = uiMsg;

      const showMsg = (
        <div className="row">
          <div className="col-xs-12 col-md-8 mx-auto">
            <div className="mt-1">
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
      return showMsg;
    } else {
      return showMsgContainer;
    }
  };

  return renderMsg();
};

const mapStateToProps = ({ ui }) => ({
  uiMsg: ui.msg
});

export default connect(
  mapStateToProps,
  { serverMsg }
)(Message);
