import React from "react";

const SearchBarInputNumber = ({
  value,
  value2,
  valueErr,
  info,
  onChangeSearchValue,
  onChangeSearchValue2
}) => {
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
          className={
            valueErr ? "form-control is-invalid mr-2" : "form-control mr-2"
          }
          placeholder="Number #1"
          value={value}
          onChange={onChangeSearchValue}
        />

        <div className="input-group-prepend">
          <label className="input-group-text" htmlFor="productInput">
            End
          </label>
        </div>
        <input
          type="number"
          className="form-control"
          placeholder="Number #2"
          value={value2}
          onChange={onChangeSearchValue2}
        />
      </div>

      <div>
        {!valueErr ? (
          <small className="form-text text-muted py-0 my-0 pl-2 pt-1 ">
            {info}
          </small>
        ) : (
          <small
            className="form-text py-0 my-0 pl-2 pt-1"
            style={{ color: "red" }}
          >
            {valueErr}
          </small>
        )}
      </div>
    </div>
  );
};

export default SearchBarInputNumber;
