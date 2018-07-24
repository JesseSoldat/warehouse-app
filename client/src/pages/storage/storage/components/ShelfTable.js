import React from "react";
import { Link } from "react-router-dom";

// helpers
import isEmpty from "../../../../utils/validation/isEmpty";

const ShelfTable = ({ storage, storageType, rack }) => {
  const { _id, shelfLabel, shelfSpots = [] } = storage;

  let max = 0;

  for (let spot of shelfSpots) {
    const length = spot["storedItems"].length;
    max = length > max ? length : max;
  }

  const getTableHead = () => (
    <thead>
      <tr>
        <th scope="col">
          <Link to={`/storages/create/${_id}?type=shelfSpot`}>
            <button className="btn btn-default">
              <i className="fas fa-plus-circle mr-2" /> New Shelf Spot
            </button>
          </Link>
        </th>
        {shelfSpots.length === 0 ? (
          <th>No Spots yet - create one</th>
        ) : (
          shelfSpots.map(({ _id: spotId = "", spotLabel = "" }, i) => (
            <th scope="row" key={`spot-head-${i}`}>
              <Link to={`/storages/${spotId}?type=spot`}>Spot {spotLabel}</Link>
            </th>
          ))
        )}
      </tr>
    </thead>
  );

  return (
    <div className="card card-body mb-3">
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h2>Shelf {shelfLabel}</h2>

        <div>
          <Link to={`/storages/edit/${_id}?type=shelf`}>
            <button className="btn btn-default m-1">
              <i className="fas fa-edit mr-2" /> Edit Shelf
            </button>
          </Link>

          {!isEmpty(rack) && (
            <Link to={`/storages/${rack._id}?type=rack`}>
              <button className="btn btn-default m-1">
                <i className="fas fa-arrow-up mr-2" /> View Rack
              </button>
            </Link>
          )}
        </div>
      </div>

      <table className="table table-striped mt-1 mb-5">{getTableHead()}</table>
    </div>
  );
};

export default ShelfTable;
