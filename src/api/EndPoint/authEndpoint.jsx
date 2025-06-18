const baseURL="https://tureappapiforreact.onrender.com"

const AUTH_ENDPOINTS = {
  LOGIN: `${baseURL}/api/login`,
  REGISTER: `${baseURL}/api/register`,
  FORGOT_PASSWORD: `${baseURL}/api/forget-password`,
  UPDATE_PASSWORD: `${baseURL}/api/update-password`,
};

export default AUTH_ENDPOINTS;