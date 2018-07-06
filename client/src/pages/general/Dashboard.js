import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="display-4 text-center pb-2">Dashboard</h1>
      </div>
      <div className="col-12 d-flex flex-wrap justify-content-between my-4">
        <div
          className="card mr-1 ml-1 mb-3 col-xs-12 col-md-5 col-lg-3"
          style={{ minHeight: "11rem" }}
        >
          <div className="card-body d-flex flex-column align-items-center">
            <h5 className="card-title text-center pt-2">
              Search & Edit Products
            </h5>
            <p className="card-text">Search and edit products here</p>
            <Link to="/products/search">Go!</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;