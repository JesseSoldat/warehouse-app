const producerCardData = producers => {
  return producers.map(producer => {
    const { _id, producerName } = producer;
    return {
      id: _id,
      title: producerName,
      linkText1: "View",
      linkText2: "Edit",
      link1: `/producers/${_id}`,
      link2: `/producers/edit/${_id}`
    };
  });
};

export default producerCardData;
