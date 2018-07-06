const { AUTH_LOGIN } = require("../actions/auth");

const initialState = {
  _id: null,
  token: null
};

export default (state = initialState, action) => {
  const { type, loading, msg } = action;
  switch (type) {
    case AUTH_LOGIN:
      console.log("AUTH_LOGIN", action);
      return { ...state };

    default:
      return { ...state };
  }
};
