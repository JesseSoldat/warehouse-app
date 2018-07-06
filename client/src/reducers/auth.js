const { AUTH_ERR, AUTH_LOADING } = require("../actions/auth");

const initialState = { _id: null, token: null, msg: null, loading: false };

export default (state = initialState, action) => {
  const { type, loading, msg } = action;
  switch (type) {
    case AUTH_LOADING:
      return { ...state, loading };

    case AUTH_ERR:
      console.log("AUTH_ERR", msg);
      return { ...state, loading, msg };

    default:
      return { ...state };
  }
};
