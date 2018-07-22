import React from "react";
import { Link } from "react-router-dom";

const StorageTable = ({ storage = null, storageType = null }) => {
  if (!storage || !storageType) return null;

  const { _id, storageLabel, racks = [], description } = storage;
  let maxShelves = 0;

  for (let rack of racks) {
    const length = rack.shelves.length;
    maxShelves = length > maxShelves ? length : maxShelves;
  }
  return (
    <div className="card card-body mb-3" key={`table-${storageLabel}`}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
        <h2>{storageLabel}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default StorageTable;
