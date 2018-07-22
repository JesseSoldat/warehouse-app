import React from "react";
import { Link } from "react-router-dom";

const TableHead = ({ id = "", maxShelves = 0 }) => {
  return (
    <thead>
      <tr style={{ width: 95 }}>
        <th scope="col">New Rack</th>
        {maxShelves === 0 ? (
          <th scope="col">No shelves yet - select a rack to create one</th>
        ) : (
          [...Array(maxShelves).keys()].map(key => (
            <th key={`shelf-header-${key}`} scope="col">
              Shelf {key}
            </th>
          ))
        )}
      </tr>
    </thead>
  );
};

export default TableHead;
