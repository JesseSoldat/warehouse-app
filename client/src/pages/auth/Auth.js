import React from "react";

import AuthForm from "./AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="container">
      <AuthForm parent={path} />
      <div style={{ height: "100px" }} />
    </div>
  );
};

export default Auth;
