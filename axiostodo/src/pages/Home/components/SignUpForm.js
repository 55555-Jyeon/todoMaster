import WelcomeButton from "components/Button";
import * as S from "./style";
import FormInput from "components/Input";
import useInputs from "hooks/use-inputs";
import { formValidate } from "utils/validate-helper";
import { useAuth } from "provider/authProvider";

const SignUpForm = ({ setIsFormLogin }) => {
  // 18.
  const { signUp } = useAuth();
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

  // 02. async, await > alert
  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    // 03. try, catch(err)
    try {
      // 01. (백엔드가 지정해줄 메서드) post 방식으로 data 보내기 >> 두 번째 인자에는 body data
      // 404 error > backend URL 관련 에러
      // await axios.post("http://localhost:9000/user/sign", { email, password });
      // 18-2. 위 코드 아래로 변경
      await signUp({ email, password });

      alert("환영합니다! 회원 가입이 완료되었습니다!");
      setIsFormLogin(true);
    } catch (err) {
      // console.error(err.response.data.error);
      // error로 다양한 걸 할 수 있음
      // 보통 console로 에러를 찍는 데 catch를 사용하진 않음 > JS의 최상한 error handler에서 자동으로 찍어주기 때문
      alert(err.response.data.error);
    }
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
