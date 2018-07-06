import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

const PublicRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="rootContainer">
            <NavBar />
            <div className="container mt-3">
              <Component {...props} />
            </div>
          </div>
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({ isAuth: !!auth._id });

export default connect(mapStateToProps)(PublicRoute);
