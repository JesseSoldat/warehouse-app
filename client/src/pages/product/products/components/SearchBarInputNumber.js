import React from "react";

const SearchBarInputNumber = ({ searchTextErr }) => {
  return (
    <div className="col-xs-12 col-md-5 d-inline-block py-0 my-0">
      <div className="input-group d-flex justify-content-between">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="productInput">
            Start
          </label>
        </div>
        <input
          type="number"
          className="form-control mr-2"
          placeholder="Number #1"
        />
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="productInput">
            End
          </label>
        </div>
        <input type="number" className="form-control" placeholder="Number #2" />

        <div className="invalid-feedback">{searchTextErr}</div>
      </div>
    </div>
  );
};

export default SearchBarInputNumber;
