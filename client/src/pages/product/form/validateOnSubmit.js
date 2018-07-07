import requiredFields from "./requiredFields";

const validateOnSubmit = state => {
  const errObj = {};

  for (let field in requiredFields) {
    if (!state[field]) {
      const err = requiredFields[field].err;
      errObj[err] = requiredFields[field].msg;
    }
  }
  return errObj;
};

export default validateOnSubmit;
