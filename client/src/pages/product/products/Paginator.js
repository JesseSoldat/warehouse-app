import React from "react";

const Paginator = ({ page, skip, limit, count, getProductsQuery }) => {
  const goBack = () => {
    if (skip === 0) return;
    // const newPage = page - 1;
    // load previous page from server
    getProductsQuery();
  };

  const goFoward = () => {
    if (skip + limit > count) return;
    // const newPage = page + 1;
    // load previous page from server
    getProductsQuery();
  };

  const renderBtn = direction => {
    const text = direction === "left" ? "Previous" : "Next";
    const symbol =
      direction === "left" ? (
        <span aria-hidden="true">&laquo;</span>
      ) : (
        <span aria-hidden="true">&raquo;</span>
      );
    let btnClass;

    if (direction === "left") {
      btnClass = skip === 0 ? "page-item disabled" : "page-item";
    }
    return (
      <li className={btnClass}>
        <a
          className="page-link"
          aria-label={text}
          onClick={direction === "left" ? goBack : goFoward}
        >
          <span aria-hidden="true">{symbol}</span>
          <span className="sr-only">{text}</span>
        </a>
      </li>
    );
  };
  const leftBtn = renderBtn("left");
  const rightBtn = renderBtn("right");

  return (
    <div className="row">
      <div className="col-12">
        <small className="form-text text-muted mb-2 ml-4 inline-block mr-2">
          <strong>{count + " "}</strong>
          {count !== 1 ? "products" : "product"} found
        </small>
        <nav aria-label="Products navigation" className="d-inline-block ml-2">
          <ul className="pagination">
            {leftBtn}
            <li className="page-item">
              <a className="page-link">{page}</a>
            </li>
            {rightBtn}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Paginator;