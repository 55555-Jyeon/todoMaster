// hook 함수를 사용하지 않지만 재사용이 가능한 일반 함수 모음 파일

export const formValidate = ({ email, password, passwordConfirm }) => {
  // disabled 조건
  let disabled = !email.includes("@") || password.length < 8;
  if (passwordConfirm) {
    disabled = disabled || password !== passwordConfirm;
  }

  // disabled일 시 띄워줄 error
  let errors = {
    email: !email.includes("@") && "이메일 형식에 맞지 않습니다",
    password: password.length < 8 && "비밀번호는 8자리 이상이어야 합니다",
    passwordConfirm:
      password !== passwordConfirm && "비밀번호가 일치하지 않습니다",
  };

  return { disabled, errors };
};
