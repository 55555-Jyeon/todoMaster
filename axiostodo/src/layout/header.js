import { useAuth } from "provider/authProvider";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  const navigate = useNavigate();
  // const accessToken = localStorage.getItem("access_token");
  // 19. 전역 상태로 관리하고 있는 state인 accessToken 가져오기
  const { accessToken, signOut } = useAuth();

  const onClickLogin = async () => {
    // 19-2. signOut 추가
    await signOut();
    navigate("/");
  };

  return (
    <Wrapper>
      Header
      <button onClick={onClickLogin}>{accessToken ? "logout" : "login"}</button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2% 0;
  background-color: white;
`;
