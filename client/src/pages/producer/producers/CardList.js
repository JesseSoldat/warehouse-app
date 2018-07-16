import React from "react";
import Card from "../../../components/Card";

const CardList = ({ producers }) => {
  const renderCards = producer => {
    const { _id, producerName } = producer;
    const cardData = {
      id: _id,
      title: producerName,
      linkText1: "View",
      linkText2: "Edit",
      link1: `/producers/${_id}`,
      link2: `/producers/edit/${_id}`
    };

    return <Card key={_id} data={cardData} />;
  };

  return (
    <div className="row">
      <div className="col-11 mx-auto d-flex justify-content-around flex-wrap">
        {producers.length >= 1 &&
          producers.map(producer => renderCards(producer))}
      </div>
    </div>
  );
};

export default CardList;
