import WelcomeButton from "components/Button";
import * as S from "./style"; // 12. 강사님이 복붙해서 보내준 style.js 적용

const SignInForm = () => {
  return (
    <S.Form>
      <S.InputBox>
        <label>이메일</label>
        <input type="text" placeholder="이메일을 입력해주세요" />
      </S.InputBox>
      <S.InputBox>
        <label>비밀번호</label>
        <input type="password" placeholder="비밀번호를 입력해주세요" />
      </S.InputBox>
      <WelcomeButton variant={"primary"} size={"full"} shape={"shape"}>
        로그인
      </WelcomeButton>
    </S.Form>
  );
};
export default SignInForm;
