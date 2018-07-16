import React from "react";

const TopRowBtn = ({
  bt1Disable = false,
  btn2Disable = false,
  btn1Cb,
  btn2Cb
}) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="float-right">
          <button
            disabled={bt1Disable}
            className="btn btn-danger mr-1"
            onClick={btn1Cb}
          >
            Delete
          </button>
          <button
            disabled={btn2Disable}
            className="btn btn-primary"
            onClick={btn2Cb}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRowBtn;
