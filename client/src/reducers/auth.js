const { AUTH_ERR, AUTH_LOADING } = require("../actions/auth");

const initialState = { _id: null, token: null, msg: null, loading: false };

export default (state = initialState, action) => {
  const { type, loading, err } = action;
  switch (type) {
    case AUTH_LOADING:
      return { ...state, loading };

    case AUTH_ERR:
      console.log("AUTH_ERR", err);
      return { ...state, loading, err };

    default:
      return { ...state };
  }
};
