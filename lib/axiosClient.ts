import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/api",
  // you can add headers here if needed
});

export default axiosClient;
