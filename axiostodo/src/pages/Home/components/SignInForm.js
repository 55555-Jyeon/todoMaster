import WelcomeButton from "components/Button";
import * as S from "./style";
import FormInput from "components/Input";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import { useAuth } from "provider/authProvider";

const SignInForm = () => {
  // 17. 만든 거 써주기
  const { signIn } = useAuth();

  const [{ email, password }, onChangeInputs] = useInputs({
    email: "",
    password: "",
  });

  const { disabled, errors } = formValidate({ email, password });

  // authProvider로 이동
  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    // Q. login한 사람이 '나'인 것을 어떻게 알 것인가?
    // A. web storage(local storage)에 넣어 관리할 것 (데이터 영구 저장)

    // 17-2. 값 넣어주기
    // signIn({ email, password },{onSuccess: () => {navigate("/todo")},}); 로도 작성 가능
    await signIn({ email, password });
    // navigate("/todo"); >> authProvider에서 구현
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
