import { toast } from "react-toastify";
import axiosClient from "../axiosIntance";
import AUTH_ENDPOINTS from "../EndPoint/authEndpoint";

export const login = async (data, navigate, setLoading, auth, setAuth) => {
  setLoading(true);
  try {
    const res = await axiosClient.post(AUTH_ENDPOINTS.LOGIN, data);
    if (res.success === true) {
      setAuth({
        ...auth,
        user: res?.user,
        token: res?.token,
      });
      localStorage.setItem("auth", JSON.stringify(res?.user));
      localStorage.setItem("token", JSON.stringify(res?.token));
      toast.success(res.message);
      navigate("/");
      console.log("login", res);
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    console.log("loginerror", error?.response?.data?.message);
  } finally {
    setLoading(false);
  }
};

export const registerUser = async (newData, navigate, setLoading) => {
  setLoading(true);
  try {
    const res = await axiosClient.post(AUTH_ENDPOINTS.REGISTER, newData);
    if (res.success === 200) {
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed. Please try again."
    );
    console.log("registerUsererr", error);
  } finally {
    setLoading(false);
  }
};

export const forgotPassword = async (data, navigate, setLoading) => {
  setLoading(true);
  try {
    const res = await axiosClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
    if (res?.success == true) {
      setLoading(false);
      toast.success(res?.message);
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

export const updatePassword = async (
  data,
  navigate,
  setLoading,
  token,
  setAuth
) => {
  setLoading(true);
  try {
    const res = await axiosClient.post(AUTH_ENDPOINTS.UPDATE_PASSWORD, data, {
      headers: { "x-access-token": token },
    });
    if (res?.success == true) {
      toast.success(res?.message);
      setAuth({
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      navigate("/login");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
