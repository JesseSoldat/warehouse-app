import React from "react";
import { Link } from "react-router-dom";

import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import AuthForm from "./AuthForm";

const Auth = ({ location }) => {
  const path = location.pathname.split("/")[1];
  return (
    <div className="col-md-8 mx-auto">
      <h2 className="text-center display-4">{capitalizeFirstLetter(path)}</h2>
      <AuthForm parent={path} />
    </div>
  );
};

export default Auth;
