// 08. backend URL 모듈화
// 백엔드 주소가 바뀌면 사용된 모든 곳에서 수정을 해야하므로 유지보수 용이를 위해 DI

import axios from "axios";
import TokenRepository from "repository/TokenRepository";
import AuthApi from "./auth";

export const axiosInstance = axios.create({
  // baseURL에 백엔드 주소 넣기. 근데 백엔드 주소는 사용자에게 노출되면 X > .env
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // 21. 백엔드에게 데이터를 보내는 방법
  // 1️⃣-1. instance를 생성할 때 axios 요청의 header에 기본 값으로 보내기
  headers: {
    // token 종류 명시 필수 (json web token(JWT) => Bearer)
    Authorization: `Bearer ${TokenRepository.getToken()}`,
  },
  // 1️⃣-2. 백엔드가 cookie로 데이터 전달해주기 (cookie? localStorage? 각각 안전하지 않은 공격이 존재하므로 상황에 맞게 사용)
  // cookie data 정보를 교환하기 위해 사용하기 위한 옵션 (백엔드에서 refresh token을 cookie 형태로 전달해주기 때문에 사용하는 것)
  withCredentials: true,
});

// 2️⃣. axios.interceptors : client <-> BE 간 서로 요청을 보내기 직전, 요청을 받기 직전 데이터를 가로채는 것
axiosInstance.interceptors.request.use((config) => {
  // onSuccess
  const accessToken = TokenRepository.getToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// 22. refreshToken으로 accessToken 재발급 받는 로직
axiosInstance.interceptors.response.use(
  (response) => {
    // onSuccess : 성공보다는 실패했을 때가 중요해서 실패 시 로직만 우선 구현
    return response;
  },
  async (error) => {
    // onFailure (accessToken error occur)
    // 22-1. unAuthorized: 인증되지 않은 이용자 관련 에러, 인증 토큰이 올바르지 않다는 의미이므로 재발급 필요

    // ⭐️ 이 로직(데이터 재요청)은 1번만 실행되면 됨
    const originRequest = error.config;
    if (error.response.status === 401 && !originRequest._retry) {
      // originRequest._retry 값이 false일 때만 실행
      originRequest._retry = true;

      // 재발급 요청
      const response = await AuthApi.refresh();
      const token = response.data;
      // WebStorage에 setting
      TokenRepository.setToken(token);
      // accessToken(인증 토큰)을 다시 headers에 작성
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer${token}`;
      // 데이터 재요청:  refreshToken 재발급 여부를 이용자가 알 필요 없으므로
      return axiosInstance(error.config);
    }

    // 23. 예외처리: 단 한 경우만 존재, accessToken && refreshToken 둘 다 부재 (세션 만료 에러)
    //이 예제에서는 백엔드가 403으로 처리해서 403으로 진행, 403은 보통 forbidden error(권한 없음)
    if (error.response.status === 403) {
      // logout
      await AuthApi.signOut();
      TokenRepository.deleteToken();
      alert("세션이 만료되었습니다.");
      // delete accessToken: 인증토큰 값을 null로 만드는 방법, 데이터를 새로 받아오므로 전역 상태가 비워지게 됨
      window.location.href = "/";
    }

    //24.  401과 403 외 나머지 에러는 그대로 처리
    return Promise.reject(error);
  }
);
