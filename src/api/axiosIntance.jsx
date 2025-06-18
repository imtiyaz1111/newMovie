import axios from "axios";

let axiosInstance = axios.create({
  baseURL: " https://tureappapiforreact.onrender.com"
});

export default axiosInstance;