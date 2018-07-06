import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";

const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
  return (
    <Route
      {...restOfProps}
      component={props =>
        isAuth ? (
          <div>
            <NavBar />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = ({ auth }) => ({ isAuth: !!auth._id });
export default connect(mapStateToProps)(PrivateRoute);
