const formatSelectInputData = (data, labelKey, valueKey) => {
  const options = [];
  const selectedOptions = [];
  data.forEach((obj, i) => {
    options.push({
      label: obj[labelKey],
      value: obj[valueKey]
    });
  });
  return { options, selectedOptions };
};

export default formatSelectInputData;
