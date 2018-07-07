import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import NavBar from "../components/NavBar";
import { initialLogin } from "../actions/auth";

class PrivateRoute extends Component {
  componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { isAuth } = this.props;
      if (!isAuth) {
        console.log("Private not authenticated and have user in local storage");
        const { _id, token } = user;
        this.props.initialLogin(_id, token);
      }
    }
  }

  render() {
    const { isAuth, Component, restOfProps } = this.props;

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
  }
}

const mapStateToProps = ({ auth }, ownProps) => ({
  Component: ownProps.component,
  isAuth: !!auth._id
});

export default connect(
  mapStateToProps,
  { initialLogin }
)(PrivateRoute);

// TODO not updating state BUG ----------------------------

// import React from "react";
// import { connect } from "react-redux";
// import { Route, Redirect } from "react-router-dom";

// import NavBar from "../components/NavBar";

// const PrivateRoute = ({ isAuth, component: Component, ...restOfProps }) => {
//   console.log("Private", isAuth);

//   return (
//     <Route
//       {...restOfProps}
//       component={props =>
//         isAuth ? (
//           <div>
//             <NavBar />
//             <Component {...props} />
//           </div>
//         ) : (
//           <Redirect to="/login" />
//         )
//       }
//     />
//   );
// };

// const mapStateToProps = ({ auth }) => ({ isAuth: !!auth._id });

// export default connect(mapStateToProps)(PrivateRoute);
