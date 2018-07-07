import textInputFields from "./textInputFields";

const formatFieldValues = state => {
  const formatedTextInputFields = textInputFields.map(obj => {
    const fieldName = obj.name;
    return state[fieldName];
  });

  console.log(formatedTextInputFields);
};

export default formatFieldValues;
