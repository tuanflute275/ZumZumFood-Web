import axios from "axios";

// Lấy token từ localStorage
const tokenLocalStorage = localStorage.getItem("token");
const token =
  tokenLocalStorage != null ? tokenLocalStorage.replaceAll('"', "") : "";

// Tạo instance Axios
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "", // Nếu có token thì thêm vào header
  },
});

// Cập nhật baseURL nếu cần
axiosInstance.defaults.baseURL = process.env.REACT_APP_API_SERVER;

export const get = async (
  url,
  config = {
    headers: { Authorization: `Bearer ${token}` },
  }
) => {
  const res = await axiosInstance.get(url, config);
  return res.data;
};

export const search = async (url, query, config = {}) => {
  const res = await axiosInstance.post(url, query, config);
  return res.data;
};

export const save = async (url, data, config = {}) => {
  const res = await axiosInstance.post(url, data, config);
  return res.data;
};

export const put = async (url, data, config = {}) => {
  const res = await axiosInstance.put(url, data, config);
  return res.data;
};

export const remove = async (url, config = {}) => {
  const res = await axiosInstance.delete(url, config);
  return res.data;
};

export default axiosInstance;
