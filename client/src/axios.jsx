import axios from "axios";

const axiosBase = () => {
  return axios.create({
    baseURL: "http://localhost:5500/api",
  });
};
export default axiosBase;
