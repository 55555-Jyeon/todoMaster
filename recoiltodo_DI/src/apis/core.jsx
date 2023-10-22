import axios from "axios";

// 09. apis 복붙해서 내용 바꿔주기
export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URL,
  // vite에서 사용법 : import.meta.env.VITE_[key value]
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
