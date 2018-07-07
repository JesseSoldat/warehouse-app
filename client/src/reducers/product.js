import { PRODUCTS_FETCH_ALL } from "../actions/product";

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
  const { type } = action;
  switch (type) {
    case PRODUCTS_FETCH_ALL:
      console.log("PRODUCTS_FETCH_ALL");

      return { ...state };

    default:
      return { ...state };
  }
};
