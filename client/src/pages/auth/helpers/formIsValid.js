import { registerErrMsg, loginErrMsg } from "./authErrMsg";
import isEmail from "../../../utils/isEmail";

const formIsValid = (form, parent) => {
  const { username, email, password, confirmPassword } = form;
  let isValid = true;
  const errObj = {};

  if (
    !username ||
    !email ||
    !isEmail(email) ||
    !password ||
    password.length < 6
  ) {
    isValid = false;

    const authErrMsg = parent === "register" ? registerErrMsg : loginErrMsg;

    // Login & Register
    if (!email) errObj["emailErr"] = authErrMsg.emailErr;
    if (email && !isEmail(email)) errObj["emailErr"] = authErrMsg.validEmailErr;
    if (password && password.length < 6)
      errObj["passwordErr"] = authErrMsg.passwordLength;
    if (!password) errObj["passwordErr"] = authErrMsg.passwordErr;

    // Register only
    if (parent === "register") {
      if (!username) errObj["usernameErr"] = registerErrMsg.usernameErr;

      if (password === confirmPassword) {
        if (!confirmPassword) {
          errObj["confirmPasswordErr"] = registerErrMsg.confirmPasswordErr;
        } else {
          errObj["confirmPasswordErr"] = null;
        }
      } else {
        errObj["confirmPasswordErr"] = registerErrMsg.confirmPasswordErr;
      }
    }
  }

  return { isValid, errObj };
};

export default formIsValid;
