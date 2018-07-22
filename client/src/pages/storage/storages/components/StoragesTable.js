import React from "react";

// custom components
import TableTitle from "./TableTitle";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const StoragesTable = ({
  storage: { _id = "", storageLabel = "", racks = [], description = "" }
}) => {
  let maxShelves = 0;

  console.log(racks);
  // Figure out how many columns the table needs
  for (let rack of racks) {
    const length = rack.shelves.length;
    maxShelves = length > maxShelves ? length : maxShelves;
  }

  return (
    <div className="col-12 d-flex justify-content-around flex-wrap mt-4">
      <div className="card card-body mb-3">
        <TableTitle
          storageLabel={storageLabel}
          description={description}
          id={_id}
        />
        <table className="table table-responsive table-striped col-12">
          <TableHead maxShelves={maxShelves} />
          <TableBody racks={racks} />
        </table>
      </div>
    </div>
  );
};

export default StoragesTable;
