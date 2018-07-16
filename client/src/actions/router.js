export const ROUTE_CHANGED = "ROUTE_CHANGED";

export const changeRoute = (from, to) => ({
  type: ROUTE_CHANGED,
  from,
  to
});
