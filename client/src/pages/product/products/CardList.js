import React from "react";

import Card from "../../../components/Card";

const CardList = ({ products }) => {
  const renderCards = product => {
    const {
      _id,
      productLabel,
      productName,
      productPictures,
      packagingPictures
    } = product;

    const pictures = [...productPictures, ...packagingPictures];

    const data = {
      id: _id,
      title: productName,
      picture: pictures.length > 0 ? pictures[0] : null,
      linkText1: "View Product",
      linkText2: "Edit Product",
      link1: `/products/${_id}`,
      link2: `/products/edit/${_id}`
    };

    return <Card key={productLabel} data={data} />;
  };

  return <div>{products.map(product => renderCards(product))}</div>;
};

export default CardList;
