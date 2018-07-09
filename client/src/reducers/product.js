import { PRODUCTS_FETCH_ALL, PRODUCTS_FETCH_ONE } from "../actions/product";

const initialState = {
  products: [],
  product: null,
  page: 1,
  count: null, // total amount of products
  filteredCount: null, // count after filter
  skip: 0,
  limit: 20
};

export default (state = initialState, action) => {
  const { type, products, product, count, limit, skip } = action;
  switch (type) {
    case PRODUCTS_FETCH_ALL:
      // console.log("PRODUCTS_FETCH_ALL", products);
      return { ...state, products, count, limit, skip };

    case PRODUCTS_FETCH_ONE:
      // console.log("PRODUCTS_FETCH_ONE", product);
      return { ...state, product };

    default:
      return { ...state };
  }
};
