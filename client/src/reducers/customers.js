import { CUSTOMERS_FETCH_ALL } from "../actions/customer";
const initialState = {
  customers: []
};

export default (state = initialState, action) => {
  const { type, customers } = action;

  switch (type) {
    case CUSTOMERS_FETCH_ALL:
      // console.log("CUSTOMERS_FETCH_ALL", customers);
      return { ...state, customers };

    default:
      return { ...state };
  }
};
