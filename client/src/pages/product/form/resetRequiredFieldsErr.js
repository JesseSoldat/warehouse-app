import requiredFields from "./requiredFields";

const resetRequiredFieldsErr = name => {
  const fieldObj = requiredFields[name];
  return fieldObj ? fieldObj["err"] : null;
};

export default resetRequiredFieldsErr;
