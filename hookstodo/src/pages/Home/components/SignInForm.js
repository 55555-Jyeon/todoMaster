import WelcomeButton from "components/Button";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import FormInput from "components/Input";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";

const SignInForm = () => {
  // 02. 경로 설정하기
  const navigate = useNavigate();

  // 유효성 검사 logic
  // 04-1. 사용자가 텍스트를 입력했을 때: 유효성 통과 여부 확인 react-hook-form (library)로 사용자가 유효성 검사를 틀렸을 때 / 틀리지 않았을 때만 검사
  // 04-2. 사용자가 입력할 때마다 rendering > 유효성을 통과했는지 확인 (useState, onChange)

  // 08. custom hook으로 만들기
  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });

  // 09. validate-helper
  const { disabled, errors } = formValidate({ email, password });

  // form을 이용해 input의 value 가져오기 (ref말고)
  const onSubmitSignIn = (e) => {
    e.preventDefault();
    // 03. 아래 input의 name 속성과 값 일치시켜주기
    // const { userEmail, userPw } = e.target; // 구조분해 할당

    if (email === "test@test.com" && password === "testtest1234") {
      return navigate("/todo");
    }
    alert("아이디와 비밀번호를 확인해주세요.");
  };

  return (
    <S.Form onSubmit={onSubmitSignIn}>
      <FormInput
        label="이메일"
        type="text"
        name="email"
        onChange={onChangeInputs}
        placeholder="이메일을 입력해주세요"
        error={errors.email}
      />
      <FormInput
        label="비밀번호"
        type="password"
        name="password"
        onChange={onChangeInputs}
        placeholder="비밀번호를 입력해주세요"
        error={errors.password}
      />
      <WelcomeButton
        variant={"primary"}
        size={"full"}
        shape={"shape"}
        disabled={disabled}
      >
        로그인
      </WelcomeButton>
    </S.Form>
  );
};
export default SignInForm;
