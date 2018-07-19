import React from "react";

// common components
import Carousel from "../../../../components/Carousel";
import SingleField from "../../../../components/SingleField";

const InfoCard = ({
  productId,
  productDetails,
  productPictures,
  packagingPictures,
  history
}) => {
  // render ui -----------------------------
  const renderImage = (productPictures, packagingPictures) => {
    let picturesArray = [];
    if (Array.isArray(productPictures)) {
      picturesArray = [...picturesArray, ...productPictures];
    }
    if (Array.isArray(packagingPictures)) {
      picturesArray = [...picturesArray, ...packagingPictures];
    }

    const placeholderImg = "http://via.placeholder.com/250x250?text=No Image";

    return picturesArray.length >= 1 ? (
      <Carousel picturesArray={picturesArray} />
    ) : (
      <img
        className="mx-auto d-block pt-5"
        src={placeholderImg}
        alt="product"
      />
    );
  };

  // events --------------------------------
  const onCreateBarCode = productId => {
    history.push(`/barcode/create?id=${productId}&type=product`);
  };

  return (
    <div className="row">
      <div className="col-12">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-12">
              <button
                className="btn btn-primary float-right"
                onClick={() => onCreateBarCode(productId)}
              >
                <i className="fas fa-barcode mr-2" />
                Create Barcode
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 ml-mr-auto">
              <ul className="list-group list-group-flush">
                {productDetails.map(({ label, value }, i) => (
                  <SingleField label={label} value={value} key={i} />
                ))}
              </ul>
            </div>

            <div className="col-xs-12 col-1" />

            <div className="col-xs-12 col-md-5">
              <div className="row">
                <div className="col-11 pt-3 mr-2">
                  {renderImage(productPictures, packagingPictures)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
