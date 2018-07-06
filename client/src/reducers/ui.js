const { NEW_MSG, LOADING } = require("../actions/ui");

const initialState = { msg: null, loading: false };

export default (state = initialState, action) => {
  const { type, loading, msg } = action;

  switch (type) {
    case LOADING:
      return { ...state, msg: null, loading };
    case NEW_MSG:
      console.log("NEW_MSG", msg);
      return { ...state, msg, loading };

    default:
      return { ...state };
  }
};
