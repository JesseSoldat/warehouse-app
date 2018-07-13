import React from "react";

// components
import SingleField from "./SingleField";

const InfoCard = ({
  pageName,
  productId,
  productDetails,
  productPictures,
  packagingPictures,
  deleteCb,
  history
}) => {
  const renderCarousel = picturesArray => {
    const carouselItem = picturesArray.map((item, i) => {
      const text = `${i} slide of ${picturesArray.length}`;
      const active = i === 0 ? "carousel-item active" : "carousel-item";

      return (
        <div className={active} key={i}>
          <img
            className="d-block w-100"
            style={{
              height: "350px",
              backgroundColor: "lightgrey",
              backgroundBlendMode: "multiply"
            }}
            src={item}
            alt={text}
          />
          <div className="carousel-caption d-none d-md-block">
            <p className="">Image {i + 1}</p>
          </div>
        </div>
      );
    });

    const carouselInner = <div className="carousel-inner">{carouselItem}</div>;

    return (
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-ride="carousel"
      >
        {carouselInner}
        <a
          className="carousel-control-prev"
          href="#carouselExampleControls"
          role="button"
          data-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleControls"
          role="button"
          data-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
    );
  };

  const renderImage = (productPictures, packagingPictures) => {
    let picturesArray = [];
    if (Array.isArray(productPictures)) {
      picturesArray = [...productPictures];
    }
    if (Array.isArray(packagingPictures)) {
      picturesArray = [...packagingPictures];
    }

    const placeholderImg = "http://via.placeholder.com/250x250?text=No Image";

    return picturesArray.length >= 1 ? (
      renderCarousel(picturesArray)
    ) : (
      <img
        className="mx-auto d-block pt-5"
        src={placeholderImg}
        alt="product"
      />
    );
  };

  const onCreateBarCode = productId => {
    history.push(`/barcode/create?id=${productId}&type=product`);
  };

  const onDelete = productId => {
    document.getElementById("deleteBtn").disabled = true;
    deleteCb(productId);
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
                Create Bar Code
              </button>
              <button
                id="deleteBtn"
                className="btn btn-danger float-right mr-1"
                onClick={() => onDelete(productId)}
              >
                Delete {pageName}
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 ml-mr-auto">
              <ul className="list-group list-group-flush">
                {productDetails.map(({ label, value }, i) => (
                  <SingleField field={label} value={value} key={i} />
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
