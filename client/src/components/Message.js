import React from "react";

const Message = ({ type, details, color, cb }) => {
  return (
    <div className="mt-3">
      <div
        className={`alert alert-${color} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{type}: </strong> {details}
        <button
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
  );
};

export default Message;
