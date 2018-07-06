import React from "react";
// import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="container my-3">
      <div className="col-md-8 mx-auto">
        <AuthForm parent={path} />
        <div className="row">
          <div className="col-12 mt-4">
            <div id="accordion">
              <div className="card">
                <div className="card-header text-center" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-outline-dark btn-block"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Mangage Your Account
                    </button>
                  </h5>
                </div>

                <div
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordion"
                >
                  <div className="card-body">
                    <button className="btn btn-outline-dark btn-sm btn-block">
                      Resend verification Email
                    </button>
                    <button className="btn btn-outline-dark btn-sm btn-block">
                      Reset your Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "100px" }} />
    </div>
  );
};

export default Auth;
