import WelcomeButton from "components/Button";
import * as S from "./style";
import FormInput from "components/Input";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";

const SignUpForm = ({ setIsFormLogin }) => {
  const [{ email, password, passwordConfirm }, onChangeInputs] = useInputs({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const { disabled, errors } = formValidate({
    email,
    password,
    passwordConfirm,
  });

  const onSubmitSignUp = (e) => {
    e.preventDefault();
    alert("회원가입이 되었습니다. 축하합니다!");
    setIsFormLogin(true);
  };

  return (
    <S.Form onSubmit={onSubmitSignUp}>
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
      <FormInput
        label="비밀번호 확인"
        type="password"
        name="passwordConfirm"
        onChange={onChangeInputs}
        placeholder="비밀번호를 다시 입력해주세요"
        error={errors.passwordConfirm}
      />
      <WelcomeButton
        variant={"primary"}
        size={"full"}
        shape={"shape"}
        disabled={disabled}
      >
        회원가입
      </WelcomeButton>
    </S.Form>
  );
};
export default SignUpForm;
