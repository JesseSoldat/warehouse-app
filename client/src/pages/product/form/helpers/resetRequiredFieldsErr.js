import requiredFields from "./requiredFields";

// required fields is an array of objs
const resetRequiredFieldsErr = name => {
  const fieldObj = requiredFields[name];
  return fieldObj ? fieldObj["err"] : null;
};

export default resetRequiredFieldsErr;
