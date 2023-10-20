// 10. components > Button.js 생성
import { css, styled } from "styled-components";

const WelcomeButton = ({ variant, size, shape, children, ...rest }) => {
  // console.log(props);  >> props는 객체  >> 구조분해할당 가능
  // console.log(variant, size, shape, children);

  // 부모-자식 간의 관계라면 리액트에서 자동으로 children을 통해 key 값이 전달
  // children 뿐만 아니라 버튼의 디자인(색상, 사이즈, 위치 등)이 다양
  // return <button>{props.children}</button>;

  return (
    /* 11-2. Button에 외부에서 받아올 값 전달하기 */
    /* key와 value의 값이 동일할 경우 축약 가능 {...{ variant, size, shape }} === variant={variant} size={size} shape={shape} */
    <Button {...{ variant, size, shape }} {...rest}>
      {children}
    </Button>
  );
};
export default WelcomeButton;

// 11. button의 디자인 요소들: { variant, size, shape }
const variantCSS = {
  primary: css`
    background-color: ${({ theme }) => theme.COLORS.primary[300]};
    color: ${({ theme }) => theme.COLORS.font};
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.COLORS.secondary};
  `,
};
const sizeCSS = {
  small: css`
    width: 100px;
    height: 30px;
    padding: 10px 0;
  `,
  medium: css`
    width: 80px;
    height: 50px;
    padding: 10px 0;
  `,
  large: css`
    width: 100px;
    height: 30px;
    padding: 10px 0;
  `,
  full: css`
    width: 100%;
    aspect-ratio: 8 / 1; // 종횡비 유지 (가로가 8일 때 세로가 1 (8:1))
  `,
};
const shapeCSS = {
  shape: css`
    border-radius: 8px;
  `,
  round: css`
    border-radius: 50%;
  `,
};

const Button = styled.button`
  ${({ variant }) => variantCSS[variant]};
  ${({ size }) => sizeCSS[size]};
  ${({ shape }) => shapeCSS[shape]};
  cursor: pointer;
  border: none;
  &:hover {
    opacity: 0.8;
  }
`;
