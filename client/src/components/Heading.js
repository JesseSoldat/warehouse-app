import React from "react";

import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";

const Heading = ({ title }) => {
  return (
    <div className="col-12">
      <h1 className="display-4 text-center pb-2">
        {capitalizeFirstLetter(title)}
      </h1>
    </div>
  );
};

export default Heading;
