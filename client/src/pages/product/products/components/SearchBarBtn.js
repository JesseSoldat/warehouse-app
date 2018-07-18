import React from "react";

const SearchBarBtn = ({ onSearchProduct, onResetFilter }) => {
  return (
    <div className="col-xs-12 col-md-3 d-inline-block py-0 my-0">
      <span>
        <label className="pt-4 mt-3">
          <small />
        </label>
        <button
          onClick={onSearchProduct}
          className="btn btn-primary mr-1"
          type="button"
        >
          Search
        </button>
        <button
          onClick={onResetFilter}
          className="btn btn-danger"
          type="button"
        >
          Reset Filter
        </button>
      </span>
    </div>
  );
};

export default SearchBarBtn;
