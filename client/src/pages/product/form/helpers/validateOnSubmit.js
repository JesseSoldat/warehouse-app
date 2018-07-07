import requiredFields from "./requiredFields";

const validateOnSubmit = state => {
  const errObj = {};
  let isValid = true;

  for (let field in requiredFields) {
    if (!state[field]) {
      isValid = false;
      const err = requiredFields[field].err;
      errObj[err] = requiredFields[field].msg;
    }
  }
  return { isValid, errObj };
};

export default validateOnSubmit;
