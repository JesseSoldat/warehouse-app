// an object with nested objects
// nested object keys are the field name
// nested objects have err and msg properties
// err is the name of the the error in component state
// msg is what should be set in state if the field is empty on submit

// name is the name value on the form (field name)
import requiredFields from "./requiredFields";

const resetRequiredFieldsErr = name => {
  const fieldObj = requiredFields[name];
  // if the field name is not in requirdFields
  // the fieldObj will be undefined
  return fieldObj ? fieldObj["err"] : null;
};

export default resetRequiredFieldsErr;
