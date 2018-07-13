import splitStrToArray from "../../../../utils/splitStrToArray";
import formatMeasurementValues from "./formatMeasurementValues";

const formatFormValues = state => {
  const {
    brandName,
    productName,
    price,
    pointOfBuy,
    weight,
    manufacturingDate,
    dateCheckbox,
    amountOfPieces,
    productPictures,
    packagingPictures,
    comments,
    productMaterial,
    selectedProducer,
    selectedCustomers
  } = state;

  const formattedValues = {
    brandName: brandName || "",
    productName: productName || "",
    price: price || 0,
    pointOfBuy: pointOfBuy || "",
    amountOfPieces: amountOfPieces || 0,
    weight: weight || 0,

    productPictures: splitStrToArray(productPictures, ",") || [],
    packagingPictures: splitStrToArray(packagingPictures, ",") || [],
    productMaterial: splitStrToArray(productMaterial, ",") || [],
    comments: splitStrToArray(comments, ",") || [],

    productMeasurments:
      formatMeasurementValues("productMeasurments", state) || {},
    packagingMeasurments:
      formatMeasurementValues("packagingMeasurments", state) || {},

    producerId: selectedProducer.value || "",
    customerIds: selectedCustomers.map(obj => obj.value) || []
  };

  const haveManufacturingDate = dateCheckbox ? manufacturingDate : null;
  if (haveManufacturingDate) {
    formattedValues[manufacturingDate] = haveManufacturingDate;
  }
  // console.log(formattedValues);
  return formattedValues;
};

export default formatFormValues;
