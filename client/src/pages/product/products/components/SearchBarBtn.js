import React from "react";

const SearchBarBtn = ({ onSearchProduct, onResetFilter }) => {
  return (
    <div className="col-xs-12 col-md-3 d-inline-block py-0 my-0">
      <button
        onClick={onSearchProduct}
        className="btn btn-primary mr-1"
        type="button"
      >
        Search
      </button>
      <button onClick={onResetFilter} className="btn btn-danger" type="button">
        Reset Filter
      </button>
    </div>
  );
};

export default SearchBarBtn;
