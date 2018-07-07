import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import { initialLogin } from "../actions/auth";

class PublicRoute extends Component {
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { isAuth } = this.props;
      if (!isAuth) {
        console.log("Public not authenticated and have user in local storage");
        const { _id, token } = user;
        this.props.initialLogin(_id, token);
      }
    }
  }

  render() {
    const { isAuth, Component, ...restOfProps } = this.props;

    return (
      <Route
        {...restOfProps}
        component={props =>
          isAuth ? (
            <Redirect to="/dashboard" />
          ) : (
            <div className="rootContainer">
              <NavBar />
              <Component {...props} />
            </div>
          )
        }
      />
    );
  }
}
const mapStateToProps = ({ auth }, ownProps) => {
  return {
    Component: ownProps.component,
    isAuth: !!auth._id
  };
};

export default connect(
  mapStateToProps,
  { initialLogin }
)(PublicRoute);

// TODO not working to update the state BUG ------------------

// import React from "react";
// import { connect } from "react-redux";
// import { Route, Redirect } from "react-router-dom";

// import NavBar from "../components/NavBar";

// const PublicRoute = ({
//   isAuth,
//   auth,
//   component: Component,
//   ...restOfProps
// }) => {
//   console.log("PublicRoute", auth);

//   return (
//     <Route
//       {...restOfProps}
//       component={props =>
//         isAuth ? (
//           <Redirect to="/dashboard" />
//         ) : (
//           <div className="rootContainer">
//             <NavBar />
//             <Component {...props} />
//           </div>
//         )
//       }
//     />
//   );
// };

// const mapStateToProps = ({ auth }) => ({
//   isAuth: !!auth._id,
//   auth: auth
// });

// export default connect(mapStateToProps)(PublicRoute);
