import React from "react";

const Heading = ({ title }) => {
  return (
    <div className="col-12">
      <h1 className="display-4 text-center py-2">{title}</h1>
    </div>
  );
};

export default Heading;
