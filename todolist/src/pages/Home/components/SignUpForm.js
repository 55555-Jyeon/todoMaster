import WelcomeButton from "components/Button";
import * as S from "./style";

const SignUpForm = () => {
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
      <S.InputBox>
        <label>비밀번호 확인</label>
        <input type="password" placeholder="비밀번호를 다시 입력해주세요" />
      </S.InputBox>
      <WelcomeButton variant={"primary"} size={"full"} shape={"shape"}>
        회원가입
      </WelcomeButton>
    </S.Form>
  );
};
export default SignUpForm;
