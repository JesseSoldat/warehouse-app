import React from "react";
import { Link } from "react-router-dom";

// components
import SingleField from "./SingleField";

const LocationCard = ({
  productLocationObj,
  productId,
  unlinkCb,
  history,
  width = "12"
}) => {
  // console.log("Product Location", productLocationObj);

  const { haveLocation, data } = productLocationObj;

  let content;

  const divWidth = `col-xs-12 col-md-${width}`;

  const onLink = productId => {
    history.push(`/barcode/scan?id=${productId}&type=product`);
  };

  const onUnLink = (productId, kind) => {
    const obj = { type: kind, productId };
    unlinkCb(obj);
  };

  const onLinkBtn = (
    <button
      className="btn btn-primary float-right"
      onClick={() => onLink(productId)}
    >
      Store Product
    </button>
  );

  const renderBreadCrumb = ({ storageId, rackId, shelfId, spotId }) => {
    return (
      <ul className="customBreadcrumb d-inline-block">
        <li>
          <Link to={`/storages/${storageId}?type=storage`}>Storage</Link>
        </li>
        <li>
          <Link to={`/storages/${rackId}?type=rack`}>Rack</Link>
        </li>
        <li>
          <Link to={`/storages/${shelfId}?type=shelf`}>Shelf</Link>
        </li>
        <li>
          <Link to={`/storages/${spotId}?type=spot`}>Shelf Spot</Link>
        </li>
      </ul>
    );
  };

  // No Location render the defaults --------------------------------------
  if (!haveLocation) {
    content = (
      <div>
        <div className="row">
          <div className="col-12">{onLinkBtn}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h4 className="pb-3">
                <strong>Product Location</strong>
              </h4>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                {data.map(({ label, value }, index) => (
                  <SingleField field={label} value={value} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Have Location render the location --------------------------------------
  else {
    const { kind, breadcrumb } = productLocationObj;

    const onUnLinkBtn = (
      <span>
        <button
          className="btn btn-primary float-right mr-1"
          onClick={() => onUnLink(productId, kind)}
        >
          Retrieve Product
        </button>

        <button
          className="btn btn-secondary float-right mr-1"
          onClick={() => onLink(productId)}
        >
          Restore Product
        </button>
      </span>
    );

    const { spotId, type, storageId, rackId, shelfId } = breadcrumb;

    content = (
      <div>
        <div className="row">
          <div className="col-12">{onUnLinkBtn}</div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="text-center">
              <h4 className="pb-3">
                <strong>Product Location</strong>
              </h4>
            </div>
            <div>
              <ul className="list-group list-group-flush">
                {data.map(({ label, value }, index) => (
                  <SingleField field={label} value={value} key={index} />
                ))}
                <div>
                  <strong className="pr-3 pl-4 d-inline-block">
                    Location:
                  </strong>
                  {renderBreadCrumb({
                    spotId,
                    type,
                    storageId,
                    rackId,
                    shelfId
                  })}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className={divWidth}>
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-12">{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
