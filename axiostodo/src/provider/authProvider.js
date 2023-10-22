// 06. 전역 상태 관리를 위해 AuthProvider 생성
// useContext를 활용한 DI

// why?
// 01. auth 관련 로직은 페이지 어디에서나 사용 가능
// 02.  전역 상태 관리를 통해 프론트엔드도 로그인 유무를 알 수 있고, 화면을 렌더해야 함
// 03. useContext를 활용해 custom hook 만들기

import AuthApi from "apis/auth";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Navigate } from "react-router-dom";
import TokenRepository from "repository/TokenRepository";

const AuthContext = createContext();
const navigate = Navigate();

// 06-2.
// TokenRepository는 state X -> front가 화면 단에서 render X -> user가 로그인/로그아웃 여부를 알 수 있는 state 생성
const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    // 16. 아래의 코드처럼 작성할 경우 refresh했을 때 전역 상태로 관뢰되던 TokenRepository의 값이 유지되지 않음
    // localStorage.getItem("access_token")
    TokenRepository.getToken()
  );
  // 16-2. 새로고침 시 데이터를 다시 넣어줌
  useEffect(() => {
    const token = TokenRepository.getToken();
    if (token) setAccessToken(token);
  });

  return (
    <AuthContext.Provider value={[accessToken, setAccessToken]}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// accessToken에 data 넣기
// 06-3. context를 활용한 custom hook function
export const useAuth = () => {
  const [accessToken, setAccessToken] = useContext(AuthContext);

  // 12. logIn logic 가져오기
  // 13. 콜백 함수 onSigned (onSuccess, onFailure)를 option으로 넣기 (데이터와 분리하기 위해)
  const signIn = async ({ email, password }, option) => {
    try {
      const response = await AuthApi.signIn(email, password);
      setAccessToken(response.data.token);
      TokenRepository.setToken(response.data.token);
      if (TokenRepository.getToken()) {
        option.onSuccess();
        navigate("/todo"); // 19-4.
      }
    } catch (err) {
      option.onFailure(err);
    }
  };

  // 14. signUp이 여러 군데에 있다면 authProvider에 작성
  const signUp = async ({ email, password }, option) => {
    const response = await AuthApi.signUp(email, password);
    option.onSuccess(response); // onFailure는 위에 작성해서 생략
  };

  // 15.
  const signOut = async () => {
    await AuthApi.signOut();
    setAccessToken(null); // 유효하지 않은 Token
    // 20. TokenRepository에 있는 accessToken 지워주기
    // signOut 하는 순간 백엔드가 준 Token이 유효하지 않게 됨. accessToken 불필요해짐
    TokenRepository.deleteToken();
    // 19-3. (선택사항) signOut시 홈으로 돌아가는 경우도 있으니 추가해두는 것도 ok.
    // logOut되면 애초에 접근할 수 없게, 튕겨버리게 구현할 수도 있음
    navigate("/");
  };

  return {
    // !!accessToken > 값이 있는 거에 !! 붙이면 불리언 형태로 변함
    // isLogin: !!accessToken,
    accessToken,
    signIn,
    signUp,
    signOut,
  };
};
