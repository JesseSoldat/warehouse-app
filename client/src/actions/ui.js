export const NEW_MSG = "NEW_MSG";
export const LOADING = "LOADING";

export const serverMsg = (msg = null) => ({
  type: NEW_MSG,
  msg,
  loading: false
});

export const loading = loading => ({
  type: LOADING,
  loading
});
