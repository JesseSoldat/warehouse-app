import React from "react";
import { Link } from "react-router-dom";

import truncateStr from "../utils/truncateStr";

const Card = ({ data }) => {
  const {
    title,
    picture,
    subtitle,
    text1,
    text2,
    text3,
    text4,
    link1,
    link2,
    link3,
    linkText1,
    linkText2,
    linkText3,
    showPic = true,
    picSrc = "http://via.placeholder.com/150x100"
  } = data;
  return (
    <div className="card mb-3" style={{ width: "260px" }}>
      {showPic && (
        <img
          className="card-img-top"
          alt="product"
          src={picture ? picture : picSrc}
          style={{
            width: "90%",
            height: "200px",
            margin: "10px auto",
            border: "1px solid black",
            boxSizing: "border-box"
          }}
        />
      )}
      <div className="card-body d-flex flex-column align-items-center mb-3">
        <h6 className="card-title">{truncateStr(title, 25)}</h6>
        {subtitle && <h6 className="card-subtitle mb-2">{subtitle}</h6>}
        <p className="card-text">{text1}</p>
        {text2 && <p className="card-text">{text2}</p>}
        {text3 && <p className="card-text">{text3}</p>}
        {text4 && <p className="card-text">{text4}</p>}

        <div className="d-flex flex-column">
          <button className="btn btn-default mb-1">
            <Link className="card-link" to={link1}>
              {linkText1}
            </Link>
          </button>
          {link2 &&
            linkText2 && (
              <button className="btn btn-default mb-1">
                <Link className="card-link" to={link2}>
                  {linkText2}
                </Link>
              </button>
            )}
          {link3 &&
            linkText3 && (
              <button className="btn btn-default mb-1">
                <Link className="card-link" to={link3}>
                  {linkText3}
                </Link>
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;
