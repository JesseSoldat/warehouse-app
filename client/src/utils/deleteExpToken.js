import axios from "axios";

const deleteExpToken = async (userId, token) => {
  try {
    await axios.post(`/api/token/${userId}`, { token });
  } catch (err) {
    console.log("deleteExpToken err", err);
  }
};

export default deleteExpToken;
