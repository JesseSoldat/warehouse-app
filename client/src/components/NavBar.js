import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = ({ isAuth }) => {
  const brandRoute = isAuth ? "/dashboard" : "/";
  const brand = (
    <Link className="navbar-brand" to={brandRoute}>
      Warehouse
    </Link>
  );
  const publicRoutes = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-2 pb-sm-3 pt-sm-3 pt-md-0 pb-md-0">
        <Link to="/login">
          <i className="fa fa-sign-in-alt mr-2" />
          Login
        </Link>
      </li>
      <li className="nav-item pb-sm-3 pb-md-0">
        <Link to="/register">
          <i className="fa fa-edit mr-2" />
          Register
        </Link>
      </li>
    </ul>
  );
  const privateRoutes = <ul className="navbar-nav ml-auto" />;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      {" "}
      {brand}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#mobile"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="mobile">
        <ul className="navbar-nav mr-auto" />
        {isAuth ? privateRoutes : publicRoutes}
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth._id
});

export default connect(mapStateToProps)(withRouter(NavBar));
