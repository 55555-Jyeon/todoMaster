import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import styled from "styled-components";

const Layout = () => {
  // Outlet은 route를 자식 component으로 갖는다. 자식 중에서 주소에 맞는 component를 render하는 역할

  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2% 0;
`;
