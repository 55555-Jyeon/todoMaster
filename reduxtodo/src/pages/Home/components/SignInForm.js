import WelcomeButton from "components/Button";
import * as S from "./style";
import { useNavigate } from "react-router-dom";
import FormInput from "components/Input";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";

const SignInForm = () => {
  const navigate = useNavigate();

  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });

  const { disabled, errors } = formValidate({ email, password });

  const onSubmitSignIn = (e) => {
    e.preventDefault();

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
