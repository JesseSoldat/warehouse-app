import { ROUTE_CHANGED } from "../actions/router";

const initialState = { from: null, to: null };

export default (state = initialState, action) => {
  const { type, from, to } = action;
  switch (type) {
    case ROUTE_CHANGED:
      // console.log("ROUTE_CHANGED", "from:", from, "to:", to);

      return { ...state, from, to };

    default:
      return { ...state };
  }
};
