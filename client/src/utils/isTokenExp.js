import decodeToken from "./decodeToken";
import dateToTimestamp from "./dateToTimestamp";

const isTokenExp = token => {
  let isTokenExp = false;
  const decodedToken = decodeToken(token);
  const { expires } = decodedToken.payload;
  const now = dateToTimestamp(new Date(), "obj");
  const exp = dateToTimestamp(expires, "str");
  // console.log("now", now);
  // console.log("exp", exp);

  if (exp < now) isTokenExp = true;

  return isTokenExp;
};

export default isTokenExp;
