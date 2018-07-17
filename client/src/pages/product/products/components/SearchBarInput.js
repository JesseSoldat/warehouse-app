import React from "react";

const SearchBarInput = ({ searchText, searchTextErr, onChangeSearchText }) => {
  return (
    <div className="col-xs-12 col-md-5 d-inline-block py-0 my-0">
      <div className="input-group">
        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="productInput">
            Text
          </label>
        </div>
        <input
          type="text"
          className={searchTextErr ? "form-control is-invalid" : "form-control"}
          value={searchText}
          placeholder="Seach Text"
          onChange={onChangeSearchText}
        />

        <div className="invalid-feedback">{searchTextErr}</div>
      </div>
    </div>

    // <div className="row p-0 m-0">
    //   <div className="col-xs-12 col-md-6 py-0 my-0" />
    //   <div className="col-xs-12 col-md-6 py-0 my-0">
    //     <small className="form-text text-muted py-0 my-0 pb-4 pl-2 pt-1 ">
    //       {infoMessage}
    //     </small>
    //   </div>
    // </div>
  );
};

export default SearchBarInput;
