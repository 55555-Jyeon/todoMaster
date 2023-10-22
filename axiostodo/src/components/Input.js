import { styled } from "styled-components";
import { flexCenter } from "styles/common.style";

// 05. input을 component화 하기
// 07. "재사용하려면 어떤 걸 props로 받아와야 할까?"  >> inputProps => type, name, placeholder, events...
const FormInput = ({ label, error, ...inputProps }) => {
  return (
    <Wrapper>
      <InputBox>
        <label>{label}</label>
        <input {...inputProps} />
      </InputBox>
      <span>{error && <p>{error}</p>}</span>
    </Wrapper>
  );
};

export default FormInput;

export const Wrapper = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  left: 50%;
  transform: translateX(-40%);
  font-family: "Courier New", Courier, monospace;

  & span {
    position: absolute;
    bottom: 20px;
    font-size: 12px;
    padding-left: 12px;
    color: red;
  }
`;

export const InputBox = styled.div`
  width: 80%;
  height: 48px;
  ${flexCenter};
  position: relative;
  margin-bottom: 40px;

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

export const errorMessage = styled.span``;
