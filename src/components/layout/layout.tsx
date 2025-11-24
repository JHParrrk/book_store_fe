import React from "react";
import Header from "../commons/header";
import Footer from "../commons/footer";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
};

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`;

export default Layout;
