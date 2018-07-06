import React from "react";

import AuthForm from "./AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="container my-3">
      <div className="col-md-8 mx-auto">
        <AuthForm parent={path} />
      </div>

      <div style={{ height: "100px" }} />
    </div>
  );
};

export default Auth;
