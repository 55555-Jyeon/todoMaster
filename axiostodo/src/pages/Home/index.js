import styled from "styled-components";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import { flexCenter } from "styles/common.style";
// hooks function
import { useState } from "react";

const HomePage = () => {
  const [isFormLogin, setIsFormLogin] = useState(true);

  const onChangeForm = (e) => {
    const { innerText } = e.target;
    if (innerText === "SIGN-IN") return setIsFormLogin(true);
    return setIsFormLogin(false);
  };

  return (
    <S.Wrapper>
      <S.Header>
        <S.SignInSelector isFormLogin={isFormLogin} onClick={onChangeForm}>
          SIGN-IN
        </S.SignInSelector>
        <S.SignUpSelector isFormLogin={isFormLogin} onClick={onChangeForm}>
          SIGN-UP
        </S.SignUpSelector>
      </S.Header>
      {isFormLogin ? (
        <SignInForm />
      ) : (
        <SignUpForm setIsFormLogin={setIsFormLogin} />
      )}
    </S.Wrapper>
  );
};
export default HomePage;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter}
  flex-direction: column;
`;

const Header = styled.header`
  width: 360px;
  height: 48px;
  position: relative;
  display: flex;
  background-color: ${({ theme }) => theme.COLORS.primary[300]};

  & > div {
    width: 50%;
    ${flexCenter}
    cursor: pointer;
    &:hover {
      background-color: #00c7ae;
    }
  }
`;

const SignInSelector = styled.div`
  background-color: ${(props) => (props.isFormLogin ? "#00C7AE" : "#f5f5f5")};
`;
const SignUpSelector = styled.div`
  background-color: ${(props) => (!props.isFormLogin ? "#00C7AE" : "#f5f5f5")};
`;

const S = {
  Wrapper,
  Header,
  SignInSelector,
  SignUpSelector,
};
