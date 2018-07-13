import { PRODUCERS_FETCH_ALL } from "../actions/producer";
const initialState = {
  producers: []
};

export default (state = initialState, action) => {
  const { type, producers } = action;

  switch (type) {
    case PRODUCERS_FETCH_ALL:
      // console.log("PRODUCERS_FETCH_ALL", producers);
      return { ...state, producers };

    default:
      return { ...state };
  }
};
