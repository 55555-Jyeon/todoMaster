import { styled } from "styled-components";
import { flexCenter } from "styles/common.style";

// 05. input을 component화 하기
// 07. "재사용하려면 어떤 걸 props로 받아와야 할까?"  >> inputProps => type, name, placeholder, events...
const FormInput = ({ label, error, ...inputProps }) => {
  return (
    <>
      <InputBox>
        <label>{label}</label>
        <input {...inputProps} />
      </InputBox>
      {error && <p>{error}</p>}
    </>
  );
};
export default FormInput;

// 아래는 재사용 불가능한 코드
// <S.InputBox>
//     <label>비밀번호</label>
//     <input type="password" name="password" onChange={onChangeInputs} placeholder="비밀번호를 입력해주세요" />
// </S.InputBox>
// {password.length < 8 && <p>비밀번호는 8자리 이상 입력해주세요</p>}

// 06. style 가져오기
export const InputBox = styled.div`
  width: 80%;
  height: 48px;
  ${flexCenter};
  position: relative;
  margin-bottom: 16px;

  & input {
    width: 100%;
    border: 1px solid #999;
    border-radius: 5px;
    height: 100%;
    text-align: center;
  }

  & label {
    position: absolute;
    left: 15px;
    top: -5px;
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    background-color: ${({ theme }) => theme.COLORS.white};
    z-index: 1;
    padding: 0 5px;
  }
`;
