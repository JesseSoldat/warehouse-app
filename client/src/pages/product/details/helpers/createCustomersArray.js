const createCustomersArray = array => {
  if (!array) return [];
  let label = "";

  const objArray = array.map((obj, i) => {
    const { customerName, customerAddress, customerContact } = obj;
    i === 0 ? (label = "Customer Details") : (label = "");
    return [
      {
        label,
        data: [
          { label: "Name", value: customerName },
          { label: "Address", value: customerAddress },
          { label: "Contact", value: customerContact }
        ]
      }
    ];
  });
  return objArray;
};

export default createCustomersArray;
