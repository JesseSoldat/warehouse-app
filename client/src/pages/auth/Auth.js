import React from "react";
// import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="col-md-8 mx-auto">
      <AuthForm parent={path} />
    </div>
  );
};

export default Auth;
