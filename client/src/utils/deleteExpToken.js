import axios from "axios";

const deleteExpToken = async (userId, token) => {
  try {
    const res = await axios.post(`/api/token/${userId}`, { token });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

export default deleteExpToken;
