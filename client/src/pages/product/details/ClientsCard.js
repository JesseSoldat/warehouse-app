import React from "react";

// component
import SingleField from "./SingleField";

const ClientsCard = ({ array }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-12">
          <div className="text-center">
            <h4 className="pb-3">
              <strong>{array[0].label}</strong>
            </h4>
          </div>
          <div>
            <div className="row">
              <div className="col-12 mr-ml-auto">
                <ul className="list-group list-group-flush">
                  {array.map(obj =>
                    obj.data.map(({ label, value }, index) => (
                      <SingleField field={label} value={value} key={index} />
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientsCard;
