// 08. custom hook으로 만들기

import { useState } from "react";

// component가 아닌 일반 함수, 모듈화
const useInputs = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  // initialValue == {email, password} == value

  const onChange = (e) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return [value, onChange, setValue];
};
export default useInputs;

// example:
/* 

    const [{ email, password }, setInputs] = useState({
        email: "",
        password: "",
    });

    const onChangeInputs = (e) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    => 이렇게 아래처럼 바꿔 쓸 수 있게 됩니다.

    const [{ email, password }, onChangeInputs] = useInputs({
        email: "",
        password: "",
    });


*/
