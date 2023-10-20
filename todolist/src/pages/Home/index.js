import styled from "styled-components";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import { flexCenter } from "styles/common.style"; // 6. 경로 깔끔하게 정리하기 : jsconfig.json 파일 생성

const HomePage = () => {
  // 1. isFromLogin 변수 선언 + 삼항 연산자
  let isFormLogin = true;
  // 13.
  // const [isFormLogin, setIsFormLogin] = useState();

  // 3. click event 만들기 + 아래 onClick 부여하기
  const onChangeForm = (e) => {
    // 구조분해할당(비구조화할당) : 객체나 배열을 해체해 각각의 요소를 개별 변수에 담을 수 있도록 분해하는 행위
    const { innerText } = e.target; // === e.target.innerText

    if (innerText === "SIGN-IN") return (isFormLogin = true);
    return (isFormLogin = false);
  };

  return (
    <S.Wrapper>
      <S.Header>
        {/* 13-2. isFormLogin 전달해주기 */}
        <S.SignInSelector isFormLogin={isFormLogin} onClick={onChangeForm}>
          SIGN-IN
        </S.SignInSelector>
        <S.SignUpSelector isFormLogin={isFormLogin} onClick={onChangeForm}>
          SIGN-UP
        </S.SignUpSelector>
      </S.Header>
      {/*  2. SignInForm & SignUpForm component화   (가독성을 위해서)  */}
      {isFormLogin ? <SignInForm /> : <SignUpForm />}
    </S.Wrapper>
  );
};
export default HomePage;

// 4. custom된 요소 만들기 (style이 적용된 html 요소)
const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  padding-bottom: 60px;
  ${flexCenter} // 5. common.style 에 저장되어 있는 style 가져와서 사용하기
  flex-direction: column;
`;

const Header = styled.header`
  width: 360px;
  height: 48px;
  position: relative;
  display: flex;
  background-color: ${({ theme }) =>
    theme.COLORS.primary[300]}; // 9. 구조분해할당으로 theme에 있는 css 활용하기

  & > div {
    width: 50%;
    ${flexCenter}
    cursor: pointer;
    &:hover {
      background-color: #00c7ae;
    }
  }
`;

// 13. click된 div를 보여주기 (선택되지 않은 div는 비활성화)  >> 삼항연산자 사용
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
