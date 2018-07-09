import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

const PublicRoute = ({
  isAuth,
  auth,
  component: Component,
  ...restOfProps
}) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <Redirect to="/dashboard" />
        ) : (
          <div>
            <NavBar />
            <div className="my-3">
              <Component {...props} />
            </div>
          </div>
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(PublicRoute);
