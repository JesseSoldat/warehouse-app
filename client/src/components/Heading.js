import React from "react";

// utils
import capitalizeEachWordOfString from "../utils/capitalizeEachWordOfString";

const Heading = ({ title }) => {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="display-4 text-center pb-2">
          {title && capitalizeEachWordOfString(title)}
        </h1>
      </div>
    </div>
  );
};

export default Heading;
