// 09. 객체 형태의 method의 로그인/로그아웃 함수들 넣기

import { axiosInstance } from "./core";

const PATH = "/user";

const AuthApi = {
  async signIn(email, password) {
    const res = await axiosInstance.post(PATH + "/login", { email, password });
    return res.data;
  },

  async signUp(email, password) {
    const res = await axiosInstance.post(PATH + "/sign", { email, password });
    return res.data;
  },

  async signOut() {
    const res = await axiosInstance.post(PATH + "/logout");
    return res.data;
  },

  // 25.
  async refresh() {
    const res = await axiosInstance.post(PATH + "/jwt");
    return res.data;
  },
};
export default AuthApi;
