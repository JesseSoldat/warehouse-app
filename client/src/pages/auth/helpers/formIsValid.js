import { registerErrMsg, loginErrMsg } from "./authErrMsg";
import isEmail from "../../../utils/isEmail";

const formIsValid = form => {
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
    if (!username) errObj["usernameErr"] = registerErrMsg.usernameErr;
    if (!email) errObj["emailErr"] = registerErrMsg.emailErr;
    if (email && !isEmail(email))
      errObj["emailErr"] = registerErrMsg.validEmailErr;
    if (password && password.length < 6)
      errObj["passwordErr"] = registerErrMsg.passwordLength;
    if (!password) errObj["passwordErr"] = registerErrMsg.passwordErr;

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

  return { isValid, errObj };
};

export default formIsValid;
